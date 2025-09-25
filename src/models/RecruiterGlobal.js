// src/models/RecruiterGlobal.js
const mongoose = require("mongoose");

const recruiterGlobalSchema = new mongoose.Schema(
  {
    // no need of id because we can get from the tenant based _id
    _id: { type: mongoose.Schema.Types.ObjectId,required: true }, // same as tenant DB recruiter _id
    corporateId: { type: mongoose.Schema.Types.ObjectId, ref: "Corporate", required: true },
    dbName: { type: String, required: true }, // tenant DB name
    email: { type: String, required: true, unique: true },
    role: { type: String, default: "Recruiter" }, // can extend later
  },
  { timestamps: true, }
);

module.exports = mongoose.model("RecruiterGlobal", recruiterGlobalSchema);