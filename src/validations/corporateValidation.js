const Joi = require("joi");

exports.updateCorporate = Joi.object({
  name: Joi.string().optional(),
  entityType: Joi.string().optional(),
  logoUrl: Joi.string().uri().optional(),
  website: Joi.string().uri().optional(),
  officialEmail: Joi.string().email().optional(),
  contactNumber: Joi.string().optional(),
  turnover: Joi.number().optional(),
  sector: Joi.string().optional(),
  subSectors: Joi.array().items(Joi.string()).optional(),
  headquarters: Joi.object({
    global: Joi.string().optional(),
    india: Joi.string().optional(),
    geo: Joi.object({
      lat: Joi.number(),
      lng: Joi.number(),
    }).optional(),
  }).optional(),
  documents: Joi.object({
    gstCertificate: Joi.string().optional(),
    companyProfile: Joi.string().optional(),
    annualReport: Joi.string().optional(),
    csrPolicy: Joi.string().optional(),
    hiringTerms: Joi.string().optional(),
  }).optional(),
});