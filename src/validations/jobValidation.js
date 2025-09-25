const Joi = require("joi");

exports.createJob = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  closingDate: Joi.date().greater("now").required(),
  visibility: Joi.string().valid("Public", "University").default("Public"),
  status: Joi.string().valid("Open", "Closed").default("Open"),
});

exports.updateJob = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  closingDate: Joi.date().greater("now").optional(),
  visibility: Joi.string().valid("Public", "University").optional(),
  status: Joi.string().valid("Open", "Closed").optional(),
});

exports.applyJob = Joi.object({
  universityId: Joi.string().required(),
  studentRef: Joi.object({
    universityId: Joi.string().required(),
    studentId: Joi.string().required(),
  }).required(),
});