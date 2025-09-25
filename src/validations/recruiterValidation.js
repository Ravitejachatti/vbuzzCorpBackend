const Joi = require("joi");

exports.updateProfile = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  designation: Joi.string().optional(),
  linkedInProfile: Joi.string().uri().optional(),
  status: Joi.string().valid("Active", "Suspended").optional(),
});