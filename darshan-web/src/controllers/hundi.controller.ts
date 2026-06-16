import { Request, Response } from "express";
import Hundi from "../models/hundi.model";
import Nx from "../shared/nx-library/nx";

export default class HundiController {
  // Get all darshan type
  getHundi(req: Request, res: Response): void {
    Hundi.find()
      .populate("userId")
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // Get all darshan type
  getHundiByUserId(req: Request, res: Response): void {
    const params = req.query;
    Hundi.find({ userId: params.id })
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // create new Darshan Type
  createHundi(req: Request, res: Response): void {
    const params = req.body;
    params["transactionId"] = Nx.utils.getTransactionId('Hundi');

    const hundi = new Hundi({
      transactionId: params.transactionId,
      userId: params.userId,
      amount: params.amount,
      occasion: params.occasion,
      behalfOf: params.behalfOf
    });

    hundi
      .save()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }
}
