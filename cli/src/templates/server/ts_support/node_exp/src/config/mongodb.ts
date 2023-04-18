import mongoose from "mongoose";
import logger from "./logger";

function connectMongodb(url: string) {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(url);
    logger.info("Mongodb Connected");
  } catch (e: any) {
    logger.error(`Error connecting mongodb: ${e.message}`);
  }
}

export default connectMongodb;
