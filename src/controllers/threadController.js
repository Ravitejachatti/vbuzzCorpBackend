const threadService = require("../services/threadService");
const ApiResponse = require("../utils/ApiResponse");

exports.createThread = async (req, res) => {
  const thread = await threadService.createThread(req.params.collabId, req.body.participants, req.body.subject);
  res.status(201).json(new ApiResponse(true, "Thread created", thread));
};

exports.getThreads = async (req, res) => {
  const threads = await threadService.getThreads(req.params.collabId);
  res.status(200).json(new ApiResponse(true, "Threads fetched", threads));
};