const Joi = require("joi");

// Corporate details for first recruiter signup
const corporateSchema = Joi.object({
  name: Joi.string().required(),
  domain: Joi.string().domain().required(),
  officialEmail: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  website: Joi.string().uri().optional(),
});

// Recruiter details
const recruiterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  designation: Joi.string().optional(),
  password: Joi.string().min(6).required(),
});

exports.signupFirst = Joi.object({
  corporateData: corporateSchema.required(),
  recruiterData: recruiterSchema.required(),
});

exports.signup = Joi.object({
  corporateId: Joi.string().hex().length(24).required(),
  recruiterData: recruiterSchema.required(),
});

exports.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.refreshToken = Joi.object({
  refreshToken: Joi.string().required(),
});

exports.logout = Joi.object({
  refreshToken: Joi.string().required(),
});