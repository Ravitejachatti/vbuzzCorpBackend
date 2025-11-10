// src/models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  collabId: { type: mongoose.Schema.Types.ObjectId, ref: "Collaboration", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job"},

  sender: {
    refId: String,
    refModel: { type: String, enum: ["Recruiter","UniversityUser"], required: true }
  },

  body: { type: String, required: true },
  attachments: [String],

  status: { type: String, enum: ["Sent","Delivered","Read"], default: "Sent" }
}, { timestamps: true });


module.exports = mongoose.models.Message || mongoose.model("Message", messageSchema);