const Job = require("../models/Job");

// Create Job
const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description, employer } = req.body;

    const job = new Job({
      title,
      company,
      location,
      salary,
      description,
      employer,
    });

    await job.save();

    res.status(201).json({
      message: "Job Posted Successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Jobs
// Get All Jobs with Search
const getJobs = async (req, res) => {
  try {

    const keyword = req.query.search
      ? {
          $or: [
            {
              title: {
                $regex: req.query.search,
                $options: "i",
              },
            },
            {
              company: {
                $regex: req.query.search,
                $options: "i",
              },
            },
            {
              location: {
                $regex: req.query.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const jobs = await Job.find(keyword);

    res.status(200).json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Single Job
const getSingleJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found"
      });
    }

    res.status(200).json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createJob,
  getJobs,
  getSingleJob,
};