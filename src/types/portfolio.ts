export type Page = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';

export type SkillCategory = 
  | 'Cybersecurity'
  | 'Tools'
  | 'Programming'
  | 'Development'
  | 'Systems & Networking';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 to 100, fully configurable
  levelTag: 'Core Specialization' | 'Advanced' | 'Proficient' | 'Active Exploration';
  description: string;
  cveOrLabExperience?: string;
}

export type ProjectCategory = 
  | 'Cybersecurity'
  | 'Development'
  | 'Automation'
  | 'Research';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
  status: 'AUDITED & ACTIVE' | 'PRODUCTION READY' | 'ACTIVE LAB' | 'PROOF OF CONCEPT';
  dossier: {
    threatModel: string;
    architecture: string[];
    vulnerabilitiesAudited: string[];
    remediationsApplied: string[];
    keyMetrics: string;
  };
}

export interface ProfileData {
  username: string;
  handle: string;
  fullName: string;
  title: string;
  location: string;
  primaryFocus: string;
  currentMission: string;
  bioShort: string;
  bioFull: string;
  philosophy: {
    title: string;
    principles: Array<{ title: string; desc: string }>;
  };
  pgpKey: {
    fingerprint: string;
    keyId: string;
    publicKeySnippet: string;
  };
  avatarUrl: string;
  contactEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  ctfTimeUrl: string;
  twitterUrl: string;
}

export interface StatsData {
  projectsCompleted: number;
  technologiesMastered: number;
  yearsExperience: number;
  vulnerabilitiesReported: number;
  uptimePercent: string;
  securityAuditsCompleted: number;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  roleOrCredential: string;
  organization: string;
  type: 'certification' | 'career' | 'education' | 'achievement';
  description: string;
  skills: string[];
}
