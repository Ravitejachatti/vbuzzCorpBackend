// src/config/env.js
const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config();

// Schema to validate environment variables
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default("1d"),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().default("7d"),
  REDIS_URL: Joi.string().uri(),
  CLOUDINARY_URL: Joi.string(),
  SMTP_HOST: Joi.string(),
  SMTP_PORT: Joi.number(),
  SMTP_USER: Joi.string(),
  SMTP_PASS: Joi.string(),
  UNIVERSITY_PUBLIC_KEY: Joi.string().required(),
  UNIVERSITY_API_URL: Joi.string().uri().required(),
}).unknown();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
    refreshSecret: envVars.REFRESH_TOKEN_SECRET,
    refreshExpiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
  },
  universityJwt: {
    publicKey: envVars.UNIVERSITY_PUBLIC_KEY,
    apiUrl: envVars.UNIVERSITY_API_URL,
  },
  redisUrl: envVars.REDIS_URL,
  cloudinaryUrl: envVars.CLOUDINARY_URL,
  smtp: {
    host: envVars.SMTP_HOST,
    port: envVars.SMTP_PORT,
    user: envVars.SMTP_USER,
    pass: envVars.SMTP_PASS,
  },
};