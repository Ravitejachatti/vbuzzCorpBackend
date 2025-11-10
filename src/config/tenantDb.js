// src/config/tenantDb.js
const mongoose = require("mongoose");
const logger = require("./logger");
const ApiError = require("../utils/ApiError");

const connections = {}; // cache connections per tenant

async function getTenantConnection(dbName) {
  try{
  if (connections[dbName]) {
    return connections[dbName];
  }


  const uri = process.env.MONGO_URI.replace("VBuzz", dbName); 
  // Example: mongodb+srv://.../vbuzz → mongodb+srv://.../corp1
  
  const conn = await mongoose.createConnection(uri);

  logger.info(`Connected to tenant DB: ${dbName}`);
  connections[dbName] = conn;
  return conn;
} catch(err){
  logger.error("Error connecting to tenant DB:", err);
  ApiError(500, "tenant connection error");
}
}

module.exports = getTenantConnection;