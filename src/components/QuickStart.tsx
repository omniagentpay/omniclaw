import { useState } from "react";
import { Terminal, Settings, CreditCard, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Zap, Clock, Shield, Gauge } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Install the SDK",
    description: "One command. Python, TypeScript, or Go.",
    icon: Terminal,
    code: [
      { token: "comment", text: "# Install via pip" },
      { token: "plain", text: "\n" },
      { token: "prompt", text: "$ " },
      { token: "command", text: "pip install omniclaw" },
      { token: "plain", text: "\n\n" },
      { token: "comment", text: "# Or with npm" },
      { token: "plain", text: "\n" },
      { token: "prompt", text: "$ " },
      { token: "command", text: "npm install @omniclaw/sdk" },
    ],
  },
  {
    number: "02",
    title: "Configure Your Agent",
    description: "Set your wallet, budget limits, and allowed recipients.",
    icon: Settings,
    code: [
      { token: "keyword", text: "from " },
      { token: "module", text: "omniclaw" },
      { token: "keyword", text: " import " },
      { token: "type", text: "AgentWallet" },
      { token: "plain", text: "\n\n" },
      { token: "variable", text: "wallet" },
      { token: "plain", text: " = " },
      { token: "type", text: "AgentWallet" },
      { token: "plain", text: "(\n  " },
      { token: "param", text: "api_key" },
      { token: "plain", text: "=" },
      { token: "string", text: '"sk_live_..."' },
      { token: "plain", text: ",\n  " },
      { token: "param", text: "daily_budget" },
      { token: "plain", text: "=" },
      { token: "number", text: "50.00" },
      { token: "plain", text: ",\n  " },
      { token: "param", text: "allowed_recipients" },
      { token: "plain", text: "=[" },
      { token: "string", text: '"*.openai.com"' },
      { token: "plain", text: ", " },
      { token: "string", text: '"*.anthropic.com"' },
      { token: "plain", text: "]\n)" },
    ],
  },
  {
    number: "03",
    title: "Execute Payments",
    description: "Your agent can now pay autonomously within its safety bounds.",
    icon: CreditCard,
    code: [
      { token: "variable", text: "result" },
      { token: "plain", text: " = wallet." },
      { token: "function", text: "pay" },
      { token: "plain", text: "(\n  " },
      { token: "param", text: "to" },
      { token: "plain", text: "=" },
      { token: "string", text: '"api.openai.com"' },
      { token: "plain", text: ",\n  " },
      { token: "param", text: "amount" },
      { token: "plain", text: "=" },
      { token: "number", text: "0.012" },
      { token: "plain", text: ",\n  " },
      { token: "param", text: "memo" },
      { token: "plain", text: "=" },
      { token: "string", text: '"GPT-4 inference call"' },
      { token: "plain", text: "\n)\n\n" },
      { token: "keyword", text: "print" },
      { token: "plain", text: "(result." },
      { token: "variable", text: "status" },
      { token: "plain", text: ")  " },
      { token: "comment", text: '# "confirmed"' },
    ],
  },
];

const tokenColors: Record<string, string> = {
  keyword: "text-accent",
  module: "text-foreground",
  type: "text-primary",
  variable: "text-foreground/90",
  plain: "text-foreground/70",
  string: "text-primary",
  number: "text-accent",
  param: "text-accent/80",
  function: "text-primary",
  comment: "text-muted-foreground",
  prompt: "text-primary",
  command: "text-foreground",
};

const nfrStats = [
  {
    icon: Zap,
    value: "< 5s",
    label: "Wallet Creation",
    description: "Programmatic wallet provisioning",
  },
  {
    icon: Clock,
    value: "99.9%",
    label: "Uptime SLA",
    description: "Enterprise-grade availability",
  },
  {
    icon: Gauge,
    value: "< 1s",
    label: "Simulations",
    description: "Dry-run before every payment",
  },
  {
    icon: Shield,
    value: "Atomic",
    label: "Safety Guarantees",
    description: "All-or-nothing execution",
  },
];

const QuickStart = () => {
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20" id="get-started">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
              Developer Experience
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
              Three Steps to Autonomous Payments
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From zero to production in under five minutes.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="max-w-3xl mx-auto mb-24 space-y-3">
          {steps.map((step, i) => {
            const isOpen = openStep === i;
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div
                  className={`glass-card overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-glow-lime border-primary/30" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenStep(isOpen ? null : i)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-xs font-mono text-primary font-bold shrink-0">
                      {step.number}
                    </span>
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                      >
                        <div className="px-6 pb-5">
                          <div className="terminal-bg p-5 rounded-lg">
                            <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                              {step.code.map((segment, j) => (
                                <span
                                  key={j}
                                  className={tokenColors[segment.token] || "text-foreground"}
                                >
                                  {segment.text}
                                </span>
                              ))}
                            </pre>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Performance Stats */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-accent tracking-widest uppercase mb-4">
              Performance
            </p>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight">
              Built for Production
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {nfrStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="glass-card-hover p-6 text-center group">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.description}</div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickStart;
