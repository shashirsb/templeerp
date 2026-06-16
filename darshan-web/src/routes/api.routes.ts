import * as express from "express";
import AuthController from "../controllers/auth.controller";
import BlockBookingController from "../controllers/block-booking.controller";
import BookingController from "../controllers/booking.controller";
import KanikeController from "../controllers/kanike.controller";

import CashKanikeController from "../controllers/cash-kanike.controller";
import MoneyOrderController from "../controllers/money-order.controller";
import UtsavaMurthyController from "../controllers/utsavaMurthy.controller";
import SpecialPoojaController from "../controllers/specialPooja.controller";
import DarshanController from "../controllers/darshan.controller";
import DarshanTypeController from "../controllers/darshanType.controller";
import DonationController from "../controllers/donation.controller";
import DonationTypeController from "../controllers/donationType.controller";
import HundiController from "../controllers/hundi.controller";
import LookupController from "../controllers/lookup.controller";
import QrscannerController from "../controllers/qrscanner.controller";
import ReportController from "../controllers/report.controller";
import SevaController from "../controllers/seva.controller";
import SevaTypeController from "../controllers/sevaType.controller";
import UserController from "../controllers/user.controller";
import HundiCollectionController from "../controllers/hundiCollection.controller";
import DisplayController  from "../controllers/display.controller";
import * as verifyToken from "./../middleware/verifyToken";
import WebsiteAlbumController from "../controllers/websiteAlbum.controller";

class ApiRoutes {
  public router: express.Router;
  public authCtrl: AuthController;
  public bookingCtrl: BookingController;
  public kanikeCtrl: KanikeController;
  public websiteAlbumCtrl: WebsiteAlbumController;
  public cashKanikeCtrl: CashKanikeController;
  public moneyOrderCtrl: MoneyOrderController;
  public utsavaMurthyCtrl: UtsavaMurthyController;
  public specialPoojaCtrl: SpecialPoojaController;
  public blockBookingCtrl: BlockBookingController;
  public darshanCtrl: DarshanController;
  public darshanTypeCtrl: DarshanTypeController;
  public donationCtrl: DonationController;
  public donationTypeCtrl: DonationTypeController;
  public hundiCtrl: HundiController;
  public lookupCtrl: LookupController;
  public reportCtrl: ReportController;
  public sevaCtrl: SevaController;
  public sevaTypeCtrl: SevaTypeController;
  public userCtrl: UserController;
  public qrscanner: QrscannerController;
  public hundiCollectionCtrl: HundiCollectionController;
  public displayCtrl: DisplayController;
  constructor() {
    this.authCtrl = new AuthController();
    this.bookingCtrl = new BookingController();
    this.blockBookingCtrl = new BlockBookingController();
    this.darshanCtrl = new DarshanController();
    this.darshanTypeCtrl = new DarshanTypeController();
    this.donationCtrl = new DonationController();
    this.donationTypeCtrl = new DonationTypeController();
    this.hundiCtrl = new HundiController();
    this.lookupCtrl = new LookupController();
    this.reportCtrl = new ReportController();
    this.sevaCtrl = new SevaController();
    this.sevaTypeCtrl = new SevaTypeController();
    this.userCtrl = new UserController();
    this.qrscanner = new QrscannerController();
    this.kanikeCtrl = new KanikeController();
    this.websiteAlbumCtrl = new  WebsiteAlbumController();
    this.cashKanikeCtrl = new CashKanikeController();
    this.moneyOrderCtrl = new MoneyOrderController();
    this.utsavaMurthyCtrl = new UtsavaMurthyController();
    this.specialPoojaCtrl = new SpecialPoojaController();
    this.hundiCollectionCtrl = new HundiCollectionController();
    this.displayCtrl = new DisplayController();
    this.router = express.Router();
    this.init();
  }

