// src/routes/corporateRoutes.js
const express = require("express");
const router = express.Router();
const corporateController = require("../controllers/corporateController");
const {authMiddleware} = require("../middlewares/authmiddleware");
const asyncHandler = require("../middlewares/asyncHandler");

// Corporate CRUD
// router.post("/", authMiddleware(["Admin"]), asyncHandler(corporateController.createCorporate));
// router.get("/", authMiddleware(["Admin"]), asyncHandler(corporateController.getCorporates));
// router.get("/:id", authMiddleware(["Admin", "Corporate"]), asyncHandler(corporateController.getCorporateById));
// router.put("/:id", authMiddleware(["Admin"]), asyncHandler(corporateController.updateCorporate));
// router.delete("/:id", authMiddleware(["Admin"]), asyncHandler(corporateController.deleteCorporate));
// Public: corporates listing (for recruiter signup or analytics)
router.get("/", asyncHandler(corporateController.getCorporates));
router.get("/:id", asyncHandler(corporateController.getCorporateById));

// Only first recruiter of a corporate can update corporate details
router.put("/:id", authMiddleware(["Recruiter"]), asyncHandler(corporateController.updateCorporate));

module.exports = router;