
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path:"../.env"
});

// --------------------- MongoDB Connection ---------------------

const ENV = process.env || "development";


export const connectMongoDB = async () => {
  try {
    await mongoose.connect(`${ENV.MONGO_URI}`);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // exit app if DB fails
  }
};