// src/server.js
const http = require("http");
const mongoose = require("mongoose");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const logger = require("./src/config/logger");
const { port, env } = require("./src/config/env");
const redisClient = require("./src/config/cache"); // may be undefined if REDIS_URL not set

let server;

(async function start() {
  try {
    await connectDB();

    server = http.createServer(app);

    server.listen(port, () => {
      logger.info(`VBuzz API running on port ${port} [${env}]`);
    });

    // Handle graceful shutdowns
    const shutdown = async (signal) => {
      try {
        logger.warn(`Received ${signal}. Shutting down gracefully...`);
        server && server.close(() => logger.info("HTTP server closed"));

        // Close DB
        await mongoose.connection.close();
        logger.info("MongoDB connection closed");

        // Close Redis if present
        if (redisClient && redisClient.quit) {
          await redisClient.quit();
          logger.info("Redis connection closed");
        }

        process.exit(0);
      } catch (err) {
        logger.error("Error during shutdown:", err);
        process.exit(1);
      }
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    // Crash safety
    process.on("unhandledRejection", (reason) => {
      logger.error("Unhandled Rejection:", reason);
      shutdown("unhandledRejection");
    });

    process.on("uncaughtException", (err) => {
      logger.error("Uncaught Exception:", err);
      shutdown("uncaughtException");
    });
  } catch (err) {
    logger.error("Fatal startup error:", err);
    process.exit(1);
  }
})();