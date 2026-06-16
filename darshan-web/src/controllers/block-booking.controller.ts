import { Request, Response } from "express";
import TicketBookingBlock from "../models/ticketBookingBlock.model";
import Nx from "../shared/nx-library/nx";

export default class BlockBookingController {
  // Find All
  findAll(req: Request, res: Response): void {
    TicketBookingBlock.find()
      .populate("userId darshanType sevaType")
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  findById(req: Request, res: Response): void {
    TicketBookingBlock.findById(req.query.id)
      .populate("userId darshanType sevaType")
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  findByUserId(req: Request, res: Response): void {
    TicketBookingBlock.find({ userId: req.query.id })
      .populate("userId")
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  create(req: Request, res: Response): void {
    const params = req.body;
    const ticketBookingBlock = new TicketBookingBlock({
      userId: params.userId,
      darshanType: params.darshanType,
      sevaType: params.sevaType,
      bookingBlockType: params.bookingBlockType,
      bookingBlockFor: params.bookingBlockFor,
      bookingBlockDate: params.bookingBlockDate,
      bookingBlockStartTime: params.bookingBlockStartTime,
      bookingBlockEndTime: params.bookingBlockEndTime,
      description: params.description,
      note: params.note,
      createdBy: params.userId,
      updatedBy: params.userId
    });

    ticketBookingBlock
      .save()
      .then((data: any) => {
        res.json({ status: true, data, message: "save data successfully." });
      })
      .catch((err: any) => {
        res.json({ status: false, err });
      });
  }

  update(req: Request, res: Response): void {
    res.json({ status: false, err: "test method" });
  }

  // Remove
  remove(req: Request, res: Response): void {
    TicketBookingBlock.findByIdAndRemove(req.body.id)
      .then((data: any) => {
        res.json({ status: true, data: null });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }
}
