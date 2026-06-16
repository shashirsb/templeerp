import { Request, Response } from "express";
import { IncomingForm } from "formidable";
import path = require("path");

export default class UploadController {
  // upload file
  upload(req: Request, res: Response) {
    const form = new IncomingForm();
    form.parse(req);

    form.on("fileBegin", (name, file) => {
      file.path = path.join(__dirname, '../../' ) + "/uploads/" + file.name;
    });

    form.on("field", (name, field) => {
      console.log("Field", name, field);
    });
    form.on("file", (name, file) => {
      console.log("Uploaded file", name, file);
    });
    form.on("aborted", () => {
      console.error("Request aborted by the user");
    });
    form.on("error", (err: any) => {
      console.error("Error", err);
      throw err;
    });
    form.on("end", () => {
      res.end();
    });
  }
}
