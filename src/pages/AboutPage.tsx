import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DEFAULT_TIMELINE } from '../data/defaultData';
import { Shield, Terminal, Award, BookOpen, Briefcase, Sliders, Key, Compass, CheckCircle2 } from 'lucide-react';
import { playAccessGranted } from '../utils/audio';

export const AboutPage: React.FC = () => {
  const { profile, setIsEditModalOpen, setIsPgpModalOpen, setCurrentPage } = usePortfolio();

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#183124] pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#00FF66] font-mono text-xs">
            <Terminal className="w-4 h-4" />
            <span>// SYSTEM PROFILE // IDENTITY MATRIX</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1 tracking-tight flex items-center space-x-3">
            <span>WHOAMI</span>
            <span className="text-[#00E5FF] font-light text-2xl">:~$</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl font-sans">
            Detailed dossier on operational profile, offensive security methodology, certifications, and engineering history.
          </p>
        </div>

        <button
          onClick={() => {
            setIsEditModalOpen(true);
            playAccessGranted();
          }}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#0e1612] border border-[#00E5FF]/40 text-[#00E5FF] hover:border-[#00E5FF] hover:bg-[#12221b] text-xs font-mono transition-all"
        >
          <Sliders className="w-4 h-4" />
          <span>Edit Profile Parameters</span>
        </button>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar & Quick Terminal Profile Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-[#00FF66]/40 bg-[#070d0a] shadow-[0_0_25px_rgba(0,255,102,0.15)] overflow-hidden">
            {/* Profile Avatar Graphic */}
            <div className="relative h-64 w-full bg-[#050807] overflow-hidden flex items-center justify-center border-b border-[#183124]">
              <img
                src={profile.avatarUrl}
                alt={`${profile.fullName} Cyber Avatar`}
                className="w-full h-full object-cover opacity-80 filter contrast-125 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070d0a] via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#050807]/80 border border-[#00FF66]/50 text-[10px] font-mono text-[#00FF66]">
                CLEARANCE: ALPHA
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#070d0a]/90 border border-[#183124] text-[11px] font-mono text-[#00E5FF]">
                {profile.handle}
              </div>
            </div>

            {/* Terminal-Style Profile Attributes */}
            <div className="p-5 font-mono text-xs space-y-3.5 bg-[#070d0a]">
              <div className="border-b border-[#183124] pb-2 flex items-center justify-between">
                <span className="text-gray-400">OPERATOR:</span>
                <span className="text-[#00FF66] font-bold">{profile.fullName}</span>
              </div>

              <div className="border-b border-[#183124] pb-2 flex items-center justify-between">
                <span className="text-gray-400">USERNAME:</span>
                <span className="text-white font-semibold">root@{profile.username}</span>
              </div>

              <div className="border-b border-[#183124] pb-2 flex items-center justify-between">
                <span className="text-gray-400">ROLE:</span>
                <span className="text-[#00E5FF] text-right font-medium">{profile.title}</span>
              </div>

              <div className="border-b border-[#183124] pb-2 flex items-center justify-between">
                <span className="text-gray-400">LOCATION:</span>
                <span className="text-gray-300 text-right">{profile.location}</span>
              </div>

              <div className="border-b border-[#183124] pb-2">
                <span className="text-gray-400 block mb-1">PRIMARY FOCUS:</span>
                <span className="text-[#00FF66] font-medium leading-relaxed block">
                  {profile.primaryFocus}
                </span>
              </div>

              <div>
                <span className="text-gray-400 block mb-1">CURRENT MISSION:</span>
                <span className="text-gray-200 leading-relaxed block italic">
                  &quot;{profile.currentMission}&quot;
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => setIsPgpModalOpen(true)}
                  className="flex-1 py-2 px-3 rounded bg-[#0e1612] border border-[#183124] hover:border-[#00FF66]/50 text-gray-300 hover:text-[#00FF66] text-center flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Key className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span>PGP Key Block</span>
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="flex-1 py-2 px-3 rounded bg-[#00FF66] text-[#050807] font-bold text-center hover:bg-[#20ff77] transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Philosophy & Directives */}
        <div className="lg:col-span-7 space-y-8">
          {/* Biography */}
          <div className="p-6 rounded-xl bg-[#070d0a] border border-[#183124] space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Compass className="w-5 h-5 text-[#00FF66]" />
              <span>Operational Background & Bio</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed font-sans">
              {profile.bioFull}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed font-sans">
              From reverse engineering binary protocols to architecting zero-trust perimeter firewalls, I bridge the gap between adversary offensive strategies and enterprise defense. Every security review is conducted with mathematical rigor and respect for system stability.
            </p>
          </div>

          {/* Cybersecurity Philosophy */}
          <div className="p-6 rounded-xl bg-[#070d0a] border border-[#00FF66]/30 shadow-[0_0_20px_rgba(0,255,102,0.08)] space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#00FF66]" />
                <span>Cybersecurity Philosophy & Doctrine</span>
              </h2>
              <span className="font-mono text-xs text-[#00FF66] border border-[#00FF66]/40 px-2 py-0.5 rounded bg-[#050807]">
                ETHICAL DIRECTIVES
              </span>
            </div>

            <div className="space-y-4">
              {profile.philosophy.principles.map((p, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#050807] border border-[#183124] space-y-1">
                  <div className="flex items-center space-x-2 text-[#00E5FF] font-mono text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
                    <span>{p.title}</span>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm font-sans pl-6 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline: Education, Certifications & Career Milestones */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#070d0a] border border-[#183124] space-y-8">
        <div>
          <div className="flex items-center space-x-2 text-[#00E5FF] font-mono text-xs">
            <Award className="w-4 h-4" />
            <span>// CHRONOLOGICAL DOSSIER</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-sans mt-1">
            Education, Certifications & Milestones
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Documented timeline of credentials, academic accomplishments, and operational roles.
          </p>
        </div>

        <div className="relative border-l-2 border-[#183124] ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {DEFAULT_TIMELINE.map((item) => {
            const isCert = item.type === 'certification';
            const isEdu = item.type === 'education';
            const isCareer = item.type === 'career';

            return (
              <div key={item.id} className="relative group">
                {/* Node icon dot */}
                <div className={`absolute -left-[35px] sm:-left-[43px] top-1 w-6 h-6 rounded-full border flex items-center justify-center ${
                  isCert 
                    ? 'border-[#00FF66] bg-[#050807] text-[#00FF66] shadow-[0_0_10px_#00FF66]' 
                    : isEdu 
                    ? 'border-[#00E5FF] bg-[#050807] text-[#00E5FF]' 
                    : 'border-white bg-[#050807] text-white'
                }`}>
                  {isCert ? (
                    <Award className="w-3 h-3" />
                  ) : isEdu ? (
                    <BookOpen className="w-3 h-3" />
                  ) : (
                    <Briefcase className="w-3 h-3" />
                  )}
                </div>

                <div className="p-5 rounded-xl bg-[#050807] border border-[#183124] group-hover:border-[#00FF66]/40 transition-colors space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-[#00FF66] font-bold">{item.year}</span>
                    <span className="px-2 py-0.5 rounded bg-[#183124] text-gray-300 uppercase text-[10px]">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-sans">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-[#00E5FF]">
                    {item.roleOrCredential} • <span className="text-gray-400">{item.organization}</span>
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
                    {item.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-[#0e1612] text-gray-300 border border-[#183124]">
                        #{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
