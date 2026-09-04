/**
 * Resume Acquisition, Cleaning, Preprocessing & Section Detection
 * Equations: T = P(R), Tc = {w1, w2, ..., wn}
 */

const natural = require('natural');
const { extractOntologySkills } = require('./skillOntology');

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can\'t', 'cannot', 'could',
  'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few', 'for',
  'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s',
  'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m',
  'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours',
  'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t',
  'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
  'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too',
  'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t',
  'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s',
  'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself',
  'yourselves'
]);

const ACTION_VERBS = new Set([
  'architected', 'developed', 'engineered', 'implemented', 'designed', 'optimized', 'led', 'spearheaded',
  'managed', 'built', 'created', 'deployed', 'orchestrated', 'streamlined', 'reduced', 'increased',
  'improved', 'automated', 'integrated', 'refactored', 'delivered', 'collaborated', 'scaled', 'maintained',
  'analyzed', 'mentored', 'facilitated', 'established', 'launched', 'boosted', 'resolved', 'enhanced'
]);

/**
 * Clean and normalize raw text
 */
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[^\x00-\x7F]/g, ' ') // remove non-ascii characters
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/**
 * Tokenize, remove stopwords, stem/lemmatize -> Tc = {w1, w2, ..., wn}
 */
function preprocessTokens(text) {
  if (!text) return [];
  const tokenizer = new natural.WordTokenizer();
  const rawTokens = tokenizer.tokenize(text.toLowerCase()) || [];
  
  const cleanedTokens = rawTokens
    .filter(t => t.length > 1 && !STOP_WORDS.has(t) && !/^\d+$/.test(t))
    .map(t => natural.PorterStemmer.stem(t));

  return cleanedTokens;
}

/**
 * Rule-based section detection: Skills, Experience, Education, Projects, Certifications
 */
