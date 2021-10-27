const Job = require('../models/jobModel');
const CustomError = require('../utils/customError');

//* @DESC    Get all user jobs
//* @ROUTE   GET /api/v1/Jobs
//* @ACCESS  PRIVATE
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.userId });

  res.status(200).json({ count: jobs.length, jobs });
};

//* @DESC    Get single user jobs
//* @ROUTE   GET /api/v1/Jobs/:id
//* @ACCESS  PRIVATE
const getSingleJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, createdBy: req.userId });

  if (!job) {
    throw new CustomError(`Job with id: ${req.params.id} not found`, 404);
  }

  res.status(200).json({ job });
};

//* @DESC    Create user jobs
//* @ROUTE   POST /api/v1/Jobs
//* @ACCESS  PRIVATE
const createJob = async (req, res) => {
  req.body.createdBy = req.userId;

  const job = await Job.create(req.body);

  res.status(201).json({ job });
};

//* @DESC    Update single user jobs
//* @ROUTE   PATCH /api/v1/Jobs/:id
//* @ACCESS  PRIVATE
const updateSingleJob = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new CustomError(`Job with id: ${req.params.id} not found`, 404);
  }

  res.status(200).json({ job });
};

//* @DESC    Delete single user jobs
//* @ROUTE   DELETE /api/v1/Jobs/:id
//* @ACCESS  PRIVATE
const deleteSingleJob = async (req, res) => {
  const job = await Job.findOneAndRemove({
    _id: req.params.id,
    createdBy: req.userId,
  });

  if (!job) {
    throw new CustomError(`Job with id: ${req.params.id} not found`, 404);
  }

  res.status(200).json({ job });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateSingleJob,
  deleteSingleJob,
};
