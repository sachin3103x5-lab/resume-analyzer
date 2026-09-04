/**
 * ATS Compatibility Scoring Engine
 * 
 * Formula (from Research Paper Section IV-D & Table II):
 * ATS_score = alpha * Sk + beta * Ss + gamma * Sc + delta * Sf
 * 
 * Weights:
 * - alpha = 0.30 (Keyword Matching Score Sk)
 * - beta  = 0.35 (Semantic Similarity Score Ss)
 * - gamma = 0.20 (Section Completeness Score Sc)
 * - delta = 0.15 (Formatting & Readability Score Sf)
 * Total weight = 1.00
 */

const WEIGHTS = {
  ALPHA: 0.30, // Keyword Match
  BETA:  0.35, // Semantic Match
  GAMMA: 0.20, // Section Completeness
  DELTA: 0.15  // Formatting & Readability
};

/**
 * Calculates keyword matching score: Sk = |E ∩ Kj| / |Kj|
 */
function calculateKeywordScore(extractedSkills, requiredKeywords) {
  if (!requiredKeywords || requiredKeywords.length === 0) {
    return {
      score: 1.0,
      matchedSkills: extractedSkills.map(s => s.name || s),
      missingSkills: []
    };
  }

  const extractedSet = new Set(
    extractedSkills.map(s => (typeof s === 'string' ? s : s.name).toLowerCase().trim())
  );

  const matched = [];
  const missing = [];

  for (const req of requiredKeywords) {
    const reqName = (typeof req === 'string' ? req : req.name).trim();
    if (extractedSet.has(reqName.toLowerCase())) {
      matched.push(reqName);
    } else {
      missing.push(reqName);
    }
  }

  const score = requiredKeywords.length > 0 ? (matched.length / requiredKeywords.length) : 1.0;

  return {
    score: Number(Math.min(score, 1.0).toFixed(3)),
    matchedSkills: matched,
    missingSkills: missing,
    totalRequired: requiredKeywords.length,
    totalMatched: matched.length
  };
}

/**
 * Compute Section Completeness Score Sc = Np / Nt
 */
function calculateSectionCompletenessScore(sectionCompletenessRatio) {
  return Number(Math.min(Math.max(sectionCompletenessRatio, 0.25), 1.0).toFixed(3));
}

/**
 * Master ATS Score aggregator
 */
function computeATSScore(params) {
  const {
    extractedSkills = [],
    jobRequiredSkills = [],
    semanticSimilarity = 0.5,
    sectionCompletenessRatio = 0.75,
    formattingScore = 0.75
  } = params;

  // 1. Keyword Matching (Sk)
  const keywordResult = calculateKeywordScore(extractedSkills, jobRequiredSkills);
  const Sk = keywordResult.score;

  // 2. Semantic Similarity (Ss)
  const Ss = Number(Math.min(Math.max(semanticSimilarity, 0), 1.0).toFixed(3));

  // 3. Section Completeness (Sc)
  const Sc = calculateSectionCompletenessScore(sectionCompletenessRatio);

  // 4. Formatting & Readability (Sf)
  const Sf = Number(Math.min(Math.max(formattingScore, 0), 1.0).toFixed(3));

  // Weighted Calculation: ATS_score = alpha*Sk + beta*Ss + gamma*Sc + delta*Sf
  const rawATSScore = (
    WEIGHTS.ALPHA * Sk +
    WEIGHTS.BETA  * Ss +
    WEIGHTS.GAMMA * Sc +
    WEIGHTS.DELTA * Sf
  );

  const finalATSScore = Number(rawATSScore.toFixed(3));
  const finalPercentage = Math.round(finalATSScore * 100);

  // Qualitative tier determination
  let tier = "Needs Improvement";
  let tierColor = "amber";
  if (finalPercentage >= 85) {
    tier = "ATS Compliant & Highly Competitive";
    tierColor = "emerald";
  } else if (finalPercentage >= 70) {
    tier = "Good Match (Minor Tweaks Needed)";
    tierColor = "blue";
  } else if (finalPercentage >= 50) {
    tier = "Average (Skill & Structure Gaps)";
    tierColor = "yellow";
  } else {
    tier = "High Risk of ATS Rejection";
    tierColor = "rose";
  }

  return {
    overallScore: finalATSScore,
    percentage: finalPercentage,
    tier,
    tierColor,
    breakdown: {
      keywordMatch: {
        rawScore: Sk,
        percentage: Math.round(Sk * 100),
        weight: WEIGHTS.ALPHA,
        weightedContribution: Number((WEIGHTS.ALPHA * Sk).toFixed(3)),
        matchedCount: keywordResult.matchedSkills.length,
        totalRequired: keywordResult.totalRequired,
        matched: keywordResult.matchedSkills,
        missing: keywordResult.missingSkills
      },
      semanticSimilarity: {
        rawScore: Ss,
        percentage: Math.round(Ss * 100),
        weight: WEIGHTS.BETA,
        weightedContribution: Number((WEIGHTS.BETA * Ss).toFixed(3))
      },
      sectionCompleteness: {
        rawScore: Sc,
        percentage: Math.round(Sc * 100),
        weight: WEIGHTS.GAMMA,
        weightedContribution: Number((WEIGHTS.GAMMA * Sc).toFixed(3))
      },
      formattingReadability: {
        rawScore: Sf,
        percentage: Math.round(Sf * 100),
        weight: WEIGHTS.DELTA,
        weightedContribution: Number((WEIGHTS.DELTA * Sf).toFixed(3))
      }
    },
    weights: WEIGHTS
  };
}

module.exports = {
  WEIGHTS,
  calculateKeywordScore,
  calculateSectionCompletenessScore,
  computeATSScore
};
