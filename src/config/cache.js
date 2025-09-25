// src/config/cache.js
const { createClient } = require("redis");
const { redisUrl } = require("./env");
const logger = require("./logger");

let client;

if (redisUrl) {
  client = createClient({ url: redisUrl });
  client.on("connect", () => logger.info("Redis connected"));
  client.on("error", (err) => logger.error("Redis Client Error", err));
  client.connect();
}

module.exports = client;