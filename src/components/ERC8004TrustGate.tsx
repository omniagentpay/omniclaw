import { CheckCircle2, Shield, Trophy, TrendingUp, Lock, Eye } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useState } from "react";

const trustRegistries = [
  {
    id: "identity",
    title: "Identity Registry",
    subtitle: "ERC-721 Extended",
    description: "Every agent gets a unique on-chain identifier, an EVM address, and a registration file containing name, capabilities, and service endpoints.",
    icon: Lock,
    color: "from-primary to-lime-400",
    features: ["On-chain identifiers", "First-class EVM entities", "CAIP-10 compatible", "Transferable & discoverable"],
  },
  {
    id: "reputation",
    title: "Reputation Registry",
    subtitle: "Feedback Signals",
    description: "Standardized interface for posting and retrieving feedback signals. Verified submitters post scores, tags, and evidence after interactions.",
    icon: Eye,
    color: "from-accent to-blue-400",
    features: ["Composable signals", "Verified submitters only", "Score aggregation", "Fraud detection tags"],
  },
  {
    id: "validation",
    title: "Validation Registry",
    subtitle: "Cryptographic Proof",
    description: "Generic hooks for cryptographic and economic verification of agent work. Supports social consensus, crypto-staking, and ZK/TEE proofs.",
    icon: Shield,
    color: "from-purple-500 to-pink-400",
    features: ["Social consensus", "Crypto-economic staking", "ZK proofs", "TEE verification"],
  },
];

const trustCheckpoints = [
  { step: 1, check: "Address Blocklist", action: "BLOCKED immediately", color: "red" },
  { step: 2, check: "Org Whitelist", action: "APPROVED — skip checks", color: "green" },
  { step: 3, check: "Identity Resolution", action: "Fetch on-chain ERC-8004 registration", color: "blue" },
  { step: 4, check: "Fraud Tag Detection", action: "Scan for malicious signals", color: "red" },
  { step: 5, check: "New Agent Check", action: "Feedback signal threshold", color: "yellow" },
  { step: 6, check: "Min Signal Count", action: "Configurable threshold", color: "yellow" },
  { step: 7, check: "Weighted Trust Score", action: "Score threshold enforcement", color: "yellow" },
  { step: 8, check: "High-Value Threshold", action: "Stricter checks for large payments", color: "orange" },
  { step: 9, check: "Attestation Check", action: "KYB/SOC2/GDPR verification", color: "blue" },
  { step: 10, check: "All Checks Pass", action: "APPROVED for payment", color: "green" },
];

const wtsSteps = [
  {
    title: "Filter Self-Reviews",
    description: "An agent's own feedback signals are excluded from its score to prevent artificial inflation.",
    icon: "🔍",
  },
  {
    title: "Recency Decay",
    description: "Recent signals weighted at 1.0x, middle third at 0.5x, oldest at 0.2x for accurate current reputation.",
    icon: "⏱️",
  },
  {
    title: "Verified Submitter Boost",
    description: "ERC-8004 registered agents submitting feedback receive 1.5x weight vs anonymous submissions.",
    icon: "✓",
  },
  {
    title: "Weighted Average",
    description: "Normalized score weighted by all modifiers, producing a 0-100 score. Fewer than 3 signals triggers new_agent flag.",
    icon: "📊",
  },
];

const competitorComparison = [
  {
    competitor: "Coinbase AgentKit",
    approach: "Wallet addresses",
    limitation: "No on-chain reputation verification",
  },
  {
    competitor: "Nevermined",
    approach: "DIDs for identity",
    limitation: "No guard kernel or WTS scoring",
  },
  {
    competitor: "InFlow",
    approach: "Policy-approved identity",
    limitation: "Consumer-focused, no enterprise controls",
  },
  {
    competitor: "Stripe",
    approach: "Human-centric design",
    limitation: "Retrofit for agents, no ERC-8004",
  },
];

