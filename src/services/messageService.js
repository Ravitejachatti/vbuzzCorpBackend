const Message = require("../models/Message");
const Thread = require("../models/Thread");
const ApiError = require("../utils/ApiError");

exports.sendMessage = async (threadId, sender, body, attachments) => {
  const thread = await Thread.findById(threadId);
  if (!thread) throw new ApiError(404, "Thread not found");

  const msg = await Message.create({
    threadId,
    sender: { refId: sender.id, refModel: sender.role },
    body,
    attachments
  });

  // Update thread metadata
  thread.lastMessage = { body, senderId: sender.id, createdAt: msg.createdAt };
  thread.lastMessageAt = msg.createdAt;
  await thread.save();

  return msg;
};

exports.getMessages = async (threadId) => {
  return await Message.find({ threadId }).sort({ createdAt: 1 }).lean();
};

exports.markAsRead = async (threadId, userId) => {
  await Message.updateMany(
    { threadId, "sender.refId": { $ne: userId }, status: { $ne: "Read" } },
    { $set: { status: "Read" } }
  );
};