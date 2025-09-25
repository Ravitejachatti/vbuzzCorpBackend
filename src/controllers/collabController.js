const collabService = require("../services/collabService");
const ApiResponse = require("../utils/ApiResponse");

exports.requestCollab = async (req, res) => {
  const { universityId } = req.body;
  const collab = await collabService.requestCollab(req.user.id, req.user.corporateId, req.user.dbName, universityId);
  res.status(201).json(new ApiResponse(true, "Collaboration request sent", collab));
};

exports.getCollabs = async (req, res) => {
  const collabs = await collabService.getCollabs(req.university.universityId);
  res.status(200).json(new ApiResponse(true, "Collaboration requests fetched", collabs));
};

exports.updateStatus = async (req, res) => {
  const collab = await collabService.updateStatus(req.params.id, req.body.status);
  res.status(200).json(new ApiResponse(true, `Collaboration ${req.body.status}`, collab));
};