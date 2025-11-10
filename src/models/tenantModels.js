// src/models/tenantModels.js
const getTenantConnection = require("../config/tenantDb");
const recruiterSchema = require("./Recruiter");
const jobSchema = require("./Job");
const collabSchema = require("./Collaboration");
const messageSchema = require("./Message");
const jobCollabSchema = require("./jobCollab");
const userSchema = require("./user.model");

async function getTenantModels(dbName) {
  console.log("Getting tenant models for DB:", dbName);
  const conn = await getTenantConnection(dbName);

  return {
    Recruiter: conn.model("Recruiter", recruiterSchema),
    Job: conn.model("Job", jobSchema),
    User: conn.model("User", userSchema)
  };
}

module.exports = getTenantModels;