// src/config/db.js
const mongoose = require("mongoose");
const { mongoUri, env } = require("./env");
const logger = require("./logger");

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    logger.info(`MongoDB connected [${env}]`);
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;