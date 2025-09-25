const Recruiter = require("../models/Recruiter");
const ApiError = require("../utils/ApiError");

exports.getMyProfile = async (recruiterId) => {
  const recruiter = await Recruiter.findById(recruiterId).populate("corporateId", "name domain logoUrl");
  if (!recruiter) throw new ApiError(404, "Recruiter not found");
  return recruiter;
};

exports.updateMyProfile = async (recruiterId, updateData) => {
  const recruiter = await Recruiter.findByIdAndUpdate(
    recruiterId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!recruiter) throw new ApiError(404, "Recruiter not found");
  return recruiter;
};

exports.getRecruitersByCorporate = async (corporateId) => {
  const recruiters = await Recruiter.find({ corporateId });
  if (!recruiters || recruiters.length === 0) throw new ApiError(404, "No recruiters found for this corporate");
  return recruiters;
};