/**
 * Predefined Standard Industry Job Role Templates with Skill Vectors & Market Baselines
 */

const LIVE_MARKET_AVAILABILITY = {
  "fullstack-mern": { openRoles: 12840, remoteShare: "38%", trend: "+12.4% this month" },
  "frontend-engineer": { openRoles: 15420, remoteShare: "42%", trend: "+15.1% this month" },
  "backend-node-engineer": { openRoles: 13860, remoteShare: "35%", trend: "+10.8% this month" },
  "ai-ml-engineer": { openRoles: 9720, remoteShare: "31%", trend: "+18.6% this month" },
  "data-scientist": { openRoles: 11450, remoteShare: "36%", trend: "+14.8% this month" },
  "cloud-devops-engineer": { openRoles: 8840, remoteShare: "29%", trend: "+9.7% this month" },
  "data-engineer": { openRoles: 10620, remoteShare: "33%", trend: "+11.5% this month" },
  "mobile-app-developer": { openRoles: 8120, remoteShare: "39%", trend: "+10.2% this month" },
  "cybersecurity-analyst": { openRoles: 7650, remoteShare: "34%", trend: "+16.3% this month" },
  "python-backend-engineer": { openRoles: 9810, remoteShare: "36%", trend: "+13.2% this month" },
  "java-spring-engineer": { openRoles: 7450, remoteShare: "27%", trend: "+7.8% this month" },
  "qa-automation-engineer": { openRoles: 8670, remoteShare: "41%", trend: "+8.9% this month" },
  "ui-ux-designer": { openRoles: 6540, remoteShare: "45%", trend: "+11.1% this month" },
  "product-manager": { openRoles: 5320, remoteShare: "28%", trend: "+8.4% this month" },
  "embedded-systems-engineer": { openRoles: 4210, remoteShare: "18%", trend: "+6.9% this month" }
};

