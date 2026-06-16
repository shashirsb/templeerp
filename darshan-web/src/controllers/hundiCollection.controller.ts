import { Request, Response } from "express";
import Pilgrim from "../models/pilgrim.model";
import HundiCollection from "../models/hundiCollection.model";
import ConnectionCheck from "../models/connectionCheck";
import Nx from "../shared/nx-library/nx";
import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';



export default class HundiCollectionController {
    getAllHundiCollection(req: Request, res: Response): void {
        HundiCollection.find()
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

    getHundiCollectionById(req: Request, res: Response): void {
        const params = req.query;
        HundiCollection.find({ _id: params.id })
            .then((data: any) => {
                res.json({ status: true, data });
            })
            .catch((err: any) => {
                const status = res.statusCode;
                res.json({ status: false, err });
            });
    }

    // Create kanike 
    createHundiCollection = async (req: Request, res: Response) => {
        const conChecker = new ConnectionCheck();
        conChecker
            .save()
            .then((data: any) => {
                // After checking the connection we are inserting the data
                //
                const params = req.body;
                let uniqueHundiCollectionId: any;

                const transactionId = Nx.utils.getTransactionId("HundiCollection");

                uniqueHundiCollectionId = "KHC" + Nx.utils.getBookingId();// + ("00000000" + bookingNumber).slice(-9);;

                const endTime = +params.bookingStartTime;
                const hundiCollectionBooking = new HundiCollection({
                    transactionId: transactionId,
                    userId: params.userId,
                    hundiCollectionId: uniqueHundiCollectionId,
                    depositAmount: params.depositAmount,
                    totalAmount:  params.totalAmount,
                    notesTotalAmount:  params.notesTotalAmount,
                    coinTotalAmount:  params.coinTotalAmount,
                    hundiID:  params.hundiID,
                    hundiUnstagedPlace:  params.hundiUnstagedPlace,
                    hundiUnstagedDate:  params.hundiUnstagedDate,
                    hundiOpenedDate:  params.hundiOpenedDate,
                    description:  params.description,
                    note2000:  params.note2000,
                    note500:  params.note500,
                    note200:  params.note200,
                    note100:  params.note100,
                    note50:  params.note50,
                    note20:  params.note20,
                    note10:  params.note10,
                    note5:  params.note5,
                    note2:  params.note2,
                    note1:  params.note1,
                    coin10:  params.coin10,
                    coin5:  params.coin5,
                    coin2:  params.coin2,
                    coin1:  params.coin1,
                    bankName: params.bankName,
                    createdBy: params.userId,
                    bookingPersonName: params.bookingPersonName
                });

                hundiCollectionBooking
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
