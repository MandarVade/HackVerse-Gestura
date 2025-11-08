import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connecDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected successfully.", conn.connection.host);
  } catch (error) {
    console.log("Error connencting to DB", error);
    process.exit(1);
  }
};
