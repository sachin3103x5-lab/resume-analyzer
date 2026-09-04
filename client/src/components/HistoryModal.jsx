import React, { useState, useEffect } from 'react';
import { 
  History, 
  Trash2, 
  X, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Bot,
  RefreshCw
} from 'lucide-react';
import { fetchResumeHistory, deleteResumeHistoryItem, clearResumeHistory, getLocalHistory } from '../services/api';
import { analyzeResumeClient } from '../services/clientNlpEngine';

// Pre-seeded realistic candidate evaluation profiles if history is brand new
const SAMPLE_HISTORY_PROFILES = [
  {
    name: 'Subhadeep Sharma',
    role: 'Full Stack MERN Developer',
    text: `SUBHADEEP SHARMA
Kolkata, India | +91 98765 43210 | subhadeep.dev@gmail.com | linkedin.com/in/subhadeep-dev

PROFESSIONAL SUMMARY
Results-driven Full Stack MERN Developer with 3+ years of experience developing high-performance web applications with React.js, Node.js, Express, and MongoDB. Specialized in RESTful API engineering, state management, and modern responsive UI.

TECHNICAL SKILLS
• Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL
• Frontend: React.js, Redux Toolkit, Next.js, Tailwind CSS
• Backend & APIs: Node.js, Express.js, RESTful APIs, GraphQL, JWT Authentication
• Databases & Cloud: MongoDB, PostgreSQL, Redis, AWS (S3, EC2), Docker
• Tools: Git, GitHub, Agile/Scrum, Jest, CI/CD Pipelines

EXPERIENCE
Senior Full Stack Engineer | TechCorp Solutions, Bengaluru (2023 - Present)
• Architected scalable web microservices handling 250,000+ monthly active users with 99.9% uptime.
• Engineered responsive frontend dashboards with React.js and Tailwind CSS, improving load speed by 42%.
• Built secure REST APIs in Express.js with JWT authentication, rate limiting, and MongoDB aggregation pipelines.

EDUCATION
B.Tech in Computer Science & Engineering | MAKAUT, West Bengal (2019 - 2023) • GPA: 8.9/10`
  },
  {
    name: 'Priya Nair',
    role: 'AI & Data Science Engineer',
    text: `PRIYA NAIR
Bengaluru, India | +91 98123 45678 | priya.nair.ai@gmail.com | linkedin.com/in/priyanair-ai

PROFESSIONAL SUMMARY
Machine Learning & NLP Engineer with 2+ years of experience designing and deploying deep learning pipelines, transformer LLM systems, and conversational AI agents.

TECHNICAL SKILLS
• Programming: Python, SQL, C++, Bash
• AI & Machine Learning: PyTorch, TensorFlow, Scikit-Learn, Transformers, BERT, SpaCy, NLTK
• LLMs & GenAI: LangChain, LlamaIndex, OpenAI APIs, Vector Databases (Pinecone, ChromaDB)
• Data & Cloud: Pandas, NumPy, FastAPI, Docker, AWS (SageMaker, S3), Git

EXPERIENCE
AI Engineer | InnovateAI Labs, Bengaluru (2023 - Present)
• Fine-tuned transformer models for domain-specific NLP extraction, achieving 94.2% F1 score.
• Developed semantic search retrieval system using LangChain and Pinecone vector embeddings.
• Deployed FastAPI inference microservices on Docker containers with sub-80ms response latency.

EDUCATION
M.Tech in Artificial Intelligence | IISc Bengaluru (2021 - 2023) • CGPA: 9.2/10`
  },
  {
    name: 'Aarav Mehta',
    role: 'Backend Node & Cloud Architect',
    text: `AARAV MEHTA
Pune, India | +91 91234 56789 | aarav.cloud@gmail.com | linkedin.com/in/aaravmehta-devops

PROFESSIONAL SUMMARY
Backend & Cloud Infrastructure Engineer specialized in distributed microservices, Kubernetes orchestration, PostgreSQL optimization, and high-throughput Node.js microservices.

TECHNICAL SKILLS
• Backend: Node.js, Express.js, Go / Golang, RESTful APIs, GraphQL
• Cloud & Infrastructure: AWS, Docker, Kubernetes, Terraform, CI/CD, Linux / Bash
• Databases: PostgreSQL, MongoDB, Redis, Cassandra
• Observability: Prometheus, Grafana, ELK Stack

EXPERIENCE
Cloud Backend Engineer | CloudScale Systems, Pune (2022 - Present)
• Migrated monolithic services into Docker containers orchestrated on Kubernetes clusters.
• Optimized PostgreSQL query execution plans, decreasing database CPU utilization by 38%.
• Implemented automated CI/CD deployment pipelines using GitHub Actions and AWS EKS.

EDUCATION
B.E. in Information Technology | Pune University (2018 - 2022) • First Class with Distinction`
  }
];

