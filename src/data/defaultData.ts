import { ProfileData, StatsData, Skill, Project, TimelineMilestone } from '../types/portfolio';

export const DEFAULT_PROFILE: ProfileData = {
  username: "root",
  handle: "root@sec-ops",
  fullName: "Alex 'ZeroDay' Mercer",
  title: "Ethical Hacker // Security Researcher // Full-Stack Engineer",
  location: "Pacific Northwest, USA [LAT: 47.6062, LON: -122.3321]",
  primaryFocus: "Offensive Security, Web App Penetration Testing & Cryptographic Systems",
  currentMission: "Hardening decentralized architectures against advanced persistent threats (APT)",
  bioShort: "Ethical hacker and security researcher specializing in offensive operations, adversary simulation, and hardened infrastructure architecture.",
  bioFull: "I operate at the intersection of offensive security and resilient software engineering. With a deep foundation in penetration testing, threat hunting, and modern full-stack development, I deconstruct complex systems to expose vulnerabilities before malicious actors can exploit them. I believe that true defensive engineering requires an intimate understanding of adversarial tactics.",
  philosophy: {
    title: "The Ethical Adversary Doctrine",
    principles: [
      {
        title: "Responsible Disclosure",
        desc: "Strict adherence to coordinated vulnerability disclosure. All findings are reported constructively with reproducible proof-of-concept tests and remediation guidance."
      },
      {
        title: "Defense in Depth",
        desc: "No perimeter is impenetrable. Robust security demands zero-trust segmentation, least privilege access, cryptographic integrity, and relentless continuous auditing."
      },
      {
        title: "Offensive Empathy",
        desc: "Security should empower human engineers, not cripple velocity. The ultimate objective of red-teaming is educating teams and building self-healing architectures."
      }
    ]
  },
  pgpKey: {
    keyId: "0x89F4B23A",
    fingerprint: "E37F 9A4D 2B81 C405 E11D  77A4 89F4 B23A 6C90 1D22",
    publicKeySnippet: `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v5.1.0
Comment: https://root-portfolio.sec/pgp

mQGNBF+7e18BDADU9g2+8A7sJ1b7X/c9aKj2YpM8Ld...
[FULL PGP PUBLIC KEY - RSA 4096-BIT SEC-OPS KEY]
=eX9Q
-----END PGP PUBLIC KEY BLOCK-----`
  },
  avatarUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80",
  contactEmail: "root@portfolio.sec",
  githubUrl: "https://github.com/root-secops",
  linkedinUrl: "https://linkedin.com/in/root-security",
  ctfTimeUrl: "https://ctftime.org/team/root-hackers",
  twitterUrl: "https://x.com/root_secops"
};

export const DEFAULT_STATS: StatsData = {
  projectsCompleted: 24,
  technologiesMastered: 18,
  yearsExperience: 6,
  vulnerabilitiesReported: 47,
  uptimePercent: "99.99%",
  securityAuditsCompleted: 32
};

