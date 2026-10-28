import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DEFAULT_TIMELINE } from '../data/defaultData';
import { Shield, Flag, Award, Terminal, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';
import { playKeySound } from '../utils/audio';

export const ExperiencePage: React.FC = () => {
  const { setCurrentPage } = usePortfolio();
  const [filterType, setFilterType] = useState<'all' | 'career' | 'certification' | 'achievement'>('all');

  const filteredTimeline = filterType === 'all' 
    ? DEFAULT_TIMELINE 
    : DEFAULT_TIMELINE.filter(item => item.type === filterType);

  // Bug bounty & security disclosures stats
  const bugBounties = [
    { target: "Fortune 500 FinTech API", severity: "CRITICAL", finding: "Authentication bypass via JWT algorithm confusion & HMAC key exposure", reward: "$7,500" },
    { target: "Enterprise Cloud Identity Provider", severity: "HIGH", finding: "Blind SSRF to AWS EC2 instance metadata service via avatar import", reward: "$5,000" },
    { target: "Decentralized Exchange (DEX)", severity: "HIGH", finding: "Reentrancy vulnerability in reward distribution smart contract", reward: "$4,000" },
    { target: "SaaS CRM Platform", severity: "MEDIUM", finding: "Insecure Direct Object Reference (IDOR) leaking organizational billing data", reward: "$1,500" },
  ];

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#183124] pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#00FF66] font-mono text-xs">
            <Shield className="w-4 h-4" />
            <span>// ENGAGEMENT HISTORY &amp; OPERATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1 tracking-tight">
            OPERATIONAL EXPERIENCE
          </h1>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl font-sans">
            Red team assessments, vulnerability research track record, competitive CTF rankings, and corporate penetration testing engagements.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {(['all', 'career', 'certification', 'achievement'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setFilterType(tab);
                playKeySound();
              }}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                filterType === tab
                  ? 'bg-[#183124] text-[#00FF66] border border-[#00FF66]/50 font-bold'
                  : 'bg-[#070d0a] text-gray-400 border border-[#183124] hover:text-white'
              }`}
            >
              {tab === 'all' ? 'All Records' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Career & Milestone Cards */}
      <div className="space-y-6">
        {filteredTimeline.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-xl bg-[#070d0a] border border-[#183124] hover:border-[#00FF66]/40 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#183124] pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-[#0e1612] border border-[#00FF66]/30 text-[#00FF66]">
                  {item.type === 'career' ? (
                    <Shield className="w-4 h-4" />
                  ) : item.type === 'certification' ? (
                    <Award className="w-4 h-4 text-[#00E5FF]" />
                  ) : (
                    <Flag className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-[#00E5FF]">
                    {item.roleOrCredential} • <span className="text-gray-400">{item.organization}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs">
                <span className="text-[#00FF66] font-bold">{item.year}</span>
                <span className="px-2 py-0.5 rounded bg-[#183124] text-gray-300 text-[10px] uppercase">
                  {item.type}
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-sm font-sans leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded bg-[#0e1612] border border-[#183124] text-gray-300"
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Coordinated Disclosures & Bug Bounty Showcase */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#070d0a] border border-[#183124] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[#00E5FF] font-mono text-xs">
              <Terminal className="w-4 h-4" />
              <span>// BUG BOUNTY &amp; RESPONSIBLE DISCLOSURES</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-sans mt-1">
              Select Verified Findings
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Strictly sanitized excerpts from authorized programs under coordinated disclosure terms.
            </p>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>NDAs Respected</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bugBounties.map((bounty, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#050807] border border-[#183124] hover:border-[#00FF66]/40 transition-colors space-y-2.5"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white font-semibold truncate mr-2">
                  {bounty.target}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  bounty.severity === 'CRITICAL'
                    ? 'bg-red-950/60 text-red-400 border border-red-800/50'
                    : bounty.severity === 'HIGH'
                    ? 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                    : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                }`}>
                  {bounty.severity}
                </span>
              </div>

              <p className="text-gray-300 text-xs font-sans leading-relaxed">
                {bounty.finding}
              </p>

              <div className="pt-2 border-t border-[#183124] flex items-center justify-between font-mono text-[11px] text-gray-400">
                <span className="flex items-center space-x-1 text-[#00FF66]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Resolved & Patched</span>
                </span>
                <span className="text-[#00E5FF] font-bold">
                  Bounty Awarded: {bounty.reward}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Callout */}
      <div className="p-6 rounded-xl bg-[#0e1612] border border-[#00FF66]/30 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 text-[#00FF66] shrink-0" />
          <span className="text-gray-300">
            All engagements strictly executed under Rules of Engagement (RoE) and mutual authorization.
          </span>
        </div>
        <button
          onClick={() => setCurrentPage('contact')}
          className="px-4 py-2 rounded bg-[#00FF66] text-[#050807] font-bold hover:bg-[#20ff77] shrink-0 transition-colors"
        >
          Request Engagement Scope
        </button>
      </div>
    </div>
  );
};
