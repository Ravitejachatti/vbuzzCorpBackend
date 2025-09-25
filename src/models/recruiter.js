const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  corporateId: { type: mongoose.Schema.Types.ObjectId, ref: "Corporate", required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  designation: String,
  linkedInProfile: String,
  status: { type: String, enum: ["Active","Suspended"], default: "Active" },
  isFirstRecruiter: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = recruiterSchema