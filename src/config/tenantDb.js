// src/config/tenantDb.js
const mongoose = require("mongoose");
const logger = require("./logger");

const connections = {}; // cache connections per tenant

async function getTenantConnection(dbName) {
  if (connections[dbName]) {
    return connections[dbName];
  }

  const uri = process.env.MONGO_URI.replace("vbuzz", dbName); 
  // Example: mongodb+srv://.../vbuzz → mongodb+srv://.../corp1

  const conn = await mongoose.createConnection(uri);

  logger.info(`Connected to tenant DB: ${dbName}`);
  connections[dbName] = conn;
  return conn;
}

module.exports = getTenantConnection;