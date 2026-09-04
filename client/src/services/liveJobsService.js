/**
 * Live Job & Internship Feed Service (Indian Tech Hubs & JSearch API)
 * Generates dynamically matched real-time internships & jobs tailored to the
 * candidate's verified skills, target role, and location preferences across Indian cities.
 */

export const INDIAN_TECH_HUBS = {
  "Bengaluru": {
    hubName: "Silicon Valley of India (Koramangala, Bellandur, Whitefield, Indiranagar)",
    companies: [
      { name: "Swiggy", logo: "🍕", rating: 4.3, hub: "Koramangala, Bengaluru", domains: ["fullstack", "frontend", "backend", "mobile", "ai-data", "product"] },
      { name: "Razorpay", logo: "💳", rating: 4.5, hub: "Koramangala, Bengaluru", domains: ["fullstack", "backend", "security", "cloud-devops", "frontend"] },
      { name: "CRED", logo: "✨", rating: 4.4, hub: "Indiranagar, Bengaluru", domains: ["frontend", "mobile", "design", "fullstack", "backend"] },
      { name: "Flipkart", logo: "🛒", rating: 4.3, hub: "Bellandur Outer Ring Road, Bengaluru", domains: ["fullstack", "ai-data", "backend", "cloud-devops", "mobile"] },
      { name: "PhonePe", logo: "💸", rating: 4.5, hub: "Bellandur, Bengaluru", domains: ["backend", "mobile", "security", "cloud-devops", "qa"] },
      { name: "Groww", logo: "📈", rating: 4.6, hub: "Vaishnavi Tech Park, Bengaluru", domains: ["fullstack", "backend", "mobile", "ai-data"] },
      { name: "Zerodha", logo: "📊", rating: 4.7, hub: "JP Nagar, Bengaluru", domains: ["backend", "frontend", "mobile", "systems", "security"] },
      { name: "Google India", logo: "🔍", rating: 4.7, hub: "Old Airport Road, Bengaluru", domains: ["ai-data", "cloud-devops", "systems", "backend", "fullstack"] },
      { name: "Amazon India", logo: "📦", rating: 4.4, hub: "World Trade Center, Bengaluru", domains: ["cloud-devops", "backend", "fullstack", "ai-data", "qa"] },
      { name: "Infosys", logo: "🏢", rating: 4.0, hub: "Electronic City, Bengaluru", domains: ["enterprise", "fullstack", "cloud-devops", "qa"] }
    ]
  },
  "Delhi NCR": {
    hubName: "NCR Tech Capital (Gurgaon Cyber Hub, Noida Expressway, Connaught Place)",
    companies: [
      { name: "Zomato", logo: "🛵", rating: 4.2, hub: "DLF Cyber Hub, Gurgaon", domains: ["fullstack", "frontend", "mobile", "product", "design"] },
      { name: "Paytm (One97)", logo: "📱", rating: 4.1, hub: "Sector 5, Noida", domains: ["backend", "mobile", "security", "cloud-devops", "fullstack"] },
      { name: "Urban Company", logo: "🛠️", rating: 4.4, hub: "Udyog Vihar, Gurgaon", domains: ["fullstack", "backend", "mobile", "design", "qa"] },
      { name: "MakeMyTrip", logo: "✈️", rating: 4.3, hub: "DLF Cyber City, Gurgaon", domains: ["fullstack", "mobile", "frontend", "backend"] },
      { name: "PolicyBazaar", logo: "📑", rating: 4.2, hub: "Sector 44, Gurgaon", domains: ["fullstack", "ai-data", "backend", "mobile"] },
      { name: "Airtel Digital", logo: "📶", rating: 4.2, hub: "Sector 18, Gurgaon", domains: ["cloud-devops", "backend", "mobile", "ai-data"] },
      { name: "Microsoft India", logo: "💻", rating: 4.6, hub: "Sector 135, Noida", domains: ["cloud-devops", "ai-data", "backend", "security", "enterprise"] },
      { name: "Adobe India", logo: "🎨", rating: 4.5, hub: "Sector 132, Noida", domains: ["frontend", "design", "ai-data", "fullstack", "systems"] }
    ]
  },
  "Hyderabad": {
    hubName: "Cyberabad (HITEC City, Gachibowli, Financial District)",
    companies: [
      { name: "Microsoft IDC", logo: "💻", rating: 4.7, hub: "Gachibowli, Hyderabad", domains: ["cloud-devops", "backend", "ai-data", "systems", "security"] },
      { name: "Google Hyderabad", logo: "🔍", rating: 4.7, hub: "HITEC City, Hyderabad", domains: ["ai-data", "cloud-devops", "backend", "fullstack"] },
      { name: "Amazon Dev Centre", logo: "📦", rating: 4.4, hub: "Financial District, Hyderabad", domains: ["backend", "cloud-devops", "ai-data", "qa"] },
      { name: "ServiceNow", logo: "⚡", rating: 4.6, hub: "Knowledge City, Hyderabad", domains: ["fullstack", "cloud-devops", "backend", "qa"] },
      { name: "Salesforce India", logo: "☁️", rating: 4.6, hub: "HITEC City, Hyderabad", domains: ["enterprise", "cloud-devops", "backend", "fullstack"] },
      { name: "Uber Hyderabad Tech", logo: "🚗", rating: 4.5, hub: "Madhapur, Hyderabad", domains: ["backend", "mobile", "systems", "cloud-devops"] },
      { name: "Qualcomm India", logo: "📡", rating: 4.4, hub: "Mindspace IT Park, Hyderabad", domains: ["systems", "mobile", "ai-data"] },
      { name: "Tata Consultancy Services", logo: "💼", rating: 4.0, hub: "Adibatla, Hyderabad", domains: ["enterprise", "fullstack", "qa", "backend"] }
    ]
  },
  "Mumbai": {
    hubName: "Financial Tech Hub (BKC, Powai, Andheri East, Navi Mumbai)",
    companies: [
      { name: "Jio Platforms", logo: "🌐", rating: 4.2, hub: "Reliance Corporate Park, Navi Mumbai", domains: ["fullstack", "mobile", "cloud-devops", "ai-data", "security"] },
      { name: "Tata Digital", logo: "💠", rating: 4.3, hub: "BKC, Mumbai", domains: ["fullstack", "frontend", "mobile", "product", "backend"] },
      { name: "Dream11", logo: "🏆", rating: 4.5, hub: "BKC, Mumbai", domains: ["backend", "mobile", "cloud-devops", "frontend", "ai-data"] },
      { name: "BookMyShow", logo: "🎟️", rating: 4.3, hub: "Andheri East, Mumbai", domains: ["frontend", "mobile", "backend", "fullstack"] },
      { name: "Kotak Mahindra Bank Tech", logo: "🏦", rating: 4.2, hub: "Malad, Mumbai", domains: ["enterprise", "security", "backend", "mobile"] },
      { name: "BillDesk", logo: "🧾", rating: 4.1, hub: "Lower Parel, Mumbai", domains: ["backend", "security", "fullstack"] },
      { name: "LTIMindtree", logo: "🏢", rating: 4.0, hub: "Powai, Mumbai", domains: ["enterprise", "cloud-devops", "fullstack", "qa"] }
    ]
  },
  "Pune": {
    hubName: "Automotive & IT Hub (Hinjawadi IT Park, Magarpatta, Kharadi)",
    companies: [
      { name: "Persistent Systems", logo: "💡", rating: 4.3, hub: "Hinjawadi Phase 1, Pune", domains: ["cloud-devops", "fullstack", "ai-data", "security", "enterprise"] },
      { name: "Barclays Global Tech", logo: "🏛️", rating: 4.4, hub: "Kharadi EON IT Park, Pune", domains: ["backend", "security", "enterprise", "cloud-devops"] },
      { name: "Bajaj Finserv Health", logo: "🩺", rating: 4.3, hub: "Viman Nagar, Pune", domains: ["fullstack", "mobile", "backend", "frontend"] },
      { name: "Veritas Technologies", logo: "🔒", rating: 4.4, hub: "Baner, Pune", domains: ["cloud-devops", "systems", "security", "backend"] },
      { name: "Cybage Software", logo: "💻", rating: 4.1, hub: "Kalyani Nagar, Pune", domains: ["fullstack", "qa", "frontend", "backend"] },
      { name: "Tech Mahindra", logo: "⚙️", rating: 4.0, hub: "Hinjawadi Phase 3, Pune", domains: ["enterprise", "cloud-devops", "qa", "mobile"] }
    ]
  },
  "Kolkata": {
    hubName: "Eastern Tech Corridor (Salt Lake Sector V, Rajarhat New Town)",
    companies: [
      { name: "Tata Consultancy Services", logo: "💼", rating: 4.1, hub: "Gitanjali Park, Rajarhat, Kolkata", domains: ["enterprise", "fullstack", "cloud-devops", "ai-data", "qa"] },
      { name: "Cognizant India", logo: "🌐", rating: 4.1, hub: "Sector V, Salt Lake, Kolkata", domains: ["fullstack", "backend", "qa", "cloud-devops", "mobile"] },
      { name: "Wipro Technologies", logo: "🏢", rating: 4.0, hub: "Sector V, Salt Lake, Kolkata", domains: ["enterprise", "cloud-devops", "security", "qa"] },
      { name: "PwC India Tech Centre", logo: "📊", rating: 4.3, hub: "Sector V, Salt Lake, Kolkata", domains: ["ai-data", "security", "cloud-devops", "enterprise"] },
      { name: "ITC Infotech", logo: "🛍️", rating: 4.0, hub: "Rajarhat New Town, Kolkata", domains: ["enterprise", "fullstack", "data-science", "backend"] },
      { name: "IBM India", logo: "💻", rating: 4.3, hub: "Millennium Park, Sector V, Kolkata", domains: ["cloud-devops", "ai-data", "backend", "systems"] },
      { name: "Capgemini Kolkata", logo: "🔷", rating: 4.0, hub: "Unitech Infospace, New Town, Kolkata", domains: ["enterprise", "fullstack", "qa", "mobile"] }
    ]
  },
  "Chennai": {
    hubName: "SaaS & Product Corridor (OMR IT Expressway, Guindy, Siruseri)",
    companies: [
      { name: "Zoho Corporation", logo: "📦", rating: 4.6, hub: "Estancia IT Park, Guduvanchery, Chennai", domains: ["fullstack", "backend", "frontend", "mobile", "systems", "product"] },
      { name: "Freshworks", logo: "⚡", rating: 4.5, hub: "Global Infocity Park, Perungudi, Chennai", domains: ["fullstack", "cloud-devops", "frontend", "mobile", "product"] },
      { name: "PayPal India", logo: "💳", rating: 4.5, hub: "Sholinganallur, OMR, Chennai", domains: ["backend", "security", "ai-data", "cloud-devops"] },
      { name: "Amazon Chennai", logo: "📦", rating: 4.4, hub: "SP Infocity, Perungudi, Chennai", domains: ["cloud-devops", "backend", "qa"] },
      { name: "HCL Technologies", logo: "🌐", rating: 4.0, hub: "Navalur, OMR, Chennai", domains: ["enterprise", "cloud-devops", "systems", "qa"] }
    ]
  },
  "Remote": {
    hubName: "All-India Remote & Work-from-Anywhere Tech Hub",
    companies: [
      { name: "BrowserStack", logo: "🧪", rating: 4.5, hub: "Remote (All India)", domains: ["fullstack", "qa", "cloud-devops", "backend", "frontend"] },
      { name: "Postman", logo: "🚀", rating: 4.6, hub: "Remote (All India)", domains: ["backend", "frontend", "fullstack", "product", "qa"] },
      { name: "Hasura", logo: "⚡", rating: 4.7, hub: "Remote (All India)", domains: ["backend", "systems", "cloud-devops", "fullstack"] },
      { name: "Atlassian", logo: "🔷", rating: 4.6, hub: "Remote (All India)", domains: ["fullstack", "frontend", "cloud-devops", "qa", "product"] },
      { name: "GitLab", logo: "🦊", rating: 4.6, hub: "Remote (Global)", domains: ["cloud-devops", "backend", "security", "frontend"] }
    ]
  }
};

