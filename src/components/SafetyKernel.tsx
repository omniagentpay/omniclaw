import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const gates = [
  { label: "Budget Gate", color: "primary", x: 180, description: "Spending limits" },
  { label: "Rate Gate", color: "accent", x: 370, description: "Frequency control" },
  { label: "Recipient Gate", color: "primary", x: 560, description: "Allowlist check" },
];

const SafetyKernel = () => {
  const [activeGate, setActiveGate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGate((prev) => (prev + 1) % gates.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-accent tracking-widest uppercase mb-4">
              Security Architecture
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
              The Safety Kernel
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every transaction passes through three programmable gates before execution.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <svg viewBox="0 0 740 200" className="w-full" fill="none">
              <line x1="40" y1="100" x2="700" y2="100" stroke="hsl(220 15% 20%)" strokeWidth="2" />
              <line x1="40" y1="100" x2="700" y2="100" stroke="url(#flowGradient)" strokeWidth="2" strokeDasharray="8 12" className="animate-path-flow" style={{ strokeDashoffset: 0 }} />
              <circle cx="40" cy="100" r="8" fill="hsl(75 100% 50%)" opacity="0.8" />
              <text x="40" y="140" textAnchor="middle" fill="hsl(215 12% 50%)" fontSize="11" fontFamily="Inter">Request</text>
              {gates.map((gate, i) => {
                const isActive = activeGate === i;
                return (
                  <g key={gate.label}>
                    {isActive && (
                      <rect x={gate.x - 45} y={70} width="90" height="60" rx="8" fill={gate.color === "primary" ? "hsl(75 100% 50% / 0.08)" : "hsl(190 100% 50% / 0.08)"} className="transition-all duration-500" />
                    )}
                    <rect x={gate.x - 40} y={75} width="80" height="50" rx="8" fill="hsl(220 20% 10%)" stroke={isActive ? (gate.color === "primary" ? "hsl(75 100% 50%)" : "hsl(190 100% 50%)") : "hsl(220 15% 20%)"} strokeWidth={isActive ? 2 : 1} className="transition-all duration-500" />
                    <text x={gate.x} y={96} textAnchor="middle" fill={isActive ? (gate.color === "primary" ? "hsl(75 100% 50%)" : "hsl(190 100% 50%)") : "hsl(210 20% 75%)"} fontSize="11" fontWeight="600" fontFamily="Inter" className="transition-all duration-500">{gate.label}</text>
                    <text x={gate.x} y={113} textAnchor="middle" fill="hsl(215 12% 45%)" fontSize="9" fontFamily="Inter">{gate.description}</text>
                    {isActive && (
                      <text x={gate.x} y={155} textAnchor="middle" fill={gate.color === "primary" ? "hsl(75 100% 50%)" : "hsl(190 100% 50%)"} fontSize="14">✓</text>
                    )}
                  </g>
                );
              })}
              <circle cx="700" cy="100" r="8" fill="hsl(190 100% 50%)" opacity="0.8" />
              <text x="700" y="140" textAnchor="middle" fill="hsl(215 12% 50%)" fontSize="11" fontFamily="Inter">Execute</text>
              <defs>
                <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(75 100% 50%)" />
                  <stop offset="100%" stopColor="hsl(190 100% 50%)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SafetyKernel;
