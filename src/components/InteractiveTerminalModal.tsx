import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { processTerminalCommand } from '../utils/portfolioLogic';
import { playKeySound, playAccessGranted } from '../utils/audio';
import { Terminal, X, CornerDownLeft, Trash2, HelpCircle } from 'lucide-react';
import { Page } from '../types/portfolio';

interface HistoryItem {
  command: string;
  output: string[];
}

export const InteractiveTerminalModal: React.FC = () => {
  const { 
    isTerminalOpen, 
    setIsTerminalOpen, 
    profile, 
    stats, 
    skills, 
    projects,
    setCurrentPage,
    matrixEnabled,
    setMatrixEnabled,
    soundActive,
    toggleSound,
    setIsEditModalOpen
  } = usePortfolio();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'system-init',
      output: [
        'SEC-OS v5.4.1 (x86_64-hardened-linux-gnu)',
        'Welcome to root@portfolio interactive shell command station.',
        'Type "help" for a list of commands, or "whoami" to inspect operator profile.'
      ]
    }
  ]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isTerminalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playKeySound();
    const result = processTerminalCommand(input, profile, stats, skills, projects);

    if (result.action === 'clear') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { command: input, output: result.output }]);
    }

    if (result.action === 'toggle-matrix') {
      setMatrixEnabled(!matrixEnabled);
    } else if (result.action === 'toggle-sound') {
      toggleSound();
    } else if (result.action === 'open-edit') {
      setIsEditModalOpen(true);
      setIsTerminalOpen(false);
    } else if (result.action === 'navigate' && result.targetPage) {
      setCurrentPage(result.targetPage as Page);
      setIsTerminalOpen(false);
    }

    setEnteredCommands(prev => [input, ...prev]);
    setCmdIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (enteredCommands.length > 0 && cmdIndex + 1 < enteredCommands.length) {
        const nextIdx = cmdIndex + 1;
        setCmdIndex(nextIdx);
        setInput(enteredCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex > 0) {
        const nextIdx = cmdIndex - 1;
        setCmdIndex(nextIdx);
        setInput(enteredCommands[nextIdx]);
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape') {
      setIsTerminalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[85vh] h-[640px] flex flex-col rounded-lg border border-[#00FF66]/50 bg-[#050807] shadow-[0_0_35px_rgba(0,255,102,0.25)] overflow-hidden font-mono text-xs"
        role="dialog"
        aria-modal="true"
        aria-label="Interactive Terminal Command Station"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d1612] border-b border-[#183124]">
          <div className="flex items-center space-x-2 text-[#00FF66]">
            <Terminal className="w-4 h-4" />
            <span className="font-bold text-sm tracking-wide">
              TERMINAL CLI // {profile.username}@portfolio
            </span>
            <span className="text-gray-500 text-[11px] hidden sm:inline">
              [SESSION ID: #0x{(Math.random() * 100000).toFixed(0)}]
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setHistory([]);
                playKeySound();
              }}
              title="Clear terminal"
              aria-label="Clear terminal output"
              className="p-1.5 rounded text-gray-400 hover:text-[#00FF66] hover:bg-[#183124] transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setInput('help');
                playAccessGranted();
              }}
              title="Show commands help"
              aria-label="Show terminal help"
              className="p-1.5 rounded text-gray-400 hover:text-[#00E5FF] hover:bg-[#183124] transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsTerminalOpen(false)}
              aria-label="Close Terminal"
              className="p-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-[#183124] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Scrollable Area */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#050807] scanlines cursor-text"
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {/* Command line */}
              <div className="flex items-center space-x-2 text-[#00E5FF]">
                <span className="text-[#00FF66]">{profile.username}@sec-ops:~$</span>
                <span className="font-bold text-white">{item.command}</span>
              </div>
              {/* Output */}
              <div className="pl-4 space-y-0.5 text-gray-300">
                {item.output.map((line, lIdx) => (
                  <div key={lIdx} className="leading-relaxed whitespace-pre-wrap">
                    {line.startsWith('[+]') || line.startsWith('[*]') ? (
                      <span className="text-[#00FF66]">{line}</span>
                    ) : line.startsWith('[!]') || line.startsWith('bash:') ? (
                      <span className="text-amber-400">{line}</span>
                    ) : line.startsWith('===') ? (
                      <span className="text-[#00E5FF] font-bold">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Active Prompt Input Row */}
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 text-[#00FF66] pt-2">
            <span className="shrink-0 text-[#00FF66]">{profile.username}@sec-ops:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#00FF66] font-mono text-xs placeholder:text-gray-600 focus:ring-0"
              placeholder="type 'help', 'whoami', 'skills', 'projects', 'cat bio.txt'..."
              aria-label="Terminal command input"
              autoFocus
            />
            <button
              type="submit"
              className="p-1 rounded bg-[#0e1612] border border-[#183124] text-gray-400 hover:text-[#00FF66]"
              aria-label="Execute command"
            >
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>

          <div ref={terminalBottomRef} />
        </div>

        {/* Terminal Quick Command Chips */}
        <div className="px-4 py-2.5 bg-[#0d1612] border-t border-[#183124] flex items-center justify-between overflow-x-auto space-x-2 text-[11px]">
          <span className="text-gray-500 shrink-0">QUICK CMDS:</span>
          <div className="flex items-center space-x-2">
            {['help', 'whoami', 'skills', 'projects', 'stats', 'scan', 'cat bio.txt'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  playKeySound();
                  inputRef.current?.focus();
                }}
                className="px-2 py-0.5 rounded bg-[#183124]/50 border border-[#183124] text-gray-300 hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors shrink-0"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
