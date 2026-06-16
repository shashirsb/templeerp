import { Request, Response } from "express";
import * as nrc from "node-rest-client";
import User from "../models/user.model";
import Nx from "../shared/nx-library/nx";

const Client = nrc.Client;
const client = new Client();

export default class UserController {
  findAll(req: Request, res: Response): void {
    User.find()
      .then((data: any) => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status, err });
      });
  }

  findById(req: Request, res: Response): void {
    User.findOne({ _id: req.query.id })
      .then((data: any) => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status, err });
      });
  }

  update(req: Request, res: Response): void {
    const params = req.body;

    User.findOneAndUpdate({ _id: params._id }, params)
      .then((data: any) => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch((error: any) => {
        const status = res.statusCode;
        res.json({ status, error });
      });
  }

  sendOtp(req: Request, res: Response): void {
    const params = req.body;
    User.findById(params.id)
      .then((user: any) => {
        const otpNumber = Nx.utils.getRandam(1000, 9999);
        const otpMessage = `'Kabbalamma Devasthana Service' verification code : ${otpNumber}`;

        const url = `http://bulksms.smsroot.com/app/smsapi/index.php?key=45B56DF8438A15&campaign=0&routeid=13&type=text&contacts=${
          user.mobile
        }&senderid=SMSDMO&msg=${otpMessage}`;

        client.get(url, (data, response) => {
          const _user = {
            otpNumber
          };

          User.findByIdAndUpdate(params.id, _user)
            .then((data: any) => {
              res.json({
                status: true,
                data,
                message: "send otp successfully."
              });
            })
            .catch((err: any) => {
              res.json({ status: false, error: err });
            });
        });
      })
      .catch((err: any) => {
        res.json({ status: false, error: err, message: "User not found." });
      });
  }

  verifyMobile(req: Request, res: Response): void {
    const params = req.body;
    User.findById(params.id)
      .then((user: any) => {

        if (user.otpNumber === +params.otpNumber) {
          const _user = {
            mobileVerified: true
          };

          User.findByIdAndUpdate(user._id, _user)
            .then((data: any) => {
              res.json({
                status: true,
                message: "Mobile number is verified successfully."
              });
            })
            .catch((err: any) => {
              res.json({ status: false, message: "Invalid veification code." });
            });
        } else {
          res.json({ status: false, message: "Invalid veification code." });
        }
      })
      .catch((err: any) => {
        res.json({ status: false, error: err, message: "User not found." });
      });
  }
}