const ERC8004TrustGate = () => {
  const [activeRegistry, setActiveRegistry] = useState(0);
  const [activeCheckpoint, setActiveCheckpoint] = useState(0);

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
              ERC-8004 Standard
            </p>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-foreground tracking-tight mb-6">
              Trust Gate: Agent Identity & Reputation
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              First production SDK for the Ethereum standard for trustless AI agents. Know exactly who your agents are paying — or who's paying them.
            </p>
          </div>
        </ScrollReveal>

        {/* Three Registries */}
        <ScrollReveal delay={0.1}>
          <div className="mb-24">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {trustRegistries.map((registry, idx) => {
                const Icon = registry.icon;
                const isActive = activeRegistry === idx;
                return (
                  <button
                    key={registry.id}
                    onClick={() => setActiveRegistry(idx)}
                    className={`text-left p-6 rounded-lg transition-all duration-300 border-2 ${
                      isActive
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${registry.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{registry.title}</h3>
                    <p className="text-xs font-mono text-primary mb-3">{registry.subtitle}</p>
                    <p className="text-sm text-muted-foreground">{registry.description}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Registry Details */}
            <div className="glass-card p-8 md:p-10">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Core Features</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {trustRegistries[activeRegistry].features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Weighted Trust Score Algorithm */}
        <ScrollReveal delay={0.15}>
          <div className="mb-24">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-12 text-center">
              Weighted Trust Score (WTS)
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {wtsSteps.map((step, i) => (
                  <div key={i} className="glass-card p-6 hover:border-primary/50 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{step.icon}</div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WTS Visual */}
              <div className="glass-card p-8 flex flex-col items-center justify-center">
                <div className="relative w-full h-64 flex items-center justify-center mb-8">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Background circle */}
                    <circle cx="100" cy="100" r="90" fill="hsl(220 20% 10%)" stroke="hsl(220 15% 20%)" strokeWidth="1" />
                    {/* Progress arcs for each step */}
                    {[0, 1, 2, 3].map((i) => {
                      const startAngle = (i * 90 - 90) * (Math.PI / 180);
                      const endAngle = ((i + 1) * 90 - 90) * (Math.PI / 180);
                      const colors = [
                        "hsl(75 100% 50%)", // green
                        "hsl(190 100% 50%)", // cyan
                        "hsl(280 100% 50%)", // purple
                        "hsl(350 100% 50%)", // red
                      ];
                      return (
                        <circle
                          key={i}
                          cx="100"
                          cy="100"
                          r="65"
                          fill="none"
                          stroke={colors[i]}
                          strokeWidth="12"
                          strokeDasharray={`${(90 / 360) * 2 * Math.PI * 65} ${2 * Math.PI * 65}`}
                          strokeDashoffset={`${(i * 90 / 360) * 2 * Math.PI * 65}`}
                          opacity="0.3"
                        />
                      );
                    })}
                    {/* Score display */}
                    <text x="100" y="95" textAnchor="middle" fill="hsl(75 100% 50%)" fontSize="32" fontWeight="bold" fontFamily="Inter">
                      0-100
                    </text>
                    <text x="100" y="120" textAnchor="middle" fill="hsl(215 12% 50%)" fontSize="12" fontFamily="Inter">
                      Trust Score
                    </text>
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground text-center">Computed from verified reputation signals with automatic decay and boost mechanisms</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* The 10-Check Trust Policy */}
        <ScrollReveal delay={0.2}>
          <div className="mb-24">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3 text-center">
              10-Check Trust Policy
            </h3>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Every payment to another agent runs through this chain. Atomic checks ensure no payment goes through without full verification.
            </p>

            <div className="glass-card p-8 md:p-12">
              <div className="space-y-3">
                {trustCheckpoints.map((checkpoint, i) => {
                  const isActive = activeCheckpoint === i;
                  const colorMap = {
                    red: "bg-red-500/10 border-red-500/30",
                    green: "bg-green-500/10 border-green-500/30",
                    blue: "bg-blue-500/10 border-blue-500/30",
                    yellow: "bg-yellow-500/10 border-yellow-500/30",
                    orange: "bg-orange-500/10 border-orange-500/30",
                  };

                  return (
                    <button
                      key={i}
                      onClick={() => setActiveCheckpoint(i)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isActive ? "border-primary bg-primary/10" : colorMap[checkpoint.color as keyof typeof colorMap]
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-foreground/10 font-mono text-sm font-semibold text-foreground shrink-0">
                          {checkpoint.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground">{checkpoint.check}</h4>
                          {isActive && <p className="text-sm text-muted-foreground mt-1">{checkpoint.action}</p>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">28 keccak256-verified contract selectors</span> deployed on ETH Mainnet, Base, and Sepolia. The Ethereum Foundation has designated ERC-8004 as strategic infrastructure for the AI agent economy.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Competitive Differentiation */}
        <ScrollReveal delay={0.25}>
          <div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3 text-center">
              Why We're Different
            </h3>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              No competitor has integrated ERC-8004 into their guard kernel with this level of enterprise control.
            </p>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-6 py-4 font-semibold text-foreground">Competitor</th>
                      <th className="text-left px-6 py-4 font-semibold text-foreground">Their Approach</th>
                      <th className="text-left px-6 py-4 font-semibold text-foreground">Missing vs OmniClaw</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorComparison.map((row, i) => (
                      <tr key={i} className={i !== competitorComparison.length - 1 ? "border-b border-border/50" : ""}>
                        <td className="px-6 py-4 font-medium text-foreground">{row.competitor}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{row.approach}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-block px-3 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
                            {row.limitation}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-6">
              See ERC-8004 in action with two-sided X402 payments
            </p>
            <a
              href="/developer#protocol"
              className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              View Code Example
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ERC8004TrustGate;
