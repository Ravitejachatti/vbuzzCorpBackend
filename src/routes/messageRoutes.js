const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const {authMiddleware} = require("../middlewares/authmiddleware");
const asyncHandler = require("../middlewares/asyncHandler");

// Send message in a thread
router.post("/:threadId", authMiddleware(["Recruiter","University"]), asyncHandler(messageController.sendMessage));

// Get messages in a thread
router.get("/:threadId", authMiddleware(["Recruiter","University"]), asyncHandler(messageController.getMessages));

// Mark messages as read
router.patch("/:threadId/read", authMiddleware(["Recruiter","University"]), asyncHandler(messageController.markAsRead));

module.exports = router;