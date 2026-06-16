import { Promise } from "mongoose";

class NxUtils {
  // Get Randam Number
  public getRandam(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getBookingId(): string {
    return this.getUniqueForBookingDateString();
  }

  getPaginationQuery = (currentPage: number, itemPerPage: number): any => {
    const query = { limit: itemPerPage, skip: itemPerPage * (currentPage - 1) };
    return query;
  }

  public getTransactionId(section: string): string {
    let preText = "KDS";
    switch (section) {
      case "Donation":
        preText = preText + "DO";
        break;
      case "Darshan":
        preText = preText + "DA";
        break;
      case "Seva":
        preText = preText + "SA";
        break;
      case "Hundi":
        preText = preText + "HU";
        break;
      case "Kanike":
        preText = preText + "KA";
        break;
      case "UtsavaMurthy":
        preText = preText + "UM";
        break;
      case "SpecialPooja":
        preText = preText + "SP";
        break;        
      case "MoneyOrder":
        preText = preText + "MO";
        break;
      case "CashKanike":
        preText = preText + "CK";
        break;
      default:
        preText = preText + "FR";
        break;


    }
    preText = preText + this.getUniqueDateString();
    return preText;
  }

  private getUniqueDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month =
      now.getMonth() < 10
        ? "0" + (now.getMonth() + 1).toString()
        : (now.getMonth() + 1).toString();
    const date =
      now.getDate() < 10
        ? "0" + now.getDate().toString()
        : now.getDate().toString();
    const hour =
      now.getHours() < 10
        ? "0" + now.getHours().toString()
        : now.getHours().toString();
    const min =
      now.getMinutes() < 10
        ? "0" + now.getMinutes().toString()
        : now.getMinutes().toString();
    const sec = now.getSeconds();
    const miliSec = now.getMilliseconds();
    return year + month + date + hour + min + sec + miliSec;
  }

  private getUniqueForBookingDateString() {
    const now = new Date();
    const year = now.getFullYear().toString().substr(-2);
    const month =
      now.getMonth() < 10
        ? "0" + (now.getMonth() + 1).toString()
        : (now.getMonth() + 1).toString();
    const date =
      now.getDate() < 10
        ? "0" + now.getDate().toString()
        : now.getDate().toString();
    const hour =
      now.getHours() < 10
        ? "0" + now.getHours().toString()
        : now.getHours().toString();
    const min =
      now.getMinutes() < 10
        ? "0" + now.getMinutes().toString()
        : now.getMinutes().toString();
    const sec = now.getSeconds();
    const miliSec = now.getMilliseconds();
    return year + month + date;
  }
}

export default new NxUtils();
