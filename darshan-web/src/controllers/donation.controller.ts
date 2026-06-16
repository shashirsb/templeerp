import { Request, Response } from "express";
import Donation from "../models/donation.model";
import DonationType from "../models/donationType.model";
import Nx from "../shared/nx-library/nx";

export default class DonationController {
  findAll(req: Request, res: Response): void {
    Donation.find()
      .populate('userId donationTypeId')
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        res.json({ status: false, err });
      });
  }

  // Get all darshan type
  getDonationType(req: Request, res: Response): void {
    DonationType.find()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  getDonation(req: Request, res: Response): void {
    Donation.find()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  getDonationById(req: Request, res: Response): void {
    const params = req.query;
    Donation.find({ userId: params.id })
      .populate("donationTypeId")
      .sort("-donationDate")
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        const status = res.statusCode;
        res.json({ status: false, err });
      });
  }

  // Add Donation
  create(req: Request, res: Response): void {
    const params = req.body;
    const transactionId = Nx.utils.getTransactionId('Donation');
    const donation = new Donation({
      transactionId,
      userId: params.userId,
      donationTypeId: params.donationTypeId,
      donationDate: params.donationDate,
      amount: params.amount,
      isCardDonation: params.isCardDonation,
      buildingName: params.buildingName,
      isSecretFunds : params.isSecretFunds
    });

    donation
      .save()
      .then((data: any) => {
        res.json({ status: true, data });
      })
      .catch((err: any) => {
        res.json({ status: true, err });
      });
  }
}
