import React, { createContext, useContext, useState, useEffect } from 'react';
import { Page, ProfileData, StatsData, Skill, Project } from '../types/portfolio';
import { DEFAULT_PROFILE, DEFAULT_STATS, DEFAULT_SKILLS, DEFAULT_PROJECTS } from '../data/defaultData';
import { setSoundEnabled as setAudioEngineSound, isSoundEnabled, playKeySound, playAccessGranted } from '../utils/audio';

interface PortfolioContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  resetProfile: () => void;
  stats: StatsData;
  updateStats: (data: Partial<StatsData>) => void;
  resetStats: () => void;
  skills: Skill[];
  updateSkillProficiency: (id: string, proficiency: number) => void;
  resetSkills: () => void;
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  isPgpModalOpen: boolean;
  setIsPgpModalOpen: (open: boolean) => void;
  matrixEnabled: boolean;
  setMatrixEnabled: (enabled: boolean) => void;
  soundActive: boolean;
  toggleSound: () => void;
  scanlinesEnabled: boolean;
  setScanlinesEnabled: (enabled: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sync page from URL hash or path
  const [currentPage, setCurrentPageInternal] = useState<Page>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (['home', 'about', 'skills', 'projects', 'experience', 'contact'].includes(hash)) {
      return hash as Page;
    }
    const path = window.location.pathname.replace(/^\//, '');
    if (['home', 'about', 'skills', 'projects', 'experience', 'contact'].includes(path)) {
      return path as Page;
    }
    return 'home';
  });

  const setCurrentPage = (page: Page) => {
    setCurrentPageInternal(page);
    window.location.hash = `/${page === 'home' ? '' : page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playKeySound();
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'about', 'skills', 'projects', 'experience', 'contact'].includes(hash)) {
        setCurrentPageInternal(hash as Page);
      } else if (!hash) {
        setCurrentPageInternal('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Profile data
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('cyber_profile_data');
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile(prev => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem('cyber_profile_data', JSON.stringify(updated));
      } catch {
        // ignore storage error
      }
      return updated;
    });
    playAccessGranted();
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem('cyber_profile_data');
    } catch {
      // ignore
    }
  };

  // Stats data
  const [stats, setStats] = useState<StatsData>(() => {
    try {
      const saved = localStorage.getItem('cyber_stats_data');
      return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const updateStats = (data: Partial<StatsData>) => {
    setStats(prev => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem('cyber_stats_data', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    playAccessGranted();
  };

  const resetStats = () => {
    setStats(DEFAULT_STATS);
    try {
      localStorage.removeItem('cyber_stats_data');
    } catch {
      // ignore
    }
  };

  // Skills
  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem('cyber_skills_data');
      return saved ? JSON.parse(saved) : DEFAULT_SKILLS;
    } catch {
      return DEFAULT_SKILLS;
    }
  });

  const updateSkillProficiency = (id: string, proficiency: number) => {
    setSkills(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, proficiency } : s);
      try {
        localStorage.setItem('cyber_skills_data', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    playKeySound();
  };

  const resetSkills = () => {
    setSkills(DEFAULT_SKILLS);
    try {
      localStorage.removeItem('cyber_skills_data');
    } catch {
      // ignore
    }
  };

  // Projects
  const [projects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Modals & Effects
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPgpModalOpen, setIsPgpModalOpen] = useState(false);
  const [matrixEnabled, setMatrixEnabled] = useState(true);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);
  const [soundActive, setSoundActive] = useState(() => isSoundEnabled());

  const toggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    setAudioEngineSound(nextState);
    if (nextState) {
      playAccessGranted();
    }
  };

  // Keyboard shortcut: Backtick ` or ~ toggles terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        profile,
        updateProfile,
        resetProfile,
        stats,
        updateStats,
        resetStats,
        skills,
        updateSkillProficiency,
        resetSkills,
        projects,
        selectedProject,
        setSelectedProject,
        isTerminalOpen,
        setIsTerminalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isPgpModalOpen,
        setIsPgpModalOpen,
        matrixEnabled,
        setMatrixEnabled,
        soundActive,
        toggleSound,
        scanlinesEnabled,
        setScanlinesEnabled
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return ctx;
};