const JOB_ROLE_TEMPLATES = [
  {
    id: "fullstack-mern",
    title: "Full Stack MERN Developer",
    domain: "Web Development",
    experienceLevel: "Entry to Mid",
    salaryRange: {
      usd: "$85,000 - $130,000",
      inr: "₹8,00,000 - ₹18,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "San Francisco", "New York", "London", "Hyderabad", "Remote"],
    coreSkills: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "TypeScript", "RESTful APIs", "HTML5", "CSS3", "Git & Version Control"],
    secondarySkills: ["Redux", "Tailwind CSS", "Docker", "AWS", "CI/CD Pipelines", "Testing & QA"],
    description: "Builds and deploys scalable web applications using MongoDB, Express, React, and Node.js with responsive UI and robust API services."
  },
  {
    id: "frontend-engineer",
    title: "Frontend React / Next.js Engineer",
    domain: "Frontend",
    experienceLevel: "Mid to Senior",
    salaryRange: {
      usd: "$90,000 - $140,000",
      inr: "₹9,00,000 - ₹20,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "San Francisco", "Seattle", "Pune", "Remote"],
    coreSkills: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Redux", "Webpack / Vite", "Git & Version Control"],
    secondarySkills: ["GraphQL", "RESTful APIs", "Testing & QA", "SASS / SCSS", "Performance Optimization"],
    description: "Specializes in crafting pixel-perfect, high-performance web user interfaces, component architectures, and responsive client experiences."
  },
  {
    id: "backend-node-engineer",
    title: "Backend / Node.js API Engineer",
    domain: "Backend",
    experienceLevel: "Mid to Senior",
    salaryRange: {
      usd: "$95,000 - $145,000",
      inr: "₹10,00,000 - ₹22,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "Austin", "New York", "Hyderabad", "Remote"],
    coreSkills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "RESTful APIs", "Redis", "Microservices", "System Design & Architecture", "Git & Version Control"],
    secondarySkills: ["Docker", "Kubernetes", "AWS", "GraphQL", "Cybersecurity & OAuth", "gRPC"],
    description: "Architects scalable microservices, relational and NoSQL databases, caching layers, and secure RESTful/gRPC APIs."
  },
  {
    id: "ai-ml-engineer",
    title: "AI / Machine Learning Engineer",
    domain: "AI & Data Science",
    experienceLevel: "Mid to Senior",
    salaryRange: {
      usd: "$110,000 - $170,000",
      inr: "₹12,00,000 - ₹28,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["San Francisco", "Bengaluru", "New York", "Boston", "Remote"],
    coreSkills: ["Python", "Machine Learning", "Deep Learning", "Natural Language Processing (NLP)", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas"],
    secondarySkills: ["LLMs / Generative AI", "Computer Vision", "Docker", "AWS", "Data Visualization", "SQL"],
    description: "Designs, trains, fine-tunes, and deploys machine learning models, transformer architectures, NLP pipelines, and generative AI agents."
  },
  {
    id: "data-scientist",
    title: "Data Scientist & Analytics Engineer",
    domain: "AI & Data Science",
    experienceLevel: "Entry to Senior",
    salaryRange: {
      usd: "$95,000 - $155,000",
      inr: "₹9,00,000 - ₹22,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "San Francisco", "Mumbai", "Hyderabad", "Remote"],
    coreSkills: ["Python", "SQL", "Data Science", "Pandas", "NumPy", "Scikit-Learn", "Data Visualization", "Machine Learning"],
    secondarySkills: ["Tableau", "Power BI", "Statistics", "R", "Big Data / Spark", "Deep Learning"],
    description: "Derives actionable business intelligence from complex datasets, develops statistical & predictive models, and builds executive analytical dashboards."
  },
  {
    id: "cloud-devops-engineer",
    title: "DevOps & Cloud Platform Engineer",
    domain: "Cloud & Infrastructure",
    experienceLevel: "Mid to Senior",
    salaryRange: {
      usd: "$105,000 - $160,000",
      inr: "₹11,00,000 - ₹25,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Seattle", "Bengaluru", "Austin", "Hyderabad", "Remote"],
    coreSkills: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines", "Terraform", "Linux / Unix", "Bash / Shell", "Git & Version Control"],
    secondarySkills: ["Microsoft Azure", "Google Cloud Platform", "Nginx", "Cybersecurity & OAuth", "System Design & Architecture"],
    description: "Automates infrastructure provisioning (IaC), continuous integration/deployment pipelines, container orchestration, and system reliability."
  },
  {
    id: "data-engineer",
    title: "Big Data & ETL Engineer",
    domain: "AI & Data Science",
    experienceLevel: "Mid",
    salaryRange: {
      usd: "$100,000 - $150,000",
      inr: "₹10,00,000 - ₹24,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "New York", "Chicago", "Chennai", "Remote"],
    coreSkills: ["Python", "SQL", "PostgreSQL", "Apache Cassandra", "Redis", "Data Science", "Pandas", "Linux / Unix"],
    secondarySkills: ["AWS", "Docker", "Elasticsearch", "CI/CD Pipelines", "Data Visualization"],
    description: "Constructs robust data pipelines, streaming ingestion, warehousing transformations, and analytical data marts."
  },
  {
    id: "mobile-app-developer",
    title: "Mobile App Developer (iOS / Android / Flutter)",
    domain: "Mobile Development",
    experienceLevel: "Entry to Senior",
    salaryRange: {
      usd: "$90,000 - $140,000",
      inr: "₹8,50,000 - ₹20,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "San Francisco", "Delhi NCR", "Pune", "Remote"],
    coreSkills: ["React Native", "Flutter", "Swift", "Kotlin", "JavaScript", "TypeScript", "RESTful APIs", "Git & Version Control"],
    secondarySkills: ["Mobile UI/UX", "Firebase", "Redux", "GraphQL", "App Store / Play Store Deployment"],
    description: "Architects cross-platform or native mobile applications with smooth gestures, offline caching, and responsive native UI."
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity & DevSecOps Specialist",
    domain: "Security & Infrastructure",
    experienceLevel: "Mid to Senior",
    salaryRange: {
      usd: "$100,000 - $155,000",
      inr: "₹10,00,000 - ₹24,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "Washington DC", "Austin", "Hyderabad", "Remote"],
    coreSkills: ["Cybersecurity & OAuth", "Linux / Unix", "Network Security", "Python", "Bash / Shell", "AWS", "Docker"],
    secondarySkills: ["Penetration Testing", "SIEM", "Cryptography", "CI/CD Pipelines", "OWASP"],
    description: "Safeguards cloud and on-premise infrastructure, audits vulnerability vectors, enforces OAuth/IAM policies, and automates DevSecOps scanning."
  },
  {
    id: "python-backend-engineer",
    title: "Python / Django / FastAPI Engineer",
    domain: "Backend",
    experienceLevel: "Entry to Mid",
    salaryRange: {
      usd: "$90,000 - $135,000",
      inr: "₹8,50,000 - ₹19,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "Denver", "San Francisco", "Pune", "Remote"],
    coreSkills: ["Python", "Django", "FastAPI", "PostgreSQL", "RESTful APIs", "SQL", "Docker", "Git & Version Control"],
    secondarySkills: ["Redis", "AWS", "Testing & QA", "Microservices", "Celery"],
    description: "Builds high-performance asynchronous web backends, data processing microservices, and REST APIs using Python frameworks."
  },
  {
    id: "java-spring-engineer",
    title: "Java / Spring Boot Enterprise Developer",
    domain: "Enterprise Systems",
    experienceLevel: "Mid to Senior",
    salaryRange: {
      usd: "$95,000 - $145,000",
      inr: "₹9,50,000 - ₹21,00,000"
    },
    locationTypes: ["Hybrid", "On-site", "Remote"],
    topLocations: ["Bengaluru", "Atlanta", "Dallas", "Hyderabad", "Remote"],
    coreSkills: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "MySQL", "RESTful APIs", "System Design & Architecture", "Git & Version Control"],
    secondarySkills: ["Docker", "Kubernetes", "AWS", "Kafka", "Testing & QA", "CI/CD Pipelines"],
    description: "Develops enterprise-grade, high-concurrency transactional backend applications and distributed microservices with Spring Boot."
  },
  {
    id: "qa-automation-engineer",
    title: "Software Development Engineer in Test (SDET)",
    domain: "Quality Engineering",
    experienceLevel: "Entry to Mid",
    salaryRange: {
      usd: "$80,000 - $125,000",
      inr: "₹7,50,000 - ₹16,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "Austin", "Noida", "Remote"],
    coreSkills: ["Testing & QA", "JavaScript", "Python", "RESTful APIs", "CI/CD Pipelines", "Git & Version Control"],
    secondarySkills: ["Docker", "Linux / Unix", "SQL", "Agile / Scrum", "Selenium / Cypress"],
    description: "Implements automated end-to-end testing frameworks, integration test suites, load testing, and quality assurance gates."
  },
  {
    id: "ui-ux-designer",
    title: "UI / UX & Product Designer",
    domain: "Design & Product",
    experienceLevel: "Entry to Mid",
    salaryRange: {
      usd: "$80,000 - $130,000",
      inr: "₹7,00,000 - ₹16,00,000"
    },
    locationTypes: ["Remote", "Hybrid", "On-site"],
    topLocations: ["Bengaluru", "San Francisco", "Mumbai", "London", "Remote"],
    coreSkills: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "HTML5", "CSS3", "Design Systems"],
    secondarySkills: ["User Research", "Usability Testing", "Tailwind CSS", "Design Thinking", "Accessibility (a11y)"],
    description: "Designs intuitive user journeys, wireframes, high-fidelity prototypes, and cohesive multi-brand design systems in Figma."
  },
  {
    id: "product-manager",
    title: "Technical / Associate Product Manager",
    domain: "Product Management",
    experienceLevel: "Mid to Senior",
    salaryRange: {
      usd: "$105,000 - $165,000",
      inr: "₹12,00,000 - ₹26,00,000"
    },
    locationTypes: ["Hybrid", "On-site", "Remote"],
    topLocations: ["Bengaluru", "San Francisco", "Delhi NCR", "New York", "Remote"],
    coreSkills: ["Product Management", "Agile / Scrum", "Roadmapping", "Data Science", "SQL", "System Design & Architecture"],
    secondarySkills: ["User Research", "A/B Testing", "Jira", "Stakeholder Management", "Metrics & KPIs"],
    description: "Translates business strategies into product roadmaps, defines technical user stories, and leads cross-functional agile sprints."
  },
  {
    id: "embedded-systems-engineer",
    title: "Embedded Systems & IoT Engineer",
    domain: "Hardware & Systems",
    experienceLevel: "Entry to Senior",
    salaryRange: {
      usd: "$90,000 - $145,000",
      inr: "₹8,00,000 - ₹18,00,000"
    },
    locationTypes: ["On-site", "Hybrid", "Remote"],
    topLocations: ["Bengaluru", "Austin", "Munich", "Hyderabad", "Remote"],
    coreSkills: ["C / C++", "Embedded Systems", "Linux / Unix", "Microcontrollers", "RTOS", "Git & Version Control"],
    secondarySkills: ["Python", "I2C / SPI / UART", "IoT Protocols (MQTT)", "Hardware Debugging", "Device Drivers"],
    description: "Programs low-level microcontrollers, RTOS kernels, device drivers, and firmware for IoT edge computing hardware."
  }
].map(role => ({
  ...role,
  marketAvailability: LIVE_MARKET_AVAILABILITY[role.id] || {
    openRoles: 5200,
    remoteShare: "30%",
    trend: "+6.2% this month"
  }
}));

module.exports = {
  JOB_ROLE_TEMPLATES
};
