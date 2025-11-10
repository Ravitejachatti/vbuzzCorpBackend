// src/controllers/messageController.js
const messageService = require("../services/messageService");
const ApiResponse = require("../utils/ApiResponse");

/**
 * Send message in a collaboration
 */
exports.sendMessage = async (req, res, next) => {
  try {
    const { collabId } = req.params;
    const {  body, attachments } = req.body;
    console.log("Send message request received for collabId:", collabId);

    const message = await messageService.sendMessage(
      collabId,
      { refId: req.user.id, refModel: req.user.role }, // Recruiter or UniversityUser
      body,
      attachments
    );

    res.status(201).json(new ApiResponse(true, "Message sent", message));
  } catch (err) {
    next(err);
  }
};

/**
 * Get messages in a collaboration
 */
exports.getMessages = async (req, res, next) => {
  try {
    const { collabId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const messages = await messageService.getMessages(collabId, Number(page), Number(limit));
    res.status(200).json(new ApiResponse(true, "Messages fetched", messages));
  } catch (err) {
    next(err);
  }
};

/**
 * Mark messages as read
 */
exports.markAsRead = async (req, res, next) => {
  try {
    const { collabId } = req.params;

    await messageService.markAsRead(collabId, req.university.id);
    res.status(200).json(new ApiResponse(true, "Messages marked as read"));
  } catch (err) {
    next(err);
  }
};