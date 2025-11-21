const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  threadId: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: true },
  sender: {
    refId: String,
    refModel: { type: String, enum: ["Recruiter","PlacementCell","UniversityDept"] }
  },
  body: { type: String, required: true },
  attachments: [String],
  status: { type: String, enum: ["Sent","Delivered","Read"], default: "Sent" }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);