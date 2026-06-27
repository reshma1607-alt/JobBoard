const express = require("express");
const router = express.Router();

const upload = require("../config/multer");

const {
  applyJob,
  getApplications,
} = require("../controllers/applicationController");

// Apply for Job
router.post(
  "/apply",
  upload.single("resume"),
  applyJob
);

// Get All Applications
router.get("/", getApplications);

module.exports = router;