// src/models/tenantModels.js
const getTenantConnection = require("../config/tenantDb");
const recruiterSchema = require("./Recruiter");
const jobSchema = require("./Job");
const collabSchema = require("./Collaboration");
const messageSchema = require("./Message");

async function getTenantModels(dbName) {
  const conn = await getTenantConnection(dbName);

  return {
    Recruiter: conn.model("Recruiter", recruiterSchema),
    Job: conn.model("Job", jobSchema),
  };
}

module.exports = getTenantModels;