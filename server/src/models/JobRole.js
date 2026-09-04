const mongoose = require('mongoose');

const JobRoleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  experienceLevel: { type: String, default: 'Mid Level' },
  salaryRange: {
    usd: { type: String, default: '$90,000 - $140,000' },
    inr: { type: String, default: '₹9,00,000 - ₹20,00,000' }
  },
  locationTypes: [{ type: String }],
  topLocations: [{ type: String }],
  coreSkills: [{ type: String }],
  secondarySkills: [{ type: String }],
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobRole', JobRoleSchema);
