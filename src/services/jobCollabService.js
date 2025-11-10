// src/services/jobCollabService.js
const JobCollab = require("../models/jobCollab");
const Collaboration = require("../models/Collaboration");
const getTenantModels = require("../models/tenantModels");
const ApiError = require("../utils/ApiError");

/**
 * Create a Job Collaboration record for a job and collaboration pair
 * Typically called when recruiter sends a job invite to university.
 */
exports.requestJobCollab = async (jobId, collabId) => {
  // Validate collaboration
  const collab = await Collaboration.findById(collabId).lean();
  if (!collab) throw new ApiError(404, "Collaboration not found");
  if (collab.status !== "Accepted")
    throw new ApiError(400, "Cannot create job collab — collaboration not accepted yet");

  // Check for duplicate job-collab
  const existing = await JobCollab.findOne({ jobId, collabId });
  if (existing) throw new ApiError(400, "Job collaboration already exists");

  // Build snapshot for recruiter dashboard
  const jobCollab = await JobCollab.create({
    jobId,
    collabId,
    status: "Pending",
    universityUserInfo: collab.universityUserInfo
  });

  return jobCollab;
};

/**
 * Get all job collaborations related to a university.
 * Fetches via the universityId in Collaboration snapshot.
 */
exports.getJobCollabsForUniversity = async (universityId) => {
  // First get all collab IDs for this university
  console.log("Fetching collabs for university ID:", universityId);
  const collabs = await Collaboration.find({ universityId }).select("_id").lean();
  console.log("Collabs found for university:", collabs);
  const collabIds = collabs.map(c => c._id);
  if (collabIds.length === 0) return [];

  // Then get related job-collabs
  return await JobCollab.find({ collabId: { $in: collabIds } })
    
};

/**
 * Update job collaboration status (Seen / Accepted / Rejected)
 */
exports.updateJobCollabStatus = async (jobCollabId, data) => {
  const { status } = data;
  
  if (!["seen", "accepted", "rejected"].includes(status))
    throw new ApiError(400, "Invalid status update");

  const jobCollab = await JobCollab.findById(jobCollabId);
  if (!jobCollab) throw new ApiError(404, "Job collaboration not found");

  if (jobCollab.status === "accepted" || jobCollab.status === "rejected")
    throw new ApiError(400, "Already processed");

  jobCollab.status = status;
  await jobCollab.save();
  return jobCollab;
};

/**
 * Fetch all job collaborations linked to a recruiter’s corporate DB.
 */
exports.getJobCollabsForRecruiter = async (recruiterId) => {
  // Step 1: Find all collaborations where this recruiter is involved
  const collabs = await Collaboration.find({ recruiterId }).select("_id").lean();
  const collabIds = collabs.map(c => c._id);
  if (collabIds.length === 0) return [];

  // Step 2: Find all jobCollabs related to these collaborations
  return await JobCollab.find({ collabId: { $in: collabIds } })
    .populate("jobId", "title status visibility closingDate")
    .lean();
};