function detectSections(rawText) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  const sectionHeaders = {
    skills: /^(technical\s+skills|core\s+competencies|skills\s*&?\s*technologies|technical\s+proficiencies|key\s+skills|skills)$/i,
    experience: /^(work\s+experience|professional\s+experience|employment\s+history|experience|internships?)$/i,
    education: /^(education|academic\s+background|qualifications|academic\s+credentials)$/i,
    projects: /^(projects|personal\s+projects|key\s+projects|academic\s+projects)$/i,
    certifications: /^(certifications|licenses\s*&?\s*certifications|certificates|courses)$/i,
    summary: /^(professional\s+summary|profile|about\s+me|career\s+objective|summary)$/i
  };

  const detected = {
    summary: '',
    skills: '',
    experience: '',
    education: '',
    projects: '',
    certifications: '',
    other: ''
  };

  let currentSection = 'summary';
  const foundSections = new Set();

  for (const line of lines) {
    let matchedHeader = null;
    for (const [secKey, regex] of Object.entries(sectionHeaders)) {
      if (regex.test(line.replace(/[:\-#*]/g, '').trim())) {
        matchedHeader = secKey;
        break;
      }
    }

    if (matchedHeader) {
      currentSection = matchedHeader;
      foundSections.add(matchedHeader);
    } else {
      detected[currentSection] = (detected[currentSection] || '') + '\n' + line;
    }
  }

  // Count detected standard sections (Total expected Nt = 4 primary: skills, experience, education, projects)
  const expectedPrimary = ['skills', 'experience', 'education', 'projects'];
  const detectedPrimary = expectedPrimary.filter(s => foundSections.has(s) || (detected[s] && detected[s].length > 40));

  return {
    sections: detected,
    detectedSectionsList: Array.from(foundSections),
    detectedPrimaryCount: detectedPrimary.length,
    totalExpectedCount: expectedPrimary.length,
    completenessRatio: detectedPrimary.length / expectedPrimary.length
  };
}

/**
 * Extract contact information, emails, links, phone
 */
function extractCandidateMetadata(rawText) {
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const phoneRegex = /(?:\+?(\d{1,3}))?[-.\s]?(?:\(?(\d{3})\)?[-.\s]?)?(\d{3})[-.\s]?(\d{4})|\b[6-9]\d{9}\b|\b\d{10}\b/;
  const linkedinRegex = /(?:linkedin\.com\/(?:in|company)\/([a-zA-Z0-9_-]+))/i;
  const githubRegex = /(?:github\.com\/([a-zA-Z0-9_-]+))/i;

  const emailMatch = rawText.match(emailRegex);
  const phoneMatch = rawText.match(phoneRegex);
  const linkedinMatch = rawText.match(linkedinRegex);
  const githubMatch = rawText.match(githubRegex);

  // Extract candidate name from first valid header line
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  let candidateName = '';
  for (const line of lines.slice(0, 6)) {
    const cleanL = line.replace(/^(name\s*[:\-]?|resume\s*[:\-]?|cv\s*[:\-]?)\s*/i, '').trim();
    if (
      cleanL.length >= 3 &&
      cleanL.length <= 45 &&
      !cleanL.includes('@') &&
      !cleanL.includes('http') &&
      !/^\+?\d+$/.test(cleanL) &&
      !/^(summary|experience|skills|education|projects|contact|technical)/i.test(cleanL)
    ) {
      candidateName = cleanL.split(/[|•,\/]/)[0].trim();
      break;
    }
  }

  return {
    name: candidateName || (lines.length > 0 && lines[0].length < 40 ? lines[0] : "Candidate Profile"),
    email: emailMatch ? emailMatch[1] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    linkedin: linkedinMatch ? `https://${linkedinMatch[0]}` : null,
    github: githubMatch ? `https://${githubMatch[0]}` : null
  };
}

/**
 * Analyze formatting and readability factors:
 * Bullet points count, action verbs presence, quantifiable metrics, section clarity
 */
function analyzeFormattingQuality(rawText, sectionsData) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const words = rawText.split(/\s+/).filter(Boolean);
  
  // Bullet points detection (-, *, •, \u2022, \u25E6, etc.)
  const bulletLines = lines.filter(l => /^[-*•\u2022\u25E6\u2023\u2219\d+\.]/.test(l));
  const bulletRatio = lines.length > 0 ? Math.min(bulletLines.length / (lines.length * 0.4), 1.0) : 0;

  // Action verbs detection in experience/projects
  const lowerText = rawText.toLowerCase();
  let actionVerbCount = 0;
  for (const verb of ACTION_VERBS) {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(lowerText)) {
      actionVerbCount++;
    }
  }
  const actionVerbScore = Math.min(actionVerbCount / 6, 1.0);

  // Quantifiable metrics / numbers detection (%, $, k, numbers with metrics)
  const metricMatches = rawText.match(/\b(\d+%\s*|\$\d+|\d+\+?\s*(users|clients|requests|ms|times|x|revenue|traffic|stars))\b/gi) || [];
  const metricScore = Math.min(metricMatches.length / 3, 1.0);

  // Length optimization (standard 400 - 900 words for 1-2 page resume)
  let lengthScore = 1.0;
  if (words.length < 250) {
    lengthScore = words.length / 250;
  } else if (words.length > 1200) {
    lengthScore = Math.max(0.7, 1.0 - (words.length - 1200) / 1000);
  }

  // Section completeness
  const sectionScore = sectionsData.completenessRatio;

  // Aggregate formatting & readability score (0.0 - 1.0)
  const formattingScore = Number((
    (bulletRatio * 0.3) +
    (actionVerbScore * 0.25) +
    (metricScore * 0.2) +
    (lengthScore * 0.15) +
    (sectionScore * 0.1)
  ).toFixed(3));

  return {
    formattingScore: Math.min(Math.max(formattingScore, 0.45), 0.98), // Realistic normalized scale
    totalWords: words.length,
    bulletPointsCount: bulletLines.length,
    actionVerbsDetected: actionVerbCount,
    quantifiableMetricsFound: metricMatches.length,
    isBulletStructured: bulletLines.length >= 4,
    hasActionVerbs: actionVerbCount >= 3
  };
}

/**
 * Master parser & extractor
 */
function parseResumeContent(rawText) {
  const cleaned = cleanText(rawText);
  const tokens = preprocessTokens(cleaned);
  const sectionsData = detectSections(cleaned);
  const metadata = extractCandidateMetadata(cleaned);
  const formatting = analyzeFormattingQuality(cleaned, sectionsData);
  const extractedSkills = extractOntologySkills(cleaned);

  return {
    rawText: cleaned,
    tokens,
    sections: sectionsData.sections,
    detectedSectionsList: sectionsData.detectedSectionsList,
    sectionCompletenessRatio: sectionsData.completenessRatio,
    metadata,
    formatting,
    extractedSkills,
    extractedSkillNames: extractedSkills.map(s => s.name)
  };
}

module.exports = {
  cleanText,
  preprocessTokens,
  detectSections,
  extractCandidateMetadata,
  analyzeFormattingQuality,
  parseResumeContent
};
