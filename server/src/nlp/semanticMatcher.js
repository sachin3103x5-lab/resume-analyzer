/**
 * NLP-Based Semantic Feature Extraction & Contextual Vector Space Matching
 * Equations: Vr = f(Tc), Vj = f(J), Sim(Vr, Vj) = (Vr . Vj) / (|Vr| |Vj|)
 */

const natural = require('natural');
const { preprocessTokens } = require('./preprocessor');
const { extractOntologySkills } = require('./skillOntology');

/**
 * Builds term frequency vector for a given token set
 */
function buildFrequencyVector(tokens) {
  const tf = new Map();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  return tf;
}

/**
 * Computes Cosine Similarity between two term-frequency vectors
 * Sim(Vr, Vj) = (Vr . Vj) / (|Vr| |Vj|)
 */
function computeCosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const [term, valA] of vecA.entries()) {
    normA += valA * valA;
    if (vecB.has(term)) {
      dotProduct += valA * vecB.get(term);
    }
  }

  for (const [, valB] of vecB.entries()) {
    normB += valB * valB;
  }

  if (normA === 0 || normB === 0) return 0;

  const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  return Math.min(Math.max(similarity, 0), 1.0);
}

/**
 * Contextual Semantic Matcher with Skill Entity Boosting
 * Combines term-frequency embedding representation with skill-concept space
 */
function computeSemanticMatch(resumeParsed, targetJobText) {
  const jobTokens = preprocessTokens(targetJobText);
  const jobSkills = extractOntologySkills(targetJobText);
  const resumeTokens = resumeParsed.tokens;
  const resumeSkills = resumeParsed.extractedSkills;

  // 1. Text corpus vector representation Vr & Vj
  const vecResume = buildFrequencyVector(resumeTokens);
  const vecJob = buildFrequencyVector(jobTokens);

  // Boost extracted technical skills in vectors to capture semantic prominence
  resumeSkills.forEach(s => {
    const sTokens = preprocessTokens(s.name);
    sTokens.forEach(st => vecResume.set(st, (vecResume.get(st) || 0) + 3));
  });

  jobSkills.forEach(s => {
    const sTokens = preprocessTokens(s.name);
    sTokens.forEach(st => vecJob.set(st, (vecJob.get(st) || 0) + 3));
  });

  // Calculate text vector cosine similarity Sim(Vr, Vj)
  const baseCosine = computeCosineSimilarity(vecResume, vecJob);

  // 2. Skill Category Distribution Alignment
  const resumeCategories = new Set(resumeSkills.map(s => s.category));
  const jobCategories = new Set(jobSkills.map(s => s.category));
  
  let categoryOverlap = 1.0;
  if (jobCategories.size > 0) {
    let matchedCatCount = 0;
    for (const cat of jobCategories) {
      if (resumeCategories.has(cat)) matchedCatCount++;
    }
    categoryOverlap = matchedCatCount / jobCategories.size;
  }

  // Combine with semantic weight
  const semanticScore = Number((baseCosine * 0.75 + categoryOverlap * 0.25).toFixed(3));
  
  // Normalized score between 0.0 - 1.0
  const normalizedScore = Math.min(Math.max(semanticScore, 0.05), 0.98);

  return {
    semanticSimilarity: normalizedScore,
    jobSkills,
    jobSkillNames: jobSkills.map(s => s.name),
    resumeSkills,
    resumeSkillNames: resumeSkills.map(s => s.name),
    sharedTokensCount: Array.from(vecResume.keys()).filter(k => vecJob.has(k)).length
  };
}

module.exports = {
  buildFrequencyVector,
  computeCosineSimilarity,
  computeSemanticMatch
};
