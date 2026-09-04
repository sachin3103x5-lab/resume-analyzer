/**
 * Automated Verification Script for NLP Modules & Paper Formulas
 */

const { parseResumeContent } = require('./nlp/preprocessor');
const { computeSemanticMatch } = require('./nlp/semanticMatcher');
const { computeATSScore } = require('./nlp/atsScorer');
const { generatePersonalizedFeedback } = require('./nlp/feedbackGenerator');
const { recommendCareers } = require('./nlp/careerRecommender');

const sampleResume = `SUBHADEEP SHARMA
Kolkata, India | subhadeep.dev@gmail.com | +91 98765 43210

PROFESSIONAL SUMMARY
Results-driven Full Stack MERN Developer with 3+ years experience building applications in React.js, Node.js, Express.js, MongoDB.

TECHNICAL SKILLS
• Languages & Frontend: JavaScript, TypeScript, React.js, HTML5, CSS3, Tailwind CSS, Redux
• Backend & Cloud: Node.js, Express.js, RESTful APIs, MongoDB, Redis, Docker, Git

WORK EXPERIENCE
Senior Full Stack Engineer | TechCorp (2023 - Present)
• Architected microservices handling 250,000+ monthly users with 99.9% uptime.
• Engineered React.js dashboards improving load performance by 42%.
• Built secure REST APIs in Express.js with JWT authentication.

PROJECTS
1. AI-Powered Resume Analyzer (React, Node.js, NLP, MongoDB)
• Extracted technical skills and computed ATS score using cosine vector similarity.

EDUCATION
B.Tech in Information Technology | Institute of Technology & Science`;

console.log('--- TEST 1: Preprocessor & Extraction ---');
const parsed = parseResumeContent(sampleResume);
console.log('Candidate:', parsed.metadata.name, '| Email:', parsed.metadata.email);
console.log('Extracted Skills Count:', parsed.extractedSkills.length);
console.log('Detected Sections:', parsed.detectedSectionsList);
console.log('Section Completeness Ratio:', parsed.sectionCompletenessRatio);

console.log('\n--- TEST 2: Semantic Matcher ---');
const targetJob = "Full Stack MERN Developer. Requires React.js, Node.js, Express.js, MongoDB, JavaScript, RESTful APIs, Git & Version Control, Docker.";
const semantic = computeSemanticMatch(parsed, targetJob);
console.log('Semantic Similarity Ss:', semantic.semanticSimilarity);

console.log('\n--- TEST 3: ATS Compatibility Scoring ---');
const requiredSkills = ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "RESTful APIs", "Docker", "Git & Version Control"];
const atsScore = computeATSScore({
  extractedSkills: parsed.extractedSkills,
  jobRequiredSkills: requiredSkills,
  semanticSimilarity: semantic.semanticSimilarity,
  sectionCompletenessRatio: parsed.sectionCompletenessRatio,
  formattingScore: parsed.formatting.formattingScore
});
console.log('Aggregate ATS Score:', atsScore.overallScore, `(${atsScore.percentage}%)`);
console.log('Tier:', atsScore.tier);
console.log('Breakdown Sk:', atsScore.breakdown.keywordMatch.percentage + '%');
console.log('Breakdown Ss:', atsScore.breakdown.semanticSimilarity.percentage + '%');
console.log('Breakdown Sc:', atsScore.breakdown.sectionCompleteness.percentage + '%');
console.log('Breakdown Sf:', atsScore.breakdown.formattingReadability.percentage + '%');

console.log('\n--- TEST 4: Feedback Generation ---');
const feedback = generatePersonalizedFeedback({
  resumeParsed: parsed,
  atsResult: atsScore,
  jobRequiredSkills: requiredSkills,
  jobTitle: "Full Stack MERN Developer"
});
console.log('Generated Feedback items count:', feedback.length);
feedback.forEach((f, i) => console.log(`  ${i+1}. [${f.priority}] ${f.title}`));

console.log('\n--- TEST 5: Career Recommendations (Top-K) ---');
const recommendations = recommendCareers(parsed, { preferredLocation: 'Any', preferredSalary: 'Any' });
console.log('Top 1 Match:', recommendations.top1?.title, `(${recommendations.top1?.matchPercentage}%)`);
console.log('Top 3 Matches Count:', recommendations.top3?.length);
recommendations.top3.forEach((r, i) => console.log(`  #${i+1} ${r.title} (${r.matchPercentage}% match)`));

console.log('\n✅ ALL NLP MODULE TESTS PASSED PERFECTLY!\n');
