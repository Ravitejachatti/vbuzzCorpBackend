// src/services/jobService.js
const ApiError = require("../utils/ApiError");
const corporateSchema = require("../models/Corporate");

exports.createJob = async (Job, recruiterId, corporateId, data) => {
  return await Job.create({
    ...data,
    recruiterId,
    corporateId,
    company: corporateId.toString(),
  });
};

exports.getJobs = async (Job) => {
  return await Job.find()
    .populate("recruiterId", "name email")
};

exports.getJobById = async (Job, jobId) => {
  const job = await Job.findById(jobId)
    .populate("recruiterId", "name email")
  if (!job) throw new ApiError(404, "Job not found");
  return job;
};

exports.updateJob = async (Job, jobId, recruiterId, updateData) => {
  const job = await Job.findOneAndUpdate(
    { _id: jobId, recruiterId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!job) throw new ApiError(404, "Job not found or not owned by recruiter");
  return job;
};

exports.deleteJob = async (Job, jobId, recruiterId) => {
  const job = await Job.findOneAndDelete({ _id: jobId, recruiterId });
  if (!job) throw new ApiError(404, "Job not found or not owned by recruiter");
  return job;
};

exports.applyForJob = async (Job, jobId, applicationData) => {
  const job = await Job.findById(jobId);
  if (!job) throw new ApiError(404, "Job not found");
  if (job.status === "Closed") throw new ApiError(400, "Job is closed");

  const alreadyApplied = job.applications.some(
    (app) =>
      app.studentRef.studentId === applicationData.studentRef.studentId &&
      app.studentRef.universityId === applicationData.studentRef.universityId
  );
  if (alreadyApplied) throw new ApiError(400, "Student already applied");

  job.applications.push(applicationData);
  await job.save();

  return job;
};