export const DEFAULT_SKILLS: Skill[] = [
  // Cybersecurity
  {
    id: "pen-testing",
    name: "Penetration Testing",
    category: "Cybersecurity",
    proficiency: 95,
    levelTag: "Core Specialization",
    description: "Black-box, grey-box, and white-box network and infrastructure exploitation.",
    cveOrLabExperience: "OSCP Certified, 40+ simulated corporate environments compromised."
  },
  {
    id: "vuln-assessment",
    name: "Vulnerability Assessment",
    category: "Cybersecurity",
    proficiency: 92,
    levelTag: "Core Specialization",
    description: "Automated and manual threat modeling, attack surface mapping, CVE triage.",
    cveOrLabExperience: "Authored 30+ comprehensive VAPT executive remediation reports."
  },
  {
    id: "web-app-sec",
    name: "Web Application Security",
    category: "Cybersecurity",
    proficiency: 96,
    levelTag: "Core Specialization",
    description: "OWASP Top 10 mastery: SSRF, IDOR, SQLi, XSS, OAuth logic flaws, and JWT exploits.",
    cveOrLabExperience: "HackerOne & Bugcrowd verified submissions with $15k+ bounties awarded."
  },
  {
    id: "threat-analysis",
    name: "Threat Analysis",
    category: "Cybersecurity",
    proficiency: 88,
    levelTag: "Advanced",
    description: "MITRE ATT&CK framework mapping, IOC correlation, malware behavioral analysis.",
    cveOrLabExperience: "Designed threat detection rules for SIEM pipeline processing 10M events/day."
  },

  // Tools
  {
    id: "kali-linux",
    name: "Kali Linux",
    category: "Tools",
    proficiency: 98,
    levelTag: "Core Specialization",
    description: "Daily driver offensive environment with custom automation toolchains.",
    cveOrLabExperience: "Custom live OS builds with automated persistence & payload frameworks."
  },
  {
    id: "burp-suite",
    name: "Burp Suite Pro",
    category: "Tools",
    proficiency: 96,
    levelTag: "Core Specialization",
    description: "Advanced HTTP proxying, custom Turbo Intruder scripts, and Extender BPython plugins.",
    cveOrLabExperience: "Built 3 open-source extensions for automated API parameter fuzzing."
  },
  {
    id: "nmap",
    name: "Nmap & Masscan",
    category: "Tools",
    proficiency: 94,
    levelTag: "Core Specialization",
    description: "High-speed port scanning, NSE scripting engine, and firewall evasion tactics.",
    cveOrLabExperience: "Authored custom NSE scripts for proprietary industrial IoT discovery."
  },
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Tools",
    proficiency: 90,
    levelTag: "Advanced",
    description: "Deep packet inspection, pcap traffic reconstruction, and protocol reverse engineering.",
    cveOrLabExperience: "Identified covert DNS tunneling channels in enterprise network captures."
  },
  {
    id: "metasploit",
    name: "Metasploit",
    category: "Tools",
    proficiency: 86,
    levelTag: "Advanced",
    description: "Exploit execution, custom Ruby auxiliary module authoring, meterpreter pivoting.",
    cveOrLabExperience: "Developed custom post-exploitation modules for lateral movement."
  },

  // Programming
  {
    id: "python",
    name: "Python",
    category: "Programming",
    proficiency: 94,
    levelTag: "Core Specialization",
    description: "Async exploit automation, Scapy packet manipulation, fuzzers, and backend tooling.",
    cveOrLabExperience: "Authored multithreaded network scanners and cryptographic verification utilities."
  },
  {
    id: "javascript",
    name: "JavaScript / TypeScript",
    category: "Programming",
    proficiency: 90,
    levelTag: "Advanced",
    description: "Full-stack development, browser exploitation concepts (DOM clobbering, prototype pollution).",
    cveOrLabExperience: "Discovered client-side prototype pollution in popular npm package."
  },
  {
    id: "bash",
    name: "Bash & Shell Scripting",
    category: "Programming",
    proficiency: 95,
    levelTag: "Core Specialization",
    description: "Linux system automation, automated recon pipelines, and weaponized cron jobs.",
    cveOrLabExperience: "Built automated sub-domain enumeration orchestrator."
  },
  {
    id: "sql",
    name: "SQL & Database Security",
    category: "Programming",
    proficiency: 88,
    levelTag: "Advanced",
    description: "Blind time-based SQL injection, database hardening, query optimization.",
    cveOrLabExperience: "Executed second-order SQL injection proof of concepts in test environments."
  },

  // Development
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    category: "Development",
    proficiency: 92,
    levelTag: "Advanced",
    description: "Semantic layouts, responsive cyber dashboards, CSS injection security auditing.",
    cveOrLabExperience: "Built zero-dependency cyber security consoles."
  },
  {
    id: "react",
    name: "React & Modern UI",
    category: "Development",
    proficiency: 92,
    levelTag: "Advanced",
    description: "State-driven dashboard architecture, hook lifecycle, real-time telemetry UIs.",
    cveOrLabExperience: "Engineered high-performance real-time SOC incident monitor."
  },
  {
    id: "node",
    name: "Node.js & Express",
    category: "Development",
    proficiency: 89,
    levelTag: "Advanced",
    description: "REST & WebSocket microservices, secure authentication headers, rate-limiting.",
    cveOrLabExperience: "Built API gateways with cryptographically signed tokens and mTLS."
  },
  {
    id: "git",
    name: "Git & DevSecOps",
    category: "Development",
    proficiency: 91,
    levelTag: "Advanced",
    description: "CI/CD secret scanning, signed commits, branch protections, pre-commit gitleaks.",
    cveOrLabExperience: "Configured zero-trust secret management pipelines."
  },

  // Systems & Networking
  {
    id: "linux",
    name: "Linux Internals & Admin",
    category: "Systems & Networking",
    proficiency: 96,
    levelTag: "Core Specialization",
    description: "Kernel hardening, AppArmor, SELinux, eBPF tracing, systemd security unit sandboxing.",
    cveOrLabExperience: "Extensive experience with Debian, Arch, Ubuntu Server, Alpine, and RHEL."
  },
  {
    id: "tcp-ip",
    name: "TCP/IP & Network Protocols",
    category: "Systems & Networking",
    proficiency: 94,
    levelTag: "Core Specialization",
    description: "Subnetting, routing tables, BGP, ARP spoofing detection, TLS 1.3 handshakes.",
    cveOrLabExperience: "Analyzed SYN flood vectors and tuned kernel TCP stack parameters."
  },
  {
    id: "dns",
    name: "DNS & DNSSEC",
    category: "Systems & Networking",
    proficiency: 88,
    levelTag: "Advanced",
    description: "DNS exfiltration defense, DNS rebinding vulnerability auditing, DoH/DoT.",
    cveOrLabExperience: "Detected covert channel telemetry in exfiltration simulations."
  },
  {
    id: "firewalls",
    name: "Firewalls & iptables/nftables",
    category: "Systems & Networking",
    proficiency: 92,
    levelTag: "Advanced",
    description: "Stateful packet filtering, WAF tuning, rate-limiting egress controls, DMZ isolation.",
    cveOrLabExperience: "Constructed hardened DMZ segmentation rules for multi-tier applications."
  }
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "vulnscan",
    title: "VulnScan",
    subtitle: "Enterprise Vulnerability Assessment & Reporting Suite",
    description: "A centralized vulnerability assessment dashboard built for authorized security testing teams, featuring real-time CVE correlation, risk scoring (CVSS v3.1), and automated executive audit reports.",
    category: "Cybersecurity",
    techStack: ["Python", "FastAPI", "React", "Docker", "Nmap-Lib", "PostgreSQL"],
    githubUrl: "https://github.com/root-secops/vulnscan",
    liveDemoUrl: "https://vulnscan.sec-demo.io",
    featured: true,
    status: "PRODUCTION READY",
    dossier: {
      threatModel: "Authorized internal/external vulnerability discovery platform with strict scope boundary validation to prevent out-of-scope testing.",
      architecture: [
        "Distributed asynchronous worker pool executing modular Nmap & OpenVAS probes",
        "CVSS v3.1 calculation engine with contextual temporal score modifiers",
        "Encrypted SQLite/PostgreSQL audit trail with tamper-evident hash chaining",
        "Exportable PDF/JSON executive remediation briefs with PoC reproduction steps"
      ],
      vulnerabilitiesAudited: [
        "Unauthenticated Remote Code Execution in legacy web daemons",
        "Expired and self-signed TLS certificates exposing weak cipher suites",
        "Exposed administrative management consoles without rate limits",
        "Default SNMP v1/v2 community strings enabling network enumeration"
      ],
      remediationsApplied: [
        "Implemented mandatory dual-token authorization for active port scans",
        "Rate-limited concurrent packet bursts to mitigate denial-of-service risks",
        "Enforced strict scope CIDR whitelisting at the kernel network namespace layer"
      ],
      keyMetrics: "Scanned 12,000+ endpoints across 14 networks with zero false-positive critical reports."
    }
  },
  {
    id: "packetwatch",
    title: "PacketWatch",
    subtitle: "Real-Time Network Traffic & Protocol Anomaly Monitor",
    description: "A high-throughput packet visualization engine capturing network interfaces, reconstructing live TCP streams, and flagging anomalous protocol behaviors and potential covert channels.",
    category: "Cybersecurity",
    techStack: ["Go", "libpcap", "TypeScript", "TailwindCSS", "WebSockets", "Three.js"],
    githubUrl: "https://github.com/root-secops/packetwatch",
    liveDemoUrl: "https://packetwatch.sec-demo.io",
    featured: true,
    status: "AUDITED & ACTIVE",
    dossier: {
      threatModel: "Passive network tap defense against data exfiltration, C2 beaconing, and unauthorized lateral protocol traversal.",
      architecture: [
        "Zero-copy libpcap network ring-buffer capable of handling 1Gbps wire rate",
        "Entropy evaluation engine flagging high-entropy DNS tunneling queries",
        "WebSocket feed broadcasting classified packet metadata to canvas visualizer",
        "Automated PCAP snippet extraction triggered by heuristic threat scores"
      ],
      vulnerabilitiesAudited: [
        "Covert DNS TXT record tunneling bypassing traditional perimeter firewalls",
        "Cleartext credential transmission over unencrypted Telnet/FTP connections",
        "ARP cache poisoning attempts aimed at machine-in-the-middle interception"
      ],
      remediationsApplied: [
        "Integrated signature-free Shannon entropy anomaly detection",
        "Automated instant alert dispatch via webhooks to incident responders",
        "Isolated packet parser execution inside unprivileged sandbox containers"
      ],
      keyMetrics: "Sub-5ms packet decode latency with 99.8% detection rate on synthetic C2 beacons."
    }
  },
  {
    id: "cyberlab",
    title: "CyberLab",
    subtitle: "Controlled Vulnerability Range & Interactive CTF Dojo",
    description: "A containerized cyber range hosting 30+ intentional vulnerability challenges (OWASP Top 10, privilege escalation, binary exploitation) with automated reset mechanisms for training.",
    category: "Cybersecurity",
    techStack: ["Docker", "Kubernetes", "Node.js", "React", "Bash", "Redis"],
    githubUrl: "https://github.com/root-secops/cyberlab",
    liveDemoUrl: "https://cyberlab.sec-demo.io",
    featured: true,
    status: "ACTIVE LAB",
    dossier: {
      threatModel: "Multi-tenant sandboxed range where students safely execute real exploitation techniques without cross-tenant escape.",
      architecture: [
        "K8s ephemeral pod provisioning: each user spawns an isolated instance with a 60-min TTL",
        "Strict gVisor container runtime preventing container breakouts and kernel exploitation",
        "Dynamic flag generation per session to deter flag sharing between participants",
        "Automated grading engine providing hints and verifying exploit payload payloads"
      ],
      vulnerabilitiesAudited: [
        "Container breakout via misconfigured Docker socket mounts",
        "Server-Side Request Forgery targeting AWS/GCP cloud metadata endpoints",
        "Insecure Deserialization in Java and Python application runtimes"
      ],
      remediationsApplied: [
        "Configured seccomp profiles blocking dangerous system calls (clone, ptrace)",
        "Blocked 169.254.169.254 metadata endpoints using iptables egress rules",
        "Read-only root filesystems with ephemeral tmpfs volumes for challenge containers"
      ],
      keyMetrics: "Trained 450+ ethical hackers and college students with zero safety incidents."
    }
  },
  {
    id: "securevault",
    title: "SecureVault",
    subtitle: "Zero-Knowledge Secrets & Key Management Enclave",
    description: "A cryptographically enforced credential manager demo utilizing Argon2id key derivation, client-side AES-256-GCM encryption, and Shamir's Secret Sharing for key recovery.",
    category: "Development",
    techStack: ["WebCrypto API", "Rust", "WebAssembly", "TypeScript", "Argon2id"],
    githubUrl: "https://github.com/root-secops/securevault",
    liveDemoUrl: "https://securevault.sec-demo.io",
    featured: false,
    status: "PRODUCTION READY",
    dossier: {
      threatModel: "Zero-knowledge secret storage where server hosts encrypted blobs without ever learning master passwords or decryption keys.",
      architecture: [
        "Argon2id memory-hard key derivation executed in WebAssembly sandbox",
        "AES-256-GCM authenticated encryption with unique 96-bit nonces per record",
        "Threshold Shamir's Secret Sharing (3-of-5 split) for emergency quorum recovery",
        "In-memory zeroing of plaintext cryptographic keys upon window blur or timeout"
      ],
      vulnerabilitiesAudited: [
        "Nonce reuse in Galois/Counter Mode compromising key integrity",
        "Side-channel timing attacks during master password hash comparison",
        "Memory dumping of plaintext secrets from browser heap allocations"
      ],
      remediationsApplied: [
        "Enforced CSPRNG-generated nonces verified with constant-time equality checks",
        "Implemented automatic session destruction after 3 minutes of inactivity",
        "Strict Content Security Policy (CSP) blocking external script execution"
      ],
      keyMetrics: "Zero plain-text leaks verified across 10 independent simulated memory dumps."
    }
  },
  {
    id: "zerotrust-mesh",
    title: "ZeroTrust Mesh",
    subtitle: "Micro-Segmentation & Identity-Aware Proxy Gateway",
    description: "A software-defined perimeter prototype implementing cryptographic mutual TLS (mTLS) between microservices with dynamic policy enforcement based on device health.",
    category: "Automation",
    techStack: ["Envoy Proxy", "Go", "WireGuard", "React", "Open Policy Agent"],
    githubUrl: "https://github.com/root-secops/zerotrust-mesh",
    liveDemoUrl: "https://mesh.sec-demo.io",
    featured: false,
    status: "PROOF OF CONCEPT",
    dossier: {
      threatModel: "Zero-trust verification ensuring compromise of one service cannot grant lateral movement to critical financial or user datastores.",
      architecture: [
        "Envoy sidecar proxies terminating SPIFFE/SPIRE cryptographically verifiable X.509 certs",
        "Open Policy Agent (OPA) evaluating declarative Rego authorization policies in real time",
        "Continuous device posture verification checking disk encryption and firewall status"
      ],
      vulnerabilitiesAudited: [
        "Lateral movement via default internal service mesh trust relationships",
        "Stale credential replay attacks from decommissioned container instances"
      ],
      remediationsApplied: [
        "Ephemeral short-lived certificates with 1-hour validity and automated renewal",
        "Mandatory context-aware policy checks on every internal RPC invocation"
      ],
      keyMetrics: "Reduced blast radius from complete infrastructure to single microservice."
    }
  },
  {
    id: "threatintel-feed",
    title: "ThreatIntel Feed",
    subtitle: "Automated OSINT & Indicator of Compromise (IoC) Pipeline",
    description: "An automated intelligence harvester aggregating malicious IP addresses, phishing domains, and ransomware hashes from 20+ feeds into normalized STIX/TAXII format.",
    category: "Research",
    techStack: ["Python", "Elasticsearch", "MISP API", "Next.js", "Docker"],
    githubUrl: "https://github.com/root-secops/threatintel-feed",
    liveDemoUrl: "https://intel.sec-demo.io",
    featured: false,
    status: "AUDITED & ACTIVE",
    dossier: {
      threatModel: "Early warning detection system preemptively recognizing newly registered phishing domains and C2 infrastructure.",
      architecture: [
        "Asynchronous scrapers ingesting feeds from AlienVault OTX, abuse.ch, and MISP",
        "Fuzzy matching with Levenshtein distance on SSL certificate transparency logs",
        "Automated reputation enrichment via Shodan and VirusTotal APIs"
      ],
      vulnerabilitiesAudited: [
        "Poisoned threat feed inputs aimed at polluting SIEM detection rules",
        "Rate limiting bypass during large-scale OSINT domain crawling"
      ],
      remediationsApplied: [
        "Cryptographic signature verification on upstream intelligence feeds",
        "Confidence scoring algorithms filtering low-fidelity false positive indicators"
      ],
      keyMetrics: "Processes 250,000+ indicators daily with 99.4% precision rating."
    }
  }
];

