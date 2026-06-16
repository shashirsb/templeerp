import { Request, Response } from "express";
import Pilgrim from "../models/pilgrim.model";
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
import TicketBooking from "../models/ticketBooking.model";
import SpecialPooja from "../models/specialPooja.model";
import TicketBookingDarshan from "../models/ticketBookingDarshan.model";
import KanikeBooking from "../models/kanike.model";
import UtsavaMurthyBooking from "../models/utsavaMurthy.model";
import SpecialPoojaBooking from "../models/specialPooja.model";
import MoneyOrderBooking from "../models/moneyOrder.model";
import CashKanikeBooking from "../models/cashkanike.model";

import HundiCollectionBooking from "../models/hundiCollection.model";

import ConnectionCheck from "../models/connectionCheck";
import Nx from "../shared/nx-library/nx";
import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';



export default class DisplayController {
    getAllDaysBooking(req: Request, res: Response): void {

        try {

            let STA_Count = 0;
            let STA_Amount = 0;

            let SMU_Count = 0;
            let SMU_Amount = 0;

            let SYA_Count = 0;
            let SYA_Amount = 0;

            let STH_Count = 0;
            let STH_Amount = 0;

            let STW_Count = 0;
            let STW_Amount = 0;

            let SFW_Count = 0;
            let SFW_Amount = 0;

            let SLB_Count = 0;
            let SLB_Amount = 0;

            let SKD_Count = 0;
            let SKD_Amount = 0;


            let SPB_Count = 0;
            let SPB_Amount = 0;

            let SPH_Count = 0;
            let SPH_Amount = 0;

            let SPA_Count = 0;
            let SPA_Amount = 0;

            let KCK_Count = 0;
            let KCK_Amount = 0;

            let KSA_Count = 0;
            let KSA_Amount = 0;

            let KGO_Count = 0;
            let KGO_Amount = 0;

            let KKP_Count = 0;
            let KKP_Amount = 0;

            let KKE_Count = 0;
            let KKE_Amount = 0;

            let KKT_Count = 0;
            let KKT_Amount = 0;

            let KKK_Count = 0;
            let KKK_Amount = 0;

            let KSI_Count = 0;
            let KSI_Amount = 0;


            let KMO_Count = 0;
            let KMO_Amount = 0;

            let KCH_Count = 0;
            let KCH_Amount = 0;

            let KDD_Count = 0;
            let KDD_Amount = 0;



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


            let _firstResult = [];
            const _Type = [STA, SMU, SYA, STH, STW, SFW, SLB, SPB, SPH, SPA, MUT, MKA, KSA, KGO, KKP, KKE, KKT, KKK, KSI, KMO, KCH, KDD, KPA, KCC, KDC, KUP, KGP, KNB, TicketBookingDarshan, CashKanikeBooking, UtsavaMurthyBooking, SpecialPoojaBooking, MoneyOrderBooking, HundiCollectionBooking];
            const groupLength = _Type.length;
            let iteration = 0;
            const totalItem = 100;

            _Type.forEach(async element => {

                let skIdType = element.modelName;

                const _secondResult = await element.find({
                    createdAt: {
                        $gte: newStartdate,
                        $lte: newEnddate
                    }
                })
                    .select("-bookingPersonName -bookingPersonMobile -devoteeName -devoteeAddress -sentDate -receivedDate -imageUrl -_id -devoteePhone -transactionId -kanikeQuality -bookingFor -bookingStartTime -bookingEndTime -updatedAt -paymentType -darshanType -sevaType -userId -createdBy -updatedBy -entryDate -specialPoojatype -moneyOrderType")
                    .sort("-createdAt")




                _secondResult.forEach(ex => {
                    _firstResult.push(ex);
                    switch (skIdType) {
                        case "TicketBookingDarshan":
                            SKD_Count += ex['numberOfDevotees'];
                            SKD_Amount += ex['bookingAmount'];
                            break;
                        case "STA":
                            STA_Count++;
                            STA_Amount += ex['bookingAmount'];
                            break;
                        case "SMU":
                            SMU_Count++;
                            SMU_Amount += ex['bookingAmount'];
                            break;
                        case "SYA":
                            SYA_Count++;
                            SYA_Amount += ex['bookingAmount'];
                            break;
                        case "STH":
                            STH_Count++;
                            STH_Amount += ex['bookingAmount'];
                            break;
                        case "STW":
                            STW_Count++;
                            STW_Amount += ex['bookingAmount'];
                            break;
                        case "SFW":
                            SFW_Count++;
                            SFW_Amount += ex['bookingAmount'];
                            break;
                        case "SLB":
                            SLB_Count++;
                            SLB_Amount += ex['bookingAmount'];
                            break;
                        case "SPB":
                            SPB_Count++;
                            SPB_Amount += ex['amountPaid'];
                            break;
                        case "SPH":
                            SPH_Count++;
                            SPH_Amount += ex['amountPaid'];
                            break;
                        case "SPA":
                            SPA_Count++;
                            SPA_Amount += ex['amountPaid'];
                            break;
                        case "CashKanike":
                            KCK_Count++;
                            KCK_Amount += ex['cashKanikePrice'];
                            break;
                        case "KSA":
                            KSA_Count++;
                            KSA_Amount += ex['kanikePrice'];
                            break;
                        case "KGO":
                            KGO_Count++;
                            KGO_Amount += ex['kanikePrice'];
                            break;
                        case "KKP":
                            KKP_Count++;
                            KKP_Amount += ex['kanikePrice'];
                            break;
                        case "KKE":
                            KKE_Count++;
                            KKE_Amount += ex['kanikePrice'];
                            break;
                        case "KKT":
                            KKT_Count++;
                            KKT_Amount += ex['kanikePrice'];
                            break;
                        case "KKK":
                            KKK_Count++;
                            KKK_Amount += ex['kanikePrice'];
                            break;
                        case "KSI":
                            KSI_Count++;
                            KSI_Amount += ex['kanikePrice'];
                            break;
                        case "KMO":
                            KMO_Count++;
                            KMO_Amount += ex['moneyOrderAmount'];
                            break;
                        case "KCH":
                            KCH_Count++;
                            KCH_Amount += ex['moneyOrderAmount'];
                            break;
                        case "KDD":
                            KDD_Count++;
                            KDD_Amount += ex['moneyOrderAmount'];
                            break;

                        default:
                            break;
                    }

                });
                iteration++;
                if (iteration == groupLength) {
                    const payload = {
                        "SKD_Count": SKD_Count,
                        "SKD_Amount": SKD_Amount,
                        "STA_Count": STA_Count,
                        "STA_Amount": STA_Amount,
                        "SMU_Count": SMU_Count,
                        "SMU_Amount": SMU_Amount,
                        "SYA_Count": SYA_Count,
                        "SYA_Amount": SYA_Amount,
                        "STH_Count": STH_Count,
                        "STH_Amount": STH_Amount,
                        "STW_Count": STW_Count,
                        "STW_Amount": STW_Amount,
                        "SFW_Count": SFW_Count,
                        "SFW_Amount": SFW_Amount,
                        "SLB_Count": SLB_Count,
                        "SLB_Amount": SLB_Amount,
                        "SPB_Count": SPB_Count,
                        "SPB_Amount": SPB_Amount,
                        "SPH_Count": SPH_Count,
                        "SPH_Amount": SPH_Amount,
                        "SPA_Count": SPA_Count,
                        "SPA_Amount": SPA_Amount,
                        "KCK_Count": KCK_Count,
                        "KCK_Amount": KCK_Amount,
                        "KSA_Count": KSA_Count,
                        "KSA_Amount": KSA_Amount,
                        "KGO_Count": KGO_Count,
                        "KGO_Amount": KGO_Amount,
                        "KKP_Count": KKP_Count,
                        "KKP_Amount": KKP_Amount,
                        "KKE_Count": KKE_Count,
                        "KKE_Amount": KKE_Amount,
                        "KKT_Count": KKT_Count,
                        "KKT_Amount": KKT_Amount,
                        "KKK_Count": KKK_Count,
                        "KKK_Amount": KKK_Amount,
                        "KSI_Count": KSI_Count,
                        "KSI_Amount": KSI_Amount,
                        "KMO_Count": KMO_Count,
                        "KMO_Amount": KMO_Amount,
                        "KCH_Count": KCH_Count,
                        "KCH_Amount": KCH_Amount,
                        "KDD_Count": KDD_Count,
                        "KDD_Amount": KDD_Amount
                    };
                    const response = {
                        status: true,
                        message: "Get collection successfully.",
                        data: {
                            totalItem,
                            collection: payload
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



}
