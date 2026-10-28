import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { X, Key, Copy, Check, ShieldCheck } from 'lucide-react';

export const PgpModal: React.FC = () => {
  const { isPgpModalOpen, setIsPgpModalOpen, profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  if (!isPgpModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.pgpKey.publicKeySnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl flex flex-col rounded-xl border border-[#00FF66]/40 bg-[#070d0a] shadow-[0_0_35px_rgba(0,255,102,0.2)] overflow-hidden font-mono text-xs"
        role="dialog"
        aria-modal="true"
        aria-label="PGP Cryptographic Public Key"
      >
        <div className="flex items-center justify-between px-5 py-4 bg-[#0d1612] border-b border-[#183124]">
          <div className="flex items-center space-x-2 text-[#00FF66]">
            <Key className="w-5 h-5 text-[#00FF66]" />
            <h3 className="font-bold text-sm text-white tracking-wide">
              PGP PUBLIC KEY ENCLAVE
            </h3>
          </div>
          <button
            onClick={() => setIsPgpModalOpen(false)}
            aria-label="Close PGP modal"
            className="p-1 rounded text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="p-3 rounded bg-[#050807] border border-[#183124] space-y-2">
            <div className="text-[11px] text-gray-400">
              KEY ID: <span className="text-[#00FF66] font-bold">{profile.pgpKey.keyId}</span>
            </div>
            <div className="text-[11px] text-gray-400">
              FINGERPRINT:
              <div className="text-[#00E5FF] font-mono tracking-wider break-all mt-0.5">
                {profile.pgpKey.fingerprint}
              </div>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] text-[#00FF66]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>4096-bit RSA / Curve25519 Verified</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 text-gray-400 text-[11px]">
              <span>ARMORED PUBLIC KEY BLOCK:</span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 text-[#00FF66] hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Key'}</span>
              </button>
            </div>
            <pre className="p-3 rounded bg-[#050807] border border-[#183124] text-[#00FF66]/80 text-[10px] overflow-x-auto whitespace-pre-wrap leading-tight select-all">
              {profile.pgpKey.publicKeySnippet}
            </pre>
          </div>
        </div>

        <div className="px-5 py-3 bg-[#0d1612] border-t border-[#183124] flex justify-end">
          <button
            onClick={() => setIsPgpModalOpen(false)}
            className="px-4 py-1.5 rounded bg-[#183124] text-white hover:bg-[#204030] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
