import mongoose from "mongoose";

// ! always invoke this method before using it within other parts of the application.
export default function connectMongodb(mongoUrl) {
  try {
    mongoose.set("strictQuery", false);
    mongoose.createConnection(mongoUrl, (err) => {
      if (err)
        return console.log(`Error connecting to mongodb: ` + err?.message);
      console.info("Mongodb Connected");
    });
  } catch (e) {
    console.error(`Error connecting mongodb: ${e.message}`);
  }
}
