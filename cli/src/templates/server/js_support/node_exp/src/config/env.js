const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const LOCAL_MYSQL = "mysql://root:@localhost:3306/prospark-db";

const ENV = {
  jwtSecret: process.env.JWT_SECRET,
  mongoUrl: process.env.MONGODB,
  databaseUrl:
    process.env.NODE_ENV === "development"
      ? LOCAL_MYSQL
      : process.env.DATABASE_URL,
  clientUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://paycode.co`,
};

module.exports = ENV;
