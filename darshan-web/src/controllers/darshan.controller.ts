import { Request, Response } from "express";
import DarshanType from "../models/darshanType.model";

export default class DarshanController {
  // Get all darshan type
  getDarshanType(req: Request, res: Response): void {
    DarshanType.find()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // create new Darshan Type
  createDarshanType(req: Request, res: Response): void {
    const params = req.body;

    const darshanType = new DarshanType({
      title: params.title,
      price: params.price,
      allowed: params.allowed,
      description: params.description
    });

    darshanType
      .save()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }
}
