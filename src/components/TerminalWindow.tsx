import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal as TerminalIcon, Copy, Check, Maximize2, RefreshCw } from 'lucide-react';
import { playKeySound } from '../utils/audio';

interface TerminalTab {
  id: string;
  filename: string;
  lines: string[];
}

export const TerminalWindow: React.FC = () => {
  const { profile, setIsTerminalOpen } = usePortfolio();
  const [activeTab, setActiveTab] = useState('recon');
  const [copied, setCopied] = useState(false);
  const [streamIndex, setStreamIndex] = useState(0);

  const tabs: TerminalTab[] = [
    {
      id: 'recon',
      filename: 'recon_target.sh',
      lines: [
        `[+] INITIALIZING AUDIT: target=sec-ops.perimeter.internal`,
        `[*] Target IP: 192.168.10.42 [INTERFACE: tun0]`,
        `[#] nmap -sC -sV -p 22,80,443,8080,8443 -oN audit_results.txt 192.168.10.42`,
        `PORT     STATE SERVICE       VERSION`,
        `22/tcp   open  ssh           OpenSSH 9.2p1 Debian (protocol 2.0)`,
        `80/tcp   open  http          nginx/1.24.0 (Ubuntu)`,
        `443/tcp  open  ssl/https     nginx/1.24.0 [Strict-Transport-Security: max-age=63072000]`,
        `8080/tcp open  http-proxy    Envoy SPIFFE ZeroTrust Gateway v1.28`,
        `[*] Probing SSL/TLS cipher suites: ECDHE-ECDSA-AES256-GCM-SHA384 [GRADE: A+]`,
        `[✔] Zero unauthenticated remote access vulnerabilities identified.`,
        `[+] Audit verified by: ${profile.username} (${profile.handle})`
      ]
    },
    {
      id: 'session',
      filename: 'session_telemetry.log',
      lines: [
        `[INIT] SEC_KERNEL_BOOT: v6.6.14-hardened-x86_64`,
        `[OK] Memory integrity: SHA-512 enclave validation SUCCESS`,
        `[OK] AppArmor sandbox profiles loaded (48 active profiles)`,
        `[OK] WireGuard encrypted tunnel active [peer: root@hq]`,
        `[INFO] Current Mission: "${profile.currentMission}"`,
        `[INFO] Security Clearance: TOP SECRET // COMPLIANCE RESTRICTED`,
        `[INFO] Last verified exploit simulation: 100% defense retention`,
        `[STATUS] DAEMON WATCHER: 0 anomalies, 0 unauthorized packet drops`
      ]
    },
    {
      id: 'firewall',
      filename: 'nftables_rules.conf',
      lines: [
        `table inet security_filter {`,
        `    chain input {`,
        `        type filter hook input priority 0; policy drop;`,
        `        ct state established,related accept`,
        `        iifname "lo" accept`,
        `        ip protocol icmp limit rate 4/second accept`,
        `        tcp dport { 22, 443 } ip saddr @authorized_bastion accept`,
        `        log prefix "[SEC_BLOCKED_INGRESS]: " counter drop`,
        `    }`,
        `}`,
        `# Integrity checksum: verified signed by ${profile.pgpKey.keyId}`
      ]
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  // Progressive stream typing effect on tab switch
  useEffect(() => {
    setStreamIndex(1);
    const interval = setInterval(() => {
      setStreamIndex(prev => {
        if (prev < currentTab.lines.length) {
          playKeySound();
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [activeTab, currentTab.lines.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg border border-[#00FF66]/30 bg-[#070d0a]/95 backdrop-blur-md shadow-[0_0_25px_rgba(0,255,102,0.1)] overflow-hidden font-mono text-xs text-left">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#0d1612] border-b border-[#183124]">
        <div className="flex items-center space-x-2">
          {/* Mac/Linux terminal buttons */}
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block"></span>
          </div>
          <span className="text-gray-400 text-[11px] ml-2 hidden sm:inline">
            terminal://{profile.username}@core:~$
          </span>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#183124] text-[#00FF66] font-semibold border border-[#00FF66]/40'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#121c17]'
              }`}
            >
              {tab.filename}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setStreamIndex(currentTab.lines.length)}
            title="Reveal all lines"
            aria-label="Refresh terminal output"
            className="p-1.5 text-gray-400 hover:text-[#00FF66] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            title="Copy buffer"
            aria-label="Copy terminal text"
            className="p-1.5 text-gray-400 hover:text-[#00FF66] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsTerminalOpen(true)}
            title="Open Interactive CLI Shell"
            aria-label="Maximize terminal"
            className="p-1.5 text-gray-400 hover:text-[#00E5FF] transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-5 min-h-[220px] max-h-[340px] overflow-y-auto space-y-1.5 bg-[#050807]/90 scanlines">
        {currentTab.lines.slice(0, streamIndex).map((line, idx) => {
          const isCommand = line.startsWith('[#]') || line.startsWith('$');
          const isSuccess = line.includes('[✔]') || line.includes('[OK]') || line.includes('open');
          const isAlert = line.includes('[+]') || line.includes('[INIT]');
          const isHeader = line.includes('PORT');

          return (
            <div key={idx} className="leading-relaxed flex items-start space-x-2">
              <span className="text-gray-600 select-none text-[10px] pt-0.5 w-5 text-right shrink-0">
                {idx + 1}
              </span>
              <div
                className={`flex-1 break-all ${
                  isCommand
                    ? 'text-[#00E5FF] font-semibold'
                    : isSuccess
                    ? 'text-[#00FF66]'
                    : isAlert
                    ? 'text-emerald-300'
                    : isHeader
                    ? 'text-gray-400 underline'
                    : 'text-gray-300'
                }`}
              >
                {line}
              </div>
            </div>
          );
        })}

        {/* Active prompt row */}
        <div className="flex items-center space-x-2 pt-2 text-[#00FF66]">
          <span className="text-gray-600 select-none text-[10px] w-5 text-right shrink-0">
            {streamIndex + 1}
          </span>
          <TerminalIcon className="w-3 h-3 text-[#00FF66]" />
          <span className="text-[#00E5FF]">{profile.username}@defense-node:~$</span>
          <span className="cursor-blink font-bold text-[#00FF66]">_</span>
        </div>
      </div>

      {/* Terminal Footer status */}
      <div className="px-3 py-1.5 bg-[#0d1612] border-t border-[#183124] flex items-center justify-between text-[10px] text-gray-400">
        <div className="flex items-center space-x-2">
          <span className="text-[#00FF66]">● TTY: pts/3</span>
          <span>BAUD: 115200</span>
          <span>UTF-8</span>
        </div>
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="text-[#00E5FF] hover:underline"
        >
          [Press ` for full interactive CLI]
        </button>
      </div>
    </div>
  );
};
