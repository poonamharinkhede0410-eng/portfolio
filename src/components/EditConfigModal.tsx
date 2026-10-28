import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { validateStats } from '../utils/portfolioLogic';
import { X, Save, RotateCcw, Sliders, UserCheck, Shield } from 'lucide-react';
import { playAccessGranted, playKeySound } from '../utils/audio';

export const EditConfigModal: React.FC = () => {
  const { 
    isEditModalOpen, 
    setIsEditModalOpen, 
    profile, 
    updateProfile, 
    resetProfile,
    stats, 
    updateStats, 
    resetStats 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'stats' | 'profile'>('stats');

  // Local form state
  const [localStats, setLocalStats] = useState(stats);
  const [localProfile, setLocalProfile] = useState(profile);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isEditModalOpen) return null;

  const handleStatsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validated = validateStats(localStats);
    updateStats(validated);
    playAccessGranted();
    setStatusMessage('✔ Statistics telemetry parameters committed.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(localProfile);
    playAccessGranted();
    setStatusMessage('✔ Profile identity parameters updated.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleReset = () => {
    if (activeTab === 'stats') {
      resetStats();
      setLocalStats(stats);
      setStatusMessage('✔ Statistics restored to default.');
    } else {
      resetProfile();
      setLocalProfile(profile);
      setStatusMessage('✔ Profile restored to default.');
    }
    playKeySound();
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl border border-[#00E5FF]/40 bg-[#070d0a] shadow-[0_0_35px_rgba(0,229,255,0.2)] overflow-hidden font-mono text-xs"
        role="dialog"
        aria-modal="true"
        aria-label="Configuration & Parameters Console"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0d1612] border-b border-[#183124]">
          <div className="flex items-center space-x-2.5 text-[#00E5FF]">
            <Sliders className="w-5 h-5 text-[#00E5FF]" />
            <div>
              <h2 className="font-bold text-sm text-white tracking-wide">
                SYSTEM CONFIGURATION // EDIT PARAMETERS
              </h2>
              <span className="text-gray-400 text-[10px]">
                Customize your live statistics, milestones, and system profile identity
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(false)}
            aria-label="Close Configuration"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#183124] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#183124] bg-[#050807] px-5 pt-3">
          <button
            onClick={() => { setActiveTab('stats'); playKeySound(); }}
            className={`pb-3 px-3 font-semibold transition-colors flex items-center space-x-2 border-b-2 -mb-[1px] ${
              activeTab === 'stats'
                ? 'border-[#00FF66] text-[#00FF66]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Telemetry Statistics</span>
          </button>
          <button
            onClick={() => { setActiveTab('profile'); playKeySound(); }}
            className={`pb-3 px-3 font-semibold transition-colors flex items-center space-x-2 border-b-2 -mb-[1px] ${
              activeTab === 'profile'
                ? 'border-[#00E5FF] text-[#00E5FF]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile Identity</span>
          </button>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div className="px-5 py-2 bg-[#00FF66]/15 border-b border-[#00FF66]/30 text-[#00FF66] text-[11px] font-semibold">
            {statusMessage}
          </div>
        )}

        {/* Form Body */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto">
          {activeTab === 'stats' ? (
            <form id="stats-form" onSubmit={handleStatsSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1 text-[11px]">
                    Projects Completed
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={localStats.projectsCompleted}
                    onChange={(e) => setLocalStats({ ...localStats, projectsCompleted: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-[#00FF66] focus:border-[#00FF66] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 text-[11px]">
                    Technologies Mastered
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={localStats.technologiesMastered}
                    onChange={(e) => setLocalStats({ ...localStats, technologiesMastered: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-[#00FF66] focus:border-[#00FF66] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 text-[11px]">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={localStats.yearsExperience}
                    onChange={(e) => setLocalStats({ ...localStats, yearsExperience: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-[#00FF66] focus:border-[#00FF66] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 text-[11px]">
                    Vulnerabilities Reported (Coordinated)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={localStats.vulnerabilitiesReported}
                    onChange={(e) => setLocalStats({ ...localStats, vulnerabilitiesReported: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-[#00FF66] focus:border-[#00FF66] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 text-[11px]">
                    Security Audits Completed
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={localStats.securityAuditsCompleted}
                    onChange={(e) => setLocalStats({ ...localStats, securityAuditsCompleted: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-[#00FF66] focus:border-[#00FF66] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 text-[11px]">
                    System Uptime Reliability
                  </label>
                  <input
                    type="text"
                    value={localStats.uptimePercent}
                    onChange={(e) => setLocalStats({ ...localStats, uptimePercent: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-[#00E5FF] focus:border-[#00E5FF] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </form>
          ) : (
            <form id="profile-form" onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1 text-[11px]">
                    Username (Terminal handle)
                  </label>
                  <input
                    type="text"
                    value={localProfile.username}
                    onChange={(e) => setLocalProfile({ ...localProfile, username: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-[#00FF66] focus:border-[#00FF66] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 text-[11px]">
                    Full Name / Alias
                  </label>
                  <input
                    type="text"
                    value={localProfile.fullName}
                    onChange={(e) => setLocalProfile({ ...localProfile, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-white focus:border-[#00E5FF] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 text-[11px]">
                  Professional Headline / Title
                </label>
                <input
                  type="text"
                  value={localProfile.title}
                  onChange={(e) => setLocalProfile({ ...localProfile, title: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-[#00E5FF] focus:border-[#00E5FF] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 text-[11px]">
                  Location (Coordinates or City)
                </label>
                <input
                  type="text"
                  value={localProfile.location}
                  onChange={(e) => setLocalProfile({ ...localProfile, location: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-gray-300 focus:border-[#00FF66] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 text-[11px]">
                  Primary Focus
                </label>
                <input
                  type="text"
                  value={localProfile.primaryFocus}
                  onChange={(e) => setLocalProfile({ ...localProfile, primaryFocus: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-gray-300 focus:border-[#00FF66] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 text-[11px]">
                  Current Mission
                </label>
                <input
                  type="text"
                  value={localProfile.currentMission}
                  onChange={(e) => setLocalProfile({ ...localProfile, currentMission: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-gray-300 focus:border-[#00FF66] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 text-[11px]">
                  Short Bio
                </label>
                <textarea
                  rows={2}
                  value={localProfile.bioShort}
                  onChange={(e) => setLocalProfile({ ...localProfile, bioShort: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-gray-300 focus:border-[#00FF66] focus:outline-none font-sans"
                  required
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0d1612] border-t border-[#183124] flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-transparent border border-[#183124] text-gray-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-3 py-1.5 rounded text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              form={activeTab === 'stats' ? 'stats-form' : 'profile-form'}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded bg-[#00FF66] text-[#050807] font-semibold hover:bg-[#20ff77] shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
