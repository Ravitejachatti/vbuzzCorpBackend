const authService = require("../services/authService");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

/**
 * First recruiter signup (creates corporate + recruiter)
 */
exports.signupFirstRecruiter = async (req, res, next) => {
  try {
    const { corporateData, recruiterData } = req.body;
    
    const result = await authService.signupFirstRecruiter(corporateData, recruiterData);
    res
      .status(201)
      .json(new ApiResponse(true, "First recruiter & corporate created", result));
  } catch (err) {
    next(err);
  }
};

/**
 * Subsequent recruiter signup
 */
exports.signupRecruiter = async (req, res, next) => {
  try {
    const { corporateId, recruiterData } = req.body;
    const result = await authService.signupRecruiter(corporateId, recruiterData);
    res.status(201).json(new ApiResponse(true, "Recruiter registered", result));
  } catch (err) {
    next(err);
  }
};

/**
 * Login recruiter
 */
exports.login = async (req, res, next) => {
  try {
    console.log("Login request received");
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);
    const result = await authService.login(email, password);
    res.status(200).json(new ApiResponse(true, "Login successful", result));
  } catch (err) {
    next(err);
  }
};

/**
 * Refresh token
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.status(200).json(new ApiResponse(true, "Token refreshed", result));
  } catch (err) {
    next(err);
  }
};

/**
 * Logout
 */
exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.status(200).json(new ApiResponse(true, "Logged out"));
  } catch (err) {
    next(err);
  }
};