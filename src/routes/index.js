// src/routes/index.js
const express = require("express");
const router = express.Router();

router.use("/corporates", require("./corporateRoutes"));
router.use("/recruiters", require("./recruiterRoutes"));
router.use("/collabs", require("./collabRoutes"));
router.use("/jobs", require("./jobRoutes"));
router.use("/jobcollabs", require("./jobCollabRoutes"));
router.use("/messages", require("./messageRoutes"));
router.use("/auth", require("./authRoutes"));

module.exports = router;