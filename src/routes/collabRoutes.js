const express = require("express");
const router = express.Router();
const collabController = require("../controllers/collabController");
const { authMiddleware, verifyUniversityToken } = require("../middlewares/authmiddleware");
const asyncHandler = require("../middlewares/asyncHandler");

// Recruiter: request collab
router.post("/", authMiddleware(["Recruiter"]), asyncHandler(collabController.requestCollab));

// University: view collabs
router.get("/", verifyUniversityToken, asyncHandler(collabController.getCollabs));

// University: accept/reject collab
router.put("/:id/status", verifyUniversityToken, asyncHandler(collabController.updateStatus));

module.exports = router;