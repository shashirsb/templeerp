import { Request, Response } from "express";
import DarshanType from "../models/darshanType.model";
import Pilgrim from "../models/pilgrim.model";
import SevaType from "../models/sevaType.model";
import STA from "../models/STA.model";
import SMU from "../models/SMU.model";
import SYA from "../models/SYA.model";
import STH from "../models/STH.model";
import STW from "../models/STW.model";
import SFW from "../models/SFW.model";
import SLB from "../models/SLB.model";

import TicketBooking from "../models/ticketBooking.model";
import TicketBookingDarshan from "../models/ticketBookingDarshan.model";
import ConnectionCheck from "../models/connectionCheck";
import TicketBookingBlock from "../models/ticketBookingBlock.model";
import Nx from "../shared/nx-library/nx";

export default class BookingController {

  getAllBooking = (req: Request, res: Response) => {
    const params = req.body;


    // TicketBooking.countDocuments().then((totalItem: number) => {
    //   const paginationQuery = Nx.utils.getPaginationQuery(+params.currentPage, +params.itemPerPage);

    //TicketBooking.find({}, null, paginationQuery)



    // TicketBooking.find({})
    //   .populate("userId darshanType sevaType pilgrimsList ")
    //   .sort("-bookingDate")
    //   .limit(2)
    //   .then((data: any) => {
    //     const response = {
    //       status: true,
    //       message: "Get collection successfully.",
    //       data: {
    //         totalItem,
    //         collection: data
    //       }
    //     };
    //     res.json(response);
    //   })
    //   .catch((err: any) => {
    //     const status = res.statusCode;
    //     res.json({ status: false, err });
    //   });


    //////////////////////////////////////////////////////////////////
    try {
      let _firstResult = [];
      const _sevaType = [TicketBooking, STA, SMU, SYA, STH, STW, SFW, SLB];
      const groupLength = _sevaType.length;
      let iteration = 0;
      const totalItem = 80;

      _sevaType.forEach(async element => {

        const _secondResult = await element.find({})
          .populate("userId darshanType sevaType pilgrimsList ")
          .sort("-bookingDate")
          .limit(10);

        _secondResult.forEach(ex => {
          _firstResult.push(ex);
        });
        iteration++;
        if (iteration == groupLength) {

          const _finalfirstResult = _firstResult.sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
          );

          const response = {
            status: true,
            message: "Get collection successfully.",
            data: {
              totalItem,
              collection: _finalfirstResult
            }
          };

          res.json(response);
        }
      });

    } catch (error) {
      console.log(error);
      res.json({ status: false, error });
    }

