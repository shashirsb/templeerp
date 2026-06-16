import { Request, Response } from "express";
import SevaType from "../models/sevaType.model";

export default class SevaController {

  // Get all darshan type
  getSevaType(req: Request, res: Response): void {
    SevaType.find()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // create new Darshan Type
  createSevaType(req: Request, res: Response): void {
    const params = req.body;

    const darshanType = new SevaType({
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
