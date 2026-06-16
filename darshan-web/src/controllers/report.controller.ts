import { Request, Response } from "express";
import TicketBooking from "../models/ticketBooking.model";
import STA from "../models/STA.model";
import SMU from "../models/SMU.model";
import SYA from "../models/SYA.model";
import STH from "../models/STH.model";
import STW from "../models/STW.model";
import SFW from "../models/SFW.model";
import SLB from "../models/SLB.model";
import SPB from "../models/SPB.model";
import SPH from "../models/SPH.model";
import SPA from "../models/SPA.model";
import MUT from "../models/MUT.model";
import MKA from "../models/MKA.model";
import KSA from "../models/KSA.model";
import KGO from "../models/KGO.model";
import KKP from "../models/KKP.model";
import KKE from "../models/KKE.model";
import KKT from "../models/KKT.model";
import KKK from "../models/KKK.model";
import KSI from "../models/KSI.model";
import KMO from "../models/KMO.model";
import KCH from "../models/KCH.model";
import KDD from "../models/KDD.model";
import KPA from "../models/KPA.model";
import KCC from "../models/KCC.model";
import KDC from "../models/KDC.model";
import KUP from "../models/KUP.model";
import KGP from "../models/KGP.model";
import KNB from "../models/KNB.model";
import TicketBookingDarshan from "../models/ticketBookingDarshan.model";
import KanikeBooking from "../models/kanike.model";
import UtsavaMurthyBooking from "../models/utsavaMurthy.model";
import SpecialPoojaBooking from "../models/specialPooja.model";
import MoneyOrderBooking from "../models/moneyOrder.model";
import CashKanikeBooking from "../models/cashkanike.model";
import HundiCollectionBooking from "../models/hundiCollection.model";

export default class ReportController {
  /**
   * @memberof ReportController
   * @method Post
   * @description booking report by date
   */
  bookingReportByDate = async (req: Request, res: Response) => {
    try {
      const params = req.body;

      const startDate = new Date(params.startDate);
      const endDate = new Date(params.endDate);


      let _startDate = startDate.setHours(0);
      _startDate = startDate.setMinutes(0);
      _startDate = startDate.setSeconds(1);
      _startDate = startDate.setMilliseconds(100);
      const newStartdate = new Date(_startDate);

      let _endDate = endDate.setHours(23);
      _endDate = endDate.setMinutes(59);
      _endDate = endDate.setSeconds(59);
      _endDate = endDate.setMilliseconds(100);
      const newEnddate = new Date(_endDate);

      // const resultDarshan = await TicketBookingDarshan.find({
      //   bookingDate: {
      //     $gte: newStartdate,
      //     $lte: newEnddate
      //   }
      // })
      //   .populate("darshanType sevaType ")
      //   .select(
      //     `userId darshanType sevaType bookingNumber bookingFor bookingBy bookingId entryDate bookingDate bookingAmount paymentType numberOfDevotees`
      //   );

      /////////////////////////////////////////////////////////////
      let _firstResult = [];
      const _sevaType = [TicketBookingDarshan, TicketBooking, STA, SMU, SYA, STH, STW, SFW, SLB];
      const groupLength = _sevaType.length;
      let iteration = 0;

      _sevaType.forEach(async element => {

        const _secondResult = await element.find({
          bookingDate: {
            $gte: newStartdate,
            $lte: newEnddate
          }
        })
          .populate("darshanType sevaType ")
          .select(
            `userId darshanType sevaType bookingNumber bookingFor bookingBy bookingId entryDate bookingDate bookingAmount paymentType numberOfDevotees`
          );

        _secondResult.forEach(ex => {
          _firstResult.push(ex);
        });
        iteration++;
        if (iteration == groupLength) {
          res.json({ status: true, data: _firstResult, message: "Success" });
        }
      });

      ////////////////////////////////////////////

    } catch (error) {
      console.log(error);
      res.json({ status: false, error, message: "Error" });
    }
  }

