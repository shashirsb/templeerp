import { Request, Response } from "express";
import Pilgrim from "../models/pilgrim.model";
import MUT from "../models/MUT.model";
import MKA from "../models/MKA.model";
import UtsavaMurthy from "../models/utsavaMurthy.model";
import ConnectionCheck from "../models/connectionCheck";
import Nx from "../shared/nx-library/nx";
import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';



export default class UtsavaMurthyController {
    getAllUtsavaMurthy(req: Request, res: Response): void {
        // UtsavaMurthy.find()
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
            const _Type = [UtsavaMurthy, MUT, MKA];
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

                    const _finalfirstResult = _firstResult.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );

                    res.json({ status: true, _finalfirstResult });
                }
            });

        } catch (error) {
            console.log(error);
            res.json({ status: false, error });
        }

        ///////////////////////////////////////////////////////////////////////////
    }

    getUtsavaMurthyById(req: Request, res: Response): void {
        const params = req.query;
        UtsavaMurthy.find({ _id: params.id })
            .then((data: any) => {
                res.json({ status: true, data });
            })
            .catch((err: any) => {
                const status = res.statusCode;
                res.json({ status: false, err });
            });
    }

    // Create kanike 
    createUtsavaMurthy = async (req: Request, res: Response) => {
        const conChecker = new ConnectionCheck();
        conChecker
            .save()
            .then((data: any) => {
                // After checking the connection we are inserting the data
                //

                const params = req.body;
                let uniqueUtsavaMurthyId: any;
                let _amountPaid: any;
                let sevaModel: any;

                const transactionId = Nx.utils.getTransactionId("UtsavaMurthy");
                //uniqueUtsavaMurthyId = "SKU" + Nx.utils.getBookingId();// + ("00000000" + bookingNumber).slice(-9);;

                const fromDate = new Date(params.startDate);
                const toDate = new Date(params.endDate);
                const noOfDays = Nx.date.dateDaysBetween(fromDate, toDate) + 1;

                if (params.utsavatype == "ಉತ್ಸವ ಮೂರ್ತಿ") {
                    _amountPaid = 500 * noOfDays;
                    uniqueUtsavaMurthyId = "MUT" + Nx.utils.getBookingId();
                    sevaModel = MUT;
                }

                else if (params.utsavatype == "ಕೈ ಮೂರ್ತಿ") {
                    _amountPaid = 250 * noOfDays;
                    uniqueUtsavaMurthyId = "MKA" + Nx.utils.getBookingId();
                    sevaModel = MKA;
                }



                const utsavaMurthyBooking = new sevaModel({
                    transactionId: transactionId,
                    userId: params.userId,
                    utsavaMurthyId: uniqueUtsavaMurthyId,
                    devoteeName: params.devoteeName,
                    devoteePhone: params.devoteePhone,
                    devoteeAddress: params.devoteeAddress,
                    idProofType: params.idProofType,
                    idProofNo: params.idProofNo,
                    utsavatype: params.utsavatype,
                    startDate: fromDate,
                    endDate: toDate,
                    noOfDays: noOfDays,
                    amountPaid: _amountPaid,
                    createdBy: params.userId,
                    bookingPersonName: params.bookingPersonName
                });

                utsavaMurthyBooking
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
