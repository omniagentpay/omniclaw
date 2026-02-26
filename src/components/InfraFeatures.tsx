import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Shield, Zap, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    id: "payments",
    icon: Wallet,
    title: "Programmable Wallets",
    description: "Agent-scoped wallets with granular spending controls. Create, fund, and manage wallets programmatically.",
    auraColor: "hsl(45, 100%, 55%)",
    accentClass: "text-[hsl(45,100%,55%)]",
    bgClass: "bg-[hsl(45,100%,55%,0.08)]",
    borderClass: "border-[hsl(45,100%,55%,0.25)]",
    stats: { label: "Wallet Creation", value: "< 5s" },
  },
  {
    id: "security",
    icon: Shield,
    title: "Atomic Safety",
    description: "Three-gate guard system ensures every transaction passes budget, velocity, and recipient checks.",
    auraColor: "hsl(190, 100%, 50%)",
    accentClass: "text-accent",
    bgClass: "bg-accent/[0.08]",
    borderClass: "border-accent/25",
    stats: { label: "Guard Latency", value: "< 12ms" },
  },
  {
    id: "settlement",
    icon: Zap,
    title: "Real-Time Settlement",
    description: "Sub-second USDC settlement across all supported chains. No batching, no delays.",
    auraColor: "hsl(75, 100%, 50%)",
    accentClass: "text-primary",
    bgClass: "bg-primary/[0.08]",
    borderClass: "border-primary/25",
    stats: { label: "Settlement", value: "< 400ms" },
  },
  {
    id: "crosschain",
    icon: Globe,
    title: "Cross-Chain CCTP",
    description: "Native USDC bridging via Circle's CCTP. Atomic cross-chain payments with attestation verification.",
    auraColor: "hsl(260, 80%, 60%)",
    accentClass: "text-[hsl(260,80%,60%)]",
    bgClass: "bg-[hsl(260,80%,60%,0.08)]",
    borderClass: "border-[hsl(260,80%,60%,0.25)]",
    stats: { label: "Bridge Time", value: "~90s" },
  },
];

const InfraFeatures = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredFeature = features.find((f) => f.id === hoveredId);

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Dynamic aura background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: hoveredFeature
            ? `radial-gradient(ellipse 60% 50% at 50% 50%, ${hoveredFeature.auraColor.replace(")", " / 0.06)")}, transparent)`
            : "radial-gradient(ellipse 60% 50% at 50% 50%, transparent, transparent)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ willChange: "background" }} // GPU acceleration hint
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
              Infrastructure
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
              Built for Autonomy
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every component designed for agent-first payment workflows.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isHovered = hoveredId === feature.id;

            return (
              <ScrollReveal key={feature.id} delay={i * 0.08}>
                <motion.div
                  className={`glass-card p-6 cursor-pointer transition-all duration-500 group relative overflow-hidden ${isHovered ? feature.borderClass : ""}`}
                  onMouseEnter={() => setHoveredId(feature.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card aura */}
                  {isHovered && (
                    <motion.div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: `radial-gradient(circle, ${feature.auraColor.replace(")", " / 0.12)")}, transparent)`,
                      }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className={`h-11 w-11 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 ${isHovered ? feature.bgClass : "bg-muted"}`}>
                      <Icon
                        size={22}
                        className={`transition-colors duration-300 ${isHovered ? feature.accentClass : "text-muted-foreground"}`}
                      />
                    </div>

                    <h3 className="font-display font-bold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <span className="text-xs text-muted-foreground font-mono">{feature.stats.label}</span>
                      <span className={`text-sm font-mono font-bold transition-colors duration-300 ${isHovered ? feature.accentClass : "text-foreground"}`}>
                        {feature.stats.value}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfraFeatures;
