const mongoose = require('mongoose');

const AnalysisResultSchema = new mongoose.Schema({
  analysisId: {
    type: String,
    index: true
  },
  candidate: {
    name: { type: String, default: 'Candidate Profile' },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    linkedin: { type: String, default: null },
    github: { type: String, default: null }
  },
  targetJob: {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    requiredSkills: [{ type: String }]
  },
  atsScore: {
    overallScore: { type: Number, required: true },
    percentage: { type: Number, required: true },
    tier: { type: String },
    breakdown: {
      keywordMatch: mongoose.Schema.Types.Mixed,
      semanticSimilarity: mongoose.Schema.Types.Mixed,
      sectionCompleteness: mongoose.Schema.Types.Mixed,
      formattingReadability: mongoose.Schema.Types.Mixed
    },
    weights: mongoose.Schema.Types.Mixed
  },
  resumeFeatures: mongoose.Schema.Types.Mixed,
  extractedSkills: [{
    name: String,
    category: String,
    matchedTerm: String
  }],
  extractedSkillNames: [String],
  skillGap: {
    missingCount: Number,
    missingSkills: [String],
    matchedCount: Number,
    matchedSkills: [String]
  },
  feedback: [mongoose.Schema.Types.Mixed],
  careerRecommendations: mongoose.Schema.Types.Mixed,
  geminiInsights: mongoose.Schema.Types.Mixed,
  resumeText: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('AnalysisResult', AnalysisResultSchema);
