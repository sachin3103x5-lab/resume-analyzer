import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  Users, 
  Bookmark, 
  BookmarkCheck, 
  Filter, 
  Search, 
  Building2, 
  Clock, 
  Star, 
  Flame, 
  Compass 
} from 'lucide-react';
import { INDIAN_TECH_HUBS, generateLiveJobs } from '../services/liveJobsService';

const LOCATION_OPTIONS = [
  'All Locations',
  'Remote / Pan-India',
  'Bengaluru',
  'Gurgaon',
  'Hyderabad',
  'Pune',
  'Mumbai',
  'Noida',
  'Chennai',
  'Kolkata',
  'Ahmedabad'
];

const DOMAIN_FILTERS = [
  { id: 'all', label: 'All Domains' },
  { id: 'fullstack', label: 'Full Stack & Web' },
  { id: 'frontend', label: 'Frontend / Mobile' },
  { id: 'backend', label: 'Backend & Cloud' },
  { id: 'ai-ml', label: 'AI & Data Science' },
  { id: 'devops', label: 'DevOps & Platform' }
];

export default function CareerRecommendationsDeck({ 
  analysisResult,
  recommendations,
  liveJobs,
  targetJobTitle,
  userLocation
}) {
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'internship' | 'fulltime'
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [selectedJobModal, setSelectedJobModal] = useState(null);

  // Extract properties safely
  const effectiveTargetTitle = targetJobTitle || analysisResult?.targetJob?.title || 'Full Stack Software Engineer';
  const effectiveLocation = userLocation || analysisResult?.preferences?.preferredLocation || 'Bengaluru';
  const effectiveSkills = analysisResult?.extractedSkills || [];
  
  const recsList = recommendations || 
    analysisResult?.careerRecommendations?.top5 || 
    (Array.isArray(analysisResult?.careerRecommendations) ? analysisResult.careerRecommendations : []);
  const top1Role = recsList && recsList.length > 0 ? recsList[0] : null;

  // Safe hub lookup (INDIAN_TECH_HUBS is an Object)
  const currentCityHub = INDIAN_TECH_HUBS[effectiveLocation] || INDIAN_TECH_HUBS["Bengaluru"] || { hubName: "Major Indian Tech Hub" };

  // Fallback generation for live tech jobs if not supplied
  const baseJobs = (liveJobs && liveJobs.length > 0)
    ? liveJobs
    : generateLiveJobs({
        targetJobTitle: effectiveTargetTitle,
        extractedSkills: effectiveSkills,
        careerRecommendations: analysisResult?.careerRecommendations,
        selectedLocation: 'All Locations',
        selectedType: 'all'
      });

  // Toggle bookmark
  const toggleSaveJob = (jobId) => {
    setSavedJobIds(prev => {
      const next = new Set(prev);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return next;
    });
  };

  // Filter jobs dynamically
  const filteredJobs = (baseJobs || []).filter(job => {
    // Location filter
    if (selectedLocation !== 'All Locations') {
      const locMatch = (job.location || '').toLowerCase().includes(selectedLocation.toLowerCase()) ||
                       (job.officeHub || '').toLowerCase().includes(selectedLocation.toLowerCase()) ||
                       (selectedLocation.includes('Remote') && job.location?.toLowerCase().includes('remote'));
      if (!locMatch) return false;
    }

    // Type filter
    if (selectedType === 'internship' && job.type !== 'Internship') return false;
    if (selectedType === 'fulltime' && job.type !== 'Full-time' && job.type !== 'Full-Time') return false;

    // Domain filter
    if (selectedDomain !== 'all') {
      const titleLower = (job.title || '').toLowerCase();
      const skillsLower = (job.requiredSkills || []).map(s => s.toLowerCase()).join(' ');
      if (selectedDomain === 'fullstack' && !titleLower.includes('full stack') && !titleLower.includes('mern') && !skillsLower.includes('react')) return false;
      if (selectedDomain === 'frontend' && !titleLower.includes('front') && !titleLower.includes('ui') && !titleLower.includes('react')) return false;
      if (selectedDomain === 'backend' && !titleLower.includes('back') && !titleLower.includes('node') && !titleLower.includes('api') && !titleLower.includes('java')) return false;
      if (selectedDomain === 'ai-ml' && !titleLower.includes('data') && !titleLower.includes('ai') && !titleLower.includes('machine') && !titleLower.includes('python')) return false;
      if (selectedDomain === 'devops' && !titleLower.includes('devops') && !titleLower.includes('cloud') && !skillsLower.includes('aws') && !skillsLower.includes('docker')) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchSearch = 
        (job.title || '').toLowerCase().includes(q) ||
        (job.company || '').toLowerCase().includes(q) ||
        (job.location || '').toLowerCase().includes(q) ||
        (job.officeHub || '').toLowerCase().includes(q) ||
        (job.requiredSkills || []).some(s => s.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-5">
      
      {/* SECTION HEADER & CONTEXT CALLOUT */}
      <div className="bg-white dark:bg-[#143524] p-5 sm:p-6 rounded-xl space-y-4 border border-[#E4E7EB] dark:border-[#2d5b3e] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E4E7EB] dark:border-[#1e8247] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#4CAF4F] dark:bg-[#FAB818] flex items-center justify-center text-white dark:text-[#083d1c] shadow-sm font-black">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#4D4D4D] dark:text-white flex items-center gap-2">
                  <span>Indian Tech Hub Job & Internship Openings</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8F5E9] dark:bg-[#083d1c] text-[#2E7D32] dark:text-[#FFC72C] border border-[#C8E6C9] dark:border-[#1e8247]">
                    LIVE
                  </span>
                </h3>
              </div>
            </div>
            <p className="text-xs text-[#717171] dark:text-[#E8F5E9]">
              Openings matched to <strong className="text-[#4CAF4F] dark:text-[#FFC72C]">{effectiveTargetTitle}</strong> across verified companies in <strong className="text-[#263238] dark:text-white">{selectedLocation}</strong>.
            </p>
          </div>

          {/* Type Tabs */}
          <div className="flex p-1 rounded-lg bg-[#F5F7FA] dark:bg-[#10281b] border border-[#E4E7EB] dark:border-[#2d5b3e] text-xs font-bold self-start md:self-auto">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3.5 py-1.5 rounded-md transition-all font-bold ${
                selectedType === 'all'
                  ? 'bg-[#4CAF4F] dark:bg-[#FAB818] text-white dark:text-[#083d1c] shadow-xs'
                  : 'text-[#717171] dark:text-white hover:text-[#4D4D4D] dark:hover:text-[#FFC72C]'
              }`}
            >
              All ({filteredJobs.length})
            </button>
            <button
              onClick={() => setSelectedType('internship')}
              className={`px-3.5 py-1.5 rounded-md transition-all font-bold ${
                selectedType === 'internship'
                  ? 'bg-[#4CAF4F] dark:bg-[#FAB818] text-white dark:text-[#083d1c] shadow-xs'
                  : 'text-[#717171] dark:text-white hover:text-[#4D4D4D] dark:hover:text-[#FFC72C]'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setSelectedType('fulltime')}
              className={`px-3.5 py-1.5 rounded-md transition-all font-bold ${
                selectedType === 'fulltime'
                  ? 'bg-[#4CAF4F] dark:bg-[#FAB818] text-white dark:text-[#083d1c] shadow-xs'
                  : 'text-[#717171] dark:text-white hover:text-[#4D4D4D] dark:hover:text-[#FFC72C]'
              }`}
            >
              Full-Time
            </button>
          </div>
        </div>

        {/* Dynamic Candidate Context Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {top1Role && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F5F7FA] dark:bg-[#10281b] border border-[#E4E7EB] dark:border-[#2d5b3e] text-xs">
              <Compass className="w-4 h-4 text-[#4CAF4F] dark:text-[#FFC72C] shrink-0" />
              <span className="text-[#717171] dark:text-[#E8F5E9]">
                Top Fit: <strong className="text-[#263238] dark:text-[#FFC72C]">{top1Role.title}</strong> ({top1Role.matchPercentage || Math.round((top1Role.similarity || 0.8) * 100)}% fit)
              </span>
            </div>
          )}
          {currentCityHub && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F5F7FA] dark:bg-[#10281b] border border-[#E4E7EB] dark:border-[#2d5b3e] text-xs">
              <MapPin className="w-4 h-4 text-[#4CAF4F] dark:text-[#FFC72C] shrink-0" />
              <span className="text-[#717171] dark:text-[#E8F5E9] truncate">
                Tech Hub: <strong className="text-[#263238] dark:text-white">{currentCityHub.hubName}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white dark:bg-[#143524] p-4 rounded-xl space-y-3.5 border border-[#E4E7EB] dark:border-[#2d5b3e] shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#89939E] dark:text-[#81C784] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company (e.g. Swiggy, TCS), or skill (e.g. React, Python)..."
              className="w-full rounded-lg pl-9 pr-3 py-2 text-xs bg-[#F5F7FA] dark:bg-[#083d1c] text-[#263238] dark:text-white border border-[#E4E7EB] dark:border-[#1e8247]"
            />
          </div>

          {/* Location Selector Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <MapPin className="w-4 h-4 text-[#4CAF4F] dark:text-[#FFC72C] shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full sm:w-auto rounded-lg px-3 py-2 text-xs font-semibold bg-[#F5F7FA] dark:bg-[#083d1c] text-[#263238] dark:text-white border border-[#E4E7EB] dark:border-[#1e8247]"
            >
              {LOCATION_OPTIONS.map((loc, idx) => (
                <option key={idx} value={loc}>
                  📍 {loc}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Quick Location Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] uppercase font-bold text-[#89939E] dark:text-[#FFC72C] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#4CAF4F] dark:text-[#FFC72C]" /> City:
          </span>
          {LOCATION_OPTIONS.map((loc, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedLocation(loc)}
              className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all font-semibold ${
                selectedLocation === loc
                  ? 'bg-[#4CAF4F] dark:bg-[#FAB818] text-white dark:text-[#083d1c] shadow-xs'
                  : 'bg-[#F5F7FA] dark:bg-[#083d1c] text-[#717171] dark:text-white hover:text-[#4D4D4D] dark:hover:text-[#FFC72C] border border-[#E4E7EB] dark:border-[#1e8247]'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Domain Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E4E7EB] dark:border-[#1e8247]">
          <span className="text-[10px] uppercase font-bold text-[#89939E] dark:text-[#FFC72C] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#4CAF4F] dark:text-[#FFC72C]" /> Domain:
          </span>
          {DOMAIN_FILTERS.map((df) => (
            <button
              key={df.id}
              onClick={() => setSelectedDomain(df.id)}
              className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all font-semibold ${
                selectedDomain === df.id
                  ? 'bg-[#4CAF4F] dark:bg-[#FAB818] text-white dark:text-[#083d1c] shadow-xs'
                  : 'bg-[#F5F7FA] dark:bg-[#083d1c] text-[#717171] dark:text-white hover:text-[#4D4D4D] dark:hover:text-[#FFC72C] border border-[#E4E7EB] dark:border-[#1e8247]'
              }`}
            >
              {df.label}
            </button>
          ))}
        </div>
      </div>

      {/* JOBS GRID */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center text-[#717171] dark:text-[#E8F5E9] bg-white dark:bg-[#115e30] rounded-xl space-y-3 border border-[#E4E7EB] dark:border-[#1e8247]">
          <Building2 className="w-10 h-10 text-[#4CAF4F] dark:text-[#FFC72C] mx-auto" />
          <p className="text-sm font-bold text-[#263238] dark:text-white">No matching openings found in {selectedLocation}</p>
          <p className="text-xs text-[#717171] dark:text-[#E8F5E9]">Try selecting "All Locations" or exploring other domain filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => {
            const isSaved = savedJobIds.has(job.id);
            const isInternship = job.type === 'Internship';

            return (
              <div
                key={job.id}
                className="bg-white dark:bg-[#142c21] p-5 rounded-xl space-y-4 flex flex-col justify-between border border-[#E4E7EB] dark:border-[#28523a] hover:border-[#FFC72C] hover:shadow-md transition-all relative group shadow-xs"
              >
                {/* Top Badge & Save Bookmark */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {job.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-[#E8F5E9] dark:bg-[#FAB818] text-[#2E7D32] dark:text-[#083d1c] flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {job.badge}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold font-mono bg-[#F5F7FA] dark:bg-[#083d1c] text-[#717171] dark:text-white border border-[#E4E7EB] dark:border-[#1e8247]">
                      {job.type}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="text-[#89939E] dark:text-[#E8F5E9] hover:text-[#4CAF4F] dark:hover:text-[#FFC72C] transition-colors p-1"
                    title={isSaved ? "Saved to bookmarks" : "Save opening"}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-[#4CAF4F] dark:text-[#FFC72C]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Job Title & Company Header */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] dark:bg-[#102419] border border-[#E4E7EB] dark:border-[#28523a] flex items-center justify-center text-xl shrink-0">
                      {job.companyLogo || '🏢'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-[#263238] dark:text-white group-hover:text-[#4CAF4F] dark:group-hover:text-[#FFC72C] transition-colors leading-snug line-clamp-2">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-[#717171] dark:text-[#E8F5E9] pt-0.5">
                        <span className="font-semibold text-[#4CAF4F] dark:text-[#FFC72C] truncate">{job.company}</span>
                        {job.verified && (
                          <span className="text-[#4CAF4F] dark:text-[#FFC72C] text-[10px]" title="Verified">✓</span>
                        )}
                        <span className="text-[11px] text-amber-500 flex items-center gap-0.5 font-mono font-bold">
                          <Star className="w-3 h-3 fill-amber-500" /> {job.companyRating || '4.3'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location & Stipend Specs */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2 rounded-lg bg-[#F5F7FA] dark:bg-[#102419] border border-[#E4E7EB] dark:border-[#28523a]">
                      <span className="text-[10px] text-[#89939E] dark:text-[#C8E6C9] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#4CAF4F] dark:text-[#FFC72C]" />
                        <span>Location / Hub</span>
                      </span>
                      <span className="font-bold text-[#263238] dark:text-white text-[11px] truncate block mt-0.5">
                        {job.officeHub ? job.officeHub.split(',')[0] : (job.location || 'India')}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-[#F5F7FA] dark:bg-[#102419] border border-[#E4E7EB] dark:border-[#28523a]">
                      <span className="text-[10px] text-[#89939E] dark:text-[#C8E6C9] flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-[#4CAF4F] dark:text-[#FFC72C]" />
                        <span>{isInternship ? 'Stipend' : 'CTC / Salary'}</span>
                      </span>
                      <span className="font-bold text-[#263238] dark:text-white text-[11px] truncate block mt-0.5">
                        {job.stipend || (isInternship ? '₹25k - ₹40k/mo' : '₹8 - ₹16 LPA')}
                      </span>
                    </div>
                  </div>

                  {/* ATS Skill Match Affinity Progress Bar */}
                  <div className="p-2.5 rounded-lg bg-[#F5F7FA] dark:bg-[#102419] border border-[#E4E7EB] dark:border-[#28523a] space-y-1.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-[#4D4D4D] dark:text-white flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3 text-[#4CAF4F] dark:text-[#FFC72C]" />
                        <span>Skill Overlap:</span>
                      </span>
                      <span className="font-bold font-mono text-[#4CAF4F] dark:text-[#FFC72C]">
                        {job.matchPercentage || 78}%
                      </span>
                    </div>
                    <div className="w-full bg-[#E4E7EB] dark:bg-[#115e30] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#4CAF4F] dark:bg-[#FFC72C] h-1.5 rounded-full transition-all"
                        style={{ width: `${Math.max(job.matchPercentage || 75, 5)}%` }}
                      />
                    </div>
                  </div>

                  {/* Skills Pill Tags */}
                  <div className="flex flex-wrap gap-1 pt-1 max-h-16 overflow-hidden">
                    {(job.requiredSkills || ['React.js', 'Node.js']).slice(0, 4).map((skill, sIdx) => {
                      const isMatched = (job.matchedSkills || []).includes(skill);
                      return (
                        <span
                          key={sIdx}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            isMatched
                              ? 'bg-[#E8F5E9] dark:bg-[#FAB818] text-[#2E7D32] dark:text-[#083d1c]'
                              : 'bg-[#F5F7FA] dark:bg-[#083d1c] text-[#717171] dark:text-white border border-[#E4E7EB] dark:border-[#1e8247]'
                          }`}
                        >
                          {isMatched ? `✓ ${skill}` : skill}
                        </span>
                      );
                    })}
                  </div>

                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-[#E4E7EB] dark:border-[#1e8247] flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#89939E] dark:text-[#E8F5E9] font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{job.postedAgo || '2 days ago'}</span>
                  </span>

                  <button
                    onClick={() => setSelectedJobModal(job)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#4CAF4F] hover:bg-[#388E3C] dark:bg-[#FAB818] dark:hover:bg-[#FFC72C] text-white dark:text-[#083d1c] text-xs font-bold transition-all shadow-xs active:scale-95"
                  >
                    View Details
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* QUICK VIEW DETAILS MODAL */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-[#083d1c]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#115e30] p-6 rounded-xl max-w-xl w-full border border-[#E4E7EB] dark:border-[#1e8247] space-y-4 relative max-h-[90vh] overflow-y-auto shadow-xl">
            
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#F5F7FA] dark:bg-[#083d1c] border border-[#E4E7EB] dark:border-[#1e8247] flex items-center justify-center text-2xl">
                  {selectedJobModal.companyLogo || '🏢'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#263238] dark:text-white leading-snug">
                    {selectedJobModal.title}
                  </h3>
                  <p className="text-xs text-[#717171] dark:text-[#E8F5E9]">
                    {selectedJobModal.company} • {selectedJobModal.officeHub || selectedJobModal.location} ({selectedJobModal.type})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJobModal(null)}
                className="p-1.5 rounded-lg text-[#717171] dark:text-white hover:bg-gray-100 dark:hover:bg-[#083d1c] transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#F5F7FA] dark:bg-[#083d1c] border border-[#E4E7EB] dark:border-[#1e8247]">
                <span className="text-[10px] text-[#89939E] dark:text-[#C8E6C9] block">Stipend / Salary</span>
                <span className="font-bold text-[#263238] dark:text-white text-xs">{selectedJobModal.stipend || 'Competitive'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F5F7FA] dark:bg-[#083d1c] border border-[#E4E7EB] dark:border-[#1e8247]">
                <span className="text-[10px] text-[#89939E] dark:text-[#C8E6C9] block">Duration</span>
                <span className="font-bold text-[#263238] dark:text-white text-xs">{selectedJobModal.duration || 'Full-time'}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F5F7FA] dark:bg-[#083d1c] border border-[#E4E7EB] dark:border-[#1e8247]">
                <span className="text-[10px] text-[#89939E] dark:text-[#C8E6C9] block">Match Score</span>
                <span className="font-bold text-[#4CAF4F] dark:text-[#FFC72C] text-xs">{selectedJobModal.matchPercentage || 78}% Skill Fit</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F5F7FA] dark:bg-[#083d1c] border border-[#E4E7EB] dark:border-[#1e8247]">
                <span className="text-[10px] text-[#89939E] dark:text-[#C8E6C9] block">Openings</span>
                <span className="font-bold text-[#263238] dark:text-white text-xs">{selectedJobModal.openings || '4'} Openings</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-[#4D4D4D] dark:text-[#FFC72C] uppercase tracking-wide">Job Description & Tech Hub</h4>
              <p className="text-xs text-[#4D4D4D] dark:text-white leading-relaxed bg-[#F5F7FA] dark:bg-[#083d1c] p-3.5 rounded-lg border border-[#E4E7EB] dark:border-[#1e8247]">
                {selectedJobModal.description || 'Join a fast-paced development team building mission-critical services.'}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[#E4E7EB] dark:border-[#1e8247] flex justify-end items-center">
              <button
                onClick={() => setSelectedJobModal(null)}
                className="px-5 py-2 rounded-lg bg-[#F5F7FA] hover:bg-[#E4E7EB] dark:bg-[#083d1c] dark:hover:bg-[#FAB818] dark:hover:text-[#083d1c] text-[#263238] dark:text-white text-xs font-semibold transition-colors border border-[#E4E7EB] dark:border-[#1e8247]"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
