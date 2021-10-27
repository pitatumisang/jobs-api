const express = require('express');
const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateSingleJob,
  deleteSingleJob,
} = require('../controllers/jobController');

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getSingleJob);
router.post('/', createJob);
router.patch('/:id', updateSingleJob);
router.delete('/:id', deleteSingleJob);

module.exports = router;
