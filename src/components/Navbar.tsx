import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Page } from '../types/portfolio';
import { Terminal, Volume2, VolumeX, Sliders, Menu, X, Shield, Binary } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    setIsTerminalOpen, 
    setIsEditModalOpen,
    soundActive, 
    toggleSound,
    matrixEnabled,
    setMatrixEnabled 
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: Page; label: string; code: string }> = [
    { id: 'home', label: 'Home', code: '01' },
    { id: 'about', label: 'About', code: '02' },
    { id: 'skills', label: 'Skills', code: '03' },
    { id: 'projects', label: 'Projects', code: '04' },
    { id: 'experience', label: 'Experience', code: '05' },
    { id: 'contact', label: 'Contact', code: '06' },
  ];

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#183124] bg-[#050807]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 text-left group focus:outline-none"
            aria-label="root@portfolio home"
          >
            <div className="w-8 h-8 rounded bg-[#0e1612] border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] group-hover:border-[#00FF66] group-hover:shadow-[0_0_10px_rgba(0,255,102,0.4)] transition-all">
              <Shield className="w-4 h-4 text-[#00FF66]" />
            </div>
            <div>
              <span className="font-mono text-sm sm:text-base font-bold text-[#00FF66] tracking-wider group-hover:text-white transition-colors">
                root@portfolio
              </span>
              <span className="font-mono text-xs text-[#00E5FF] ml-1">:~#</span>
            </div>
          </button>

          {/* System status badge */}
          <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded bg-[#0a120e] border border-[#183124] text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF66]"></span>
            </span>
            <span className="text-[#00FF66] font-medium tracking-tight">SYSTEM STATUS: ONLINE</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 font-mono text-xs" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded transition-all duration-200 flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#183124] text-[#00FF66] border border-[#00FF66]/50 shadow-[0_0_12px_rgba(0,255,102,0.2)] font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-[#0e1612] hover:border hover:border-[#183124]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-[#00E5FF]/60 text-[10px]">{item.code}.</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Utilities & Terminal Launcher */}
        <div className="flex items-center space-x-2">
          {/* Matrix rain toggle */}
          <button
            onClick={() => setMatrixEnabled(!matrixEnabled)}
            title={matrixEnabled ? "Disable Matrix Rain" : "Enable Matrix Rain"}
            aria-label={matrixEnabled ? "Disable Matrix Rain" : "Enable Matrix Rain"}
            className={`p-2 rounded border transition-colors ${
              matrixEnabled 
                ? 'border-[#00FF66]/40 text-[#00FF66] bg-[#0e1612]' 
                : 'border-[#183124] text-gray-500 hover:text-gray-300'
            }`}
          >
            <Binary className="w-4 h-4" />
          </button>

          {/* Sound synthesizer toggle */}
          <button
            onClick={toggleSound}
            title={soundActive ? "Mute Cyber Audio Feedback" : "Enable Cyber Audio Feedback"}
            aria-label={soundActive ? "Mute Cyber Audio Feedback" : "Enable Cyber Audio Feedback"}
            className={`p-2 rounded border transition-colors ${
              soundActive 
                ? 'border-[#00FF66]/40 text-[#00FF66] bg-[#0e1612]' 
                : 'border-[#183124] text-gray-500 hover:text-gray-300'
            }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Edit Stats/Config trigger */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            title="Edit Profile & Telemetry Stats"
            aria-label="Edit Profile and Stats"
            className="p-2 rounded border border-[#183124] text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 bg-[#0e1612] transition-colors"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Interactive Terminal Launcher Button */}
          <button
            onClick={() => setIsTerminalOpen(true)}
            aria-label="Open Interactive Terminal"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded font-mono text-xs font-semibold bg-[#00FF66] text-[#050807] hover:bg-[#20ff77] shadow-[0_0_15px_rgba(0,255,102,0.4)] transition-all transform active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>&gt;_ TERMINAL</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation"
            className="md:hidden p-2 rounded text-gray-300 hover:text-[#00FF66] border border-[#183124]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#183124] bg-[#0a0f0d]/95 backdrop-blur-lg px-4 pt-2 pb-4 space-y-2 font-mono text-sm">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#183124] text-xs text-gray-400">
            <span className="text-[#00FF66]">● SYSTEM STATUS: ONLINE</span>
            <button
              onClick={() => {
                setIsTerminalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-[#00E5FF] hover:underline"
            >
              [Launch Terminal]
            </button>
          </div>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                  isActive
                    ? 'bg-[#183124] text-[#00FF66] font-semibold border-l-2 border-[#00FF66]'
                    : 'text-gray-300 hover:bg-[#0e1612] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-gray-500">{item.code}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
