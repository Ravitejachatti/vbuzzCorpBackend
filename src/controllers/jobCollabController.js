// src/controllers/jobCollabController.js
const jobCollabService = require("../services/jobCollabService");
const ApiResponse = require("../utils/ApiResponse");

/**
 * @desc   Send job collaboration request to a university (triggered by recruiter)
 * @route  POST /api/job-collab/request
 */
exports.requestJobCollab = async (req, res, next) => {
  try {
    const { jobId, collabId } = req.body;
    const jobCollab = await jobCollabService.requestJobCollab(jobId, collabId);
    res.status(201).json(new ApiResponse(true, "Job collaboration request created", jobCollab));
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Get all job collaboration requests for a university
 * @route  GET /api/job-collab/university/:universityId
 */
exports.getJobCollabsForUniversity = async (req, res, next) => {
  try {
    console.error("University ID from request:", req.university);
    const  universityId  = req.university.universityId;
    const jobCollabs = await jobCollabService.getJobCollabsForUniversity(universityId);
    res.status(200).json(new ApiResponse(true, "Job collaborations fetched", jobCollabs));
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Update the university’s response to a job collaboration
 * @route  PATCH /api/job-collab/:id/status
 */
exports.updateJobCollabStatus = async (req, res, next) => {
  try {
    const jobCollab = await jobCollabService.updateJobCollabStatus(req.params.jobCollabId, req.body);
    res.status(200).json(new ApiResponse(true, `Job collaboration ${req.body.status}`, jobCollab));
  } catch (err) {
    next(err);
  }
};

/**
 * @desc   Fetch all job collabs created by a specific recruiter (corporate side)
 * @route  GET /api/job-collab/recruiter/:recruiterId
 */
exports.getJobCollabsForRecruiter = async (req, res, next) => {
  try {
    const { recruiterId } = req.params;
    const jobCollabs = await jobCollabService.getJobCollabsForRecruiter(recruiterId);
    res.status(200).json(new ApiResponse(true, "Recruiter job collaborations fetched", jobCollabs));
  } catch (err) {
    next(err);
  }
};