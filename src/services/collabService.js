const Collaboration = require("../models/Collaboration");
const Corporate = require("../models/Corporate");
const getTenantModels = require("../models/tenantModels");
const ApiError = require("../utils/ApiError");

exports.requestCollab = async (recruiterId, corporateId, corporateDb, universityId) => {
  const existing = await Collaboration.findOne({ recruiterId, corporateId, universityId, status: "Pending" });
  if (existing) throw new ApiError(400, "Collaboration request already pending");
  console.log("Fetching recruiter from corporate DB:", corporateDb);
  const { Recruiter} = await getTenantModels(corporateDb);
  const recruiter = await Recruiter.findById(recruiterId).lean('name', 'email');
  if (!recruiter) throw new ApiError(404, "Recruiter not found in corporate DB");

  const corporate = await Corporate.findById(corporateId).lean('name', 'logoUrl');
  if (!corporate) throw new ApiError(404, "Corporate not found in global DB");

  // Create new collaboration request

  const collab = await Collaboration.create({
    recruiterId,
    corporateId,
    corporateDb,
    universityId,
    status: "Pending",
    recruiterInfo: { name: recruiter.name, email: recruiter.email },
    corporateInfo: { name: corporate.name, logoUrl: corporate.logoUrl }
  });

  return collab;
};

exports.getCollabs = async (universityId) => {
  return await Collaboration.find({ universityId }).lean();
};

exports.updateStatus = async (collabId, status) => {
  const collab = await Collaboration.findByIdAndUpdate(
    collabId,
    { $set: { status } },
    { new: true }
  );
  if (!collab) throw new ApiError(404, "Collaboration not found");
  return collab;
};