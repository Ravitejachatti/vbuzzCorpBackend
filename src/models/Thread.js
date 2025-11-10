const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  threadName: { type: String, required: true }, // Placement Cell / Dept name

  collabId: { type: mongoose.Schema.Types.ObjectId, ref: "Collaboration", required: true },

  participants: [
    {
      refId: String,     // recruiterId / placementCellId / deptId
      refModel: { type: String, enum: ["Recruiter","PlacementCell","UniversityDept"] },
      name: String,      // cached name for fast lookup
      email: String,     // cached email
      phone: String      // optional, cached phone
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