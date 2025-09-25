const messageService = require("../services/messageService");
const ApiResponse = require("../utils/ApiResponse");

exports.sendMessage = async (req, res) => {
  const msg = await messageService.sendMessage(req.params.threadId, req.user, req.body.body, req.body.attachments || []);
  res.status(201).json(new ApiResponse(true, "Message sent", msg));
};

exports.getMessages = async (req, res) => {
  const messages = await messageService.getMessages(req.params.threadId);
  res.status(200).json(new ApiResponse(true, "Messages fetched", messages));
};

exports.markAsRead = async (req, res) => {
  await messageService.markAsRead(req.params.threadId, req.user.id);
  res.status(200).json(new ApiResponse(true, "Messages marked as read"));
};