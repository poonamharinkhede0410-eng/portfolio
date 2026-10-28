import { Skill, Project, SkillCategory, ProjectCategory, StatsData, ProfileData } from '../types/portfolio';

export interface CommandResult {
  output: string[];
  action?: 'clear' | 'toggle-matrix' | 'toggle-sound' | 'open-edit' | 'navigate';
  targetPage?: string;
}

export function filterSkills(
  skills: Skill[],
  category: SkillCategory | 'All',
  searchQuery: string
): Skill[] {
  const query = searchQuery.trim().toLowerCase();
  return skills.filter(skill => {
    const matchesCategory = category === 'All' || skill.category === category;
    const matchesQuery = !query || 
      skill.name.toLowerCase().includes(query) ||
      skill.description.toLowerCase().includes(query) ||
      (skill.cveOrLabExperience && skill.cveOrLabExperience.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });
}

export function filterProjects(
  projects: Project[],
  category: ProjectCategory | 'All',
  searchQuery: string
): Project[] {
  const query = searchQuery.trim().toLowerCase();
  return projects.filter(proj => {
    const matchesCategory = category === 'All' || proj.category === category;
    const matchesQuery = !query ||
      proj.title.toLowerCase().includes(query) ||
      proj.subtitle.toLowerCase().includes(query) ||
      proj.description.toLowerCase().includes(query) ||
      proj.techStack.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });
}

export function validateStats(stats: Partial<StatsData>): StatsData {
  return {
    projectsCompleted: Math.max(0, Math.floor(Number(stats.projectsCompleted) || 0)),
    technologiesMastered: Math.max(0, Math.floor(Number(stats.technologiesMastered) || 0)),
    yearsExperience: Math.max(0, Math.floor(Number(stats.yearsExperience) || 0)),
    vulnerabilitiesReported: Math.max(0, Math.floor(Number(stats.vulnerabilitiesReported) || 0)),
    uptimePercent: stats.uptimePercent && typeof stats.uptimePercent === 'string' ? stats.uptimePercent : '99.99%',
    securityAuditsCompleted: Math.max(0, Math.floor(Number(stats.securityAuditsCompleted) || 0))
  };
}

export function processTerminalCommand(
  rawInput: string,
  profile: ProfileData,
  stats: StatsData,
  skills: Skill[],
  projects: Project[]
): CommandResult {
  const input = rawInput.trim();
  const parts = input.split(' ').filter(Boolean);
  const cmd = parts[0]?.toLowerCase() || '';
  const arg = parts.slice(1).join(' ').toLowerCase();

  if (!cmd) {
    return { output: [] };
  }

  switch (cmd) {
    case 'help':
      return {
        output: [
          '⚡ SYSTEM COMMAND INTERFACE v4.2.0-SEC // AVAILABLE COMMANDS:',
          '  help                - Display this menu of available commands',
          '  whoami              - Display current user identity & credentials',
          '  skills              - List technical proficiencies by category',
          '  projects            - List active security projects & dossiers',
          '  stats               - Query real-time engineering metrics',
          '  cat <file>          - Read file contents (e.g., cat bio.txt, cat pgp.pub)',
          '  scan                - Perform vulnerability check on current session',
          '  matrix [on|off]     - Toggle digital rain matrix visual stream',
          '  sound [on|off]      - Toggle audio synthesis clicks & alerts',
          '  goto <page>         - Navigate to [home|about|skills|projects|experience|contact]',
          '  edit                - Open editable profile & stats config terminal',
          '  sudo                - Request elevated root privileges',
          '  clear               - Purge terminal screen buffer',
          '  exit                - Close interactive command prompt'
        ]
      };

    case 'clear':
      return { output: [], action: 'clear' };

    case 'whoami':
      return {
        output: [
          `USER:     ${profile.username} (${profile.fullName})`,
          `HANDLE:   ${profile.handle}`,
          `TITLE:    ${profile.title}`,
          `LOCATION: ${profile.location}`,
          `FOCUS:    ${profile.primaryFocus}`,
          `MISSION:  ${profile.currentMission}`,
          `STATUS:   SECURITY_LEVEL_ALPHA // ACTIVE CLEARANCE`
        ]
      };

    case 'cat':
      if (arg === 'bio.txt' || arg === 'bio') {
        return {
          output: [
            '=== FILE: bio.txt ===',
            profile.bioFull,
            '',
            `PRIMARY OBJECTIVE: ${profile.currentMission}`
          ]
        };
      } else if (arg === 'pgp.pub' || arg === 'pgp') {
        return {
          output: [
            '=== FILE: pgp.pub ===',
            `KEY ID: ${profile.pgpKey.keyId}`,
            `FINGERPRINT: ${profile.pgpKey.fingerprint}`,
            profile.pgpKey.publicKeySnippet
          ]
        };
      } else if (arg === 'skills.txt') {
        return {
          output: [
            '=== FILE: skills.txt ===',
            ...skills.slice(0, 8).map(s => `[${s.category}] ${s.name} - ${s.proficiency}% (${s.levelTag})`)
          ]
        };
      } else {
        return {
          output: [
            `cat: ${arg || 'null'}: No such file or directory.`,
            'Available files: bio.txt, pgp.pub, skills.txt'
          ]
        };
      }

    case 'skills':
      return {
        output: [
          '=== RECONNAISSANCE: TECHNICAL CAPABILITIES ===',
          ...skills.slice(0, 10).map(s => `[*] ${s.name.padEnd(26)} [${s.category}] ${'#'.repeat(Math.floor(s.proficiency / 10)).padEnd(10, '.')} ${s.proficiency}%`),
          `... and ${Math.max(0, skills.length - 10)} additional specialized domains loaded.`
        ]
      };

    case 'projects':
      return {
        output: [
          '=== ACTIVE REPOSITORY & SECURITY DOSSIERS ===',
          ...projects.map(p => `[+] ${p.title} (${p.category}) - ${p.status}\n    > ${p.description.slice(0, 90)}...`)
        ]
      };

    case 'stats':
      return {
        output: [
          '=== TELEMETRY METRICS ===',
          `[*] Projects Executed:       ${stats.projectsCompleted}`,
          `[*] Technologies Mastered:   ${stats.technologiesMastered}`,
          `[*] Years Operational:       ${stats.yearsExperience}`,
          `[*] Vulnerabilities Found:   ${stats.vulnerabilitiesReported} (Coordinated Disclosure)`,
          `[*] Infrastructure Uptime:   ${stats.uptimePercent}`,
          `[*] Security Audits:         ${stats.securityAuditsCompleted}`
        ]
      };

    case 'scan':
      return {
        output: [
          '[+] Initializing local vulnerability scan...',
          '[+] Probing memory enclave: INTEGRITY VERIFIED (0 memory leaks)',
          '[+] Checking Content Security Policy: STRICT CSP v3 ACTIVE',
          '[+] Auditing TLS Handshake: TLS 1.3 / ChaCha20-Poly1305',
          '[+] Verifying authorization headers: mTLS TOKEN VALID',
          '[✔] SCAN COMPLETE: 0 CRITICAL, 0 HIGH, 0 WARNINGS. SYSTEM SECURE.'
        ]
      };

    case 'matrix':
      return {
        output: [`[SYSTEM] Matrix digital rain visualizer toggled.`],
        action: 'toggle-matrix'
      };

    case 'sound':
      return {
        output: [`[SYSTEM] Tactical audio synthesizer toggled.`],
        action: 'toggle-sound'
      };

    case 'edit':
      return {
        output: ['[SYSTEM] Opening editable parameters config panel...'],
        action: 'open-edit'
      };

    case 'goto':
    case 'cd': {
      const validPages = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const target = arg.replace('/', '');
      if (validPages.includes(target)) {
        return {
          output: [`[SYSTEM] Navigating to /${target}...`],
          action: 'navigate',
          targetPage: target
        };
      }
      return {
        output: [`Invalid target. Available destinations: ${validPages.join(', ')}`]
      };
    }

    case 'sudo':
      return {
        output: [
          '[!] PERMISSION GRANTED: User root is in sudoers file. You already possess absolute control over this system.'
        ]
      };

    default:
      return {
        output: [
          `bash: command not found: ${cmd}`,
          'Type "help" to view the roster of recognized terminal commands.'
        ]
      };
  }
}
