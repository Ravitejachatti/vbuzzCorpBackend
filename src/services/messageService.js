// src/services/messageService.js
const Message = require("../models/Message");
const Collaboration = require("../models/Collaboration");
const ApiError = require("../utils/ApiError");

/**
 * Send a message in a collaboration
 */
exports.sendMessage = async (collabId, sender, body, attachments = []) => {
  console.log(
    `Sending message in collab ${collabId} from ${sender.refModel} with ID ${sender.refId}`
  )
  const collab = await Collaboration.findById(collabId);
  if (!collab) throw new ApiError(404, "Collaboration not found");
  if (collab.status !== "Accepted") throw new ApiError(400, "Collaboration not active");

  const message = await Message.create({
    collabId,
    sender,
    body,
    attachments
  });

  return message;
};

/**
 * Get all messages in a collaboration (paginated)
 */
exports.getMessages = async (collabId, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const messages = await Message.find({ collabId })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return messages;
};

/**
 * Mark all messages in collab as read by user
 */
exports.markAsRead = async (collabId, userId) => {
  console.log(`Marking messages as read in collab ${collabId} for user ${userId}`);
  await Message.updateMany(
    { collabId, "sender.refId": { $ne: userId }, status: { $ne: "Read" } },
    { $set: { status: "Read" } }
  );
  return true;
};