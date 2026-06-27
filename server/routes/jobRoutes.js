const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  getSingleJob,
} = require("../controllers/jobController");
// Create Job
router.post("/create", createJob);
// Get All Jobs
router.get("/", getJobs);
// Get Single Job
router.get("/:id", getSingleJob);

module.exports = router;