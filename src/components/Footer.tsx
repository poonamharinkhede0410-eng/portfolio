import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Twitter, Key, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, setIsPgpModalOpen, setIsTerminalOpen, setCurrentPage } = usePortfolio();

  return (
    <footer className="w-full border-t border-[#183124] bg-[#050807] py-10 px-4 sm:px-6 lg:px-8 mt-20 relative z-10 text-xs font-mono text-gray-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Identity */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center space-x-2 text-[#00FF66]">
            <Terminal className="w-4 h-4" />
            <span className="font-bold tracking-wider text-sm">root@portfolio</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">
            Offensive cybersecurity, vulnerability assessment, and hardened engineering infrastructure.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-gray-400">
            <Cpu className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>NODE_ID: SEC-OPS-091 // ENCRYPTED</span>
          </div>
        </div>

        {/* Col 2: Navigation Quick links */}
        <div>
          <h4 className="text-gray-200 font-semibold mb-3 tracking-wider text-xs uppercase text-[#00E5FF]">
            // Navigation
          </h4>
          <ul className="space-y-2">
            {(['home', 'about', 'skills', 'projects', 'experience', 'contact'] as const).map((p) => (
              <li key={p}>
                <button
                  onClick={() => setCurrentPage(p)}
                  className="hover:text-[#00FF66] transition-colors capitalize text-left"
                >
                  &gt; {p}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Cryptography & Security notice */}
        <div>
          <h4 className="text-gray-200 font-semibold mb-3 tracking-wider text-xs uppercase text-[#00E5FF]">
            // PGP & Verification
          </h4>
          <p className="text-gray-400 mb-2">
            Verify communications using public key:
          </p>
          <button
            onClick={() => setIsPgpModalOpen(true)}
            className="flex items-center space-x-2 px-2.5 py-1.5 rounded bg-[#0e1612] border border-[#183124] text-gray-300 hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors w-full text-left"
          >
            <Key className="w-3.5 h-3.5 text-[#00FF66] shrink-0" />
            <span className="truncate text-[11px]">{profile.pgpKey.keyId} - VIEW KEY</span>
          </button>
          <div className="mt-2 text-[10px] text-gray-400 flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-[#00FF66]" />
            <span>Strict Responsible Disclosure Enforced</span>
          </div>
        </div>

        {/* Col 4: Network & Socials */}
        <div>
          <h4 className="text-gray-200 font-semibold mb-3 tracking-wider text-xs uppercase text-[#00E5FF]">
            // Connect & Comms
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2 rounded bg-[#0e1612] border border-[#183124] text-gray-300 hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 rounded bg-[#0e1612] border border-[#183124] text-gray-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={profile.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X profile"
              className="p-2 rounded bg-[#0e1612] border border-[#183124] text-gray-300 hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="px-2.5 py-1 rounded bg-[#0e1612] border border-[#183124] text-[#00FF66] hover:border-[#00FF66] transition-colors text-[11px] flex items-center space-x-1"
            >
              <span>CLI Prompt</span>
            </button>
          </div>
          <div className="text-[11px] text-gray-400">
            <span>Contact channel: </span>
            <span className="text-gray-300">{profile.contactEmail}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-[#183124] flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400">
        <div>
          © {new Date().getFullYear()} {profile.fullName} ({profile.username}). All rights reserved.
        </div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-4">
          <span className="text-[#00FF66]">ENCRYPTION: AES-256</span>
          <span className="text-gray-500">•</span>
          <span>SYSTEM TIME: {new Date().toISOString().split('T')[0]}</span>
        </div>
      </div>
    </footer>
  );
};
