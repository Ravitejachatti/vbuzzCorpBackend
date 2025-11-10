const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const {authMiddleware, verifyUniversityToken} = require("../middlewares/authmiddleware");
const asyncHandler = require("../middlewares/asyncHandler");

// Send message in a thread
router.post("/:collabId", authMiddleware(["Recruiter","University"]), asyncHandler(messageController.sendMessage));

// Get messages in a thread
router.get("/:collabId", authMiddleware(["Recruiter","University"]), asyncHandler(messageController.getMessages));

// Mark messages as read
router.patch("/:collabId/read", verifyUniversityToken, asyncHandler(messageController.markAsRead));

module.exports = router;