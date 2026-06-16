import NxDate from "./nx-date";
import NxMail from "./nx-mail";
import NxPrint from "./nx-print";
import NxSms from "./nx-sms";
import NxUtils from "./nx-utils";

class Nx {
  public date;
  public utils;
  public sms;
  public mail;
  constructor() {
    this.init();
  }

  init() {
    this.date = NxDate;
    this.sms = NxSms;
    this.mail = NxMail;
    this.utils = NxUtils;
    // this.print = NxPrint;
  }
}

export default new Nx();
