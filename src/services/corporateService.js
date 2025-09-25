const Corporate = require("../models/Corporate");
const ApiError = require("../utils/ApiError");

exports.getCorporates = async (filters = {}) => {
  // Later we can add search/filter (e.g., by sector, hiringNow, etc.)
  const corporates = await Corporate.find(filters).select("name domain logoUrl sector headquarters");
  return corporates;
};

exports.getCorporateById = async (id) => {
  const corporate = await Corporate.findById(id);
  if (!corporate) throw new ApiError(404, "Corporate not found");
  return corporate;
};

exports.updateCorporate = async (id, updateData, recruiter) => {
  // Optional: only first recruiter of this corporate can update corporate details
  if (!recruiter.isFirstRecruiter) {
    throw new ApiError(403, "Only first recruiter can update corporate details");
  }

  const corporate = await Corporate.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!corporate) throw new ApiError(404, "Corporate not found");
  return corporate;
};