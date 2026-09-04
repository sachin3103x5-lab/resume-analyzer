/**
 * Standardized Skill Ontology & Taxonomy (ESCO Aligned)
 * Maps aliases/synonyms to canonical skill names and categories.
 */

const SKILL_ONTOLOGY = {
  // Programming Languages
  "javascript": { category: "Programming Languages", canonical: "JavaScript", synonyms: ["js", "ecmascript", "es6", "vanilla js"] },
  "typescript": { category: "Programming Languages", canonical: "TypeScript", synonyms: ["ts"] },
  "python": { category: "Programming Languages", canonical: "Python", synonyms: ["python3", "py"] },
  "java": { category: "Programming Languages", canonical: "Java", synonyms: ["core java", "j2ee"] },
  "c++": { category: "Programming Languages", canonical: "C++", synonyms: ["cpp", "c plus plus"] },
  "c#": { category: "Programming Languages", canonical: "C#", synonyms: ["csharp", "c sharp", ".net c#"] },
  "golang": { category: "Programming Languages", canonical: "Go / Golang", synonyms: ["go", "golang"] },
  "rust": { category: "Programming Languages", canonical: "Rust", synonyms: ["rustlang"] },
  "php": { category: "Programming Languages", canonical: "PHP", synonyms: ["php7", "php8"] },
  "ruby": { category: "Programming Languages", canonical: "Ruby", synonyms: ["ruby on rails"] },
  "scala": { category: "Programming Languages", canonical: "Scala", synonyms: [] },
  "r": { category: "Programming Languages", canonical: "R", synonyms: ["r-lang", "rlang"] },
  "swift": { category: "Programming Languages", canonical: "Swift", synonyms: ["swiftui"] },
  "kotlin": { category: "Programming Languages", canonical: "Kotlin", synonyms: [] },
  "sql": { category: "Programming Languages", canonical: "SQL", synonyms: ["plsql", "t-sql", "structured query language"] },
  "bash": { category: "Programming Languages", canonical: "Bash / Shell", synonyms: ["shell scripting", "powershell", "zsh", "sh"] },

  // Frontend Development
  "react": { category: "Frontend", canonical: "React.js", synonyms: ["reactjs", "react.js", "react", "react native"] },
  "next.js": { category: "Frontend", canonical: "Next.js", synonyms: ["nextjs", "next.js", "next"] },
  "vue": { category: "Frontend", canonical: "Vue.js", synonyms: ["vuejs", "vue.js", "vue3", "vue2"] },
  "angular": { category: "Frontend", canonical: "Angular", synonyms: ["angularjs", "angular 2+"] },
  "html5": { category: "Frontend", canonical: "HTML5", synonyms: ["html", "html 5"] },
  "css3": { category: "Frontend", canonical: "CSS3", synonyms: ["css", "css 3", "modern css"] },
  "tailwind css": { category: "Frontend", canonical: "Tailwind CSS", synonyms: ["tailwind", "tailwindcss"] },
  "sass": { category: "Frontend", canonical: "SASS / SCSS", synonyms: ["scss", "sass"] },
  "redux": { category: "Frontend", canonical: "Redux", synonyms: ["redux toolkit", "rtk", "redux-thunk", "zustand", "recoil"] },
  "bootstrap": { category: "Frontend", canonical: "Bootstrap", synonyms: ["bootstrap 5", "bootstrap 4"] },
  "webpack": { category: "Frontend", canonical: "Webpack / Vite", synonyms: ["vite", "webpack", "rollup", "parcel"] },

  // Backend Development
  "node.js": { category: "Backend", canonical: "Node.js", synonyms: ["nodejs", "node.js", "node"] },
  "express": { category: "Backend", canonical: "Express.js", synonyms: ["expressjs", "express.js", "express framework"] },
  "nestjs": { category: "Backend", canonical: "NestJS", synonyms: ["nest.js", "nest js"] },
  "django": { category: "Backend", canonical: "Django", synonyms: ["django rest framework", "drf"] },
  "flask": { category: "Backend", canonical: "Flask", synonyms: ["flask api"] },
  "fastapi": { category: "Backend", canonical: "FastAPI", synonyms: ["fast api"] },
  "spring boot": { category: "Backend", canonical: "Spring Boot", synonyms: ["spring", "spring framework", "spring-boot"] },
  "asp.net": { category: "Backend", canonical: "ASP.NET Core", synonyms: ["asp.net core", ".net core", "dotnet"] },
  "laravel": { category: "Backend", canonical: "Laravel", synonyms: ["laravel framework"] },
  "graphql": { category: "Backend", canonical: "GraphQL", synonyms: ["apollo graphql", "relay"] },
  "rest api": { category: "Backend", canonical: "RESTful APIs", synonyms: ["restful api", "rest apis", "rest", "web apis"] },
  "microservices": { category: "Backend", canonical: "Microservices", synonyms: ["microservice architecture", "micro-services"] },
  "grpc": { category: "Backend", canonical: "gRPC", synonyms: ["grpc", "protocol buffers", "protobuf"] },

  // Databases & Caching
  "mongodb": { category: "Databases", canonical: "MongoDB", synonyms: ["mongo", "mongoose", "nosql"] },
  "postgresql": { category: "Databases", canonical: "PostgreSQL", synonyms: ["postgres", "psql"] },
  "mysql": { category: "Databases", canonical: "MySQL", synonyms: ["mariadb"] },
  "redis": { category: "Databases", canonical: "Redis", synonyms: ["redis cache", "in-memory cache"] },
  "sqlite": { category: "Databases", canonical: "SQLite", synonyms: ["sqlite3"] },
  "dynamodb": { category: "Databases", canonical: "DynamoDB", synonyms: ["aws dynamodb"] },
  "cassandra": { category: "Databases", canonical: "Apache Cassandra", synonyms: ["cassandra"] },
  "elasticsearch": { category: "Databases", canonical: "Elasticsearch", synonyms: ["elastic search", "elk stack"] },
  "prisma": { category: "Databases", canonical: "Prisma ORM", synonyms: ["prisma", "typeorm", "sequelize", "hibernate"] },

  // Cloud & DevOps
  "aws": { category: "Cloud & DevOps", canonical: "AWS", synonyms: ["amazon web services", "ec2", "s3", "lambda", "cloudfront"] },
  "azure": { category: "Cloud & DevOps", canonical: "Microsoft Azure", synonyms: ["azure cloud", "azure devops"] },
  "gcp": { category: "Cloud & DevOps", canonical: "Google Cloud Platform", synonyms: ["google cloud", "gcp"] },
  "docker": { category: "Cloud & DevOps", canonical: "Docker", synonyms: ["containerization", "docker compose"] },
  "kubernetes": { category: "Cloud & DevOps", canonical: "Kubernetes", synonyms: ["k8s", "kubectl", "helm"] },
  "ci/cd": { category: "Cloud & DevOps", canonical: "CI/CD Pipelines", synonyms: ["github actions", "gitlab ci", "jenkins", "circleci", "continuous integration"] },
  "terraform": { category: "Cloud & DevOps", canonical: "Terraform", synonyms: ["iac", "infrastructure as code"] },
  "linux": { category: "Cloud & DevOps", canonical: "Linux / Unix", synonyms: ["ubuntu", "debian", "centos", "unix", "rhel"] },
  "nginx": { category: "Cloud & DevOps", canonical: "Nginx", synonyms: ["reverse proxy", "apache"] },

  // Artificial Intelligence & Data Science
  "machine learning": { category: "AI & Data Science", canonical: "Machine Learning", synonyms: ["ml", "supervised learning", "unsupervised learning"] },
  "deep learning": { category: "AI & Data Science", canonical: "Deep Learning", synonyms: ["neural networks", "cnn", "rnn", "lstm", "transformers"] },
  "nlp": { category: "AI & Data Science", canonical: "Natural Language Processing (NLP)", synonyms: ["natural language processing", "text mining", "spacy", "nltk", "huggingface", "bert", "gpt", "llm"] },
  "large language models": { category: "AI & Data Science", canonical: "LLMs / Generative AI", synonyms: ["llms", "llm", "generative ai", "langchain", "llamaindex", "openai", "prompt engineering"] },
  "computer vision": { category: "AI & Data Science", canonical: "Computer Vision", synonyms: ["opencv", "image processing", "object detection", "yolo"] },
  "tensorflow": { category: "AI & Data Science", canonical: "TensorFlow", synonyms: ["tf", "keras"] },
  "pytorch": { category: "AI & Data Science", canonical: "PyTorch", synonyms: ["torch"] },
  "scikit-learn": { category: "AI & Data Science", canonical: "Scikit-Learn", synonyms: ["sklearn", "scikit learn"] },
  "pandas": { category: "AI & Data Science", canonical: "Pandas", synonyms: ["numpy", "scipy"] },
  "data visualization": { category: "AI & Data Science", canonical: "Data Visualization", synonyms: ["matplotlib", "seaborn", "tableau", "power bi", "d3.js"] },
  "data science": { category: "AI & Data Science", canonical: "Data Science", synonyms: ["data analysis", "data analytics", "statistical modeling", "big data"] },

  // Software Engineering & Methodologies
  "git": { category: "Methodologies & Tools", canonical: "Git & Version Control", synonyms: ["github", "gitlab", "bitbucket", "version control"] },
  "agile": { category: "Methodologies & Tools", canonical: "Agile / Scrum", synonyms: ["scrum", "kanban", "sprint planning", "jira"] },
  "test automation": { category: "Methodologies & Tools", canonical: "Testing & QA", synonyms: ["unit testing", "jest", "mocha", "cypress", "selenium", "pytest", "tdd"] },
  "system design": { category: "Methodologies & Tools", canonical: "System Design & Architecture", synonyms: ["distributed systems", "scalable architecture", "high availability", "design patterns"] },
  "cybersecurity": { category: "Methodologies & Tools", canonical: "Cybersecurity & OAuth", synonyms: ["jwt", "oauth2", "authentication", "web security", "owasp"] }
};