function generateDefaultSampleRecords() {
  return SAMPLE_HISTORY_PROFILES.map((prof, i) => {
    const analysis = analyzeResumeClient(prof.text, prof.role, '');
    return {
      _id: `sample_seed_${i + 1}`,
      analysisId: `sample_seed_${i + 1}`,
      candidate: {
        name: prof.name,
        email: prof.text.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || 'candidate@example.com',
        phone: '+91 98765 43210'
      },
      targetJob: {
        title: prof.role,
        description: `Requirements for ${prof.role}`,
        requiredSkills: analysis.extractedSkills?.map(s => s.name).slice(0, 8) || ['JavaScript', 'Node.js', 'React.js']
      },
      atsScore: analysis.atsScore,
      skillGap: analysis.skillGap,
      resumeFeatures: analysis.resumeFeatures,
      extractedSkills: analysis.extractedSkills,
      feedback: analysis.feedback,
      geminiInsights: analysis.geminiInsights,
      resumeText: prof.text,
      createdAt: new Date(Date.now() - (i + 1) * 3600 * 1000 * 4).toISOString(),
      timestamp: new Date(Date.now() - (i + 1) * 3600 * 1000 * 4).toISOString(),
      isSampleSeed: true
    };
  });
}

export default function HistoryModal({ onClose, onSelectHistoryItem }) {
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      let remoteItems = await fetchResumeHistory();
      let localItems = getLocalHistory();
      if (!localItems || localItems.length === 0) {
        try {
          localItems = JSON.parse(localStorage.getItem('ats_analysis_history') || '[]');
        } catch (e) {
          localItems = [];
        }
      }

      let combined = [];
      if (Array.isArray(remoteItems) && remoteItems.length > 0) {
        combined = remoteItems;
      } else if (Array.isArray(localItems) && localItems.length > 0) {
        combined = localItems;
      }

      if (combined.length === 0) {
        combined = generateDefaultSampleRecords();
        try {
          localStorage.setItem('ats_resume_history', JSON.stringify(combined));
          localStorage.setItem('ats_analysis_history', JSON.stringify(combined));
        } catch (e) {}
      }

      setHistoryList(combined);
    } catch (err) {
      const samples = generateDefaultSampleRecords();
      setHistoryList(samples);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteResumeHistoryItem(id);
    } catch (err) {}
    
    const filtered = historyList.filter(item => (item._id || item.analysisId) !== id);
    setHistoryList(filtered);
    try {
      localStorage.setItem('ats_resume_history', JSON.stringify(filtered));
      localStorage.setItem('ats_analysis_history', JSON.stringify(filtered));
    } catch (e) {}
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all analysis history?')) return;
    try {
      await clearResumeHistory();
    } catch (err) {}
    
    setHistoryList([]);
    try {
      localStorage.removeItem('ats_resume_history');
      localStorage.removeItem('ats_analysis_history');
    } catch (e) {}
  };

  const handleRestoreSamples = () => {
    const samples = generateDefaultSampleRecords();
    setHistoryList(samples);
    try {
      localStorage.setItem('ats_resume_history', JSON.stringify(samples));
      localStorage.setItem('ats_analysis_history', JSON.stringify(samples));
    } catch (e) {}
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-[#083d1c]/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#115e30] border border-[#E4E7EB] dark:border-[#1e8247] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#F5F7FA] dark:bg-[#083d1c] border-b border-[#E4E7EB] dark:border-[#1e8247] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4CAF4F] dark:bg-[#FAB818] text-white dark:text-[#083d1c] flex items-center justify-center font-bold">
              <History className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#263238] dark:text-white block">Resume Analysis History</span>
              <span className="text-[11px] text-[#717171] dark:text-[#E8F5E9]">Saved candidate evaluations & ATS audits ({historyList.length})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleRestoreSamples}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#115e30] hover:bg-gray-100 dark:hover:bg-[#FAB818] dark:hover:text-[#083d1c] text-[#4CAF4F] dark:text-[#FFC72C] border border-[#E4E7EB] dark:border-[#1e8247] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              title="Load sample candidate analyses"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Load Samples</span>
            </button>

            {historyList.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#717171] dark:text-white hover:bg-gray-200 dark:hover:bg-[#115e30] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5 bg-white dark:bg-[#0b4d26]">
          
          {loading ? (
            <div className="py-16 text-center text-[#717171] dark:text-white space-y-3">
              <div className="w-8 h-8 border-2 border-[#4CAF4F] dark:border-[#FFC72C] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-semibold">Loading historical records...</p>
            </div>
          ) : historyList.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <History className="w-10 h-10 mx-auto text-[#4CAF4F] dark:text-[#FFC72C]" />
              <p className="text-base font-bold text-[#263238] dark:text-white">No analysis records found</p>
              <p className="text-xs text-[#717171] dark:text-[#E8F5E9] max-w-sm mx-auto">
                Click "Load Samples" above or analyze a resume to save evaluations here.
              </p>
              <button
                onClick={handleRestoreSamples}
                className="mt-2 px-5 py-2 rounded-lg bg-[#4CAF4F] dark:bg-[#FAB818] hover:bg-[#388E3C] dark:hover:bg-[#FFC72C] text-white dark:text-[#083d1c] text-xs font-bold shadow-sm transition-all"
              >
                Populate Sample Candidate Records
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {historyList.map((item, idx) => {
                const score = item.atsScore?.percentage || Math.round((item.atsScore?.overallScore || 0.7) * 100);
                let scoreColor = 'text-[#2E7D32] dark:text-[#083d1c] bg-[#E8F5E9] dark:bg-[#FAB818] font-bold border border-[#C8E6C9] dark:border-transparent';
                if (score < 50) scoreColor = 'text-red-700 bg-red-50 dark:bg-red-600 dark:text-white font-bold border border-red-200 dark:border-transparent';
                else if (score < 70) scoreColor = 'text-amber-800 bg-amber-50 dark:bg-[#FAB818] dark:text-[#083d1c] font-bold border border-amber-200 dark:border-transparent';

                const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleString() : (item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Recent');
                const itemId = item._id || item.analysisId || `hist-${idx}`;

                return (
                  <div
                    key={itemId}
                    onClick={() => {
                      onSelectHistoryItem(item);
                      onClose();
                    }}
                    className="p-4 rounded-xl bg-[#F5F7FA] dark:bg-[#115e30] border border-[#E4E7EB] dark:border-[#1e8247] hover:border-[#4CAF4F] dark:hover:border-[#FFC72C] hover:bg-white dark:hover:bg-[#16703b] transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                  >
                    {/* Left: Info */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-[#263238] dark:text-white truncate group-hover:text-[#4CAF4F] dark:group-hover:text-[#FFC72C] transition-colors">
                          {item.candidate?.name || 'Candidate Evaluation'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white dark:bg-[#083d1c] text-[#4CAF4F] dark:text-[#FFC72C] border border-[#E4E7EB] dark:border-[#1e8247]">
                          Target: {item.targetJob?.title || 'Software Engineer'}
                        </span>
                        {item.isSampleSeed && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#E8F5E9] dark:bg-[#FAB818] text-[#2E7D32] dark:text-[#083d1c]">
                            Sample
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#717171] dark:text-[#E8F5E9]">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-[#4CAF4F] dark:text-[#FFC72C]" />
                          {dateStr}
                        </span>
                        {item.skillGap?.matchedSkills && (
                          <span className="text-[11px] text-[#2E7D32] dark:text-[#FFC72C] font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {item.skillGap.matchedSkills.length} matched
                          </span>
                        )}
                        {item.skillGap?.missingSkills && item.skillGap.missingSkills.length > 0 && (
                          <span className="text-[11px] text-red-600 dark:text-white font-semibold flex items-center gap-1 bg-red-50 dark:bg-red-600 px-1.5 rounded">
                            <XCircle className="w-3 h-3" /> {item.skillGap.missingSkills.length} gaps
                          </span>
                        )}
                        {item.geminiInsights?.recruiterHiringVerdict && (
                          <span className="text-[11px] text-[#4CAF4F] dark:text-[#FFC72C] font-mono flex items-center gap-1">
                            <Bot className="w-3 h-3" /> {item.geminiInsights.recruiterHiringVerdict}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Score & Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <div className={`px-3 py-1.5 rounded-lg text-center ${scoreColor}`}>
                        <span className="text-base font-bold font-mono block leading-none">{score}%</span>
                        <span className="text-[9px] uppercase font-semibold tracking-wider block mt-0.5">{item.atsScore?.tier || 'ATS Score'}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHistoryItem(item);
                          onClose();
                        }}
                        className="px-3.5 py-2 rounded-lg bg-[#4CAF4F] hover:bg-[#388E3C] dark:bg-[#FAB818] dark:hover:bg-[#FFC72C] text-white dark:text-[#083d1c] font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                        title="Load this resume evaluation onto dashboard"
                      >
                        <span>Load Report</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteItem(e, item._id || item.analysisId)}
                        className="p-2 rounded-lg text-[#89939E] dark:text-white hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Delete from history"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Bottom Bar */}
        <div className="p-4 bg-[#F5F7FA] dark:bg-[#083d1c] border-t border-[#E4E7EB] dark:border-[#1e8247] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white dark:bg-[#115e30] hover:bg-gray-100 dark:hover:bg-[#16703b] text-[#263238] dark:text-white text-xs font-semibold transition-colors border border-[#E4E7EB] dark:border-[#1e8247]"
          >
            Close History
          </button>
        </div>

      </div>
    </div>
  );
}
