import * as bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import User from "../models/user.model";
import Nx from "../shared/nx-library/nx";

export default class AuthController {
  // User Login
  signin(req: Request, res: Response): void {
    console.log("1....................");
    const params = req.body;

    const { email } = req.body;
    User.findOne({
      email: params.email,
      isActive: true,
      userType: params.userType
    })
      .then((user: any) => {
        console.log("2....................");
        if (!user) {
          res.json({ status: false, message: "Invalid Email / Password." });
        }
        if (user) {
          console.log("3....................");
          if (user.emailVerified) {
            const isValidPw = bcryptjs.compareSync(
              params.password,
              user.password
            );
            console.log("4....................");
            if (isValidPw) {
              console.log("5....................");
              const _user = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isActive: user.isActive,
                pilgrimType: user.pilgrimType
              };
              res.json({ status: true, data: _user });
            } else {
              res.json({ status: false, message: "Invalid Email / Password." });
            }
          } else {
            res.json({ status: false, message: "Email is not varified." });
          }
        }
      })
      .catch((err: any) => {
        res.json({ status: false, error: err });
      });
  }

  // User Registration
  signup(req: Request, res: Response): void {
    const params = req.body;
    const passwordHash = bcryptjs.hashSync(params.password, 8);
    const user = new User({
      firstName: params.firstName,
      lastName: params.lastName,
      gender: params.gender,
      mobile: params.mobile,
      pilgrimType: params.pilgrimType,
      idProofType: params.idProofType,
      idProofNumber: params.idProofNumber,
      addressLine1: params.addressLine1,
      addressLine2: params.addressLine2,
      country: params.country,
      state: params.state,
      city: params.city,
      postalCode: params.postalCode,
      email: params.email,
      password: passwordHash
    });

    user
      .save()
      .then((data: any) => {
        const payload = {
          email: params.email
        };

        const token = jwt.sign(payload, "ABCDEFGH", {
          expiresIn: 60 * 60
        });

        const message = `your token is ${"http://localhost:4200/verify-email/" +
          token}`;
        const subj = "Email Verification mail";

        Nx.mail.sendMail(params.email, subj, message);

        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status, err });
      });
  }

  // Forgot Password
  forgotPassword(req: Request, res: Response): void {
    const params = req.body;

    User.findOne({ email: params.email })
      .then((user: any) => {
        if (!user) {
          res.json({ status: false, message: "User not found" });
        }

        if (user) {
          const payload = { email: user.email };
          const fpToken = jwt.sign(payload, "ABCDEFGH", {
            expiresIn: 60 * 60
          });

          User.findByIdAndUpdate(
            user._id,
            {
              resetPasswordToken: fpToken,
              resetPasswordExpires: Date.now() + 86400000
            },
            { upsert: true, new: true }
          )
            .then((data: any) => {
              const message = `your token is ${"http://localhost:4200/auth/reset-password/" +
                fpToken}`;
              const subj = "Reset Password";

              Nx.mail.sendMail(params.email, subj, message);

              const status = res.statusCode;
              res.json({ status, data });
            })
            .catch((err: any) => {
              res.json({ status: false, message: "User not found" });
            });
        }
      })
      .catch((err: any) => {
        res.json({ status: false, message: "User not found" });
      });
  }

  // Reset Password
  resetPassword(req: Request, res: Response): void {
    const params = req.body;
    jwt.verify(params.token, "ABCDEFGH", (err, decode) => {
      if (err) {
        res.json({ status: false, message: "Invalid Token" });
      } else {
        User.findOne({ email: decode.email })
          .then((user: any) => {
            if (user && user != null) {
              const passwordHash = bcryptjs.hashSync(params.password, 8);
              const _user = {
                password: passwordHash
              };
              User.findByIdAndUpdate(user._id, _user)
                .then((data: any) => {
                  res.json({ status: true, message: "Password has been updated successfully." });
                })
                .catch((err: any) => {
                  res.json({ status: false, message: "Invalid Token" });
                });
            }
          })
          .catch((err: any) => {
            res.json({ status: false, message: "Invalid Token" });
          });
      }
    });
  }

  // Verify Email
  verifyEmail(req: Request, res: Response): void {
    const params = req.body;
    jwt.verify(params.token, "ABCDEFGH", (err, decode) => {
      if (err) {
        res.json({ status: false, message: "Invalid Token" });
      } else {
        User.findOne({ email: decode.email })
          .then((user: any) => {
            if (user && user != null) {
              const _user = {
                emailVerified : true
              };
              User.findByIdAndUpdate(user._id, _user)
                .then((data: any) => {
                  res.json({ status: true, message: "Email has been verified successfully." });
                })
                .catch((err: any) => {
                  res.json({ status: false, message: "Invalid Token" });
                });
            }
          })
          .catch((err: any) => {
            res.json({ status: false, message: "Invalid Token" });
          });
      }
    });
  }
}
