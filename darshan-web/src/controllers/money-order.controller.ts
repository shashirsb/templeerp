import { Request, Response } from "express";
import Pilgrim from "../models/pilgrim.model";
import KMO from "../models/KMO.model";
import KCH from "../models/KCH.model";
import KDD from "../models/KDD.model";
import KPA from "../models/KPA.model";
import KCC from "../models/KCC.model";
import KDC from "../models/KDC.model";
import KUP from "../models/KUP.model";
import KGP from "../models/KGP.model";
import KNB from "../models/KNB.model";
import MoneyOrder from "../models/moneyOrder.model";
import ConnectionCheck from "../models/connectionCheck";
import Nx from "../shared/nx-library/nx";
import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';



export default class MoneyOrderController {
    getAllMoneyOrder(req: Request, res: Response): void {
        // MoneyOrder.find()
        //     .populate("userId")
        //     .sort("-createdAt")
        //     .then((data: any) => {
        //         res.json({ status: true, data });
        //     })
        //     .catch((err: any) => {
        //         const status = res.statusCode;
        //         res.json({ status: false, err });
        //     });

        //////////////////////////////////////////////////////////////////
        try {
            let _firstResult = [];
            const _Type = [MoneyOrder, KMO, KCH, KDD, KPA, KCC, KDC, KUP, KGP, KNB];
            const groupLength = _Type.length;
            let iteration = 0;
            const totalItem = 100;

            _Type.forEach(async element => {

                const _secondResult = await element.find({})
                    .populate("userId")
                    .sort("-createdAt")
                    .limit(10);

                _secondResult.forEach(ex => {
                    _firstResult.push(ex);
                });
                iteration++;
                if (iteration == groupLength) {

                    const data = _firstResult.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );

                    res.json({ status: true, data });
                }
            });

        } catch (error) {
            console.log(error);
            res.json({ status: false, error });
        }

        ///////////////////////////////////////////////////////////////////////////

    }

    getMoneyOrderById(req: Request, res: Response): void {
        const params = req.query;
        MoneyOrder.find({ _id: params.id })
            .then((data: any) => {
                res.json({ status: true, data });
            })
            .catch((err: any) => {
                const status = res.statusCode;
                res.json({ status: false, err });
            });
    }

    // Create MoneyOrder 
    createMoneyOrder = async (req: Request, res: Response) => {
        const conChecker = new ConnectionCheck();
        conChecker
            .save()
            .then((data: any) => {
                // After checking the connection we are inserting the data
                //
                const params = req.body;
                let uniqueKanikeId: any;
                let sevaModel: any;

                const transactionId = Nx.utils.getTransactionId("MoneyOrder");

                //uniqueKanikeId = "SKMO" + Nx.utils.getBookingId();// + ("00000000" + bookingNumber).slice(-9);;

                if (params.moneyOrderType == "Money Order") {
                    uniqueKanikeId = "KMO" + Nx.utils.getBookingId();
                    sevaModel = KMO;
                }

                if (params.moneyOrderType == "Cheque") {
                    uniqueKanikeId = "KCH" + Nx.utils.getBookingId();
                    sevaModel = KCH;
                }

                if (params.moneyOrderType == "Demand Draft") {
                    uniqueKanikeId = "KDD" + Nx.utils.getBookingId();
                    sevaModel = KDD;
                }

                if (params.moneyOrderType == "Paytm") {
                    uniqueKanikeId = "KPA" + Nx.utils.getBookingId();
                    sevaModel = KPA;
                }

                if (params.moneyOrderType == "Credit Card") {
                    uniqueKanikeId = "KCC" + Nx.utils.getBookingId();
                    sevaModel = KCC;
                }

                if (params.moneyOrderType == "Debit Card") {
                    uniqueKanikeId = "KDC" + Nx.utils.getBookingId();
                    sevaModel = KDC;
                }

                if (params.moneyOrderType == "UPI") {
                    uniqueKanikeId = "KUP" + Nx.utils.getBookingId();
                    sevaModel = KUP;
                }

                if (params.moneyOrderType == "Google Pay") {
                    uniqueKanikeId = "KGP" + Nx.utils.getBookingId();
                    sevaModel = KGP;
                }

                if (params.moneyOrderType == "Net Banking") {
                    uniqueKanikeId = "KNB" + Nx.utils.getBookingId();
                    sevaModel = KNB;
                }

                const endTime = +params.bookingStartTime;
                const moneyOrderBooking = new sevaModel({
                    transactionId: transactionId,
                    userId: params.userId,
                    moneyOrderId: uniqueKanikeId,
                    devoteeName: params.devoteeName,
                    devoteePhone: params.devoteePhone,
                    devoteeAddress: params.devoteeAddress,
                    imageUrl: params.imageUrl,
                    moneyOrderNo: params.moneyOrderNo,
                    moneyOrderType: params.moneyOrderType,
                    moneyOrderAmount: params.moneyOrderAmount,
                    moneyOrderDescription: params.moneyOrderDescription,
                    sentDate: params.sentDate,
                    receivedDate: params.receivedDate,
                    createdBy: params.userId,
                    bookingPersonName: params.bookingPersonName
                });

                moneyOrderBooking
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

}
