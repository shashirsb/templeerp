import { createHmac } from "crypto";
import * as qz from "qz-tray";
import * as RSVP from "rsvp";
import shajs from "sha.js";
declare var crypto: any;

class NxPrint {
  constructor() {
    qz.api.setPromiseType(RSVP.Promise);

    // qz.api.setSha256Type(data => {
    //   return shajs("sha256")
    //     .update(data)
    //     .digest("hex");
    // });

    qz.api.setPromiseType((resolver: any) => {
      return new Promise(resolver);
    });

    qz.api.setSha256Type((data: any) => {
      return crypto
        .createHash("sha256")
        .update(data)
        .digest("hex");
    });

    qz.websocket
      .connect()
      .then(() => {
        return qz.printers.find();
      })
      .then((printers: any) => {
        console.log(printers);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  getPrint(printer: string, data: any) {
    console.log("Get Print");
  }

  print() {
    // qz.websocket
    //   .connect()
    //   .then(function() {
    //     return qz.printers.find();
    //   })
    //   .then(function(printers) {
    //     console.log(printers);
    //   })
    //   .then(function() {
    //     return qz.websocket.disconnect();
    //   })
    //   .then(function() {
    //     process.exit(0);
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     process.exit(1);
    //   });
  }
}

export default new NxPrint();
