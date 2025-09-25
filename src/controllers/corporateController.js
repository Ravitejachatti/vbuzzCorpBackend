const corporateService = require("../services/corporateService");
const ApiResponse = require("../utils/ApiResponse");
const validate = require("../middlewares/validateMiddleware");
const corporateValidation = require("../validations/corporateValidation");

exports.getCorporates = async (req, res, next) => {
  try {
    const corporates = await corporateService.getCorporates();
    res.status(200).json(new ApiResponse(true, "Corporates fetched", corporates));
  } catch (err) {
    next(err);
  }
};

exports.getCorporateById = async (req, res, next) => {
  try {
    const corporate = await corporateService.getCorporateById(req.params.id);
    res.status(200).json(new ApiResponse(true, "Corporate fetched", corporate));
  } catch (err) {
    next(err);
  }
};

exports.updateCorporate = [
  validate(corporateValidation.updateCorporate),
  async (req, res, next) => {
    try {
      const corporate = await corporateService.updateCorporate(req.params.id, req.body, req.user);
      res.status(200).json(new ApiResponse(true, "Corporate updated", corporate));
    } catch (err) {
      next(err);
    }
  },
];