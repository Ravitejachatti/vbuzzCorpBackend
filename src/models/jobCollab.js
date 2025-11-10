// src/models/JobCollab.js
const mongoose = require("mongoose");

const jobCollabSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  collabId: { type: mongoose.Schema.Types.ObjectId, ref: "Collaboration", required: true },

  // Tracks the university user’s reaction
  status: { 
    type: String, 
    enum: ["pending","seen","accepted","rejected"], 
    default: "pending" 
  },

  // Snapshot for recruiter view
  universityUserInfo: {
    name: String,
    email: String
  }
}, { timestamps: true });

module.exports = mongoose.model("jobCollab", jobCollabSchema);