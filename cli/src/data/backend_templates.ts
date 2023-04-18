export const NodeExp_APP_JS = `
const express = require("express");
const cors = require("cors");
const env = require("./config/env.js");
const { requestLogger } = require("./middlewares/logger.js");
const bodyParser = require("body-parser");
const HandleErrors = require("./middlewares/error.js");
const logger = require("./config/logger.js");
const ENV = require("./config/env.js");
{{db_conn_method_import}}

class App {
  constructor() {
    this.app = express();
    this.env = env;
    this.port = process.env.PORT ?? 8080;
    this.initializeMiddlewares();
  }

  initDB() {
    // * initialization of the database
    {{init_db_func_call}}
  }

  initializeMiddlewares() {
    // initialize server middlewares
    this.app.use(requestLogger);
    this.app.use(
      cors({
        origin: ["http://127.0.0.1:3000", "http://localhost:3000", "*"],
        credentials: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  listen() {
    // initialize database
    this.initDB();
    // listen on server port
    this.app.listen(this.port, () => {
      logger.info("Server started at http://localhost:" + this.port);
    });
  }

  initializedRoutes(routes) {
    // initialize all routes middleware
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });

    this.app.all("*", (req, res) => {
      return res.status(404).json({
        errorStatus: true,
        code: "--route/route-not-found",
        message: "The requested route was not found.",
      });
    });
    // handle global errors
    this.app.use(HandleErrors);
  }
}

module.exports = App;
`;

export const NodeExp_PRISMA = `
const { PrismaClient } = require("prisma");

const prisma = new PrismaClient();

module.exports = prisma;
`;

export const NodeExp_MongoDb_DB_ENV_PROP = `mongoUrl: process.env.NODE_ENV === "development" ? LOCAL_DB_CONN : process.env.MONGODB`;
export const NodeExp_ENV = `
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

{{LOCAL_CONN_URL}}

const ENV = {
  jwtSecret: process.env.JWT_SECRET,
  {{DB_ENV_PROP}},
  clientUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://example.com",
};

module.exports = ENV;
`;

export const PRISMA_SCHEMA = `
generator client {
    provider = "prisma-client-js"
}

datasource db {
    {{provider}}
    url          = env("DATABASE_URL")
    {{relationMode}}
}
  
model Users {
    id              String   @id
    emailVerified   Boolean? @default(false)
    accountVerified Boolean? @default(false)
    email           String   @unique
}
`;

export const NodeExp_ENV_CONT = `
{{DB_URL}}

NODE_ENV="development"

JWT_SECRET="sdcsdcdc32ry38y9dpnp23i3892te832tp9e23on"
`;
