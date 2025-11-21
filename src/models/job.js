const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  universityId: String,
  studentRef: { universityId: String, studentId: String },
  status: { type: String, enum: ["Applied","Screening","Shortlisted","Rejected","Hired"], default: "Applied" }
}, { timestamps: true });

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter", required: true },
  corporateId: { type: mongoose.Schema.Types.ObjectId, ref: "Corporate", required: true },
  description: { type: String, required: true },
  visibility: { type: String, enum: ["Public","University"], default: "Public" },
  status: { type: String, enum: ["Open","Closed"], default: "Open" },
  closingDate: { type: Date, required: true },
  applications: [applicationSchema]
}, { timestamps: true });

module.exports = jobSchema