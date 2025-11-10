const Thread = require("../models/Thread");
const Message = require("../models/Message");

/**
 * Ensure a thread exists for recruiter ↔ placement/department.
 * Creates thread if not exists, then sends a message inside.
 */
const ensureThreadAndSendMessage = async ({
  collabId,
  recruiter,
  universityParticipant,
  body,
  threadName
}) => {
  let thread = await Thread.findOne({
    collabId,
    "participants.refId": universityParticipant.refId
  });

  if (!thread) {
    thread = await Thread.create({
      threadName: threadName || universityParticipant.name, // ✅ Placement/Dept name
      collabId,
      participants: [
        {
          refId: recruiter._id.toString(),
          refModel: "Recruiter",
          name: recruiter.name,
          email: recruiter.email,
          phone: recruiter.phone
        },
        {
          refId: universityParticipant.refId,
          refModel: universityParticipant.refModel, // PlacementCell or UniversityDept
          name: universityParticipant.name,
          email: universityParticipant.email,
          phone: universityParticipant.phone
        }
      ],
      lastMessageAt: new Date()
    });
  }

  const message = await Message.create({
    threadId: thread._id,
    sender: { refId: recruiter._id.toString(), refModel: "Recruiter" },
    body
  });

  thread.lastMessage = {
    body,
    senderId: recruiter._id.toString(),
    createdAt: message.createdAt
  };
  thread.lastMessageAt = message.createdAt;
  await thread.save();

  return { thread, message };
};

module.exports = { ensureThreadAndSendMessage };