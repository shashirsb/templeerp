class NxDate {
  compareDate(date1: Date, date2: Date) {
    const dateOne = date1.setHours(0, 0, 0, 0);
    const dateTwo = date2.setHours(0, 0, 0, 0);
    return dateOne === dateTwo;
  }

  numberToTime(num: number): string {
    let timeVal = "";
    if (num > 12) {
      timeVal = num - 12 + "PM";
    } else {
      timeVal = num + "AM";
    }
    return timeVal;
  }

  dateFormat(date: Date, format: string) {
    let dateFormat = "";
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (format === "dd/MM/yyyy") {
      dateFormat = (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year;
    }
    if (format === "dd-MM-yyyy") {
      dateFormat = (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year;
    }
    return dateFormat;
  }

  dateDaysBetween(fromDate: Date, toDate: Date) {
    var Days = Math.floor((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
    return Days;
  }
}

export default new NxDate();
