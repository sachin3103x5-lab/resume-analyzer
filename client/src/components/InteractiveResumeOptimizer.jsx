import React, { useState, useEffect } from 'react';
import { Edit3, Sparkles, CheckCircle, Zap, Trash2, RotateCcw } from 'lucide-react';
import { analyzeResumeClient } from '../services/clientNlpEngine';

export default function InteractiveResumeOptimizer({ initialText, targetRole, onApplyOptimized }) {
  const [liveText, setLiveText] = useState(initialText || '');
  const [liveResult, setLiveResult] = useState(null);
  const [initialPercentage, setInitialPercentage] = useState(null);

  useEffect(() => {
    if (initialText !== undefined) {
      setLiveText(initialText || '');
      const res = analyzeResumeClient(initialText || '', targetRole || 'Full Stack Software Engineer', '');
      setLiveResult(res);
      setInitialPercentage(res?.atsScore?.percentage || 0);
    }
  }, [initialText, targetRole]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setLiveText(newText);
    const res = analyzeResumeClient(newText, targetRole || 'Full Stack Software Engineer', '');
    setLiveResult(res);
  };

  const handleQuickInsertSkill = (skill) => {
    const updated = liveText + (liveText.endsWith('\n') ? '' : '\n') + `• Demonstrated practical expertise in ${skill} for scalable feature delivery.`;
    setLiveText(updated);
    const res = analyzeResumeClient(updated, targetRole || 'Full Stack Software Engineer', '');
    setLiveResult(res);
  };

  const handleClearText = () => {
    setLiveText('');
    const res = analyzeResumeClient('', targetRole || 'Full Stack Software Engineer', '');
    setLiveResult(res);
  };

  const handleResetInitial = () => {
    if (initialText) {
      setLiveText(initialText);
      const res = analyzeResumeClient(initialText, targetRole || 'Full Stack Software Engineer', '');
      setLiveResult(res);
    }
  };

  if (!liveResult) return null;

  const currentPercentage = liveResult.atsScore?.percentage || 0;
  const scoreDelta = currentPercentage - (initialPercentage !== null ? initialPercentage : currentPercentage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white dark:bg-[#115e30] p-6 sm:p-7 rounded-xl space-y-4 border border-[#E4E7EB] dark:border-[#1e8247] shadow-xs">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E7EB] dark:border-[#1e8247] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] dark:bg-[#083d1c] text-[#4CAF4F] dark:text-[#FFC72C] flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#4D4D4D] dark:text-white flex items-center gap-2">
                <span>Live Interactive ATS Optimizer & Simulator</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] dark:bg-[#083d1c] text-[#2E7D32] dark:text-[#FFC72C] border border-[#C8E6C9] dark:border-[#1e8247]">
                  REAL-TIME
                </span>
              </h3>
              <p className="text-xs text-[#717171] dark:text-[#E8F5E9]">
                Edit your bullet points or add missing keywords below to see your ATS score update in real-time.
              </p>
            </div>
          </div>

          {/* Live Score Counter */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-[#717171] dark:text-[#FFC72C] block uppercase font-mono font-bold">Live Score</span>
              <span className="text-2xl font-black text-[#263238] dark:text-white font-mono">{currentPercentage}%</span>
            </div>
            {scoreDelta !== 0 && (
              <div className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono flex items-center gap-1 ${
                scoreDelta > 0 
                  ? 'bg-[#E8F5E9] dark:bg-[#FAB818] text-[#2E7D32] dark:text-[#083d1c]' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
              }`}>
                {scoreDelta > 0 ? `+${scoreDelta}%` : `${scoreDelta}%`}
              </div>
            )}
          </div>
        </div>

        {/* Quick Skill Inserts */}
        {liveResult.skillGap?.missingSkills?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs bg-[#F5F7FA] dark:bg-[#083d1c] p-3 rounded-lg border border-[#E4E7EB] dark:border-[#1e8247]">
            <span className="text-[#4D4D4D] dark:text-white flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#4CAF4F] dark:text-[#FFC72C]" />
              <span>Quick +Insert missing skill:</span>
            </span>
            {liveResult.skillGap.missingSkills.slice(0, 5).map((sk, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickInsertSkill(sk)}
                className="px-2.5 py-0.5 rounded-md bg-white dark:bg-[#115e30] hover:border-[#4CAF4F] dark:hover:border-[#FFC72C] text-[#263238] dark:text-white border border-[#E4E7EB] dark:border-[#1e8247] transition-all font-mono text-[11px] font-semibold shadow-xs"
              >
                + {sk}
              </button>
            ))}
          </div>
        )}

        {/* Editor Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-[#717171] dark:text-[#E8F5E9] px-1">
              <span>Resume Content Editor ({liveText.split(/\s+/).filter(Boolean).length} words)</span>
              <button
                type="button"
                onClick={handleClearText}
                className="hover:text-red-600 text-[#717171] dark:text-white flex items-center gap-1 transition-colors font-semibold"
                title="Clear all text from editor"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
                <span>Clear</span>
              </button>
            </div>
            <textarea
              rows={11}
              value={liveText}
              onChange={handleTextChange}
              className="w-full rounded-xl p-4 text-xs font-mono resize-y leading-relaxed bg-[#F5F7FA] dark:bg-[#083d1c] text-[#263238] dark:text-white border border-[#E4E7EB] dark:border-[#1e8247] focus:border-[#4CAF4F] dark:focus:border-[#FFC72C]"
              placeholder="Edit your resume content in real-time or paste new text..."
            />
          </div>

          <div className="lg:col-span-4 space-y-3 bg-[#F5F7FA] dark:bg-[#083d1c] p-4 rounded-xl border border-[#E4E7EB] dark:border-[#1e8247] text-xs flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="font-bold text-[#4D4D4D] dark:text-[#FFC72C] flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <Edit3 className="w-3.5 h-3.5 text-[#4CAF4F] dark:text-[#FFC72C]" />
                <span>Live Metric Diagnostics</span>
              </h4>

              <div className="space-y-2 text-[#4D4D4D] dark:text-white">
                <div className="flex justify-between">
                  <span>Keyword Match (Sk):</span>
                  <span className="font-mono font-bold text-[#4CAF4F] dark:text-[#FFC72C]">{liveResult.atsScore?.breakdown?.keywordMatch?.percentage || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Semantic Relevance (Ss):</span>
                  <span className="font-mono font-bold text-[#4CAF4F] dark:text-[#FFC72C]">{liveResult.atsScore?.breakdown?.semanticSimilarity?.percentage || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Section Completeness (Sc):</span>
                  <span className="font-mono font-bold text-[#4CAF4F] dark:text-[#FFC72C]">{liveResult.atsScore?.breakdown?.sectionCompleteness?.percentage || 0}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Formatting Fidelity (Sf):</span>
                  <span className="font-mono font-bold text-[#4CAF4F] dark:text-[#FFC72C]">{liveResult.atsScore?.breakdown?.formattingReadability?.percentage || 0}%</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 shrink-0 pt-3 border-t border-[#E4E7EB] dark:border-[#1e8247] space-y-2">
              <button
                type="button"
                onClick={() => onApplyOptimized(liveResult, liveText)}
                className="relative z-10 flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#4CAF4F] hover:bg-[#388E3C] dark:bg-[#FAB818] dark:hover:bg-[#FFC72C] px-4 py-2.5 text-xs font-bold text-white dark:text-[#083d1c] shadow-sm transition-all hover:scale-[1.01] active:scale-95"
              >
                <CheckCircle className="w-4 h-4" />
                <span>APPLY CHANGES TO DASHBOARD</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleClearText}
                  className="py-2 px-3 rounded-lg text-xs font-semibold bg-white dark:bg-[#115e30] hover:bg-gray-100 dark:hover:bg-[#16703b] text-[#4D4D4D] dark:text-white flex items-center justify-center gap-1.5 transition-colors border border-[#E4E7EB] dark:border-[#1e8247]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetInitial}
                  className="py-2 px-3 rounded-lg text-xs font-semibold bg-white dark:bg-[#115e30] hover:bg-gray-100 dark:hover:bg-[#16703b] text-[#4CAF4F] dark:text-[#FFC72C] flex items-center justify-center gap-1.5 transition-colors border border-[#E4E7EB] dark:border-[#1e8247]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