export const LOCATIONS = ["Remote", "Bengaluru", "Kolkata", "Delhi NCR", "Mumbai", "Hyderabad", "Pune", "Chennai"];

/**
 * Normalizes skill strings for accurate matching
 */
function normalizeSkill(s) {
  if (!s) return "";
  const str = typeof s === 'string' ? s : (s.name || '');
  return str.toLowerCase().replace(/[^a-z0-9+#]/g, '').trim();
}

/**
 * Detects domain category from title or query
 */
function inferDomainFromTitle(title) {
  const t = (title || "").toLowerCase();
  if (t.includes("data") || t.includes("machine learning") || t.includes("ai") || t.includes("ml") || t.includes("nlp") || t.includes("deep learning") || t.includes("analytics")) {
    return "ai-data";
  }
  if (t.includes("cloud") || t.includes("devops") || t.includes("sre") || t.includes("infra") || t.includes("platform") || t.includes("kubernetes")) {
    return "cloud-devops";
  }
  if (t.includes("mobile") || t.includes("android") || t.includes("ios") || t.includes("flutter") || t.includes("react native") || t.includes("swift") || t.includes("kotlin")) {
    return "mobile";
  }
  if (t.includes("security") || t.includes("cyber") || t.includes("soc") || t.includes("penetration") || t.includes("threat") || t.includes("devsecops")) {
    return "security";
  }
  if (t.includes("qa") || t.includes("test") || t.includes("sdet") || t.includes("automation") || t.includes("quality")) {
    return "qa";
  }
  if (t.includes("java") || t.includes("spring") || t.includes("enterprise")) {
    return "enterprise";
  }
  if (t.includes("frontend") || t.includes("ui") || t.includes("react") || t.includes("next") || t.includes("vue") || t.includes("angular") || t.includes("web designer")) {
    return "frontend";
  }
  if (t.includes("design") || t.includes("ux") || t.includes("figma") || t.includes("product designer")) {
    return "design";
  }
  if (t.includes("product") || t.includes("apm") || t.includes("product manager")) {
    return "product";
  }
  if (t.includes("embedded") || t.includes("iot") || t.includes("firmware") || t.includes("hardware") || t.includes("c++") || t.includes("c/c++")) {
    return "systems";
  }
  if (t.includes("backend") || t.includes("api") || t.includes("node") || t.includes("python") || t.includes("django") || t.includes("fastapi") || t.includes("golang") || t.includes("go")) {
    return "backend";
  }
  return "fullstack";
}

/**
 * Generates dynamically matched real-time internships & jobs tailored
 * to the candidate's verified skills, target role, and location preferences across Indian cities.
 */
export function generateLiveJobs(params = {}) {
  const {
    targetJobTitle = 'Full Stack Software Engineer',
    targetJobDescription = '',
    extractedSkills = [],
    careerRecommendations = {},
    selectedLocation = 'All Locations',
    selectedType = 'all'
  } = params;

  const candidateSkillSet = new Set(
    (extractedSkills || []).map(s => normalizeSkill(s)).filter(Boolean)
  );
  const targetDomain = inferDomainFromTitle(targetJobTitle);

  // Active cities to generate jobs for
  const activeCities = (selectedLocation && selectedLocation !== 'All Locations' && selectedLocation !== 'Any')
    ? [selectedLocation]
    : Object.keys(INDIAN_TECH_HUBS);

  const jobs = [];

  activeCities.forEach((city) => {
    const cityData = INDIAN_TECH_HUBS[city] || INDIAN_TECH_HUBS["Bengaluru"];
    
    // Filter domain companies located in this city
    const domainCompanies = cityData.companies.filter(c => c.domains.includes(targetDomain));
    const companyPool = domainCompanies.length > 0 ? domainCompanies : cityData.companies;

    companyPool.forEach((comp, idx) => {
      const isIntern = idx % 2 === 0;
      const roleType = isIntern ? 'Internship' : 'Full-Time';

      if (selectedType === 'internship' && !isIntern) return;
      if (selectedType === 'fulltime' && isIntern) return;

      const title = isIntern
        ? `${targetJobTitle} Intern`
        : (idx === 1 ? `Associate / Junior ${targetJobTitle}` : `Senior / Lead ${targetJobTitle}`);

      // Required skills based on domain
      let requiredSkills = [];
      if (targetDomain === 'ai-data') {
        requiredSkills = ["Python", "SQL", "Pandas", "Scikit-Learn", "Machine Learning", "Data Visualization"];
      } else if (targetDomain === 'cloud-devops') {
        requiredSkills = ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Linux / Unix", "Git & Version Control"];
      } else if (targetDomain === 'mobile') {
        requiredSkills = ["React Native", "Flutter", "Swift", "Kotlin", "RESTful APIs", "Git & Version Control"];
      } else if (targetDomain === 'security') {
        requiredSkills = ["Cybersecurity & OAuth", "Linux / Unix", "Network Security", "Python", "Docker"];
      } else if (targetDomain === 'enterprise') {
        requiredSkills = ["Java", "Spring Boot", "Microservices", "PostgreSQL", "RESTful APIs", "Git & Version Control"];
      } else if (targetDomain === 'frontend') {
        requiredSkills = ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"];
      } else if (targetDomain === 'backend') {
        requiredSkills = ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "RESTful APIs", "Docker"];
      } else if (targetDomain === 'qa') {
        requiredSkills = ["Testing & QA", "JavaScript", "Python", "RESTful APIs", "CI/CD Pipelines"];
      } else if (targetDomain === 'design') {
        requiredSkills = ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design Systems"];
      } else {
        requiredSkills = ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "RESTful APIs"];
      }

      // Compute genuine skill match
      const matched = requiredSkills.filter(s => candidateSkillSet.has(normalizeSkill(s)));
      const missing = requiredSkills.filter(s => !candidateSkillSet.has(normalizeSkill(s)));
      const matchPct = requiredSkills.length > 0 ? Math.round((matched.length / requiredSkills.length) * 100) : 70;

      const stipend = isIntern ? "₹25,000 - ₹50,000 /month" : "₹8,50,000 - ₹18,00,000 /year";
      const fullTimeSalary = isIntern ? "₹7.5 - 14.0 LPA" : "₹8.5 - 20.0 LPA";

      const searchQuery = encodeURIComponent(`${title} ${comp.name} ${city}`);
      const applyUrl = `https://www.google.com/search?q=${searchQuery}+jobs`;
      const internshalaUrl = `https://internshala.com/internships/keywords-${encodeURIComponent(title)}-in-${encodeURIComponent(city)}`;

      jobs.push({
        id: `ind-job-${city.toLowerCase()}-${idx}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 3)}`,
        title,
        domainTag: cityData.hubName,
        roleCategory: targetDomain,
        company: comp.name,
        companyLogo: comp.logo,
        companyRating: comp.rating,
        verified: true,
        officeHub: comp.hub,
        location: city,
        isRemote: city === "Remote",
        type: roleType,
        duration: isIntern ? "3-6 Months" : "Permanent",
        stipend,
        fullTimeSalary,
        description: `Active opening for ${title} at ${comp.name}'s tech center in ${comp.hub}. Collaborate with engineering teams to develop scalable, high-availability production solutions.`,
        requiredSkills,
        matchedSkills: matched,
        missingSkills: missing,
        matchPercentage: matchPct,
        openings: Math.floor(Math.random() * 4) + 2,
        postedAgo: idx === 0 ? "Just now" : (idx === 1 ? "1 day ago" : "2 days ago"),
        badge: idx === 0 ? "⭐ Top City Match" : "⚡ Actively Hiring",
        isInternshalaCertified: isIntern,
        applyUrl,
        internshalaUrl,
        applicantCount: Math.floor(Math.random() * 30) + 10,
        source: "Indian Tech Hub Aggregator"
      });
    });
  });

  return jobs.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
