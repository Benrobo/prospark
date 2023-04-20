const mongoose = require("mongoose");
const logger = require("./logger");

function connectMongodb(url) {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(url)
    logger.info("Mongodb Connected");
  } catch (e) {
    logger.error(`Error connecting mongodb: ${e.message}`);
  }
}

module.exports = connectMongodb;
