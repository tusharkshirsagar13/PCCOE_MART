import express, { ErrorRequestHandler } from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import registerRoutes from "./routes/registerRoutes";
import foundRoutes from "./routes/foundRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";

export const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/health", (_req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    status: ready ? "ok" : "unavailable",
    database: ready ? "connected" : "disconnected",
  });
});

// Do not buffer sign-in or other database requests during an Atlas outage.
app.use("/api/v1", (_req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    res.setHeader("Retry-After", "10");
    return res.status(503).json({
      msg: "Database temporarily unavailable. Please try again shortly.",
    });
  }
  next();
});
app.use("/api/v1", registerRoutes);
app.use("/api/v1/purchase", purchaseRoutes);
app.use("/api/v1/found", foundRoutes);

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === "entity.parse.failed") {
    res.status(400).json({ msg: "Invalid JSON request." });
    return;
  }
  // Never send internal errors, connection strings, or request credentials.
  console.error("API request failed:", error.name || "Error");
  const unavailable = mongoose.connection.readyState !== 1;
  res.status(unavailable ? 503 : 500).json({
    msg: unavailable
      ? "Database temporarily unavailable. Please try again shortly."
      : "Something went wrong. Please try again.",
  });
};
app.use(errorHandler);
