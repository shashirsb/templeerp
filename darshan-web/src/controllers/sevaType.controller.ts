import { Request, Response } from "express";
import SevaType from "../models/sevaType.model";

export default class SevaTypeController {
  // Find All Seva Type
  findAll(req: Request, res: Response): void {
    SevaType.find()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // Find All Seva Type
  findById(req: Request, res: Response): void {
    const params = req.query;
    SevaType.findById(params.id)
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // create new Seva Type
  create(req: Request, res: Response): void {
    const params = req.body;

    const sevaType = new SevaType({
      title: params.title,
      price: params.price,
      allowed: params.allowed,
      description: params.description
    });

    sevaType
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
    const sevaType = {
      title: params.title,
      price: params.price,
      allowed: params.allowed,
      description: params.description
    };

    SevaType.findByIdAndUpdate(params._id, sevaType)
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }

  // Remove
  remove(req: Request, res: Response): void {
    SevaType.findByIdAndRemove(req.body.id)
      .then((data: any) => {
        res.json({ status: true, data: null });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }
}
