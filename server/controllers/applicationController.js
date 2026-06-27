const Application = require("../models/Application");
const User = require("../models/User");
const Job = require("../models/Job");
const sendEmail = require("../config/email");

// Apply for Job
const applyJob = async (req, res) => {
  try {
    const { candidate, job } = req.body;

    const existingApplication = await Application.findOne({
      candidate,
      job,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
      });
    }

    const application = new Application({
      candidate,
      job,
      resume: req.file ? req.file.filename : "",
    });

    await application.save();
    const candidateUser = await User.findById(candidate);
const appliedJob = await Job.findById(job);

await sendEmail(
  candidateUser.email,
  "Job Application Submitted",
  `Hello ${candidateUser.name},

Your application for "${appliedJob.title}" at "${appliedJob.company}" has been submitted successfully.

Thank you for using Job Board.

Best Regards,
Job Board Team`
);

    res.status(201).json({
      message: "Application Submitted Successfully",
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Applications
const getApplications = async (req, res) => {
  try {

    const applications = await Application.find()
      .populate("candidate", "name email")
      .populate("job", "title company");

    res.status(200).json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  applyJob,
  getApplications,
};