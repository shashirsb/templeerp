import { Request, Response } from "express";
import DonationType from "../models/donationType.model";

export default class DonationTypeController {
  // Find All
  findAll(req: Request, res: Response): void {
    DonationType.find()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // Find by Id
  findById(req: Request, res: Response): void {
    const params = req.query;
    DonationType.findById(params.id)
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // create new
  create(req: Request, res: Response): void {
    const params = req.body;

    // const donationType = new DonationType({
    //   title: params.title,
    //   description: params.description,
    //   hasCardDonation: params.hasCardDonation,
    //   cardTitle: params.hasCardDonation ? params.cardTitle : "",
    //   cardAmount: params.hasCardDonation ? params.cardAmount : 0,
    //   cardCause: params.hasCardDonation ? params.cardCause : "",
    //   cardBenifits: params.hasCardDonation ? params.cardBenifits : ""
    // });

    const donationType = new DonationType({
      title_en: params.title_en,
      title_kan: params.title_kan,
      description_en: params.description_en,
      description_kan: params.description_kan,
      hasCardDonation: params.hasCardDonation,
      cardTitle_en: params.hasCardDonation ? params.cardTitle_en : "",
      cardTitle_kan: params.hasCardDonation ? params.cardTitle_kan : "",
      cardAmount: params.hasCardDonation ? params.cardAmount : 0,
      cardCause_en: params.hasCardDonation ? params.cardCause_en : "",
      cardCause_kan: params.hasCardDonation ? params.cardCause_kan : "",
      cardBenifits_en: params.hasCardDonation ? params.cardBenifits_en : "",
      cardBenifits_kan: params.hasCardDonation ? params.cardBenifits_kan : ""
    });

    console.log(params);

    donationType
      .save()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        res.json({ status: false, err });
      });
  }

  // update
  update(req: Request, res: Response): void {
    const params = req.body;
    // const donationType = {
    //   title: params.title,
    //   description: params.description,
    //   hasCardDonation: params.hasCardDonation,
    //   cardTitle: params.hasCardDonation ? params.cardTitle : "",
    //   cardAmount: params.hasCardDonation ? params.cardAmount : 0,
    //   cardCause: params.hasCardDonation ? params.cardCause : "",
    //   cardBenifits: params.hasCardDonation ? params.cardBenifits : ""
    // };

    const donationType = {
      title_en: params.title_en,
      title_kan: params.title_kan,
      description_en: params.description_en,
      description_kan: params.description_kan,
      hasCardDonation: params.hasCardDonation,
      cardTitle_en: params.hasCardDonation ? params.cardTitle_en : "",
      cardTitle_kan: params.hasCardDonation ? params.cardTitle_kan : "",
      cardAmount: params.hasCardDonation ? params.cardAmount : 0,
      cardCause_en: params.hasCardDonation ? params.cardCause_en : "",
      cardCause_kan: params.hasCardDonation ? params.cardCause_kan : "",
      cardBenifits_en: params.hasCardDonation ? params.cardBenifits_en : "",
      cardBenifits_kan: params.hasCardDonation ? params.cardBenifits_kan : ""
    };

    DonationType.findByIdAndUpdate(params._id, donationType)
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }

  // Remove
  remove(req: Request, res: Response): void {
    DonationType.findByIdAndRemove(req.body.id)
      .then((data: any) => {
        res.json({ status: true, data: null });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }
}
