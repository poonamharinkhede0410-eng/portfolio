import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, ExternalLink, Github, ShieldAlert, Cpu, CheckCircle2, FileText } from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject } = usePortfolio();

  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl border border-[#00FF66]/40 bg-[#070d0a] shadow-[0_0_40px_rgba(0,255,102,0.2)] overflow-hidden font-mono text-xs"
        role="dialog"
        aria-modal="true"
        aria-label={`Security Dossier: ${selectedProject.title}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0d1612] border-b border-[#183124]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#050807] border border-[#00FF66]/50 text-[#00FF66]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-[10px] uppercase tracking-widest">// DOSSIER ID: {selectedProject.id.toUpperCase()}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#183124] text-[#00FF66] border border-[#00FF66]/40">
                  {selectedProject.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white font-sans mt-0.5 tracking-tight">
                {selectedProject.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            aria-label="Close Project Dossier"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#183124] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Subtitle & Description */}
          <div>
            <h4 className="text-[#00E5FF] font-semibold text-xs tracking-wider uppercase mb-1">
              // Objective & Architecture Overview
            </h4>
            <p className="text-gray-300 font-sans text-sm leading-relaxed mb-2">
              {selectedProject.description}
            </p>
            <p className="text-gray-400 text-xs italic font-mono">
              &quot;{selectedProject.subtitle}&quot;
            </p>
          </div>

          {/* Threat Model */}
          <div className="p-4 rounded-lg bg-[#050807] border border-[#183124] space-y-1.5">
            <div className="flex items-center space-x-2 text-[#00FF66]">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-amber-400 tracking-wide uppercase">Threat Model & Scope</span>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              {selectedProject.dossier.threatModel}
            </p>
          </div>

          {/* Architecture Specifications */}
          <div>
            <h4 className="text-[#00FF66] font-semibold text-xs tracking-wider uppercase mb-2 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#00FF66]" />
              <span>Core Architecture Specifications</span>
            </h4>
            <ul className="space-y-1.5">
              {selectedProject.dossier.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-gray-300">
                  <span className="text-[#00FF66] font-bold">[{idx + 1}]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vulnerabilities Audited & Remediations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Audited Findings */}
            <div className="p-3.5 rounded-lg bg-[#0e1612] border border-red-950/40 space-y-2">
              <span className="text-red-400 font-bold uppercase tracking-wider text-[11px] block">
                Audited Attack Vectors:
              </span>
              <ul className="space-y-1.5 text-gray-300 text-[11px]">
                {selectedProject.dossier.vulnerabilitiesAudited.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Remediations */}
            <div className="p-3.5 rounded-lg bg-[#0e1612] border border-[#183124] space-y-2">
              <span className="text-[#00FF66] font-bold uppercase tracking-wider text-[11px] block">
                Remediations & Hardening:
              </span>
              <ul className="space-y-1.5 text-gray-300 text-[11px]">
                {selectedProject.dossier.remediationsApplied.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metrics Outcome */}
          <div className="p-3 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 text-gray-200">
            <span className="text-[#00FF66] font-bold block mb-1">AUDIT IMPACT & METRIC:</span>
            <span>{selectedProject.dossier.keyMetrics}</span>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h4 className="text-gray-400 uppercase tracking-wider text-[10px] mb-2">// Technology Stack</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[#0e1612] border border-[#183124] text-[#00E5FF] text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0d1612] border-t border-[#183124] flex items-center justify-between">
          <div className="text-[11px] text-gray-400">
            Category: <span className="text-white font-semibold">{selectedProject.category}</span>
          </div>
          <div className="flex items-center space-x-3">
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#050807] border border-[#183124] text-gray-300 hover:text-white hover:border-[#00FF66]/50 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
            {selectedProject.liveDemoUrl && (
              <a
                href={selectedProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#00FF66] text-[#050807] font-semibold hover:bg-[#20ff77] shadow-[0_0_15px_rgba(0,255,102,0.3)] transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
