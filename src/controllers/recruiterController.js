const recruiterService = require("../services/recruiterService");
const ApiResponse = require("../utils/ApiResponse");
const validate = require("../middlewares/validateMiddleware");
const recruiterValidation = require("../validations/recruiterValidation");

// Get my profile
exports.getMyProfile = async (req, res, next) => {
  try {
    const recruiter = await recruiterService.getMyProfile(req.user.id);
    res.status(200).json(new ApiResponse(true, "Recruiter profile fetched", recruiter));
  } catch (err) {
    next(err);
  }
};

// Update my profile
exports.updateMyProfile = [
  validate(recruiterValidation.updateProfile),
  async (req, res, next) => {
    try {
      const recruiter = await recruiterService.updateMyProfile(req.user.id, req.body);
      res.status(200).json(new ApiResponse(true, "Recruiter profile updated", recruiter));
    } catch (err) {
      next(err);
    }
  },
];

// Get recruiters of a corporate
exports.getRecruitersByCorporate = async (req, res, next) => {
  try {
    const recruiters = await recruiterService.getRecruitersByCorporate(req.params.corporateId);
    res.status(200).json(new ApiResponse(true, "Recruiters fetched", recruiters));
  } catch (err) {
    next(err);
  }
};