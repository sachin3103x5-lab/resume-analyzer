/**
 * Career Recommendation Module (Research Paper Section IV-F & Table III)
 * Equations: Match_i = Sim(Vr, Vi), Rrec = TopK(Match_i)
 */

const { JOB_ROLE_TEMPLATES } = require('./jobRoleTemplates');
const { computeCosineSimilarity, buildFrequencyVector } = require('./semanticMatcher');
const { preprocessTokens } = require('./preprocessor');

/**
 * Computes suitability score Match_i = Sim(Vr, Vi) for a candidate profile against standard job roles
 */
function recommendCareers(resumeParsed, preferences = {}) {
  const {
    preferredLocation = 'Any', // e.g. 'Remote', 'Bengaluru', 'San Francisco'
    preferredSalary = 'Any',   // e.g. 'Standard', 'High', '$100k+'
    topK = 5
  } = preferences;

  const candidateSkills = new Set(resumeParsed.extractedSkillNames.map(s => s.toLowerCase()));
  const candidateTokens = resumeParsed.tokens;
  const candidateVec = buildFrequencyVector(candidateTokens);

  const scoredRoles = JOB_ROLE_TEMPLATES.map(role => {
    // 1. Skill overlap calculation
    const coreMatches = role.coreSkills.filter(s => candidateSkills.has(s.toLowerCase()));
    const secondaryMatches = role.secondarySkills.filter(s => candidateSkills.has(s.toLowerCase()));
    
    const missingCore = role.coreSkills.filter(s => !candidateSkills.has(s.toLowerCase()));
    const missingSecondary = role.secondarySkills.filter(s => !candidateSkills.has(s.toLowerCase()));

    const coreOverlapRatio = role.coreSkills.length > 0 ? (coreMatches.length / role.coreSkills.length) : 0;
    const secondaryOverlapRatio = role.secondarySkills.length > 0 ? (secondaryMatches.length / role.secondarySkills.length) : 0;
    
    const skillScore = (coreOverlapRatio * 0.75) + (secondaryOverlapRatio * 0.25);

    // 2. Text Corpus Semantic Vector Similarity
    const roleText = `${role.title} ${role.domain} ${role.description} ${role.coreSkills.join(' ')} ${role.secondarySkills.join(' ')}`;
    const roleTokens = preprocessTokens(roleText);
    const roleVec = buildFrequencyVector(roleTokens);
    const semanticCosine = computeCosineSimilarity(candidateVec, roleVec);

    // 3. Aggregate Match Score Match_i = Sim(Vr, Vi)
    const rawMatch = (skillScore * 0.65) + (semanticCosine * 0.35);
    const normalizedMatch = Number(Math.min(Math.max(rawMatch, 0.1), 0.98).toFixed(3));
    const matchPercentage = Math.round(normalizedMatch * 100);

    // 4. User Preference Filtering & Multipliers
    let locationFit = true;
    if (preferredLocation && preferredLocation !== 'Any') {
      const locLower = preferredLocation.toLowerCase();
      const hasLoc = role.locationTypes.some(t => t.toLowerCase().includes(locLower)) ||
                     role.topLocations.some(l => l.toLowerCase().includes(locLower));
      locationFit = hasLoc;
    }

    // Determine fit level
    let fitLevel = "Growth Opportunity";
    let fitColor = "blue";
    if (matchPercentage >= 75) {
      fitLevel = "Strong Fit (Ready to Apply)";
      fitColor = "emerald";
    } else if (matchPercentage >= 55) {
      fitLevel = "Moderate Fit (Skill Upskilling Recommended)";
      fitColor = "amber";
    }

    return {
      roleId: role.id,
      title: role.title,
      domain: role.domain,
      description: role.description,
      experienceLevel: role.experienceLevel,
      salaryRange: role.salaryRange,
      marketAvailability: role.marketAvailability,
      locationTypes: role.locationTypes,
      topLocations: role.topLocations,
      similarityScore: normalizedMatch,
      matchPercentage,
      fitLevel,
      fitColor,
      locationFit,
      matchedSkills: [...coreMatches, ...secondaryMatches],
      missingCoreSkills: missingCore,
      missingSecondarySkills: missingSecondary,
      careerTrajectoryNote: `To be highly competitive for this role, prioritize adding hands-on experience in: ${missingCore.slice(0, 3).join(', ') || 'Advanced architecture concepts'}.`
    };
  });

  // Sort descending by similarity match score
  scoredRoles.sort((a, b) => b.similarityScore - a.similarityScore);

  // Return Top-K (Rrec = TopK(Match_i))
  const topRecommendations = scoredRoles.slice(0, topK);

  return {
    top1: topRecommendations[0] || null,
    top3: topRecommendations.slice(0, 3),
    top5: topRecommendations.slice(0, 5),
    allEvaluatedRolesCount: JOB_ROLE_TEMPLATES.length,
    preferenceFiltersApplied: {
      preferredLocation,
      preferredSalary
    }
  };
}

module.exports = {
  recommendCareers
};
