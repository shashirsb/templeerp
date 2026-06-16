import { Request, Response } from "express";
import DarshanType from "../models/darshanType.model";
import SevaType from "../models/sevaType.model";

export default class LookupController {

  // Darshan Type List
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

  // Seva Type List
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
}
