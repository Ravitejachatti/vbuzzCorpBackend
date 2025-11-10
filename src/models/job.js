const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter", required: true },
  corporateId: { type: mongoose.Schema.Types.ObjectId, ref: "Corporate", required: true },
  description: { type: String, required: true },
  visibility: { type: String, enum: ["Public","Collaborative","InviteOnly"], default: "Public" },
  status: { type: String, enum: ["Open","Closed"], default: "Open" },
  allowedUniversities: [String],
  closingDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = jobSchema