const Joi = require("joi");

exports.createCollab = Joi.object({
  universityId: Joi.string().required(),
});

exports.updateCollabStatus = Joi.object({
  status: Joi.string().valid("Pending", "Accepted", "Rejected").required(),
});