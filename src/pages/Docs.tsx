import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Search, Menu, Terminal, Shield, Wrench, BookOpen,
  Code2, ChevronRight, ExternalLink,
} from "lucide-react";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsContent from "@/components/docs/DocsContent";
import PayReferenceContent from "@/components/docs/PayReferenceContent";
import GuardSystemContent from "@/components/docs/GuardSystemContent";
import MCPIntegrationContent from "@/components/docs/MCPIntegrationContent";
import DocsTOC from "@/components/docs/DocsTOC";
import DocsFeedback from "@/components/docs/DocsFeedback";
import {
  CommandDialog, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem,
} from "@/components/ui/command";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// ── Landing hero ────────────────────────────────────────────
const landingCards = [
  {
    icon: Terminal,
    title: "Quickstart",
    description: "Three lines to add payments to any agent. Running in 5 minutes.",
    link: "/docs/quickstart",
    cta: "Get started",
    colorClass: "text-primary border-primary/20 hover:border-primary/50 hover:bg-primary/5",
  },
  {
    icon: Wrench,
    title: "MCP Tools",
    description: "16 agent-safe tools over stateless HTTP MCP. Works with any LLM.",
    link: "/docs/mcp-integration",
    cta: "Explore tools",
    colorClass: "text-accent border-accent/20 hover:border-accent/50 hover:bg-accent/5",
  },
  {
    icon: Shield,
    title: "Guard Kernel",
    description: "5 atomic guards: budget, rate, recipient, single-tx, and HITL confirm.",
    link: "/docs/payment-guards",
    cta: "Configure guards",
    colorClass: "text-purple-400 border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/5",
  },
  {
    icon: BookOpen,
    title: "API Reference",
    description: "Full reference for pay(), trust_lookup(), create_agent_wallet() and more.",
    link: "/docs/api-reference/pay",
    cta: "View reference",
    colorClass: "text-orange-400 border-orange-500/20 hover:border-orange-500/50 hover:bg-orange-500/5",
  },
];

