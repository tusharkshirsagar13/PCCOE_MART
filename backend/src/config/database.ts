import mongoose from "mongoose";
import { setTimeout as delay } from "node:timers/promises";

export function validateEnvironment() {
  const uri = process.env.DB_URL;
  if (!uri || !/^mongodb(\+srv)?:\/\//.test(uri)) {
    throw new Error("DB_URL must be a valid MongoDB connection URI from Atlas Connect > Drivers.");
  }
  if (!process.env.JWT_SECRET?.trim()) {
    throw new Error("JWT_SECRET is required to sign and verify authentication tokens.");
  }
}

export async function connectDatabase() {
  // Mongoose reconnects automatically after a successful initial connection.
  // Initial connection failures need an explicit retry, including DNS failures.
  mongoose.connection.on("error", () => {
    console.error("MongoDB connection error. Check Atlas availability and DB_URL.");
  });
  for (;;) {
    try {
      await mongoose.connect(process.env.DB_URL!, { serverSelectionTimeoutMS: 10000 });
      console.log("Connected to MongoDB");
      return;
    } catch (error) {
      const code = (error as { code?: string }).code;
      console.error(
        "MongoDB connection failed; retrying in 10 seconds.",
        code === "ENOTFOUND"
          ? "DNS lookup failed: verify the DB_URL hostname and resume the existing Atlas cluster if paused."
          : "Check DB_URL, Atlas database credentials, and network access."
      );
      await delay(10000);
    }
  }
}
