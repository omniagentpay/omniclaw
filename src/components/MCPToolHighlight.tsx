import { Bot, User, Wrench, CheckCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const chatMessages = [
  { role: "user" as const, content: "Pay $4.99 to DataVendor for 500 API credits. Verify their trust score first." },
  { role: "assistant" as const, content: "I'll run a trust check on DataVendor, simulate the payment, then execute. Stand by." },
  {
    role: "tool" as const,
    name: "trust_lookup",
    content: {
      input: { agent_id: "did:erc8004:base:0xDataVendor..." },
      output: { wts: 0.87, tier: "verified", blocklisted: false, attestations: 12 },
    },
  },
  {
    role: "tool" as const,
    name: "simulate_payment",
    content: {
      input: { from_wallet_id: "wallet_abc", to: "0xDataVendor...", amount: "4.99", currency: "USDC" },
      output: { would_succeed: true, guard_checks: "all_passed", projected_balance: "45.01" },
    },
  },
  {
    role: "tool" as const,
    name: "pay",
    content: {
      input: { from_wallet_id: "wallet_abc", to: "0xDataVendor...", amount: "4.99", currency: "USDC", memo: "500 API credits" },
      output: { status: "confirmed", tx_hash: "0x7f3a...c9e1", balance_after: 45.01, guard_check: "all_gates_passed" },
    },
  },
  { role: "assistant" as const, content: "Done. DataVendor WTS 0.87 ✓, simulation passed ✓, payment of $4.99 USDC confirmed. Remaining budget: $45.01." },
];

const MCPToolHighlight = () => {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">MCP Integration</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">Payments as a Tool Call</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Connect OmniClaw to Claude, GPT, or any MCP-compatible agent. 16 agent-safe tools — trust lookup, simulate, pay, intents, ledger, and more.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="glass-card max-w-3xl mx-auto overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
              <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Bot size={16} className="text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Agent Session</div>
                <div className="text-xs text-muted-foreground">claude-3-5-sonnet · 16 MCP tools active</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-mono text-primary font-medium">CONNECTED</span>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {chatMessages.map((msg, i) => {
                if (msg.role === "user") {
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <User size={14} className="text-muted-foreground" />
                      </div>
                      <div className="bg-muted/50 rounded-lg px-4 py-3 text-sm text-foreground/90 max-w-[85%]">{msg.content}</div>
                    </div>
                  );
                }

                if (msg.role === "tool") {
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Wrench size={14} className="text-primary" />
                      </div>
                      <div className="terminal-bg rounded-lg overflow-hidden max-w-[85%] w-full">
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                          <span className="text-xs font-mono text-primary font-medium">{msg.name}</span>
                          <CheckCircle size={12} className="text-primary ml-auto" />
                        </div>
                        <div className="p-4 font-mono text-xs space-y-2">
                          <div className="text-muted-foreground">// Input</div>
                          {Object.entries(msg.content.input).map(([k, v]) => (
                            <div key={k} className="flex gap-2">
                              <span className="text-accent">{k}:</span>
                              <span className="text-foreground/80">{typeof v === "number" ? v : `"${v}"`}</span>
                            </div>
                          ))}
                          <div className="border-t border-border my-2 pt-2 text-muted-foreground">// Output</div>
                          {Object.entries(msg.content.output).map(([k, v]) => (
                            <div key={k} className="flex gap-2">
                              <span className="text-primary">{k}:</span>
                              <span className={k === "status" || k === "guard_check" || k === "would_succeed" || k === "tier" ? "text-primary" : "text-foreground/80"}>
                                {typeof v === "number" ? v : typeof v === "boolean" ? String(v) : `"${v}"`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={i} className="flex gap-3">
                    <div className="h-7 w-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-accent" />
                    </div>
                    <div className="text-sm text-foreground/80 max-w-[85%] leading-relaxed">{msg.content as string}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MCPToolHighlight;
