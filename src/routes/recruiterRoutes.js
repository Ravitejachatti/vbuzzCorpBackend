// src/routes/recruiterRoutes.js
const express = require("express");
const router = express.Router();
const recruiterController = require("../controllers/recruiterController");
const { authMiddleware } = require("../middlewares/authmiddleware");
const asyncHandler = require("../middlewares/asyncHandler");

// router.post("/", authMiddleware(["Corporate", "Admin"]), asyncHandler(recruiterController.createRecruiter));
// router.get("/:id", authMiddleware(["Admin", "Corporate"]), asyncHandler(recruiterController.getRecruiterById));
// router.put("/:id", authMiddleware(["Corporate", "Admin"]), asyncHandler(recruiterController.updateRecruiter));
// router.delete("/:id", authMiddleware(["Corporate", "Admin"]), asyncHandler(recruiterController.deleteRecruiter));


// Logged-in recruiter profile
router.get("/me", authMiddleware(["Recruiter"]), asyncHandler(recruiterController.getMyProfile));
router.put("/me", authMiddleware(["Recruiter"]), asyncHandler(recruiterController.updateMyProfile));

// Public: recruiters of a corporate
router.get("/corporate/:corporateId", asyncHandler(recruiterController.getRecruitersByCorporate));

module.exports = router;