import { NextFunction, Request, RequestHandler, Response } from "express";
import * as jwt from "jsonwebtoken";

const verifyToken: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token[0], "ABCDEFGH", (err, decode) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    next();
  });
};

export = verifyToken;
