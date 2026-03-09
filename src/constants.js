// JWT Configuration
import dotenv from "dotenv";
dotenv.config();
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "BootCampTrackerAccessSecretKey";
export const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || "15m";
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "BootCampTrackerRefreshSecretKey";
export const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d";
