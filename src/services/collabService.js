const Collaboration = require("../models/Collaboration");
const Corporate = require("../models/Corporate");
const getTenantModels = require("../models/tenantModels");
const ApiError = require("../utils/ApiError");

exports.requestCollab = async (recruiterId, corporateId, corporateDb, universityId, universityDb, universityUserId) => {
  // Check duplicate
  const existing = await Collaboration.findOne({
    recruiterId, corporateId, universityId, universityUserId, status: "Pending"
  });
  if (existing) throw new ApiError(400, "Collaboration request already pending");

  // Fetch recruiter snapshot from corporate DB
  const { Recruiter } = await getTenantModels(corporateDb);
  const recruiter = await Recruiter.findById(recruiterId).lean();
  if (!recruiter) throw new ApiError(404, "Recruiter not found");

  // Fetch corporate snapshot from global DB
  const corporate = await Corporate.findById(corporateId).lean();
  if (!corporate) throw new ApiError(404, "Corporate not found");

  // Fetch university user snapshot from university DB
  // const { User } = await getTenantModels(universityDb);
  // const uniUser = await User.findById(universityUserId).lean();
  // if (!uniUser) throw new ApiError(404, "University user not found");

  // Build new collab
  const collab = await Collaboration.create({
    recruiterId,
    corporateId,
    corporateDb,
    universityId,
    universityDb,
    universityUserId,
    status: "Pending",
    recruiterInfo: { name: recruiter.name, email: recruiter.email, phone: recruiter.phone },
    corporateInfo: { name: corporate.name, logoUrl: corporate.logoUrl },
    // universityUserInfo: { name: uniUser.name, email: uniUser.email, phone: uniUser.phone },
    // universityInfo: { name: uniUser.universityName, logoUrl: uniUser.universityLogo }
  });

  return collab;
};

exports.getCollabsForUniversity = async (universityId) => {
  return await Collaboration.find({ universityId }).lean();
};

exports.updateStatus = async (collabId, data) => {
  const { status } = data;
  if (!["Accepted", "Rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const collab = await Collaboration.findById(collabId);
  console.log("Collab found:", collab);
  if (!collab) throw new ApiError(404, "Collaboration not found");
  if (collab.status !== "Pending") {
    throw new ApiError(400, "Already processed");
  }

  const collabName = `${collab.recruiterInfo.name} ↔ ${collab.universityUserInfo.name}`;

  collab.status = status;
  collab.collabName = collabName;

  await collab.save();
  return collab;
};