const DocsLandingHero = ({ onNavigate }: { onNavigate: (url: string) => void }) => (
  <div>
    {/* Hero header */}
    <div className="mb-8 pb-8 border-b border-border">
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
          v1.0.0 · Stable
        </span>
        <span className="text-xs text-muted-foreground border border-border/60 rounded-full px-2.5 py-1">Python 3.10+</span>
        <span className="text-xs text-muted-foreground border border-border/60 rounded-full px-2.5 py-1">Circle Wallets</span>
        <span className="text-xs text-muted-foreground border border-border/60 rounded-full px-2.5 py-1">ERC-8004</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3 font-display">
        OmniClaw Documentation
      </h1>
      <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
        The complete reference for adding secure, controlled payments to AI agents —
        from a three-line SDK quickstart to enterprise HITL compliance and on-chain trust verification.
      </p>
    </div>

    {/* Install snippet */}
    <div className="mb-8 flex flex-wrap items-center gap-3 px-4 py-3 rounded-lg bg-muted/20 border border-border font-mono text-sm w-fit">
      <span className="text-primary select-none">$</span>
      <span className="text-foreground">pip install omniclaw</span>
      <span className="hidden sm:block text-muted-foreground text-xs pl-4 border-l border-border">
        # Zero blockchain setup · Circle API key only
      </span>
    </div>

    {/* Quick nav cards */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
      {landingCards.map((card) => {
        const Icon = card.icon;
        return (
          <button
            key={card.link}
            onClick={() => onNavigate(card.link)}
            className={`group text-left p-5 rounded-xl border bg-card/30 transition-all duration-200 ${card.colorClass}`}
          >
            <Icon className="h-5 w-5 mb-3" />
            <div className="font-semibold text-foreground text-sm mb-1.5">{card.title}</div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{card.description}</p>
            <span className="text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              {card.cta} <ChevronRight className="h-3 w-3" />
            </span>
          </button>
        );
      })}
    </div>

    {/* Feature highlights */}
    <div className="grid sm:grid-cols-3 gap-4 p-6 rounded-xl bg-muted/10 border border-border">
      {[
        { label: "16 MCP tools", desc: "trust_lookup, simulate, pay, batch, intents, ledger" },
        { label: "5 atomic guards", desc: "All checks run in < 12ms before any transaction" },
        { label: "ERC-8004 on-chain", desc: "28 keccak256-verified selectors, ETH + Base + Sepolia" },
      ].map((f) => (
        <div key={f.label} className="text-center">
          <div className="text-sm font-semibold text-foreground mb-1">{f.label}</div>
          <div className="text-xs text-muted-foreground">{f.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

// ── Search groups ──────────────────────────────────────────
const searchGroups: Record<string, Array<{ title: string; url: string }>> = {
  "Getting Started": [
    { title: "Quickstart", url: "/docs/quickstart" },
    { title: "Core Concepts", url: "/docs/core-concepts" },
  ],
  "Wallets & Payments": [
    { title: "Wallets Overview", url: "/docs/wallets" },
    { title: "Payment Guards", url: "/docs/payment-guards" },
  ],
  "Protocols": [
    { title: "MCP Integration (16 tools)", url: "/docs/mcp-integration" },
    { title: "Nanopayments (EIP-3009)", url: "/docs/nanopayments" },
    { title: "Cross-chain CCTP", url: "/docs/cctp" },
  ],
  "Security": [
    { title: "Trust Gate (ERC-8004)", url: "/docs/trust-gate" },
    { title: "10-Check Pipeline", url: "/docs/trust-gate/pipeline" },
    { title: "Weighted Trust Score (WTS)", url: "/docs/trust-gate/wts" },
    { title: "Policy Reference", url: "/docs/policy-reference" },
  ],
  "Production": [
    { title: "Production Hardening", url: "/docs/production" },
    { title: "Circuit Breaker", url: "/docs/production/circuit-breaker" },
    { title: "Idempotency", url: "/docs/production/idempotency" },
  ],
  "API Reference": [
    { title: "client.pay()", url: "/docs/api-reference/pay" },
    { title: "create_agent_wallet()", url: "/docs/api-reference/wallet" },
    { title: "trust_lookup()", url: "/docs/api-reference/trust" },
  ],
};

// ── Main component ─────────────────────────────────────────
const Docs = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/docs";

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const renderContent = () => {
    const path = location.pathname;
    if (isLanding) return <DocsLandingHero onNavigate={(url) => navigate(url)} />;
    if (path === "/docs/api-reference/pay") return <PayReferenceContent />;
    if (path === "/docs/payment-guards") return <GuardSystemContent />;
    if (path === "/docs/mcp-integration") return <MCPIntegrationContent />;
    return <DocsContent />;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Top Header ───────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto">

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden p-1.5 rounded-md hover:bg-accent transition-colors shrink-0">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-background border-r border-border">
              <DocsSidebar />
            </SheetContent>
          </Sheet>

          {/* Logo + breadcrumb */}
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-black">OC</span>
              </div>
              <span className="text-sm font-semibold text-foreground hidden sm:block group-hover:text-primary transition-colors">
                OmniClaw
              </span>
            </Link>
            <span className="text-border/60 hidden sm:block select-none text-lg font-thin">/</span>
            <span className="text-sm text-muted-foreground hidden sm:block">Docs</span>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-primary/10 text-primary border border-primary/20 ml-0.5">
              v1.0.0
            </span>
          </div>

          {/* Search — takes centre space */}
          <div className="flex-1 flex justify-center px-3 sm:px-6">
            <button
              onClick={() => setOpen(true)}
              className="flex h-9 w-full max-w-lg items-center gap-2 rounded-lg border border-border bg-muted/20 px-3 text-sm text-muted-foreground hover:border-primary/40 hover:bg-muted/40 transition-all"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1 text-left truncate hidden xs:block">Search documentation...</span>
              <kbd className="hidden sm:flex h-5 items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted-foreground shrink-0">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 opacity-40" />
            </a>
            <Link
              to="/developer"
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-primary text-black rounded-md hover:brightness-110 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Three-column layout ───────────────────────────── */}
      <div className="flex max-w-screen-2xl mx-auto">

        {/* Left sidebar */}
        <aside className="hidden lg:block w-60 xl:w-64 shrink-0 border-r border-border sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <DocsSidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 sm:px-8 md:px-10 lg:px-12 py-10 max-w-4xl mx-auto">
          {renderContent()}
          {!isLanding && (
            <div className="mt-16 pt-8 border-t border-border">
              <DocsFeedback />
            </div>
          )}
        </main>

        {/* Right TOC */}
        <aside className="hidden xl:block w-56 2xl:w-60 shrink-0 border-l border-border sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-5 py-8">
          <DocsTOC />
        </aside>
      </div>

      {/* ── Command palette ───────────────────────────────── */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(searchGroups).map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((item) => (
                <CommandItem
                  key={item.url}
                  onSelect={() => {
                    navigate(item.url);
                    setOpen(false);
                  }}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default Docs;
