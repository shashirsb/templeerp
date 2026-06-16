import { Request, Response } from "express";
import Pilgrim from "../models/pilgrim.model";
import CashKanike from "../models/cashkanike.model";
import ConnectionCheck from "../models/connectionCheck";
import Nx from "../shared/nx-library/nx";
import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';



export default class CashKanikeController {
    getAllCashKanike(req: Request, res: Response): void {
        CashKanike.find()
            .populate("userId")
            .sort("-createdAt")
            .then((data: any) => {
                res.json({ status: true, data });
            })
            .catch((err: any) => {
                const status = res.statusCode;
                res.json({ status: false, err });
            });
    }

    getCashKanikeById(req: Request, res: Response): void {
        const params = req.query;
        CashKanike.find({ _id: params.id })
            .then((data: any) => {
                res.json({ status: true, data });
            })
            .catch((err: any) => {
                const status = res.statusCode;
                res.json({ status: false, err });
            });
    }

    // Create kanike 
    createCashKanike = async (req: Request, res: Response) => {
        const conChecker = new ConnectionCheck();
        conChecker
            .save()
            .then((data: any) => {
                // After checking the connection we are inserting the data
                //
                const params = req.body;
                let uniqueCashKanikeId: any;

                const transactionId = Nx.utils.getTransactionId("CashKanike");

                uniqueCashKanikeId = "KCK" + Nx.utils.getBookingId();// + ("00000000" + bookingNumber).slice(-9);;

                const endTime = +params.bookingStartTime;
                const cashKanikeBooking = new CashKanike({
                    transactionId: transactionId,
                    userId: params.userId,
                    cashKanikeId: uniqueCashKanikeId,
                    devoteeName: params.devoteeName,
                    devoteePhone: params.devoteePhone,
                    devoteeAddress: params.devoteeAddress,
                    imageUrl: params.imageUrl,                    
                    cashKanikePrice: params.cashKanikePrice,
                    cashKanikeDescription: params.cashKanikeDescription,
                    createdBy: params.userId,
                    bookingPersonName: params.bookingPersonName
                });

                cashKanikeBooking
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
