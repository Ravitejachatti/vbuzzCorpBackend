const collabService = require("../services/collabService");
const ApiResponse = require("../utils/ApiResponse");

exports.requestCollab = async (req, res, next) => {
  try {
    const { universityId, universityDb, universityUserId } = req.body;
    const collab = await collabService.requestCollab(
      req.user.id, 
      req.user.corporateId, 
      req.user.dbName, 
      universityId, 
      universityDb,
      universityUserId
    );
    res.status(201).json(new ApiResponse(true, "Collaboration request sent", collab));
  } catch (err) {
    next(err);
  }
};

exports.getCollabs = async (req, res, next) => {
  try {
    const collabs = await collabService.getCollabsForUniversity(req.university.universityId);
    res.status(200).json(new ApiResponse(true, "Collaboration requests fetched", collabs));
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const collab = await collabService.updateStatus(req.params.id, req.body);
    res.status(200).json(new ApiResponse(true, `Collaboration ${req.body.status}`, collab));
  } catch (err) {
    next(err);
  }
};