import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { filterSkills } from '../utils/portfolioLogic';
import { SkillCategory } from '../types/portfolio';
import { Search, Shield, Wrench, Code2, Globe, Cpu, RotateCcw, Check, Sparkles, Filter } from 'lucide-react';
import { playKeySound } from '../utils/audio';

export const SkillsPage: React.FC = () => {
  const { skills, updateSkillProficiency, resetSkills } = usePortfolio();

  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTuningMode, setIsTuningMode] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'terminal'>('cards');

  const categories: Array<{ id: SkillCategory | 'All'; label: string; icon: React.ReactNode }> = [
    { id: 'All', label: 'All Capabilities', icon: <Filter className="w-3.5 h-3.5" /> },
    { id: 'Cybersecurity', label: 'Cybersecurity', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'Tools', label: 'Offensive Tools', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'Programming', label: 'Programming', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'Development', label: 'Development', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'Systems & Networking', label: 'Systems & Networks', icon: <Cpu className="w-3.5 h-3.5" /> },
  ];

  const filteredSkills = filterSkills(skills, selectedCategory, searchQuery);

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#183124] pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#00FF66] font-mono text-xs">
            <Cpu className="w-4 h-4" />
            <span>// TECHNICAL CAPABILITY DASHBOARD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1 tracking-tight flex items-center space-x-3">
            <span>SKILLS &amp; EXPLOIT ARSENAL</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl font-sans">
            Categorized offensive security toolchains, development languages, systems engineering, and network protocol proficiencies.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <button
            onClick={() => {
              setIsTuningMode(!isTuningMode);
              playKeySound();
            }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg border transition-all ${
              isTuningMode
                ? 'bg-[#00FF66] text-[#050807] font-bold border-[#00FF66]'
                : 'bg-[#0e1612] text-gray-300 border-[#183124] hover:text-[#00FF66] hover:border-[#00FF66]/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTuningMode ? 'Finish Tuning' : 'Tune Proficiencies'}</span>
          </button>

          <button
            onClick={() => {
              setViewMode(viewMode === 'cards' ? 'terminal' : 'cards');
              playKeySound();
            }}
            className="px-3 py-2 rounded-lg bg-[#0e1612] border border-[#183124] text-gray-300 hover:text-[#00E5FF] transition-colors"
          >
            {viewMode === 'cards' ? 'Terminal View' : 'Card View'}
          </button>
        </div>
      </div>

      {/* Notice Banner about Configurable Proficiencies */}
      <div className="p-3.5 rounded-lg bg-[#0a120e] border border-[#00FF66]/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-gray-300 gap-2">
        <div className="flex items-center space-x-2 text-[#00FF66]">
          <span className="w-2 h-2 rounded-full bg-[#00FF66]"></span>
          <span>CONFIGURABLE PROFICIENCIES: All percentages represent personal self-assessment and can be tuned dynamically.</span>
        </div>
        {isTuningMode && (
          <button
            onClick={resetSkills}
            className="flex items-center space-x-1 text-amber-400 hover:underline shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Standard</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  playKeySound();
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-[#183124] text-[#00FF66] border border-[#00FF66]/50 font-bold shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                    : 'bg-[#070d0a] text-gray-400 border border-[#183124] hover:text-white hover:border-gray-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills by keyword, framework, protocol, or CVE experience (e.g. Wireshark, SQL, Python, Nmap)..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#070d0a] border border-[#183124] text-white placeholder:text-gray-500 font-mono text-xs sm:text-sm focus:border-[#00FF66] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-mono"
            >
              [Clear]
            </button>
          )}
        </div>
      </div>

      {/* Skills Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-xl bg-[#070d0a] border border-[#183124] hover:border-[#00FF66]/50 hover:shadow-[0_0_20px_rgba(0,255,102,0.12)] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#00E5FF] font-semibold">
                    [{skill.category}]
                  </span>
                  <span className="text-[#00FF66] font-bold">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-bold text-white font-sans">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-xs font-sans leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Progress bar or slider */}
              <div className="space-y-2 pt-2">
                {isTuningMode ? (
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[10px] text-gray-400">
                      <span>Adjust Proficiency</span>
                      <span className="text-[#00FF66] font-bold">{skill.proficiency}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={skill.proficiency}
                      onChange={(e) => updateSkillProficiency(skill.id, parseInt(e.target.value))}
                      className="w-full accent-[#00FF66] cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="w-full h-2 rounded-full bg-[#183124] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00FF66] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,255,102,0.5)]"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                )}

                {/* CVE or Lab Experience Badge */}
                {skill.cveOrLabExperience && (
                  <div className="pt-2 border-t border-[#183124] flex items-start space-x-1.5 text-[11px] font-mono text-gray-400">
                    <Check className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                    <span>{skill.cveOrLabExperience}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Terminal Table View */
        <div className="rounded-xl border border-[#183124] bg-[#050807] overflow-hidden font-mono text-xs">
          <div className="p-3 bg-[#0d1612] border-b border-[#183124] text-gray-400 flex justify-between">
            <span>cat /etc/sec/capabilities.list</span>
            <span>TOTAL: {filteredSkills.length} MODULES</span>
          </div>
          <div className="divide-y divide-[#183124] max-h-[600px] overflow-y-auto">
            {filteredSkills.map((skill, idx) => (
              <div
                key={skill.id}
                className="p-3.5 hover:bg-[#0e1612] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-gray-500 w-6">{(idx + 1).toString().padStart(2, '0')}</span>
                  <div>
                    <span className="text-white font-bold">{skill.name}</span>
                    <span className="text-[#00E5FF] ml-2 text-[11px]">[{skill.category}]</span>
                    <p className="text-gray-400 text-[11px] mt-0.5">{skill.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 self-end sm:self-auto shrink-0">
                  <div className="w-32 hidden sm:block">
                    <div className="w-full h-1.5 rounded-full bg-[#183124] overflow-hidden">
                      <div
                        className="h-full bg-[#00FF66]"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[#00FF66] font-bold w-12 text-right">
                    {skill.proficiency}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <div className="p-12 text-center rounded-xl border border-[#183124] bg-[#070d0a] font-mono text-xs space-y-2">
          <div className="text-amber-400 text-sm">NO CAPABILITIES MATCH FILTER: &quot;{searchQuery}&quot;</div>
          <p className="text-gray-400">Try searching for other terms like &quot;Linux&quot;, &quot;Python&quot;, or selecting &quot;All Capabilities&quot;.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 px-3 py-1.5 rounded bg-[#183124] text-[#00FF66] hover:bg-[#224430]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