  utsavaMurthyReportByDate = async (req: Request, res: Response) => {
    try {
      const params = req.body;


      let startDate = new Date(params.startDate);
      let endDate = new Date(params.endDate);


      let _startDate = startDate.setHours(0);
      _startDate = startDate.setMinutes(0);
      _startDate = startDate.setSeconds(1);
      _startDate = startDate.setMilliseconds(100);
      const newStartdate = new Date(_startDate);

      let _endDate = endDate.setHours(23);
      _endDate = endDate.setMinutes(59);
      _endDate = endDate.setSeconds(59);
      _endDate = endDate.setMilliseconds(100);
      const newEnddate = new Date(_endDate);


      // const result = await UtsavaMurthyBooking.find({
      //   createdAt: {
      //     $gte: newStartdate,
      //     $lte: newEnddate
      //   }
      // })
      //   .select(
      //     `transactionId utsavaMurthyId devoteePhone idProofNo utsavatype noOfDays amountPaid bookingPersonName userId devoteeName devoteeAddress idProofType startDate endDate createdBy createdAt utsavaMurthyNumber userId`
      //   );

      // res.json({ status: true, data: result, message: "Success" });

      /////////////////////////////////////////////////////////////
      let _firstResult = [];
      const _Type = [UtsavaMurthyBooking, MUT, MKA];
      const groupLength = _Type.length;
      let iteration = 0;

      _Type.forEach(async element => {

        const _secondResult = await element.find({
          createdAt: {
            $gte: newStartdate,
            $lte: newEnddate
          }
        })
          .select(
            `transactionId utsavaMurthyId devoteePhone idProofNo utsavatype noOfDays amountPaid bookingPersonName userId devoteeName devoteeAddress idProofType startDate endDate createdBy createdAt utsavaMurthyNumber userId`
          );

        _secondResult.forEach(ex => {
          _firstResult.push(ex);
        });
        iteration++;
        if (iteration == groupLength) {
          res.json({ status: true, data: _firstResult, message: "Success" });
        }
      });

      ////////////////////////////////////////////


    } catch (error) {
      console.log(error);
      res.json({ status: false, error, message: "Error" });
    }
  }

  specialPoojaReportByDate = async (req: Request, res: Response) => {
    try {
      const params = req.body;


      let startDate = new Date(params.startDate);
      let endDate = new Date(params.endDate);


      let _startDate = startDate.setHours(0);
      _startDate = startDate.setMinutes(0);
      _startDate = startDate.setSeconds(1);
      _startDate = startDate.setMilliseconds(100);
      const newStartdate = new Date(_startDate);

      let _endDate = endDate.setHours(23);
      _endDate = endDate.setMinutes(59);
      _endDate = endDate.setSeconds(59);
      _endDate = endDate.setMilliseconds(100);
      const newEnddate = new Date(_endDate);


      // const result = await SpecialPoojaBooking.find({
      //   createdAt: {
      //     $gte: newStartdate,
      //     $lte: newEnddate
      //   }
      // })
      //   .select(
      //     `transactionId specialPoojaId devoteePhone specialPoojatype amountPaid bookingPersonName userId devoteeName devoteeAddress createdBy createdAt SpecialPoojaNumber`
      //   );

      // res.json({ status: true, data: result, message: "Success" });



      /////////////////////////////////////////////////////////////
      let _firstResult = [];
      const _Type = [SpecialPoojaBooking, SPB, SPH, SPA];
      const groupLength = _Type.length;
      let iteration = 0;

      _Type.forEach(async element => {

        const _secondResult = await element.find({
          createdAt: {
            $gte: newStartdate,
            $lte: newEnddate
          }
        })
          .select(
            `transactionId specialPoojaId devoteePhone specialPoojatype amountPaid bookingPersonName userId devoteeName devoteeAddress createdBy createdAt SpecialPoojaNumber`
          );

        _secondResult.forEach(ex => {
          _firstResult.push(ex);
        });
        iteration++;
        if (iteration == groupLength) {
          res.json({ status: true, data: _firstResult, message: "Success" });
        }
      });

      ////////////////////////////////////////////

    } catch (error) {
      console.log(error);
      res.json({ status: false, error, message: "Error" });
    }
  }

  moneyOrderReportByDate = async (req: Request, res: Response) => {
    try {
      const params = req.body;


      let startDate = new Date(params.startDate);
      let endDate = new Date(params.endDate);


      let _startDate = startDate.setHours(0);
      _startDate = startDate.setMinutes(0);
      _startDate = startDate.setSeconds(1);
      _startDate = startDate.setMilliseconds(100);
      const newStartdate = new Date(_startDate);

      let _endDate = endDate.setHours(23);
      _endDate = endDate.setMinutes(59);
      _endDate = endDate.setSeconds(59);
      _endDate = endDate.setMilliseconds(100);
      const newEnddate = new Date(_endDate);


      // const result = await MoneyOrderBooking.find({
      //   createdAt: {
      //     $gte: newStartdate,
      //     $lte: newEnddate
      //   }
      // })
      //   .select(
      //     `moneyOrderNumber moneyOrderDescription transactionId moneyOrderId devoteeName devoteePhone moneyOrderNo moneyOrderType moneyOrderAmount sentDate receivedDate createdAt  createdBy bookingPersonName`
      //   );

      // res.json({ status: true, data: result, message: "Success" });

      /////////////////////////////////////////////////////////////
      let _firstResult = [];
      const _Type = [MoneyOrderBooking, KMO, KCH, KDD, KPA, KCC, KDC, KUP, KGP, KNB];
      const groupLength = _Type.length;
      let iteration = 0;

      _Type.forEach(async element => {

        const _secondResult = await element.find({
          createdAt: {
            $gte: newStartdate,
            $lte: newEnddate
          }
        })
        .select(
              `moneyOrderNumber moneyOrderDescription transactionId moneyOrderId devoteeName devoteePhone moneyOrderNo moneyOrderType moneyOrderAmount sentDate receivedDate createdAt  createdBy bookingPersonName`
            );

        _secondResult.forEach(ex => {
          _firstResult.push(ex);
        });
        iteration++;
        if (iteration == groupLength) {
          res.json({ status: true, data: _firstResult, message: "Success" });
        }
      });

      ////////////////////////////////////////////

    } catch (error) {
      console.log(error);
      res.json({ status: false, error, message: "Error" });
    }
  }

