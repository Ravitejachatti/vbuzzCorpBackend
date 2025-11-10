const mongoose = require("mongoose");

const collabSchema = new mongoose.Schema({
  collabName: { type: String }, // generated when accepted

  recruiterId: { type: String, required: true },
  corporateId: { type: String, required: true },
  corporateDb: { type: String, required: true },

  universityId: { type: String, required: true }, // target university
  universityDb: { type: String, required: true }, // to reach the right tenant DB
  universityUserId: { type: String, required: true }, // target placement cell / dept head user

  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },

  // Snapshots (no need to query later)
  recruiterInfo: {
    name: String,
    email: String,
    phone: String
  },
  corporateInfo: {
    name: String,
    logoUrl: String
  },
  universityInfo: {
    name: String,
    logoUrl: String
  },
  universityUserInfo: { // target placement officer / dept head
    name: String,
    email: String,
    phone: String
  },
  acceptedInfo: { // who accepted inside university
    name: String,
    email: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Collaboration", collabSchema);