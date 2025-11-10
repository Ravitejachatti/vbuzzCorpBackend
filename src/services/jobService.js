// src/services/jobService.js
const ApiError = require("../utils/ApiError");
const corporateSchema = require("../models/Corporate");
const { sendCollabMessage } = require("../helper/threadUtils");
const collabSchema = require("../models/Collaboration");
const Collaboration = require("../models/Collaboration");
const JobCollab = require("../models/jobCollab");
const messageService = require("../services/messageService")

exports.createJob = async (Job, recruiterId, corporateId, data) => {
  const { visibility, allowedUniversities = [], ...rest } = data;
  let targetCollabs = [];

  if (visibility === "Collaborative") {
    targetCollabs = await Collaboration.find({ corporateId, status: "Accepted" });
  } else if (visibility === "InviteOnly") {
    targetCollabs = await Collaboration.find({
      corporateId,
      status: "Accepted",
      universityId: { $in: allowedUniversities }
    });
  }

  const job = await Job.create({
    ...rest,
    recruiterId,
    corporateId,
    visibility: visibility || "Public",
    allowedUniversities
  });

  // Notify collabs
  for (const collab of targetCollabs) {
    // Create pivot record
    await JobCollab.create({
      jobId: job._id,
      collabId: collab._id,
      universityUserInfo: collab.universityUserInfo
    });

    // Drop a message
    await messageService.sendMessage(
      collab._id,
      { refId: recruiterId, refModel: "Recruiter" },
      `📢 New job posted: ${job.title}\n${job.description}`
    );
  }

  return job;
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