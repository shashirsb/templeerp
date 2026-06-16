import { Request, Response } from "express";
import Pilgrim from "../models/pilgrim.model";
import KSA from "../models/KSA.model";
import KGO from "../models/KGO.model";
import KSI from "../models/KSI.model";
import KKP from "../models/KKP.model";
import KKE from "../models/KKE.model";
import KKT from "../models/KKT.model";
import KKK from "../models/KKK.model";   
import Kanike from "../models/kanike.model";
import ConnectionCheck from "../models/connectionCheck";
import Nx from "../shared/nx-library/nx";
import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';



export default class KanikeController {
    getAllKanike(req: Request, res: Response): void {
        // Kanike.find()
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
            const _Type = [Kanike, KSA, KGO, KSI, KKP, KKE, KKT, KKK];
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

                    const response = {
                        status: true,
                        message: "Get collection successfully.",
                        data: {
                            totalItem,
                            collection: data
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

    getKanikeById(req: Request, res: Response): void {
        const params = req.query;
        Kanike.find({ _id: params.id })
            .then((data: any) => {
                res.json({ status: true, data });
            })
            .catch((err: any) => {
                const status = res.statusCode;
                res.json({ status: false, err });
            });
    }

    // Create kanike 
    createKanike = async (req: Request, res: Response) => {
        const conChecker = new ConnectionCheck();
        conChecker
            .save()
            .then((data: any) => {
                // After checking the connection we are inserting the data
                //
                const params = req.body;
                let uniqueKanikeId: any;
                let sevaModel: any;

                   


                const transactionId = Nx.utils.getTransactionId("Kanike");

                // uniqueKanikeId = "SKK" + Nx.utils.getBookingId();// + ("00000000" + bookingNumber).slice(-9);;

                if (params.kanikeType == "Saree") {

                    uniqueKanikeId = "KSA" + Nx.utils.getBookingId();
                    sevaModel = KSA;
                }

                if (params.kanikeType == "Silver") {

                    uniqueKanikeId = "KSI" + Nx.utils.getBookingId();
                    sevaModel = KSI;
                }

                if (params.kanikeType == "Gold") {

                    uniqueKanikeId = "KGO" + Nx.utils.getBookingId();
                    sevaModel = KGO;
                }
              
                if (params.kanikeType == "Panchaloha") {

                    uniqueKanikeId = "KKP" + Nx.utils.getBookingId();
                    sevaModel = KKP;
                }

                if (params.kanikeType == "Etthale") {

                    uniqueKanikeId = "KKE" + Nx.utils.getBookingId();
                    sevaModel = KKE;
                }

                if (params.kanikeType == "Thambra") {

                    uniqueKanikeId = "KKT" + Nx.utils.getBookingId();
                    sevaModel = KKT;
                }
                if (params.kanikeType == "Kanchu") {

                    uniqueKanikeId = "KKK" + Nx.utils.getBookingId();
                    sevaModel = KKK;
                }

                const endTime = +params.bookingStartTime;
                const kanikeBooking = new sevaModel({
                    transactionId: transactionId,
                    userId: params.userId,
                    kanikeId: uniqueKanikeId,
                    devoteeName: params.devoteeName,
                    devoteePhone: params.devoteePhone,
                    devoteeAddress: params.devoteeAddress,
                    imageUrl: params.imageUrl,
                    kanikeType: params.kanikeType,
                    kanikeQuality: params.kanikeQuality,
                    kanikeWeight: params.kanikeWeight,
                    kanikePrice: params.kanikePrice,
                    kanikeDescription: params.kanikeDescription,
                    createdBy: params.userId,
                    bookingPersonName: params.bookingPersonName
                });
                kanikeBooking
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
