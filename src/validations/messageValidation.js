const Joi = require("joi");

exports.createThread = Joi.object({
  participants: Joi.array()
    .items(
      Joi.object({
        refId: Joi.string().required(),
        refModel: Joi.string().valid("Recruiter", "University").required(),
      })
    )
    .min(2)
    .required(),
  subject: Joi.string().optional(),
});

exports.sendMessage = Joi.object({
  body: Joi.string().required(),
  attachments: Joi.array().items(Joi.string().uri()).optional(),
});