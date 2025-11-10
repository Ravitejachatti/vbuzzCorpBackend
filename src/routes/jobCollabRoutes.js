const express = require("express");
const router = express.Router();
const jobCollabController = require("../controllers/jobCollabController");
const {authMiddleware, verifyUniversityToken} = require("../middlewares/authmiddleware");
const asyncHandler = require("../middlewares/asyncHandler");

// Get collaborations for jobs (Recruiter)
router.get(
  "/recruiter",
  authMiddleware(["Recruiter"]),
  asyncHandler(jobCollabController.getJobCollaborations)
);

// Get Collaboration detail (University)
router.get(
  "/university",
  verifyUniversityToken,
  asyncHandler(jobCollabController.getJobCollabsForUniversity)
);

// update collaboration status (University)
router.patch(
  "/:jobCollabId/status",
  verifyUniversityToken,
  asyncHandler(jobCollabController.updateJobCollabStatus)
);


module.exports = router;    
