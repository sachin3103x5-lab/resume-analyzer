/**
 * Personalized Feedback Generation Algorithm (Research Paper Section IV-E)
 * Implements: G = Kj - E, Priority-ranked recommendations based on ATS Score Impact
 */

function generatePersonalizedFeedback(params) {
  const {
    resumeParsed,
    atsResult,
    jobRequiredSkills = [],
    jobTitle = "Target Role"
  } = params;

  const recommendations = [];
  const missingSkills = atsResult.breakdown.keywordMatch.missing || [];
  const formatting = resumeParsed.formatting;
  const sections = resumeParsed.detectedSectionsList;

  // Missing Skill Gaps (G = Kj - E)
  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 6);
    const scoreImpact = Math.round(
      (atsResult.weights.ALPHA * (missingSkills.length / Math.max(jobRequiredSkills.length, 1))) * 100
    );

    recommendations.push({
      id: 'missing-skills',
      rule: 'Skill Gap Optimization',
      category: 'Skills & Keywords',
      priority: 'HIGH',
      priorityRank: 1,
      title: `Integrate ${missingSkills.length} Critical Target Skills`,
      impact: `+${scoreImpact}% potential ATS boost`,
      description: `The job description emphasizes key competencies that are currently missing or formatted differently in your resume. Incorporate these into your Skills, Experience, or Project bullet points.`,
      actionItems: topMissing.map(skill => `Add verified hands-on experience or coursework with: "${skill}"`),
      chips: topMissing
    });
  }

  // Semantic Similarity Threshold Check
  const theta = 0.70;
  if (atsResult.breakdown.semanticSimilarity.rawScore < theta) {
    recommendations.push({
      id: 'semantic-alignment',
      rule: 'Contextual Experience Enhancement',
      category: 'Semantic Relevance',
      priority: 'HIGH',
      priorityRank: 2,
      title: `Enhance Experience Descriptions with Contextual Impact`,
      impact: `+15-25% ATS semantic boost`,
      description: `Your contextual similarity score (${atsResult.breakdown.semanticSimilarity.percentage}%) indicates your work descriptions use different phrasing from modern ${jobTitle} requirements. Align your experience using industry terminology, action verbs, and quantifiable metrics.`,
      actionItems: [
        'Use the XYZ Formula: "Accomplished [X], as measured by [Y], by doing [Z]"',
        'Begin each bullet point with high-impact action verbs (e.g., Engineered, Architected, Automated, Optimized)',
        'Quantify achievements with percentages, dollar amounts, scale (e.g., "Reduced latency by 35%", "Handled 10k+ daily users")'
      ]
    });
  }

  // Section Completeness Check
  if (atsResult.breakdown.sectionCompleteness.rawScore < 1.0) {
    const expectedSections = ['Skills', 'Experience', 'Education', 'Projects'];
    const missingSections = expectedSections.filter(
      s => !sections.some(sec => sec.toLowerCase().includes(s.toLowerCase()))
    );

    if (missingSections.length > 0) {
      recommendations.push({
        id: 'section-completeness',
        rule: 'Section Completeness & Structure',
        category: 'Resume Structure',
        priority: 'MEDIUM',
        priorityRank: 3,
        title: `Add Standard Section Headers: ${missingSections.join(', ')}`,
        impact: `+${Math.round(atsResult.weights.GAMMA * (missingSections.length / 4) * 100)}% completeness boost`,
        description: `ATS parsers rely on explicit headings to categorize your background accurately. Resumes with unrecognized sections can lead to automatic disqualification.`,
        actionItems: missingSections.map(sec => `Create a dedicated "${sec}" section with standard header formatting`)
      });
    }
  }

  // Formatting & Readability Optimizations
  if (!formatting.isBulletStructured || formatting.bulletPointsCount < 5) {
    recommendations.push({
      id: 'bullet-structure',
      rule: 'Formatting & Readability',
      category: 'Formatting',
      priority: 'MEDIUM',
      priorityRank: 4,
      title: 'Convert Paragraph Text to Structured Bullet Points',
      impact: '+5-10% readability boost',
      description: `Dense paragraphs reduce ATS parsing fidelity and human readability. Use 3 to 5 concise bullet points per role/project.`,
      actionItems: [
        'Break multi-line paragraphs into distinct bullet points starting with symbols like • or -',
        'Keep bullet points between 1 to 2 lines in length for maximum visual clarity'
      ]
    });
  }

  if (formatting.quantifiableMetricsFound === 0) {
    recommendations.push({
      id: 'quantifiable-metrics',
      rule: 'Metric & Impact Enrichment',
      category: 'Impact Metrics',
      priority: 'MEDIUM',
      priorityRank: 5,
      title: 'Include Concrete Numbers & Performance Metrics',
      impact: '+10% human evaluator score correlation',
      description: `Resumes with measurable results score 40% higher in recruiter and hiring manager evaluations.`,
      actionItems: [
        'Add quantitative figures: team size, latency reduction, throughput, user base, or cost savings',
        'Example: "Optimized database queries, reducing API response time from 450ms to 120ms (73% improvement)"'
      ]
    });
  }

  // Contact info check
  if (!resumeParsed.metadata.email || !resumeParsed.metadata.phone) {
    recommendations.push({
      id: 'contact-completeness',
      rule: 'Header Compliance',
      category: 'Contact Info',
      priority: 'LOW',
      priorityRank: 6,
      title: 'Verify Clear Contact Information Header',
      impact: 'Essential for recruiter outreach',
      description: 'Ensure your Email, Phone Number, City/Country, LinkedIn, and GitHub links are placed at the very top in simple text.',
      actionItems: [
        'Avoid putting contact details in header/footer graphics or multi-column tables which some older ATS cannot read'
      ]
    });
  }

  // Sort recommendations by priority rank
  recommendations.sort((a, b) => a.priorityRank - b.priorityRank);

  return recommendations;
}

module.exports = {
  generatePersonalizedFeedback
};
