import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TerminalWindow } from '../components/TerminalWindow';
import { ArrowRight, ShieldCheck, Terminal, Cpu, ExternalLink, Code2, Sliders, Lock, Zap } from 'lucide-react';
import { playAccessGranted, playKeySound } from '../utils/audio';

export const HomePage: React.FC = () => {
  const { 
    profile, 
    stats, 
    projects, 
    setCurrentPage, 
    setSelectedProject, 
    setIsTerminalOpen,
    setIsEditModalOpen 
  } = usePortfolio();

  // Cycling titles: Ethical Hacker, Penetration Tester, Security Researcher, Full-Stack Developer
  const titles = [
    'Ethical Hacker',
    'Penetration Tester',
    'Security Researcher',
    'Full-Stack Developer'
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitleIndex]);

  // Featured 3 projects
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <div className="relative z-10 w-full space-y-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Callouts */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* System Online Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-[#0e1612] border border-[#00FF66]/30 shadow-[0_0_15px_rgba(0,255,102,0.15)] font-mono text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF66]"></span>
              </span>
              <span className="text-[#00FF66] font-semibold tracking-wide">
                SYSTEM ONLINE // WELCOME TO MY DOMAIN
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              I Break Systems. <br />
              <span className="text-[#00FF66] glow-green font-mono">
                I Build Security.
              </span>
            </h1>

            {/* Animated Terminal Cycling Subtitle */}
            <div className="flex items-center space-x-2 font-mono text-lg sm:text-xl text-gray-200 bg-[#0e1612]/70 border-l-4 border-[#00FF66] p-3 rounded-r-lg">
              <span className="text-[#00E5FF]">&gt; role:</span>
              <span className="text-white font-bold tracking-wide">
                {displayedText}
              </span>
              <span className="cursor-blink font-bold text-[#00FF66]">_</span>
            </div>

            {/* Short Introduction */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Welcome to my digital command center. I am an ethical hacker, cybersecurity researcher, and full-stack software engineer dedicated to deconstructing complex threat vectors, hunting zero-days, and hardening mission-critical infrastructures.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs sm:text-sm">
              <button
                onClick={() => {
                  setCurrentPage('projects');
                  playAccessGranted();
                }}
                className="flex items-center space-x-2 px-6 py-3.5 rounded-lg bg-[#00FF66] text-[#050807] font-bold hover:bg-[#22ff79] shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentPage('contact');
                  playKeySound();
                }}
                className="flex items-center space-x-2 px-6 py-3.5 rounded-lg bg-[#0e1612] text-white font-semibold border border-[#00E5FF]/40 hover:border-[#00E5FF] hover:text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all"
              >
                <Terminal className="w-4 h-4 text-[#00E5FF]" />
                <span>Initialize Contact</span>
              </button>

              <button
                onClick={() => {
                  setIsTerminalOpen(true);
                  playKeySound();
                }}
                className="flex items-center space-x-2 px-4 py-3.5 rounded-lg bg-[#050807] text-gray-300 hover:text-[#00FF66] border border-[#183124] hover:border-[#00FF66]/50 transition-colors"
                title="Launch CLI Terminal"
              >
                <span>&gt;_ Interactive CLI</span>
              </button>
            </div>

            {/* Quick Micro-telemetry */}
            <div className="pt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-gray-400">
              <span className="flex items-center space-x-1.5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
                <span>OSCP Certified</span>
              </span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="flex items-center space-x-1.5 shrink-0">
                <Lock className="w-4 h-4 text-[#00E5FF]" />
                <span>Zero-Trust Architecture</span>
              </span>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <span className="flex items-center space-x-1.5 shrink-0">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Vulnerability Hunter</span>
              </span>
            </div>
          </div>

          {/* Right Column: Terminal Window */}
          <div className="lg:col-span-5">
            <TerminalWindow />
          </div>
        </div>
      </section>

      {/* Editable Telemetry Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0a0f0d]/90 border border-[#183124] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#183124] gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#00FF66] font-mono text-xs">
                <Cpu className="w-4 h-4" />
                <span>// OPERATIONAL TELEMETRY & VERIFIED METRICS</span>
              </div>
              <h2 className="text-2xl font-bold text-white font-sans mt-1">
                System Key Performance Indicators
              </h2>
            </div>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#0e1612] border border-[#183124] text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 text-xs font-mono transition-colors"
              title="Edit Telemetry Statistics"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Edit Statistics</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center sm:text-left">
            {/* Stat 1: Projects Completed */}
            <div className="p-4 rounded-xl bg-[#050807] border border-[#183124] hover:border-[#00FF66]/40 transition-colors">
              <span className="text-gray-400 font-mono text-xs uppercase tracking-wider block">
                Projects Completed
              </span>
              <div className="text-3xl font-extrabold font-mono text-[#00FF66] mt-2 glow-green">
                {stats.projectsCompleted}+
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">Full-stack & security</span>
            </div>

            {/* Stat 2: Technologies Mastered */}
            <div className="p-4 rounded-xl bg-[#050807] border border-[#183124] hover:border-[#00FF66]/40 transition-colors">
              <span className="text-gray-400 font-mono text-xs uppercase tracking-wider block">
                Tech Mastered
              </span>
              <div className="text-3xl font-extrabold font-mono text-[#00E5FF] mt-2 glow-cyan">
                {stats.technologiesMastered}
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">Offensive & DevOps tools</span>
            </div>

            {/* Stat 3: Years Experience */}
            <div className="p-4 rounded-xl bg-[#050807] border border-[#183124] hover:border-[#00FF66]/40 transition-colors">
              <span className="text-gray-400 font-mono text-xs uppercase tracking-wider block">
                Years Experience
              </span>
              <div className="text-3xl font-extrabold font-mono text-white mt-2">
                {stats.yearsExperience}+
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">Active industry tenure</span>
            </div>

            {/* Stat 4: Vulnerabilities Reported */}
            <div className="p-4 rounded-xl bg-[#050807] border border-[#183124] hover:border-[#00FF66]/40 transition-colors">
              <span className="text-gray-400 font-mono text-xs uppercase tracking-wider block">
                Vulns Disclosed
              </span>
              <div className="text-3xl font-extrabold font-mono text-amber-400 mt-2">
                {stats.vulnerabilitiesReported}
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">Responsible disclosures</span>
            </div>

            {/* Stat 5: Security Audits */}
            <div className="p-4 rounded-xl bg-[#050807] border border-[#183124] hover:border-[#00FF66]/40 transition-colors">
              <span className="text-gray-400 font-mono text-xs uppercase tracking-wider block">
                Security Audits
              </span>
              <div className="text-3xl font-extrabold font-mono text-[#00FF66] mt-2">
                {stats.securityAuditsCompleted}
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">Comprehensive VAPTs</span>
            </div>

            {/* Stat 6: Infrastructure Uptime */}
            <div className="p-4 rounded-xl bg-[#050807] border border-[#183124] hover:border-[#00FF66]/40 transition-colors">
              <span className="text-gray-400 font-mono text-xs uppercase tracking-wider block">
                Defense Uptime
              </span>
              <div className="text-3xl font-extrabold font-mono text-[#00E5FF] mt-2">
                {stats.uptimePercent}
              </div>
              <span className="text-[11px] text-gray-400 mt-1 block">Hardened node status</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#00E5FF] font-mono text-xs">
              <Code2 className="w-4 h-4" />
              <span>// FEATURED SECURITY & SOFTWARE INITIATIVES</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white font-sans mt-1">
              Mission Dossiers & Deployments
            </h2>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              Representative authorized research, penetration testing toolchains, and zero-trust engineering prototypes.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('projects');
              playKeySound();
            }}
            className="flex items-center space-x-2 text-[#00FF66] font-mono text-sm hover:underline"
          >
            <span>View All Projects ({projects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col rounded-xl border border-[#183124] bg-[#070d0a]/90 hover:border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(0,255,102,0.15)] transition-all duration-300 overflow-hidden group"
            >
              {/* Card Cyber Header */}
              <div className="p-4 bg-[#0d1612] border-b border-[#183124] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#00E5FF] uppercase tracking-wider font-semibold">
                  {project.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#183124] text-[#00FF66] border border-[#00FF66]/30">
                  {project.status}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00FF66] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-mono italic">
                    {project.subtitle}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-[#0e1612] border border-[#183124] text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-[#0e1612] text-gray-400">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-[#183124] flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        playKeySound();
                      }}
                      className="text-xs font-mono text-[#00FF66] hover:underline flex items-center space-x-1"
                    >
                      <span>View Dossier</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-gray-400 hover:text-white"
                      >
                        [Live Demo]
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cyber Security Directive Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#070d0a] via-[#0d1b14] to-[#070d0a] border border-[#00FF66]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="font-mono text-xs text-[#00FF66] tracking-widest uppercase">
              // READY FOR ADVERSARIAL ENGAGEMENTS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need to test your defenses before real attackers do?
            </h3>
            <p className="text-gray-300 text-sm max-w-2xl font-sans">
              Available for penetration testing, vulnerability assessments, security architecture reviews, and red team consultations under strict authorized agreements.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('contact');
              playAccessGranted();
            }}
            className="shrink-0 px-6 py-3.5 rounded-lg bg-[#00FF66] text-[#050807] font-bold font-mono text-xs sm:text-sm hover:bg-[#20ff77] shadow-[0_0_20px_rgba(0,255,102,0.4)] transition-all"
          >
            Initialize Secure Comms &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
