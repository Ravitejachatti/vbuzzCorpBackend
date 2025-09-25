// src/middlewares/errorMiddleware.js
const logger = require("../config/logger");

const errorMiddleware = (err, req, res, next) => {
  logger.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;