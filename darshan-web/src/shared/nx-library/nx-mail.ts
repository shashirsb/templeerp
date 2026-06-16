import * as nodemailer from "nodemailer";

class NxMail {
  private _transporter: nodemailer.Transporter;
  constructor() {
    this._transporter = nodemailer.createTransport({
        host: "smtpout.asia.secureserver.net",
        port: 465,
        secure: true,
        auth: {
            user: "info@kabbalamma.org",
            pass: "Kabbalu@123"
        }
    }
    );
  }

  public sendMail(to: string, subject: string, content: string) {
    const options = {
      from: "Kabbalamma Devasthanam Service<info@kabbalamma.org>",
      to,
      subject,
      text: content
    };

    this._transporter.sendMail(options, (error, info) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(`Message Sent ${info.response}`);
    });
  }
}

export default new NxMail();
