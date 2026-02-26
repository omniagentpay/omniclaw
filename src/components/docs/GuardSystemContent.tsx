import { Copy, Check, Shield, Clock, CheckCircle, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GuardVisualizer from "./GuardVisualizer";

interface GuardCard {
  name: string;
  icon: React.ReactNode;
  description: string;
  code: string;
  color: string;
}

const guards: GuardCard[] = [
  {
    name: "Budget Guard",
    icon: <Shield className="h-6 w-6" />,
    description: "Enforces spending limits over time windows. Prevents exceeding daily, hourly, or lifetime budgets with atomic guarantees.",
    code: `# Budget: $50/day, $10/hour, $1000 lifetime
await client.add_budget_guard(
    wallet.id,
    daily_limit="50.00",
    hourly_limit="10.00",
    total_limit="1000.00"
)`,
    color: "#10b981",
  },
  {
    name: "Rate Limit Guard",
    icon: <Clock className="h-6 w-6" />,
    description: "Prevents transaction flooding by limiting the number of transactions per time window. Essential for preventing rapid-fire attacks.",
    code: `# Rate: Max 5 tx/min, 20 tx/hour
await client.add_rate_limit_guard(
    wallet.id,
    max_per_minute=5,
    max_per_hour=20
)`,
    color: "#10b981",
  },
  {
    name: "Single Transaction Guard",
    icon: <CheckCircle className="h-6 w-6" />,
    description: "Caps individual payment amounts with min/max limits. Prevents both micro-transactions and oversized payments.",
    code: `# Transaction size: $0.50 - $100
await client.add_single_tx_guard(
    wallet.id,
    max_amount="100.00",
    min_amount="0.50"
)`,
    color: "#10b981",
  },
  {
    name: "Recipient Guard",
    icon: <Shield className="h-6 w-6" />,
    description: "Controls who can receive payments through whitelist/blacklist modes. Supports addresses, domains, and pattern matching.",
    code: `# Whitelist recipients
await client.add_recipient_guard(
    wallet.id,
    mode="whitelist",
    addresses=["0xVendor1...", "0xVendor2..."],
    domains=["api.openai.com", "anthropic.com"]
)`,
    color: "#10b981",
  },
  {
    name: "Confirm Guard",
    icon: <CheckCircle className="h-6 w-6" />,
    description: "Human-in-the-loop approval for high-value transactions. Requires explicit confirmation above a threshold amount.",
    code: `# Human approval for >$500
await client.add_confirm_guard(
    wallet.id,
    threshold="500.00"
)`,
    color: "#10b981",
  },
  {
    name: "Simulation",
    icon: <Zap className="h-6 w-6" />,
    description: "Dry-run mode that validates transactions without execution. Returns predicted outcomes and guard check results.",
    code: `sim = await client.simulate(
    wallet_id=wallet.id,
    recipient="0x...",
    amount="1000000.00"
)
if not sim.would_succeed:
    print(f"Blocked: {sim.reason}")`,
    color: "#f59e0b",
  },
];

const GuardSystemContent = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <article className="max-w-none">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 tracking-tight font-display text-foreground">
          Guard System
        </h1>
        <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl">
          OmniClaw's multi-layered security system protects every payment with configurable
          guards that enforce budgets, rate limits, and recipient validation.
        </p>
      </div>

      {/* Guard Visualizer */}
      <GuardVisualizer />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
        {guards.map((guard, index) => (
          <div
            key={guard.name}
            className="border border-border/20 rounded-lg bg-card/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 hover:border-border/40 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div
                className="p-2 sm:p-2.5 md:p-3 rounded-lg shrink-0"
                style={{ backgroundColor: `${guard.color}15` }}
              >
                <div style={{ color: guard.color }} className="h-5 w-5 sm:h-6 sm:w-6">
                  {guard.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2 font-display text-foreground">
                  {guard.name}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                  {guard.description}
                </p>
              </div>
            </div>

            {/* Configuration Code */}
            <div className="relative mt-6">
              <div className="bg-obsidian-light border border-border/20 rounded-lg p-4 overflow-x-auto">
                <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  <code className="text-foreground/90">{guard.code}</code>
                </pre>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-7 w-7 p-0"
                onClick={() => copyToClipboard(guard.code, index)}
              >
                {copiedIndex === index ? (
                  <Check className="h-3.5 w-3.5" style={{ color: guard.color }} />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="mt-12 border-t border-border/20 pt-12">
        <h2 className="text-3xl font-bold mb-6 font-display tracking-tight text-foreground">
          How It Works
        </h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#10b981]/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-[#10b981]">1</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Request Received
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                When a payment request arrives, it enters the guard pipeline. Each guard evaluates
                the request sequentially, checking against its configured rules.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#10b981]/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-[#10b981]">2</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Guard Evaluation
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Budget Guard checks spending limits, Velocity Guard enforces rate limits,
                Whitelist Guard validates recipient addresses. If any guard blocks the request,
                the payment is immediately rejected.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f59e0b]/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-[#f59e0b]">3</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Simulation (Optional)
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Before execution, the Simulation Guard performs a dry-run validation. This
                predicts outcomes without committing funds, useful for testing and debugging.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#10b981]/20 flex items-center justify-center">
              <span className="text-sm font-semibold text-[#10b981]">4</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Execution or Block
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                If all guards pass, the payment proceeds to execution. The transaction is
                recorded in the OmniClaw Ledger with full audit trail. Blocked payments
                return detailed error information for debugging.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mt-12 border-t border-border/20 pt-12">
        <h2 className="text-3xl font-bold mb-6 font-display tracking-tight text-foreground">
          Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-border/20 rounded-lg p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Layered Defense
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Use multiple guards in combination. Budget Guard prevents overspending,
              while Velocity Guard stops rapid attacks. Whitelist Guard ensures only
              trusted recipients receive payments.
            </p>
          </div>

          <div className="border border-border/20 rounded-lg p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Start Strict, Relax Gradually
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Begin with conservative limits and whitelists. As you gain confidence
              in your system, gradually expand budgets and recipient lists based on
              observed patterns.
            </p>
          </div>

          <div className="border border-border/20 rounded-lg p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Monitor and Adjust
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Regularly review guard logs and blocked transactions. Use Simulation Guard
              to test changes before applying them to production wallets.
            </p>
          </div>

          <div className="border border-border/20 rounded-lg p-6 bg-card/50">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Agent-Specific Rules
            </h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Configure guards per wallet or agent. Different agents may have different
              risk profiles and should have tailored guard configurations.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default GuardSystemContent;
