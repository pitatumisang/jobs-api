const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'interview', 'rejected'],
      message: '{VALUE} is not supported',
    },
    default: 'pending',
  },
});

module.exports = mongoose.model('Jobs', JobSchema);
