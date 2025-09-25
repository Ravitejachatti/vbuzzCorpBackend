const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const asyncHandler = require("../middlewares/asyncHandler");
const validate = require("../middlewares/validateMiddleware");
const authValidation = require("../validations/authValidation");

// First recruiter → creates corporate
router.post(
  "/signup-first",
  validate(authValidation.signupFirst),
  asyncHandler(authController.signupFirstRecruiter)
);

// Subsequent recruiters → join existing corporate
router.post(
  "/signup",
  validate(authValidation.signup),
  asyncHandler(authController.signupRecruiter)
);

// Login
router.post(
  "/login",
  validate(authValidation.login),
  asyncHandler(authController.login)
);

// Refresh token
router.post(
  "/refresh-token",
  validate(authValidation.refreshToken),
  asyncHandler(authController.refreshToken)
);

// Logout
router.post(
  "/logout",
  validate(authValidation.logout),
  asyncHandler(authController.logout)
);

module.exports = router;