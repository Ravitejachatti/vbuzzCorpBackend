// src/routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const {authMiddleware} = require("../middlewares/authmiddleware");
const asyncHandler = require("../middlewares/asyncHandler");
const validate = require("../middlewares/validateMiddleware");
const jobValidation = require("../validations/jobValidation");

// Recruiter actions
router.post(
  "/",
  authMiddleware(["Recruiter"]),
  validate(jobValidation.createJob),
  asyncHandler(jobController.createJob)
);

router.put(
  "/:id",
  authMiddleware(["Recruiter"]),
  validate(jobValidation.updateJob),
  asyncHandler(jobController.updateJob)
);

router.delete(
  "/:id",
  authMiddleware(["Recruiter"]),
  asyncHandler(jobController.deleteJob)
);

// Public jobs list/detail
router.get("/", authMiddleware(), asyncHandler(jobController.getJobs));
router.get("/:id", authMiddleware(), asyncHandler(jobController.getJobById));

// Apply for job (University/Student)
router.post(
  "/:id/apply",
  validate(jobValidation.applyJob),
  asyncHandler(jobController.applyForJob)
);

module.exports = router;