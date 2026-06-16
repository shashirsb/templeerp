import { Request, Response } from "express";
import TicketBooking from "../models/ticketBooking.model";
import Nx from "../shared/nx-library/nx";

export default class QrscannerController {
  get(req: Request, res: Response): void {
    const params = req.query;
    TicketBooking.findOne({ bookingId: params.bookingId })
      .populate("userId darshanType sevaType")
      .then((data: any) => {
        const currDate = new Date();

        const dateSame = Nx.date.compareDate(currDate, data.bookingDate);

        if (dateSame) {
          if (data.entryDone) {
            res.json({
              status: false,
              data: null,
              message: "Entry already given"
            });
          } else {
            let serviceType: any;
            if (data.bookingFor === "darshan") {
              serviceType = data.darshanType;
            } else {
              serviceType = data.sevaType;
            }

            const query = {
              entryDate: new Date(),
              entryDone: true
            };

            TicketBooking.findByIdAndUpdate(data._id, query)
              .then((data: any) => {

                const sTime = Nx.date.numberToTime(data.bookingStartTime);
                const eTime = Nx.date.numberToTime(data.bookingEndTime);

                const resData = {
                  bookingId: data.bookingId,
                  bookingDate:  Nx.date.dateFormat(data.bookingDate, 'dd/MM/yyyy'),
                  bookingTime: sTime + '-'  + eTime,
                  allowed: data.numberOfDevotees,
                  service: data.bookingFor,
                  serviceType: serviceType.title,
                  personName: data.bookingPersonName,
                  personMobile: data.bookingPersonMobile,
                  createdAt: Nx.date.dateFormat(data.createdAt, 'dd/MM/yyyy')
                };

                res.json({
                  status: true,
                  data: resData,
                  message: "Valid Entry"
                });
              })
              .catch((err: any) => {
                res.json({ status: false, error: err });
              });
          }

          // res.json({ status: true, data, message: "valid date" });
        } else {
          res.json({ status: false, data: null, message: "Invalid Entry Date." });
        }
      })
      .catch((err: any) => {
        res.json({ status: false, error: err, message: "Invalid QR Code" });
      });
  }
}