  init() {
    const prefix = "/api/";

    // Auth Controller Api's
    this.router.post(prefix + "auth/signin", this.authCtrl.signin);
    this.router.post(prefix + "auth/signup", this.authCtrl.signup);
    this.router.post(
      prefix + "auth/forgotPassword",
      this.authCtrl.forgotPassword
    );
    this.router.post(
      prefix + "auth/resetPassword",
      this.authCtrl.resetPassword
    );
    this.router.post(prefix + "auth/verifyEmail", this.authCtrl.verifyEmail);

    // Test Api's
    this.router.get(
      prefix + "test/findAll",
      verifyToken,
      this.darshanTypeCtrl.findAll
    );

    // Darshan Type : Api's
    this.router.get(
      prefix + "darshanType/findById",
      this.darshanTypeCtrl.findById
    );
    this.router.post(
      prefix + "darshanType/findAll",
      this.darshanTypeCtrl.findAll
    );
    this.router.post(
      prefix + "darshanType/create",
      this.darshanTypeCtrl.create
    );
    this.router.post(
      prefix + "darshanType/update",
      this.darshanTypeCtrl.update
    );
    this.router.post(
      prefix + "darshanType/delete",
      this.darshanTypeCtrl.remove
    );

    // Donation Type : Api's
    this.router.get(
      prefix + "donationType/findById",
      this.donationTypeCtrl.findById
    );
    this.router.post(
      prefix + "donationType/findAll",
      this.donationTypeCtrl.findAll
    );
    this.router.post(
      prefix + "donationType/create",
      this.donationTypeCtrl.create
    );
    this.router.post(
      prefix + "donationType/update",
      this.donationTypeCtrl.update
    );
    this.router.post(
      prefix + "donationType/delete",
      this.donationTypeCtrl.remove
    );

    // Donation Type : Api's
    this.router.post(prefix + "donation/findAll", this.donationCtrl.findAll);
    this.router.post(prefix + "donation/create", this.donationCtrl.create);

    // Seva Type : Api's
    this.router.get(prefix + "sevaType/findById", this.sevaTypeCtrl.findById);
    this.router.post(prefix + "sevaType/findAll", this.sevaTypeCtrl.findAll);
    this.router.post(prefix + "sevaType/create", this.sevaTypeCtrl.create);
    this.router.post(prefix + "sevaType/update", this.sevaTypeCtrl.update);
    this.router.post(prefix + "sevaType/delete", this.sevaTypeCtrl.remove);

    // Block booking ticket
    this.router.get(
      prefix + "blockBooking/findById",
      this.blockBookingCtrl.findById
    );
    this.router.get(
      prefix + "blockBooking/findByUserId",
      this.blockBookingCtrl.findByUserId
    );
    this.router.post(
      prefix + "blockBooking/findAll",
      this.blockBookingCtrl.findAll
    );
    this.router.post(
      prefix + "blockBooking/create",
      this.blockBookingCtrl.create
    );
    this.router.post(
      prefix + "blockBooking/update",
      this.blockBookingCtrl.update
    );
    this.router.post(
      prefix + "blockBooking/delete",
      this.blockBookingCtrl.remove
    );

    // User Controller
    this.router.get(prefix + "user/findById", this.userCtrl.findById);
    this.router.post(prefix + "user/findAll", this.userCtrl.findAll);
    this.router.post(prefix + "user/update", this.userCtrl.update);
    this.router.post(prefix + "user/sendOtp", this.userCtrl.sendOtp);
    this.router.post(prefix + "user/verifyMobile", this.userCtrl.verifyMobile);

    // QR Scanner Controller
    this.router.get(prefix + "qrscanner/booking", this.qrscanner.get);

    // Lookup Controller Api's
    this.router.get("/api/lookup/darshanType", this.lookupCtrl.getDarshanType);
    this.router.get("/api/lookup/sevaType", this.lookupCtrl.getSevaType);

    // Donation Controller Api's
    this.router.get(
      "/api/donation/getDonationType",
      this.donationCtrl.getDonationType
    );
    this.router.get("/api/donation/getDonation", this.donationCtrl.getDonation);
    this.router.get(
      "/api/donation/getDonationById",
      this.donationCtrl.getDonationById
    );

    // Darshan Controller Api's
    this.router.get(
      "/api/darshan/getDarshanType",
      this.darshanCtrl.getDarshanType
    );
    this.router.post(
      "/api/darshan/createDarshanType",
      this.darshanCtrl.createDarshanType
    );

    // Seva Controller Api's
    this.router.get("/api/seva/getSevaType", this.sevaCtrl.getSevaType);
    this.router.post("/api/seva/createSevaType", this.sevaCtrl.createSevaType);

    // Hundi Controller Api's
    this.router.get(
      "/api/hundi/getHundiByUserId",
      this.hundiCtrl.getHundiByUserId
    );
    this.router.post("/api/hundi/getHundi", this.hundiCtrl.getHundi);
    this.router.post("/api/hundi/createHundi", this.hundiCtrl.createHundi);

    // Booking Controller Api's
    this.router.post(
      "/api/booking/findBookingSlot",
      this.bookingCtrl.findBookingSlot
    );
    this.router.post(
      "/api/booking/createTicket",
      this.bookingCtrl.createTicket
    );
    this.router.post(
      "/api/booking/getAllBooking",
      this.bookingCtrl.getAllBooking
    );
    this.router.post(
      "/api/booking/getAllDarshanBooking",
      this.bookingCtrl.getAllDarshanBooking
    );
    this.router.get(
      "/api/booking/getDarshanBookingById",
      this.bookingCtrl.getDarshanBookingById
    );
    this.router.get(
      "/api/booking/getSevaBookingById",
      this.bookingCtrl.getSevaBookingById
    );
    this.router.post(
      "/api/booking/getDarshanByBookingId",
      this.bookingCtrl.getDarshanByBookingId
    );
    this.router.post(
      "/api/booking/getSevaByBookingId",
      this.bookingCtrl.getSevaByBookingId
    );
    this.router.post(
      "/api/booking/createTicketFromCounter",
      this.bookingCtrl.createTicketFromCounter
    );
    this.router.get(prefix + "booking/print", this.bookingCtrl.print);

    // Kanike Controller Api's
    this.router.post(
      "/api/kanike/createKanike",
      this.kanikeCtrl.createKanike
    );

    this.router.post(
      "/api/kanike/getKanikeById",
      this.kanikeCtrl.getKanikeById
    );

    this.router.post(
      "/api/kanike/getAllKanike",
      this.kanikeCtrl.getAllKanike
    );

    // Cash Kanike Controller Api's
    this.router.post(
      "/api/cashKanike/createCashKanike",
      this.cashKanikeCtrl.createCashKanike
    );

    this.router.post(
      "/api/cashKanike/getCashKanikeById",
      this.cashKanikeCtrl.getCashKanikeById
    );

    this.router.post(
      "/api/cashKanike/getAllCashKanike",
      this.cashKanikeCtrl.getAllCashKanike
    );

    // Utsava Murthy Controller Api's
    this.router.post(
      "/api/utsavaMurthy/createUtsavaMurthy",
      this.utsavaMurthyCtrl.createUtsavaMurthy
    );

    this.router.post(
      "/api/utsavaMurthy/getUtsavaMurthyById",
      this.utsavaMurthyCtrl.getUtsavaMurthyById
    );

    this.router.post(
      "/api/utsavaMurthy/getAllUtsavaMurthy",
      this.utsavaMurthyCtrl.getAllUtsavaMurthy
    );

    //  Money Order Api's
    this.router.post(
      "/api/moneyOrder/createMoneyOrder",
      this.moneyOrderCtrl.createMoneyOrder
    );

    this.router.post(
      "/api/moneyOrder/getMoneyOrderById",
      this.moneyOrderCtrl.getMoneyOrderById
    );

    this.router.post(
      "/api/moneyOrder/getAllMoneyOrder",
      this.moneyOrderCtrl.getAllMoneyOrder
    );

    // Special Pooja Controller Api's
    this.router.post(
      "/api/specialPooja/createSpecialPooja",
      this.specialPoojaCtrl.createSpecialPooja
    );

    this.router.post(
      "/api/specialPooja/getSpecialPoojaById",
      this.specialPoojaCtrl.getSpecialPoojaById
    );

    this.router.post(
      "/api/specialPooja/getAllSpecialPooja",
      this.specialPoojaCtrl.getAllSpecialPooja
    );

    // Hundi Collection Controller Api's
    this.router.post(
      "/api/hundiCollection/createHundiCollection",
      this.hundiCollectionCtrl.createHundiCollection
    );

    this.router.post(
      "/api/hundiCollection/getHundiCollectionById",
      this.hundiCollectionCtrl.getHundiCollectionById
    );

    this.router.post(
      "/api/hundiCollection/getAllHundiCollection",
      this.hundiCollectionCtrl.getAllHundiCollection
    );


     // Display Controller Api's
    this.router.post("/api/websiteAlbum/getAllWebsiteAlbum", this.websiteAlbumCtrl.getAllWebsiteAlbum);
    this.router.post("/api/websiteAlbum/getWebsiteAlbumById", this.websiteAlbumCtrl.getWebsiteAlbumById);
    this.router.post("/api/websiteAlbum/createWebsiteAlbum", this.websiteAlbumCtrl.createWebsiteAlbum);
  

    /**
     * Report Api Route
     */
    this.router.post("/api/report/bookingReportByDate", this.reportCtrl.bookingReportByDate);
    this.router.post("/api/report/utsavaMurthyReportByDate", this.reportCtrl.utsavaMurthyReportByDate);
    this.router.post("/api/report/moneyOrderReportByDate", this.reportCtrl.moneyOrderReportByDate);
    this.router.post("/api/report/cashKanikeReportByDate", this.reportCtrl.cashKanikeReportByDate);
    this.router.post("/api/report/specialPoojaReportByDate", this.reportCtrl.specialPoojaReportByDate);
    this.router.post("/api/report/hundiCollectionReportByDate", this.reportCtrl.hundiCollectionReportByDate);
    this.router.post("/api/report/kanikeReportByDate", this.reportCtrl.kanikeReportByDate);
    

    // Display Controller Api's
    this.router.post(
      "/api/display/getAllDaysBooking", this.displayCtrl.getAllDaysBooking);
  }
}

export default new ApiRoutes();
