import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { filterProjects } from '../utils/portfolioLogic';
import { ProjectCategory, Project } from '../types/portfolio';
import { Search, FolderGit2, ExternalLink, Github, Shield, Terminal, ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { playAccessGranted, playKeySound } from '../utils/audio';

export const ProjectsPage: React.FC = () => {
  const { projects, setSelectedProject } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Array<{ id: ProjectCategory | 'All'; label: string }> = [
    { id: 'All', label: 'All Projects' },
    { id: 'Cybersecurity', label: 'Cybersecurity' },
    { id: 'Development', label: 'Development' },
    { id: 'Automation', label: 'Automation' },
    { id: 'Research', label: 'Research' },
  ];

  const filteredProjects = filterProjects(projects, selectedCategory, searchQuery);

  const getCyberIllustration = (proj: Project) => {
    // Cyber styled visual wireframe / SVG badge
    return (
      <div className="relative w-full h-36 bg-[#050807] overflow-hidden flex items-center justify-center p-4 border-b border-[#183124]">
        {/* Cyber grid background */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        
        {/* Animated radar circles / cyber glyphs */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-[#0e1612] border border-[#00FF66]/40 flex items-center justify-center text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.2)]">
            {proj.category === 'Cybersecurity' ? (
              <Shield className="w-6 h-6 text-[#00FF66]" />
            ) : proj.category === 'Automation' ? (
              <Cpu className="w-6 h-6 text-[#00E5FF]" />
            ) : proj.category === 'Research' ? (
              <Terminal className="w-6 h-6 text-amber-400" />
            ) : (
              <Layers className="w-6 h-6 text-white" />
            )}
          </div>
          <span className="font-mono text-[10px] text-gray-400 tracking-widest uppercase">
            // SEC-ID: {proj.id.toUpperCase()}
          </span>
        </div>

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#070d0a]/90 border border-[#183124] text-[10px] font-mono text-[#00E5FF]">
          {proj.category}
        </div>
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#070d0a]/90 border border-[#00FF66]/40 text-[10px] font-mono text-[#00FF66]">
          {proj.status}
        </div>
      </div>
    );
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#183124] pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#00FF66] font-mono text-xs">
            <FolderGit2 className="w-4 h-4" />
            <span>// PROJECT SHOWCASE &amp; REPOSITORIES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1 tracking-tight">
            MISSION PROJECTS &amp; LABS
          </h1>
          <p className="text-gray-400 text-sm mt-1 max-w-2xl font-sans">
            Curated repositories including vulnerability scanners, packet analysis tools, security ranges, and zero-knowledge crypto systems.
          </p>
        </div>

        <div className="font-mono text-xs text-gray-400">
          SHOWING: <span className="text-[#00FF66] font-bold">{filteredProjects.length}</span> DOSSIERS
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="space-y-4">
        {/* Category Buttons */}
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
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-[#183124] text-[#00FF66] border border-[#00FF66]/50 font-bold shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                    : 'bg-[#070d0a] text-gray-400 border border-[#183124] hover:text-white hover:border-gray-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by keyword, tech stack, or vulnerability type (e.g., VulnScan, Docker, Packet, Cryptography)..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#070d0a] border border-[#183124] text-white placeholder:text-gray-500 font-mono text-xs sm:text-sm focus:border-[#00FF66] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col rounded-xl border border-[#183124] bg-[#070d0a] hover:border-[#00FF66]/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,255,102,0.15)] transition-all duration-300 overflow-hidden group"
          >
            {/* Cyber Illustration Graphic */}
            {getCyberIllustration(project)}

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#00FF66] transition-colors font-sans">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-mono text-xs italic">
                  {project.subtitle}
                </p>
                <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#0e1612] border border-[#183124] text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-[#183124] flex items-center justify-between font-mono text-xs">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      playAccessGranted();
                    }}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#183124] text-[#00FF66] font-semibold hover:bg-[#204432] transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-3 text-gray-400">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#00E5FF] transition-colors"
                        title="Live Demonstration"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="p-12 text-center rounded-xl border border-[#183124] bg-[#070d0a] font-mono text-xs space-y-2">
          <div className="text-amber-400 text-sm">NO PROJECTS MATCHED FILTER CRITERIA</div>
          <p className="text-gray-400">Try refining your search term or select &quot;All Projects&quot;.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 px-3 py-1.5 rounded bg-[#183124] text-[#00FF66]"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
