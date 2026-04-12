import { useState } from "react";
import { ArrowRightLeft, Globe, Zap, Coins } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const tabs = [
  {
    id: "transfer",
    label: "Transfer Adapter",
    sublabel: "Direct USDC",
    icon: ArrowRightLeft,
    description: "Send USDC directly between agent wallets with sub-second finality. No intermediaries, no wrapped tokens.",
    code: [
      { token: "keyword", text: "from " }, { token: "module", text: "omniclaw.protocols.transfer" }, { token: "keyword", text: " import " }, { token: "type", text: "TransferAdapter" }, { token: "plain", text: "\n\n" },
      { token: "variable", text: "adapter" }, { token: "plain", text: " = " }, { token: "type", text: "TransferAdapter" }, { token: "plain", text: "(\n  " },
      { token: "param", text: "network" }, { token: "plain", text: "=" }, { token: "string", text: '"base"' }, { token: "plain", text: ",\n  " },
      { token: "param", text: "token" }, { token: "plain", text: "=" }, { token: "string", text: '"USDC"' }, { token: "plain", text: "\n)\n" },
      { token: "variable", text: "tx" }, { token: "plain", text: " = adapter." }, { token: "function", text: "send" }, { token: "plain", text: "(\n  " },
      { token: "param", text: "to" }, { token: "plain", text: "=" }, { token: "string", text: '"0x7f3a...c9e1"' }, { token: "plain", text: ",\n  " },
      { token: "param", text: "amount" }, { token: "plain", text: "=" }, { token: "number", text: "0.50" }, { token: "plain", text: "\n)" },
    ],
    stats: [{ label: "Latency", value: "<400ms" }, { label: "Fee", value: "0.01%" }, { label: "Chains", value: "Base, Polygon, Arb" }],
  },
  {
    id: "x402",
    label: "x402 Adapter",
    sublabel: "Pay-Per-Use APIs",
    icon: Zap,
    description: "HTTP 402 native payments. Agents pay per API call with micropayments baked into the protocol layer.",
    code: [
      { token: "keyword", text: "from " }, { token: "module", text: "omniclaw.protocols.x402" }, { token: "keyword", text: " import " }, { token: "type", text: "X402Adapter" }, { token: "plain", text: "\n\n" },
      { token: "variable", text: "x402" }, { token: "plain", text: " = " }, { token: "type", text: "X402Adapter" }, { token: "plain", text: "(\n  " },
      { token: "param", text: "wallet" }, { token: "plain", text: "=" }, { token: "variable", text: "agent_wallet" }, { token: "plain", text: "\n)\n\n" },
      { token: "comment", text: "# Auto-pays on HTTP 402 response" }, { token: "plain", text: "\n" },
      { token: "variable", text: "response" }, { token: "plain", text: " = x402." }, { token: "function", text: "fetch" }, { token: "plain", text: "(\n  " },
      { token: "string", text: '"https://api.vendor.ai/generate"' }, { token: "plain", text: ",\n  " },
      { token: "param", text: "max_cost" }, { token: "plain", text: "=" }, { token: "number", text: "0.003" }, { token: "plain", text: "\n)" },
    ],
    stats: [{ label: "Protocol", value: "HTTP 402" }, { label: "Min Payment", value: "$0.0001" }, { label: "Standard", value: "x402 v1.2" }],
  },
  {
    id: "gateway",
    label: "Gateway Adapter",
    sublabel: "Cross-Chain CCTP",
    icon: Globe,
    description: "Bridge USDC across chains using Circle's CCTP. Atomic cross-chain settlement with built-in attestation verification.",
    code: [
      { token: "keyword", text: "from " }, { token: "module", text: "omniclaw.protocols.gateway" }, { token: "keyword", text: " import " }, { token: "type", text: "GatewayAdapter" }, { token: "plain", text: "\n\n" },
      { token: "variable", text: "gw" }, { token: "plain", text: " = " }, { token: "type", text: "GatewayAdapter" }, { token: "plain", text: "(\n  " },
      { token: "param", text: "source" }, { token: "plain", text: "=" }, { token: "string", text: '"ethereum"' }, { token: "plain", text: ",\n  " },
      { token: "param", text: "destination" }, { token: "plain", text: "=" }, { token: "string", text: '"base"' }, { token: "plain", text: "\n)\n" },
      { token: "variable", text: "bridge_tx" }, { token: "plain", text: " = gw." }, { token: "function", text: "bridge" }, { token: "plain", text: "(\n  " },
      { token: "param", text: "amount" }, { token: "plain", text: "=" }, { token: "number", text: "100.00" }, { token: "plain", text: ",\n  " },
      { token: "param", text: "recipient" }, { token: "plain", text: "=" }, { token: "string", text: '"0xab12...ef56"' }, { token: "plain", text: "\n)" },
    ],
    stats: [{ label: "Bridge Time", value: "~90s" }, { label: "Protocol", value: "CCTP v2" }, { label: "Chains", value: "8 supported" }],
  },
  {
    id: "nanopayments",
    label: "Nanopayments",
    sublabel: "EIP-3009 Micro-USDC",
    icon: Coins,
    description: "Gas-free sub-cent USDC via Circle Gateway batch settlement. Buyers sign EIP-712 authorizations; Circle batches and settles — economical at any scale.",
    code: [
      { token: "keyword", text: "from " }, { token: "module", text: "omniclaw.protocols.nanopayments" }, { token: "keyword", text: " import " }, { token: "type", text: "NanopaymentClient" }, { token: "plain", text: "\n\n" },
      { token: "variable", text: "nano" }, { token: "plain", text: " = " }, { token: "type", text: "NanopaymentClient" }, { token: "plain", text: "(\n  " },
      { token: "param", text: "wallet" }, { token: "plain", text: "=" }, { token: "variable", text: "agent_wallet" }, { token: "plain", text: ",\n  " },
      { token: "param", text: "gateway_address" }, { token: "plain", text: "=" }, { token: "string", text: '"0xCircle..."' }, { token: "plain", text: "\n)\n\n" },
      { token: "comment", text: "# EIP-712 signed, Circle batches settlement" }, { token: "plain", text: "\n" },
      { token: "variable", text: "auth" }, { token: "plain", text: " = " }, { token: "keyword", text: "await " }, { token: "variable", text: "nano" }, { token: "plain", text: "." }, { token: "function", text: "authorize" }, { token: "plain", text: "(\n  " },
      { token: "param", text: "to" }, { token: "plain", text: "=" }, { token: "string", text: '"0xSeller..."' }, { token: "plain", text: ",\n  " },
      { token: "param", text: "amount" }, { token: "plain", text: "=" }, { token: "string", text: '"0.00050"' }, { token: "plain", text: "\n)" },
    ],
    stats: [{ label: "Fee", value: "< $0.001" }, { label: "Standard", value: "EIP-3009" }, { label: "Settlement", value: "Circle Gateway" }],
  },
];

