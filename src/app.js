// src/app.js
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const routes = require("./routes");
const rateLimiter = require("./middlewares/rateLimiter");
const errorMiddleware = require("./middlewares/errorMiddleware");
const logger = require("./config/logger");
const { env } = require("./config/env");

const app = express();

// Trust proxy (needed if behind Nginx/Load balancer for correct IP rate-limiting)
app.set("trust proxy", 1);

// Security headers
app.use(helmet());

// CORS (tighten this in prod)
app.use(
  cors({
    origin: "*", // e.g., ["https://app.vbuzz.ai"] in prod
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

// Request compression
app.use(compression());

// JSON & URL-encoded parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Access logs (concise in prod)
app.use(morgan(env === "production" ? "combined" : "dev", {
  stream: { write: (msg) => logger.info(msg.trim()) },
}));

// Basic rate limiting for all routes (you can mount per-path too)
app.use(rateLimiter);

// Health/Readiness
app.get("/healthz", (req, res) => res.status(200).json({ ok: true }));
app.get("/readyz", (req, res) => res.status(200).json({ ready: true }));

// API routes
app.use("/api/v1", routes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler (must be last)
app.use(errorMiddleware);

module.exports = app;