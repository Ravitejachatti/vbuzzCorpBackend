const Thread = require("../models/Thread");
const Collaboration = require("../models/Collaboration");
const ApiError = require("../utils/ApiError");

exports.createThread = async (collabId, participants, subject) => {
  const collab = await Collaboration.findById(collabId);
  if (!collab || collab.status !== "Accepted") throw new ApiError(400, "Invalid or inactive collaboration");

  const thread = await Thread.create({
    collabId,
    participants,
    subject,
    lastMessageAt: new Date()
  });

  return thread;
};

exports.getThreads = async (collabId) => {
  return await Thread.find({ collabId }).sort({ lastMessageAt: -1 }).lean();
};