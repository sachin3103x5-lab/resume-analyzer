const mongoose = require('mongoose');

/**
 * Stores only the candidate's personal details extracted from their resume.
 */
const CandidateProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Candidate Profile',
    trim: true
  },
  email: {
    type: String,
    default: null,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    default: null,
    trim: true
  },
  linkedin: {
    type: String,
    default: null,
    trim: true
  },
  github: {
    type: String,
    default: null,
    trim: true
  },
  targetJobTitle: {
    type: String,
    default: null,
    trim: true
  },
  atsScore: {
    type: Number,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('CandidateProfile', CandidateProfileSchema);
