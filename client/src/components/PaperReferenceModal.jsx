import React from 'react';
import { BookOpen, X, Cpu, Award } from 'lucide-react';

export default function PaperReferenceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-[#083d1c]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#115e30] border border-[#E4E7EB] dark:border-[#1e8247] max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="p-4 bg-[#F5F7FA] dark:bg-[#083d1c] border-b border-[#E4E7EB] dark:border-[#1e8247] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4CAF4F] dark:bg-[#FAB818] text-white dark:text-[#083d1c] flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#263238] dark:text-white block">NLP ATS Architecture & Methodologies</span>
              <span className="text-[11px] text-[#717171] dark:text-[#E8F5E9]">Mathematical Formulations & Experimental Benchmarks</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#717171] dark:text-white hover:bg-gray-200 dark:hover:bg-[#115e30] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-[#263238] dark:text-white text-xs sm:text-sm leading-relaxed bg-white dark:bg-[#0b4d26]">
          
          {/* Header Title */}
          <div className="space-y-2 border-b border-[#E4E7EB] dark:border-[#1e8247] pb-4">
            <div className="inline-block px-2.5 py-0.5 rounded bg-[#E8F5E9] dark:bg-[#083d1c] text-[#2E7D32] dark:text-[#FFC72C] font-mono text-[11px] border border-[#C8E6C9] dark:border-[#1e8247] font-semibold">
              AI & Natural Language Processing Architecture
            </div>
            <h2 className="text-xl font-bold text-[#263238] dark:text-white leading-tight">
              An NLP-Based Framework for Applicant Tracking System Compatible Resume Analysis and Career Recommendation
            </h2>
          </div>

          {/* Abstract Summary */}
          <div className="space-y-2 bg-[#F5F7FA] dark:bg-[#115e30] p-4 rounded-xl border border-[#E4E7EB] dark:border-[#1e8247]">
            <h3 className="text-xs font-bold text-[#4D4D4D] dark:text-[#FFC72C] uppercase tracking-wider">Methodology Overview</h3>
            <p className="text-[#717171] dark:text-[#E8F5E9] text-xs">
              Traditional ATS systems reject qualified applicants due to strict keyword filters and lack of contextual understanding. This framework combines NLP text extraction, Named Entity Recognition, contextual vector embeddings, transparent 4-factor scoring (30% Keyword + 35% Semantic + 20% Completeness + 15% Formatting), personalized skill gap elimination, and Top-K career trajectory recommendations.
            </p>
          </div>

          {/* Mathematical Formulations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#4D4D4D] dark:text-[#FFC72C] uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#4CAF4F] dark:text-[#FFC72C]" />
              <span>Core Mathematical Formulations</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#083d1c] border border-[#E4E7EB] dark:border-[#1e8247] space-y-1">
                <span className="text-[#4CAF4F] dark:text-[#FFC72C] font-bold block">ATS Compatibility Scoring</span>
                <p className="text-[#263238] dark:text-white">ATS = (0.30 × Sk) + (0.35 × Ss) + (0.20 × Sc) + (0.15 × Sf)</p>
                <p className="text-[11px] text-[#717171] dark:text-[#E8F5E9]">Sum of weights = 1.00 (100% explainability)</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#083d1c] border border-[#E4E7EB] dark:border-[#1e8247] space-y-1">
                <span className="text-[#4CAF4F] dark:text-[#FFC72C] font-bold block">Semantic Cosine Vector Similarity</span>
                <p className="text-[#263238] dark:text-white">Sim(Vr, Vj) = (Vr · Vj) / (|Vr| × |Vj|)</p>
                <p className="text-[11px] text-[#717171] dark:text-[#E8F5E9]">Contextual vector representation beyond simple keywords</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#083d1c] border border-[#E4E7EB] dark:border-[#1e8247] space-y-1">
                <span className="text-red-600 dark:text-[#E63946] font-bold block">Skill Gap Feedback Elimination</span>
                <p className="text-[#263238] dark:text-white">Skill Gap = Target Requirements - Extracted Skills</p>
                <p className="text-[11px] text-[#717171] dark:text-[#E8F5E9]">Priority-ranked based on ATS score boost</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F5F7FA] dark:bg-[#083d1c] border border-[#E4E7EB] dark:border-[#1e8247] space-y-1">
                <span className="text-[#4CAF4F] dark:text-[#FFC72C] font-bold block">Career Recommendation Method</span>
                <p className="text-[#263238] dark:text-white">Career Match = Sim(Vr, Vi) ranked via Top-K</p>
                <p className="text-[11px] text-[#717171] dark:text-[#E8F5E9]">With location & salary preference constraints</p>
              </div>
            </div>
          </div>

          {/* Research Evaluation Tables */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-[#4D4D4D] dark:text-[#FFC72C] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#4CAF4F] dark:text-[#FFC72C]" />
              <span>Framework Evaluation Benchmarks</span>
            </h3>

            {/* Table II: ATS Compatibility Breakdown */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#263238] dark:text-white">TABLE II. ATS Compatibility Score Breakdown</span>
              <div className="overflow-x-auto border border-[#E4E7EB] dark:border-[#1e8247] rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F5F7FA] dark:bg-[#083d1c] text-[#717171] dark:text-[#E8F5E9] border-b border-[#E4E7EB] dark:border-[#1e8247]">
                    <tr>
                      <th className="p-2.5">Scoring Component</th>
                      <th className="p-2.5">Weight</th>
                      <th className="p-2.5">Baseline ATS</th>
                      <th className="p-2.5 text-[#4CAF4F] dark:text-[#FFC72C]">Proposed NLP Framework</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7EB] dark:divide-[#1e8247] font-mono">
                    <tr>
                      <td className="p-2.5 text-[#263238] dark:text-white">Keyword Matching (Sk)</td>
                      <td className="p-2.5">0.30</td>
                      <td className="p-2.5 text-[#717171] dark:text-[#E8F5E9]">0.70</td>
                      <td className="p-2.5 font-bold text-[#4CAF4F] dark:text-[#FFC72C]">0.88</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-[#263238] dark:text-white">Semantic Similarity (Ss)</td>
                      <td className="p-2.5">0.35</td>
                      <td className="p-2.5 text-[#717171] dark:text-[#E8F5E9]">0.55</td>
                      <td className="p-2.5 font-bold text-[#4CAF4F] dark:text-[#FFC72C]">0.90</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-[#263238] dark:text-white">Section Completeness (Sc)</td>
                      <td className="p-2.5">0.20</td>
                      <td className="p-2.5 text-[#717171] dark:text-[#E8F5E9]">0.76</td>
                      <td className="p-2.5 font-bold text-[#4CAF4F] dark:text-[#FFC72C]">0.85</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-[#263238] dark:text-white">Formatting & Readability (Sf)</td>
                      <td className="p-2.5">0.15</td>
                      <td className="p-2.5 text-[#717171] dark:text-[#E8F5E9]">0.72</td>
                      <td className="p-2.5 font-bold text-[#4CAF4F] dark:text-[#FFC72C]">0.82</td>
                    </tr>
                    <tr className="bg-[#F5F7FA] dark:bg-[#083d1c] font-bold">
                      <td className="p-2.5 text-[#263238] dark:text-white">Overall ATS Score</td>
                      <td className="p-2.5">1.00</td>
                      <td className="p-2.5 text-[#717171] dark:text-[#E8F5E9]">0.66</td>
                      <td className="p-2.5 text-[#4CAF4F] dark:text-[#FFC72C]">0.87 (+31.8%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F7FA] dark:bg-[#083d1c] border-t border-[#E4E7EB] dark:border-[#1e8247] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white dark:bg-[#115e30] hover:bg-gray-100 dark:hover:bg-[#16703b] text-[#263238] dark:text-white text-xs font-semibold transition-colors border border-[#E4E7EB] dark:border-[#1e8247]"
          >
            Close Reference
          </button>
        </div>

      </div>
    </div>
  );
}
