const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  collabId: { type: mongoose.Schema.Types.ObjectId, ref: "Collaboration", required: true },
  participants: [
    {
      refId: String,
      refModel: { type: String, enum: ["Recruiter","PlacementCell","UniversityDept"] }
    }
  ],
  subject: String,
  lastMessage: {
    body: String,
    senderId: String,
    createdAt: Date
  },
  lastMessageAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Thread", threadSchema);