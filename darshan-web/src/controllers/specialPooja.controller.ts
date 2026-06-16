import { Request, Response } from "express";
import Pilgrim from "../models/pilgrim.model";
import SPB from "../models/SPB.model";
import SPH from "../models/SPH.model";
import SPA from "../models/SPA.model";
import SpecialPooja from "../models/specialPooja.model";
import ConnectionCheck from "../models/connectionCheck";
import Nx from "../shared/nx-library/nx";
import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';



export default class SpecialPoojaController {
    getAllSpecialPooja(req: Request, res: Response): void {

        // SpecialPooja.find()
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
            const _Type = [SpecialPooja, SPB, SPH, SPA];
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

    getSpecialPoojaById(req: Request, res: Response): void {
        const params = req.query;
        SpecialPooja.find({ _id: params.id })
            .then((data: any) => {
                res.json({ status: true, data });
            })
            .catch((err: any) => {
                const status = res.statusCode;
                res.json({ status: false, err });
            });
    }

    // Create kanike 
    createSpecialPooja = async (req: Request, res: Response) => {
        const conChecker = new ConnectionCheck();
        conChecker
            .save()
            .then((data: any) => {
                // After checking the connection we are inserting the data
                //

                const params = req.body;
                let uniqueSpecialPoojaId: any;
                let _amountPaid: any;
                let sevaModel: any;

                const transactionId = Nx.utils.getTransactionId("SpecialPooja");
                //uniqueSpecialPoojaId = "KSP" + Nx.utils.getBookingId();// + ("00000000" + bookingNumber).slice(-9);;

                if (params.specialPoojatype == "ಬೆಣ್ಣೆಯ ಅಲಂಕಾರ") {
                    _amountPaid = 500;
                    uniqueSpecialPoojaId = "SPB" + Nx.utils.getBookingId();
                    sevaModel = SPB;
                }

                if (params.specialPoojatype == "ಹೂವಿನ ಅಲಂಕಾರ") {
                    _amountPaid = 1000;
                    uniqueSpecialPoojaId = "SPH" + Nx.utils.getBookingId();
                    sevaModel = SPH;
                }

                if (params.specialPoojatype == "ಅಭಿಷೇಕ") {
                    _amountPaid = 500;
                    uniqueSpecialPoojaId = "SPA" + Nx.utils.getBookingId();
                    sevaModel = SPA;
                }


                const specialPoojaBooking = new sevaModel({
                    transactionId: transactionId,
                    userId: params.userId,
                    specialPoojaId: uniqueSpecialPoojaId,
                    devoteeName: params.devoteeName,
                    devoteePhone: params.devoteePhone,
                    devoteeAddress: params.devoteeAddress,
                    specialPoojatype: params.specialPoojatype,
                    specialPoojaDate: params.specialPoojaDate,
                    amountPaid: _amountPaid,
                    createdBy: params.userId,
                    bookingPersonName: params.bookingPersonName
                });

                specialPoojaBooking
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
