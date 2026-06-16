import { Request, Response } from "express";
import DarshanType from "../models/darshanType.model";

export default class DarshanTypeController {
  // Find All Darshan Type
  findAll(req: Request, res: Response): void {
    DarshanType.find()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // Find All Darshan Type
  findById(req: Request, res: Response): void {
    const params = req.query;
    DarshanType.findById(params.id)
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // create new Darshan Type
  create(req: Request, res: Response): void {
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

  // update
  update(req: Request, res: Response): void {
    const params = req.body;
    const darshanType = {
      title: params.title,
      price: params.price,
      allowed: params.allowed,
      description: params.description
    };

    DarshanType.findByIdAndUpdate(params._id, darshanType)
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }

  // Remove
  remove(req: Request, res: Response): void {
    DarshanType.findByIdAndRemove(req.body.id)
      .then((data: any) => {
        res.json({ status: true, data: null });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }
}
