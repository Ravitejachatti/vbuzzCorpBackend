const Corporate = require("../models/Corporate");

const ApiError = require("../utils/ApiError");
const { hashPassword, comparePassword } = require("../utils/password");
const getTenantModels = require("../models/tenantModels");
const RecruiterGlobal = require("../models/RecruiterGlobal");
const { generateTokens, verifyRefreshToken, isValidRefreshToken, invalidateRefreshToken } = require("../utils/token");

exports.signupFirstRecruiter = async (corporateData, recruiterData) => {
  // Step 1: Create corporate in global DB
  const corporate = await Corporate.create({
    ...corporateData,
    dbName: corporateData.domain.split(".")[0], // derive dbName safely
  });

  // Step 2: Init tenant models
  console.log("Initializing tenant models for DB:", corporate.dbName);
  const { Recruiter } = await getTenantModels(corporate.dbName);

  // Step 3: Create recruiter in tenant DB
  const hashedPassword = await hashPassword(recruiterData.password);
  const recruiter = await Recruiter.create({
    ...recruiterData,
    password: hashedPassword,
    corporateId: corporate._id,
    isFirstRecruiter: true,
  });

  // Step 4: Register recruiter in global index
  await RecruiterGlobal.create({
    _id: recruiter._id,
    corporateId: corporate._id,
    dbName: corporate.dbName,
    email: recruiter.email,
  });

  // Generate tokens for the new recruiter and add the dbname also
  const tokens = generateTokens(recruiter, corporate.dbName);

  return { corporate, recruiter, tokens };
};

exports.signupRecruiter = async (corporateId, recruiterData) => {
  const corporate = await Corporate.findById(corporateId);
  if (!corporate) throw new ApiError(404, "Corporate not found");

  const { Recruiter } = await getTenantModels(corporate.dbName);

  const hashedPassword = await hashPassword(recruiterData.password);
  const recruiter = await Recruiter.create({
    ...recruiterData,
    password: hashedPassword,
    corporateId,
    isFirstRecruiter: false,
  });

  await RecruiterGlobal.create({
    _id: recruiter._id,
    corporateId,
    dbName: corporate.dbName,
    email: recruiter.email,
  });

  // Generate tokens for the new recruiter
  const tokens = generateTokens(recruiter, corporate.dbName);

  return { recruiter, tokens };
};

exports.login = async (email, password) => {
  // Lookup recruiter in global DB
  const recruiterMeta = await RecruiterGlobal.findOne({ email });
  if (!recruiterMeta) throw new ApiError(401, "Invalid email or password");

  // Switch to tenant DB
  console.log("Recruiter found:", recruiterMeta);
  const { Recruiter } = await getTenantModels(recruiterMeta.dbName);
  const recruiter = await Recruiter.findOne({ email });
  if (!recruiter) throw new ApiError(401, "Invalid email or password");
  console.log("Recruiter found:", recruiter);
  console.log("email and password", email, password, recruiter.password)
  const isMatch = await comparePassword(password, recruiter.password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");
  console.log("dbName:", recruiterMeta.dbName);
  const tokens = generateTokens(recruiter, recruiterMeta.dbName);

  return { recruiter, tokens, dbName: recruiterMeta.dbName };
};

exports.refreshToken = async (token) => {
  console.log("Received refresh token:", token);
  if (!isValidRefreshToken(token)) throw new ApiError(403, "Invalid refresh token");

  const decoded = verifyRefreshToken(token);
  console.log("Decoded refresh token:", decoded);

  // First find the recruiter in global index
  const recruiterMeta = await RecruiterGlobal.findOne({ _id: decoded.id });
  if (!recruiterMeta) throw new ApiError(404, "Recruiter not found in global index");

  // Get the tenant-specific Recruiter model
  const { Recruiter } = await getTenantModels(recruiterMeta.dbName);
  
  // Now find the recruiter in the tenant DB
  const recruiter = await Recruiter.findById(decoded.id);
  if (!recruiter) throw new ApiError(404, "Recruiter not found");

  invalidateRefreshToken(token);
  const tokens = generateTokens(recruiter, recruiterMeta.dbName);

  return tokens;
};

exports.logout = async (token) => {
  invalidateRefreshToken(token);
};