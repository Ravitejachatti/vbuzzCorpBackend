const getTenantModels = require("../models/tenantModels");
const jobService = require("../services/jobService");
const ApiResponse = require("../utils/ApiResponse");

// Create job (Recruiter)
exports.createJob = async (req, res, next) => {
  try {
    console.log("Creating job for DB:", req.user.dbName);
    const { Job } = await getTenantModels(req.user.dbName);
    const job = await jobService.createJob(Job, req.user.id, req.user.corporateId, req.body);
    res.status(201).json(new ApiResponse(true, "Job created", job));
  } catch (err) {
    next(err);
  }
};

// Get all jobs (Public)
exports.getJobs = async (req, res, next) => {
  try {
    
    console.log("Fetching jobs for DB:", req.user);
    const { Job } = await getTenantModels(req.user?.dbName || "default"); 
    const jobs = await jobService.getJobs(Job);
    res.status(200).json(new ApiResponse(true, "Jobs fetched", jobs));
  } catch (err) {
    next(err);
  }
};

// Get job by ID
exports.getJobById = async (req, res, next) => {
  try {
    const { Job } = await getTenantModels(req.user?.dbName || "default");
    const job = await jobService.getJobById(Job, req.params.id);
    res.status(200).json(new ApiResponse(true, "Job fetched", job));
  } catch (err) {
    next(err);
  }
};

// Update job (Recruiter only)
exports.updateJob = async (req, res, next) => {
  try {
    const { Job } = await getTenantModels(req.user.dbName);
    const job = await jobService.updateJob(Job, req.params.id, req.user.id, req.body);
    res.status(200).json(new ApiResponse(true, "Job updated", job));
  } catch (err) {
    next(err);
  }
};

// Delete job (Recruiter only)
exports.deleteJob = async (req, res, next) => {
  try {
    const { Job } = await getTenantModels(req.user.dbName);
    const job = await jobService.deleteJob(Job, req.params.id, req.user.id);
    res.status(200).json(new ApiResponse(true, "Job deleted", job));
  } catch (err) {
    next(err);
  }
};

// Apply for job (University/Student)
exports.applyForJob = async (req, res, next) => {
  try {
    const { Job } = await getTenantModels(req.user.dbName);
    const job = await jobService.applyForJob(Job, req.params.id, req.body);
    res.status(200).json(new ApiResponse(true, "Application submitted", job));
  } catch (err) {
    next(err);
  }
};