export const DEFAULT_TIMELINE: TimelineMilestone[] = [
  {
    id: "time-1",
    year: "2024 - Present",
    title: "Senior Security Consultant & Lead Pen Tester",
    roleOrCredential: "Red Team Lead",
    organization: "Apex Cyber Defense Labs",
    type: "career",
    description: "Leading complex red-teaming engagements against Tier-1 financial institutions and cloud infrastructure. Conducting physical, social engineering, and external network penetration tests.",
    skills: ["Red Teaming", "Cloud Security", "Active Directory Exploitation", "Executive Reporting"]
  },
  {
    id: "time-2",
    year: "2023",
    title: "OSCP Certification (Offensive Security Certified Professional)",
    roleOrCredential: "PEN-200 / OSCP Credential ID: OS-102948",
    organization: "Offensive Security",
    type: "certification",
    description: "Passed rigorous 24-hour hands-on examination compromising target active directory networks and standalone machines with documented technical reports.",
    skills: ["Buffer Overflows", "Privilege Escalation", "Pivoting", "AD Kerberoasting"]
  },
  {
    id: "time-3",
    year: "2022 - 2024",
    title: "Vulnerability Researcher & Security Analyst",
    roleOrCredential: "Security Operations Analyst",
    organization: "Sentinel Defense Systems",
    type: "career",
    description: "Managed vulnerability management programs, conducted deep-dive code reviews in Python and TypeScript, and coordinated bug bounty triage programs.",
    skills: ["SAST/DAST", "SIEM Engineering", "Python Automation", "OWASP Top 10"]
  },
  {
    id: "time-4",
    year: "2022",
    title: "CompTIA Security+ & CEH (Certified Ethical Hacker)",
    roleOrCredential: "Industry Certifications",
    organization: "CompTIA / EC-Council",
    type: "certification",
    description: "Certified foundational knowledge in cryptographic standards, threat mitigation, network perimeter security, and ethical testing standards.",
    skills: ["Cryptography", "Network Security", "Compliance", "Security Architecture"]
  },
  {
    id: "time-5",
    year: "2019 - 2023",
    title: "B.S. in Computer Science & Cybersecurity Focus",
    roleOrCredential: "Summa Cum Laude",
    organization: "State Institute of Technology",
    type: "education",
    description: "Specialized in Computer Systems, Distributed Networks, Cryptography, and Reverse Engineering. President of the Collegiate Cyber Defense Competition (CCDC) team.",
    skills: ["Assembly x86/ARM", "Operating Systems", "Networking", "Computer Architecture"]
  },
  {
    id: "time-6",
    year: "2021",
    title: "1st Place - National Inter-Collegiate CTF",
    roleOrCredential: "Team Captain / Lead Exploiter",
    organization: "CyberDefenders National Championship",
    type: "achievement",
    description: "Led 4-person team to first place out of 180 teams in a 48-hour continuous capture-the-flag challenge covering web exploitation, forensics, and binary reverse engineering.",
    skills: ["Forensics", "Web Exploitation", "Reverse Engineering", "Team Leadership"]
  }
];