    ///////////////////////////////////////////////////////////////////////////



  }

  getAllDarshanBooking = (req: Request, res: Response) => {
    const params = req.body;

    TicketBookingDarshan.countDocuments().then((totalItem: number) => {
      const paginationQuery = Nx.utils.getPaginationQuery(+params.currentPage, +params.itemPerPage);

      TicketBookingDarshan.find({}, null, paginationQuery)
        .populate("userId darshanType sevaType pilgrimsList ")
        .sort("-bookingDate")
        .then((data: any) => {
          const response = {
            status: true,
            message: "Get collection successfully.",
            data: {
              totalItem,
              collection: data
            }
          };
          res.json(response);
        })
        .catch((err: any) => {
          const status = res.statusCode;
          res.json({ status: false, err });
        });

    });

  }


  getDarshanBookingById(req: Request, res: Response): void {
    const params = req.query;

    TicketBookingDarshan.find({ userId: params.id, bookingFor: "darshan" })
      .populate("darshanType")
      .sort("-bookingDate")
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  getSevaBookingById(req: Request, res: Response): void {
    const params = req.query;
    TicketBooking.find({ userId: params.id, bookingFor: "seva" })
      .populate("sevaType")
      .sort("-bookingDate")
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  getDarshanByBookingId(req: Request, res: Response): void {
    const params = req.body;
    DarshanType.find({ _id: params.id })
      .populate("darshanType")
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  getSevaByBookingId(req: Request, res: Response): void {
    const params = req.body;
    SevaType.find({ _id: params.id })
      .populate("sevaType")
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // Ticket Booking for Darshan / Seva
  createTicket = async (req: Request, res: Response) => {

    const params = req.body;
    let bookingNumber = 1;
    let collection = [];
    collection = await TicketBooking.find().sort({ bookingNumber: -1 }).limit(1);
    if (collection.length > 0) {
      bookingNumber = collection[0]['bookingNumber'] + 1;
    }

    Pilgrim.collection
      .insert(params.pilgrimsList)
      .then((pilgrimsCollection: any) => {
        const pilgrimsUserList: any[] = [];
        for (let i = 0; i < pilgrimsCollection.insertedCount; i++) {
          pilgrimsUserList.push(pilgrimsCollection.ops[i]["_id"]);
        }
        const uniqueBookingId = "dsfasdf";
        const transactionId =
          params.bookingFor === "darshan"
            ? Nx.utils.getTransactionId("Darshan")
            : Nx.utils.getTransactionId("Seva");
        const endTime = +params.bookingStartTime;

        const ticketBooking = new TicketBooking({
          bookingNumber: bookingNumber,
          transactionId,
          userId: params.userId,
          darshanType: params.darshanType,
          sevaType: params.sevaType,
          bookingId: uniqueBookingId,
          bookingFor: params.bookingFor,
          paymentType: params.paymentType,
          paymentId: "ABCDEFGH",
          bookingAmount: params.bookingAmount,
          // bookingDate: Date.now, // params.bookingDate,
          bookingStartTime: +params.bookingStartTime,
          bookingEndTime: endTime + 1,
          pilgrimType: params.pilgrimType,
          pilgrimsList: pilgrimsUserList,
          createdBy: params.userId,
          updatedBy: params.userId
        });

        ticketBooking
          .save()
          .then((data: any) => {
            const status = res.statusCode;
            res.json({ status: true, data });
          })
          .catch((err: any) => {
            const status = res.statusCode;
            res.json({ status: false, err });
          });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }


  createTicketFromCounter = async (req: Request, res: Response) => {
    const conChecker = new ConnectionCheck();
    conChecker
      .save()
      .then((data: any) => {
        // After checking the connection we are inserting the data
        //
        const params = req.body;
        let uniqueBookingId: any;
        let _ticketBooking: any;

        // let bookingNumber = 1;
        // let collection = [];
        // collection = await TicketBooking.find().sort({ bookingNumber: -1 }).limit(1);
        // if (collection.length > 0) {
        //   bookingNumber = collection[0]['bookingNumber'] + 1;
        // }

        const transactionId =
          params.bookingFor === "darshan"
            ? Nx.utils.getTransactionId("Darshan")
            : Nx.utils.getTransactionId("Seva");


        // if (params.bookingFor == "darshan") {
        //   uniqueBookingId = "SKD" + Nx.utils.getBookingId() + bookingNumber;
        // } else {
        //   uniqueBookingId = "SKS" + Nx.utils.getBookingId() + bookingNumber;
        // }

        if (params.bookingFor == "seva") {

          if (params.sevaType == "5b7a8577fb43ba07d43922c4") {
            uniqueBookingId = "STA" + Nx.utils.getBookingId();
          }
          if (params.sevaType == "5ca5ba3e9efd5c2a009f600e") {
            uniqueBookingId = "SMU" + Nx.utils.getBookingId();
          }
          if (params.sevaType == "5cab548b9efd5c2a009f6057") {
            uniqueBookingId = "SYA" + Nx.utils.getBookingId();
          }
          if (params.sevaType == "5cab54c79efd5c2a009f6058") {
            uniqueBookingId = "STH" + Nx.utils.getBookingId();
          }
          if (params.sevaType == "5ca5b9949efd5c2a009f600c") {
            uniqueBookingId = "STW" + Nx.utils.getBookingId();
          }
          if (params.sevaType == "5d4c313c2ad63f3864e0cbd8") {
            uniqueBookingId = "SFW" + Nx.utils.getBookingId();
          }
          if (params.sevaType == "5d4c318a2ad63f3864e0cbd9") {
            uniqueBookingId = "SLB" + Nx.utils.getBookingId();
          }

          // Removed to accomodate unique sequence for each seva
          // uniqueBookingId = "SKS" + Nx.utils.getBookingId();// + ("00000000" + bookingNumber).slice(-9);;
        } else if (params.bookingFor == "darshan") {
          uniqueBookingId = "SKD" + Nx.utils.getBookingId();// + ("00000000" + bookingNumber).slice(-9);;
        }
        const endTime = +params.bookingStartTime;

        if (params.bookingFor == "seva") {
          let sevaModel: any;

          if (params.sevaType == "5b7a8577fb43ba07d43922c4") {
            sevaModel = STA;
          }
          if (params.sevaType == "5ca5ba3e9efd5c2a009f600e") {
            sevaModel = SMU;
          }
          if (params.sevaType == "5cab548b9efd5c2a009f6057") {
            sevaModel = SYA;
          }
          if (params.sevaType == "5cab54c79efd5c2a009f6058") {
            sevaModel = STH;
          }
          if (params.sevaType == "5ca5b9949efd5c2a009f600c") {
            sevaModel = STW;
          }
          if (params.sevaType == "5d4c313c2ad63f3864e0cbd8") {
            sevaModel = SFW;
          }
          if (params.sevaType == "5d4c318a2ad63f3864e0cbd9") {
            sevaModel = SLB;
          }

          _ticketBooking = new sevaModel({
            // bookingNumber: bookingNumber,
            transactionId,
            userId: params.userId,
            darshanType: params.darshanType,
            sevaType: params.sevaType,
            bookingId: uniqueBookingId,
            bookingFor: params.bookingFor,
            paymentType: params.paymentType,
            paymentId: params.paymentId,
            bookingAmount: params.bookingAmount,
            // bookingDate: params.bookingDate,
            bookingStartTime: +params.bookingStartTime,
            bookingEndTime: endTime + 1,
            bookingBy: "temple",
            bookingPersonName: params.bookingPersonName,
            bookingPersonMobile: params.bookingPersonMobile,
            numberOfDevotees: params.numberOfDevotees,
            createdBy: params.userId,
            updatedBy: params.userId
          });

        } else if (params.bookingFor == "darshan") {
          _ticketBooking = new TicketBookingDarshan({
            // bookingNumber: bookingNumber,
            transactionId,
            userId: params.userId,
            darshanType: params.darshanType,
            sevaType: params.sevaType,
            bookingId: uniqueBookingId,
            bookingFor: params.bookingFor,
            paymentType: params.paymentType,
            paymentId: params.paymentId,
            bookingAmount: params.bookingAmount,
            // bookingDate: params.bookingDate,
            bookingStartTime: +params.bookingStartTime,
            bookingEndTime: endTime + 1,
            bookingBy: "temple",
            bookingPersonName: params.bookingPersonName,
            bookingPersonMobile: params.bookingPersonMobile,
            numberOfDevotees: params.numberOfDevotees,
            createdBy: params.userId,
            updatedBy: params.userId
          });
        }
        _ticketBooking
          .save()
          .then((data: any) => {
            const status = res.statusCode;
            res.json({ status: true, data });
          })
          .catch((err: any) => {
            const status = res.statusCode;
            res.json({ status: false, err });
          });

      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  findBookingSlot(req: Request, res: Response): void {
    const params = req.body;
    const _allowed = params.allowed || 50;
    const query = {
      bookingBlockDate: params.bookingDate,
      bookingBlockFor: params.bookingFor
    };

    if (params.bookingFor === "darshan") {
      query["darshanType"] = params.darshanTypeId;
    } else {
      query["sevaType"] = params.sevaTypeId;
    }

    TicketBookingBlock.find(query)
      .then((blockDayResult: any) => {
        const bts = { start: 0, end: 0, flag: false };
        const ts = [];
        if (blockDayResult.length > 0) {
          if (blockDayResult[0]["bookingBlockType"] === "full") {
            const msg = `Booking not allowed for ${params.bookingDate} date`;
            res.json({ status: false, data: null, message: msg });
          } else {
            bts.flag = true;
            bts.start = blockDayResult[0].bookingBlockStartTime;
            bts.end = blockDayResult[0].bookingBlockEndTime;
          }
        }

        for (let i = 6; i < 21; i++) {
          if ((i < bts.start || i >= bts.end) && bts.flag) {
            ts.push({ startTime: i, endTime: i + 1, available: _allowed });
          } else if (!bts.flag) {
            ts.push({ startTime: i, endTime: i + 1, available: _allowed });
          }
        }

        const query2 = {
          bookingDate: params.bookingDate,
          bookingFor: params.bookingFor
        };
        if (params.bookingFor === "darshan") {
          query2["darshanType"] = params.darshanTypeId;
        } else {
          query2["sevaType"] = params.sevaTypeId;
        }

        TicketBooking.find(query2)
          .then((data: any) => {
            for (let x = 0; x < data.length; x++) {
              const pilgrimCount = +data[x]["numberOfDevotees"];
              const bStartTime = data[x]["bookingStartTime"];
              const sIndex = ts.findIndex(tm => tm.startTime === bStartTime);
              if (sIndex !== -1 && _allowed > pilgrimCount) {
                ts[sIndex]["available"] =
                  ts[sIndex]["available"] - pilgrimCount;
              }
            }

            const status = res.statusCode;
            const resData = {
              bookingDate: params.bookingDate,
              darshanId: params.darshanId,
              timeSlot: ts
            };
            res.json({ status, data: resData });
          })
          .catch((err: any) => {
            const msg = `Error in booking please try again`;
            res.json({ status: false, error: err, message: msg });
          });
      })
      .catch((err: any) => {
        const msg = `Error in booking please try again`;
        res.json({ status: false, error: err, message: msg });
      });
  }

  print(printer: string, data: any) {
    // Nx.print.getPrint("zebra", "this is my data");
  }
}
