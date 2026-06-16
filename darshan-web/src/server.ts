import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';

import ApiRoutes from "./routes/api.routes";

class Server {
  public app: express.Application;
  constructor() {
    // process.env["NODE_CONFIG_DIR"] = __dirname + './dist/src/config'; // "\dist\src\config\config.dev.json";
    // console.log(config.get('ENV'));
    // console.log( process.env["NODE_CONFIG_DIR"]);
    // process.env["NODE_CONFIG_DIR"] = __dirname + "/configDir/";
    this.app = express();
    this.init();
  }

  public init() {
    // const dbConfig = config.get('dbConfig');
    // console.log(dbConfig);
    // PROD 
    const MONGO_URL = "mongodb://app-user:k342hkjbk432kdjhu@localhost:27017/admin";
    // DEV
    //const MONGO_URL = "mongodb://localhost:27017/admin";
   mongoose.connect(MONGO_URL || process.env.MONGODB_URL);
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(logger("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use("/", ApiRoutes.router);
  }
}

// export
export default new Server().app;
