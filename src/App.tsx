import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MatrixBackground } from './components/MatrixBackground';
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal';
import { ProjectModal } from './components/ProjectModal';
import { EditConfigModal } from './components/EditConfigModal';
import { PgpModal } from './components/PgpModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';

const PortfolioContent: React.FC = () => {
  const { currentPage, scanlinesEnabled } = usePortfolio();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'skills':
        return <SkillsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050807] text-[#e2e8f0] relative flex flex-col selection:bg-[#00FF66] selection:text-black">
      {/* Matrix digital rain stream */}
      <MatrixBackground />

      {/* Cyber Grid background layer */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-40" />

      {/* Subtle CRT scanlines */}
      {scanlinesEnabled && (
        <div className="fixed inset-0 scanlines pointer-events-none z-30 opacity-60" />
      )}

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-10">
        {renderCurrentPage()}
      </main>

      {/* Minimal Hacker Footer */}
      <Footer />

      {/* Global Modals & Overlays */}
      <InteractiveTerminalModal />
      <ProjectModal />
      <EditConfigModal />
      <PgpModal />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
