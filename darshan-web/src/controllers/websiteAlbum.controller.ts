import { Request, Response } from "express";

import WebsiteAlbum from "../models/websiteAlbum.model";
import ConnectionCheck from "../models/connectionCheck";
import Nx from "../shared/nx-library/nx";
import { model, Schema } from "mongoose";



export default class WebsiteAlbumController {
    getAllWebsiteAlbum(req: Request, res: Response): void {

        try {
            let _firstResult = [];
            const _Type = [WebsiteAlbum];
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

    getWebsiteAlbumById(req: Request, res: Response): void {
        const params = req.query;
        WebsiteAlbum.find({ _id: params.id })
            .then((data: any) => {
                res.json({ status: true, data });
            })
            .catch((err: any) => {
                const status = res.statusCode;
                res.json({ status: false, err });
            });
    }

    // Create kanike 
    createWebsiteAlbum = async (req: Request, res: Response) => {
        const conChecker = new ConnectionCheck();
        conChecker
            .save()
            .then((data: any) => {
                // After checking the connection we are inserting the data
                //
                const params = req.body;
                let sevaModel: any;
                let uniqueWebsiteAlbumId: any;

                sevaModel = WebsiteAlbum;

                uniqueWebsiteAlbumId = "WebAlbum" + Nx.utils.getUniqueDateString();

                const kanikeBooking = new sevaModel({
                    userId: params.userId,
                    imageUrl: params.imageUrl,
                    websiteAlbumId: uniqueWebsiteAlbumId,
                    createdBy: params.userId,
                    albumName: params.albumName,
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