  cashKanikeReportByDate = async (req: Request, res: Response) => {
    try {
      const params = req.body;


      let startDate = new Date(params.startDate);
      let endDate = new Date(params.endDate);


      let _startDate = startDate.setHours(0);
      _startDate = startDate.setMinutes(0);
      _startDate = startDate.setSeconds(1);
      _startDate = startDate.setMilliseconds(100);
      const newStartdate = new Date(_startDate);

      let _endDate = endDate.setHours(23);
      _endDate = endDate.setMinutes(59);
      _endDate = endDate.setSeconds(59);
      _endDate = endDate.setMilliseconds(100);
      const newEnddate = new Date(_endDate);


      const result = await CashKanikeBooking.find({
        createdAt: {
          $gte: newStartdate,
          $lte: newEnddate
        }
      })
        .select(
          `cashKanikeNumber cashKanikeDescription transactionId cashKanikeId devoteeName devoteePhone cashKanikePrice createdAt  createdBy bookingPersonName`
        );

      res.json({ status: true, data: result, message: "Success" });
    } catch (error) {
      console.log(error);
      res.json({ status: false, error, message: "Error" });
    }
  }

  hundiCollectionReportByDate = async (req: Request, res: Response) => {
    try {
      const params = req.body;


      let startDate = new Date(params.startDate);
      let endDate = new Date(params.endDate);


      let _startDate = startDate.setHours(0);
      _startDate = startDate.setMinutes(0);
      _startDate = startDate.setSeconds(1);
      _startDate = startDate.setMilliseconds(100);
      const newStartdate = new Date(_startDate);

      let _endDate = endDate.setHours(23);
      _endDate = endDate.setMinutes(59);
      _endDate = endDate.setSeconds(59);
      _endDate = endDate.setMilliseconds(100);
      const newEnddate = new Date(_endDate);


      const result = await HundiCollectionBooking.find({
        createdAt: {
          $gte: newStartdate,
          $lte: newEnddate
        }
      })
        .select(
          `transactionId hundiCollectionId hundiID hundiUnstagedPlace description bankName bookingPersonName userId  totalAmount notesTotalAmount coinTotalAmount hundiUnstagedDate hundiOpenedDate createdAt hundiCollectionNumber`
        );

      res.json({ status: true, data: result, message: "Success" });
    } catch (error) {
      console.log(error);
      res.json({ status: false, error, message: "Error" });
    }
  }

  kanikeReportByDate = async (req: Request, res: Response) => {
    try {
      const params = req.body;


      let startDate = new Date(params.startDate);
      let endDate = new Date(params.endDate);


      let _startDate = startDate.setHours(0);
      _startDate = startDate.setMinutes(0);
      _startDate = startDate.setSeconds(1);
      _startDate = startDate.setMilliseconds(100);
      const newStartdate = new Date(_startDate);

      let _endDate = endDate.setHours(23);
      _endDate = endDate.setMinutes(59);
      _endDate = endDate.setSeconds(59);
      _endDate = endDate.setMilliseconds(100);
      const newEnddate = new Date(_endDate);


      // const result = await SpecialPoojaBooking.find({
      //   createdAt: {
      //     $gte: newStartdate,
      //     $lte: newEnddate
      //   }
      // })
      //   .select(
      //     `transactionId specialPoojaId devoteePhone specialPoojatype amountPaid bookingPersonName userId devoteeName devoteeAddress createdBy createdAt SpecialPoojaNumber`
      //   );

      // res.json({ status: true, data: result, message: "Success" });



      /////////////////////////////////////////////////////////////
      let _firstResult = [];
      const _Type = [KanikeBooking, KSA, KGO, KSI, KKP, KKE, KKT, KKK];
      const groupLength = _Type.length;
      let iteration = 0;

      _Type.forEach(async element => {

        const _secondResult = await element.find({
          createdAt: {
            $gte: newStartdate,
            $lte: newEnddate
          }
        })
          .select(
            `transactionId kanikeId kanikeNumber devoteePhone kanikeType bookingPersonName userId devoteeName devoteeAddress createdBy createdAt kanikePrice`
          );

        _secondResult.forEach(ex => {
          _firstResult.push(ex);
        });
        iteration++;
        if (iteration == groupLength) {
          res.json({ status: true, data: _firstResult, message: "Success" });
        }
      });

      ////////////////////////////////////////////

    } catch (error) {
      console.log(error);
      res.json({ status: false, error, message: "Error" });
    }
  }
}