const tokenColors: Record<string, string> = {
  keyword: "text-accent", module: "text-foreground", type: "text-primary",
  variable: "text-foreground/90", plain: "text-foreground/70", string: "text-primary",
  number: "text-accent", param: "text-accent/80", function: "text-primary", comment: "text-muted-foreground",
};

const ProtocolSwitcher = () => {
  const [activeTab, setActiveTab] = useState("transfer");
  const active = tabs.find((t) => t.id === activeTab)!;
  const ActiveIcon = active.icon;

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">Adapters</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">One SDK. Every Rail.</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Swap payment protocols with a single config change. No rewrite required.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8 max-w-3xl mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-lg border transition-all duration-300 text-left ${
                    isActive ? "border-primary/40 bg-primary/5 border-glow-lime" : "border-border bg-card/30 hover:border-border hover:bg-card/50"
                  }`}
                >
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive ? "bg-primary/10" : "bg-muted"}`}>
                    <Icon size={18} className={`transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{tab.label}</div>
                    <div className="text-xs text-muted-foreground">{tab.sublabel}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="glass-card max-w-3xl mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ActiveIcon size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{active.label}</div>
                <div className="text-xs text-muted-foreground">{active.description}</div>
              </div>
            </div>
            <div className="p-6 border-b border-border">
              <div className="terminal-bg p-5">
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                  {active.code.map((segment, i) => (
                    <span key={i} className={tokenColors[segment.token] || "text-foreground"}>{segment.text}</span>
                  ))}
                </pre>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border">
              {active.stats.map((stat) => (
                <div key={stat.label} className="px-6 py-4 text-center">
                  <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-sm font-semibold text-foreground font-mono">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProtocolSwitcher;
