const express = require("express");
const router = express.Router();
const threadController = require("../controllers/threadController");
const authMiddleware = require("../middlewares/authmiddleware");
const asyncHandler = require("../middlewares/asyncHandler");

// Create thread under collaboration
router.post("/:collabId", authMiddleware(["Recruiter","University"]), asyncHandler(threadController.createThread));

// Get threads under collaboration
router.get("/:collabId", authMiddleware(["Recruiter","University"]), asyncHandler(threadController.getThreads));

module.exports = router;