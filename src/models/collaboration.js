const mongoose = require("mongoose");

const collabSchema = new mongoose.Schema({
  corporateId: String,
  corporateDb: String,
  universityId: String,
  universityDb: String,
  status: { type: String, enum: ["Pending","Accepted","Rejected"], default: "Pending" },
  recruiterInfo: { name: String, email: String },   // snapshot
  corporateInfo: { name: String, logoUrl: String }, // snapshot
}, { timestamps: true });

module.exports = mongoose.model("Collaboration", collabSchema);