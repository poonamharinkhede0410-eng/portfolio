import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal, Key, Lock, CheckCircle2, Copy, Check, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { playAccessGranted, playKeySound } from '../utils/audio';

export const ContactPage: React.FC = () => {
  const { profile, setIsPgpModalOpen } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    engagementType: 'Penetration Testing (VAPT)',
    priority: 'Standard',
    message: '',
    encryptWithPgp: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedPacket, setSubmittedPacket] = useState<{
    hash: string;
    timestamp: string;
    encrypted: boolean;
  } | null>(null);
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    playKeySound();

    setTimeout(() => {
      const randomHash = Array.from({ length: 16 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('').toUpperCase();

      setSubmittedPacket({
        hash: `0x${randomHash}`,
        timestamp: new Date().toISOString(),
        encrypted: formData.encryptWithPgp
      });
      setSubmitting(false);
      playAccessGranted();
    }, 1000);
  };

  const handleCopyFingerprint = () => {
    navigator.clipboard.writeText(profile.pgpKey.fingerprint);
    setCopiedFingerprint(true);
    setTimeout(() => setCopiedFingerprint(false), 2000);
  };

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-[#183124] pb-6">
        <div className="flex items-center space-x-2 text-[#00FF66] font-mono text-xs">
          <Terminal className="w-4 h-4" />
          <span>// ENCRYPTED TRANSMISSION PROTOCOL // INITIALIZE CONTACT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1 tracking-tight">
          INITIALIZE CONTACT
        </h1>
        <p className="text-gray-400 text-sm mt-1 max-w-2xl font-sans">
          Establish an encrypted transmission link for penetration testing inquiries, security advisories, or technical collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Terminal Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-[#00FF66]/40 bg-[#070d0a] shadow-[0_0_30px_rgba(0,255,102,0.15)] overflow-hidden font-mono text-xs">
            {/* Window title bar */}
            <div className="px-4 py-3 bg-[#0d1612] border-b border-[#183124] flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[#00FF66]">
                <Lock className="w-3.5 h-3.5" />
                <span className="font-bold tracking-wide">SECURE_TRANSMIT_CLIENT // PORT 443</span>
              </div>
              <span className="text-[11px] text-gray-500">AES-256-GCM / TLS 1.3</span>
            </div>

            {submittedPacket ? (
              /* Success State */
              <div className="p-8 space-y-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#00FF66]/10 border border-[#00FF66] text-[#00FF66] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,255,102,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-sans">
                    Transmission Dispatched Successfully
                  </h3>
                  <p className="text-gray-300 text-xs font-sans max-w-md mx-auto">
                    Your packet has been encrypted and forwarded to the security operations inbox. Expect a response within 24 operational hours.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#050807] border border-[#183124] text-left text-[11px] space-y-1.5 max-w-md mx-auto text-gray-400">
                  <div>TRANSMISSION PACKET HASH: <span className="text-[#00FF66] font-bold">{submittedPacket.hash}</span></div>
                  <div>TIMESTAMP: <span className="text-white">{submittedPacket.timestamp}</span></div>
                  <div>ENCRYPTION STATUS: <span className="text-[#00E5FF]">{submittedPacket.encrypted ? 'ARMORED WITH PGP RSA-4096' : 'STANDARD TLS 1.3'}</span></div>
                  <div>STATUS: <span className="text-[#00FF66]">QUEUED_FOR_DISPATCH</span></div>
                </div>

                <button
                  onClick={() => {
                    setSubmittedPacket(null);
                    setFormData({
                      name: '',
                      organization: '',
                      email: '',
                      engagementType: 'Penetration Testing (VAPT)',
                      priority: 'Standard',
                      message: '',
                      encryptWithPgp: true,
                    });
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#183124] text-[#00FF66] hover:bg-[#204432] font-semibold transition-colors"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1">
                      OPERATOR / CONTACT NAME <span className="text-[#00FF66]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe or Security Team"
                      className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-white focus:border-[#00FF66] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1">
                      ORGANIZATION / HANDLE
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Acme Corp / SecOps Unit"
                      className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-white focus:border-[#00FF66] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1">
                      RETURN SECURE EMAIL <span className="text-[#00FF66]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.sec"
                      className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-white focus:border-[#00FF66] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-1">
                      ENGAGEMENT DOMAIN
                    </label>
                    <select
                      value={formData.engagementType}
                      onChange={(e) => setFormData({ ...formData, engagementType: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#0e1612] border border-[#183124] text-gray-200 focus:border-[#00FF66] focus:outline-none"
                    >
                      <option>Penetration Testing (VAPT)</option>
                      <option>Web Application Security Review</option>
                      <option>Zero-Trust Architecture Consultation</option>
                      <option>Vulnerability Disclosure / Bug Bounty</option>
                      <option>General Security Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">
                    PRIORITY LEVEL
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Routine', 'Standard', 'Urgent Security Disclosure'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, priority: lvl });
                          playKeySound();
                        }}
                        className={`py-2 px-2 text-center rounded border transition-colors ${
                          formData.priority === lvl
                            ? 'bg-[#183124] text-[#00FF66] border-[#00FF66]'
                            : 'bg-[#0e1612] text-gray-400 border-[#183124] hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">
                    TRANSMISSION MESSAGE BUFFER <span className="text-[#00FF66]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter project scope, target domains, timeline, or security assessment requirements..."
                    className="w-full px-3 py-2.5 rounded bg-[#0e1612] border border-[#183124] text-white focus:border-[#00FF66] focus:outline-none font-sans leading-relaxed"
                  />
                </div>

                {/* Encryption toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#050807] border border-[#183124]">
                  <div className="flex items-center space-x-2">
                    <Key className="w-4 h-4 text-[#00FF66]" />
                    <div>
                      <span className="text-white font-bold block">Armor with PGP Public Key</span>
                      <span className="text-[10px] text-gray-400">Encrypt transmission before dispatch</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.encryptWithPgp}
                    onChange={(e) => setFormData({ ...formData, encryptWithPgp: e.target.checked })}
                    className="w-4 h-4 accent-[#00FF66] cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-lg bg-[#00FF66] text-[#050807] font-bold text-sm tracking-wide hover:bg-[#20ff77] shadow-[0_0_20px_rgba(0,255,102,0.35)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>ENCRYPTING &amp; DISPATCHING...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>DISPATCH TRANSMISSION</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Direct Channels & Cryptographic Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* PGP Card */}
          <div className="p-6 rounded-xl bg-[#070d0a] border border-[#183124] space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[#00E5FF]">
                <Key className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">PGP Cryptographic Identity</span>
              </div>
              <span className="text-[#00FF66] text-[10px]">VERIFIED KEY</span>
            </div>

            <div className="p-3 rounded bg-[#050807] border border-[#183124] space-y-2">
              <div className="text-gray-400 text-[11px]">
                KEY ID: <span className="text-white font-bold">{profile.pgpKey.keyId}</span>
              </div>
              <div className="text-gray-400 text-[11px]">
                FINGERPRINT:
                <div className="text-[#00FF66] font-mono tracking-tight break-all mt-1">
                  {profile.pgpKey.fingerprint}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyFingerprint}
                className="flex-1 py-2 px-3 rounded bg-[#0e1612] border border-[#183124] hover:border-[#00FF66]/50 text-gray-300 hover:text-[#00FF66] flex items-center justify-center space-x-1.5 transition-colors"
              >
                {copiedFingerprint ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFingerprint ? 'Fingerprint Copied' : 'Copy Fingerprint'}</span>
              </button>
              <button
                onClick={() => setIsPgpModalOpen(true)}
                className="py-2 px-3 rounded bg-[#183124] text-[#00FF66] hover:bg-[#204432] transition-colors"
              >
                View Full Key Block
              </button>
            </div>
          </div>

          {/* Direct Comms Channels */}
          <div className="p-6 rounded-xl bg-[#070d0a] border border-[#183124] space-y-4">
            <h3 className="font-bold text-sm text-white font-mono uppercase tracking-wide text-[#00FF66]">
              // DIRECT NETWORK CHANNELS
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded bg-[#0e1612] border border-[#183124]">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-gray-300">Email:</span>
                </div>
                <a
                  href={`mailto:${profile.contactEmail}`}
                  className="text-[#00FF66] hover:underline"
                >
                  {profile.contactEmail}
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-[#0e1612] border border-[#183124]">
                <div className="flex items-center space-x-3">
                  <Github className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-300">GitHub:</span>
                </div>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  github.com/root-secops
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-[#0e1612] border border-[#183124]">
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-4 h-4 text-[#00E5FF]" />
                  <span className="text-gray-300">LinkedIn:</span>
                </div>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#00E5FF]"
                >
                  linkedin.com/in/root-security
                </a>
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-[#0e1612] border border-[#183124]">
                <div className="flex items-center space-x-3">
                  <Twitter className="w-4 h-4 text-[#00FF66]" />
                  <span className="text-gray-300">Twitter / X:</span>
                </div>
                <a
                  href={profile.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  @root_secops
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