/**
 * Normalizes a raw skill string to its canonical ontology name if recognized.
 */
function normalizeSkill(rawSkill) {
  if (!rawSkill) return null;
  const cleaned = rawSkill.toLowerCase().trim();

  // Exact key match
  if (SKILL_ONTOLOGY[cleaned]) {
    return SKILL_ONTOLOGY[cleaned].canonical;
  }

  // Synonym search
  for (const [key, def] of Object.entries(SKILL_ONTOLOGY)) {
    if (def.synonyms.includes(cleaned) || def.canonical.toLowerCase() === cleaned) {
      return def.canonical;
    }
  }

  // Word boundary regex search
  for (const [key, def] of Object.entries(SKILL_ONTOLOGY)) {
    const regex = new RegExp(`\\b${escapeRegExp(key)}\\b`, 'i');
    if (regex.test(cleaned)) {
      return def.canonical;
    }
  }

  return rawSkill; // Keep custom detected skill
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extracts all ontology skills present in a block of text.
 */
function extractOntologySkills(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found = new Map();

  for (const [key, def] of Object.entries(SKILL_ONTOLOGY)) {
    // Check key
    const regexKey = new RegExp(`(^|[^a-zA-Z0-9_+#])${escapeRegExp(key)}([^a-zA-Z0-9_+#]|$)`, 'i');
    if (regexKey.test(lower)) {
      found.set(def.canonical, {
        name: def.canonical,
        category: def.category,
        matchedTerm: key
      });
      continue;
    }

    // Check synonyms
    for (const syn of def.synonyms) {
      const regexSyn = new RegExp(`(^|[^a-zA-Z0-9_+#])${escapeRegExp(syn)}([^a-zA-Z0-9_+#]|$)`, 'i');
      if (regexSyn.test(lower)) {
        found.set(def.canonical, {
          name: def.canonical,
          category: def.category,
          matchedTerm: syn
        });
        break;
      }
    }
  }

  return Array.from(found.values());
}

module.exports = {
  SKILL_ONTOLOGY,
  normalizeSkill,
  extractOntologySkills
};
