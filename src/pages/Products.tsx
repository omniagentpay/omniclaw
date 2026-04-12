import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";
import MeshBackground from "@/components/MeshBackground";

const Products = () => {
  const products = [
    {
      id: "sdk",
      name: "OmniClaw SDK",
      tagline: "Three lines to add payments to any agent",
      badge: "Core",
      badgeColor: "bg-primary/10 text-primary",
      description:
        "The Python SDK that is the heart of OmniClaw. One import, one client, one `pay()` call. Integrates with any agent framework — LangChain, AutoGen, CrewAI, or custom — without blockchain complexity or private key management.",
      features: [
        "pip install omniclaw — zero blockchain setup",
        "Auto-routed across Transfer, x402, CCTP, Nanopayments",
        "Atomic Guard Kernel with 5 configurable guards",
        "ERC-8004 Trust Gate for on-chain agent identity checks",
        "Payment Intents with authorize/capture (HITL) flow",
        "Built-in ledger, idempotency, circuit breaker & retry",
      ],
    },
    {
      id: "mcp-server",
      name: "MCP Server",
      tagline: "16 agent-safe tools over stateless HTTP MCP",
      badge: "Integration",
      badgeColor: "bg-accent/10 text-accent",
      description:
        "A FastAPI + FastMCP server that wraps the SDK for LLM agent runtimes. Agents get a safe, read-only-constrained toolset — they can pay, simulate, and check balances, but they cannot modify their own guardrails.",
      features: [
        "16 agent-safe tools (pay, simulate, batch_pay, trust_lookup, …)",
        "Stateless HTTP transport — works with Claude Desktop, Cursor, Windsurf",
        "Bearer-token / JWT authentication out of the box",
        "Guard settings controlled by operator env vars, not the agent",
        "Circle webhook route for real-time settlement events",
        "Docker + Cloud Run deployment out of the box",
      ],
    },
    {
      id: "guard-kernel",
      name: "Guard Kernel",
      tagline: "Atomic spend controls for every transaction",
      badge: "Security",
      badgeColor: "bg-purple-500/10 text-purple-400",
      description:
        "The five-guard atomic pipeline that sits in front of every payment. All guards use reserve/commit/release (2-phase commit), so a failed payment never permanently burns your budget.",
      features: [
        "BudgetGuard — daily, hourly, and lifetime rolling windows",
        "RateLimitGuard — max transactions per minute/hour/day",
        "SingleTxGuard — per-transaction min/max amount ceiling",
        "RecipientGuard — whitelist/blacklist with address, regex, domain",
        "ConfirmGuard — HITL approval above configurable threshold",
        "Per-wallet or per-wallet-set guard binding",
      ],
    },
    {
      id: "trust-gate",
      name: "ERC-8004 Trust Gate",
      tagline: "On-chain agent identity + reputation for every payment",
      badge: "Identity",
      badgeColor: "bg-yellow-500/10 text-yellow-400",
      description:
        "The first production integration of ERC-8004 (Trustless Agents standard). Evaluates every recipient's on-chain identity and Weighted Trust Score through a 10-checkpoint pipeline before the guard chain runs.",
      features: [
        "Identity Registry (ERC-721 ext) — deployed on ETH mainnet & Base",
        "Reputation Registry — feedback signals with verified submitter boost",
        "WTS (Weighted Trust Score) — recency decay, self-review filter",
        "10-check policy: blocklist → whitelist → identity → fraud tags → WTS",
        "Configurable presets: permissive / standard / strict",
        "Results cached in StorageBackend (Redis or memory) with TTL",
      ],
    },
    {
      id: "nanopayments",
      name: "Nanopayments (EIP-3009)",
      tagline: "Gas-free micro-USDC via Circle Gateway batch settlement",
      badge: "Protocol",
      badgeColor: "bg-blue-500/10 text-blue-400",
      description:
        "The Circle Gateway EIP-3009 adapter enables sub-cent USDC transfers without gas costs. Buyers sign a `TransferWithAuthorization` (EIP-712), Circle batches and settles — making API metering economical at any scale.",
      features: [
        "EIP-3009 TransferWithAuthorization signing (domain: GatewayWalletBatched)",
        "Auto-routes amounts below nanopayments_micro_threshold",
        "Seller-side GatewayMiddleware — FastAPI Depends() in 3 lines",
        "Auto-topup: wallet deposits to gateway when balance drops below threshold",
        "Withdraw to Circle Developer Wallet or cross-chain via CCTP",
        "Full 2-sided: agents pay AND receive through the same infrastructure",
      ],
    },
    {
      id: "enterprise-dashboard",
      name: "Enterprise Dashboard",
      tagline: "Real-time control plane with audit trail and HITL workflows",
      badge: "Enterprise",
      badgeColor: "bg-orange-500/10 text-orange-400",
      description:
        "The operator-facing control surface. Set policy, manage guard configurations, review HITL confirmation queues, export compliance reports, and monitor the full ledger — all without touching agent code.",
      features: [
        "Real-time ledger — every transaction with agent identity + policy ref",
        "HITL approval queue with ConfirmGuard integration",
        "Policy management — create/update guard configs per wallet or set",
        "Compliance export — audit trail for CLARITY Act / Travel Rule alignment",
        "Circuit breaker status and resilience monitoring",
        "Webhook dedup + replay protection for production deployments",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      <MeshBackground />
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-6 md:px-12">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">The OmniClaw Suite</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The full spend-control and payment infrastructure stack for AI agents — from a three-line SDK
                to an enterprise-grade control plane with on-chain identity and HITL compliance.
              </p>
            </div>
          </ScrollReveal>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {products.map((product) => (
              <ScrollReveal key={product.id}>
                <div className="group relative p-8 rounded-2xl border border-glass-border bg-card/40 hover:bg-card/60 transition-all duration-300 hover:border-primary/50">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Badge */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                    {/* Product Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{product.name}</h2>
                    <p className="text-primary font-semibold mb-4">{product.tagline}</p>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <svg
                              className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors duration-200 text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Integration Section */}
          <ScrollReveal>
            <div className="rounded-2xl border border-glass-border bg-card/40 p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Unified Integration</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                All OmniClaw products work seamlessly together with our payment infrastructure, providing
                a complete solution for autonomous AI agent governance and financial control.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="btn-shimmer rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110">
                  Get Started Free
                </button>
                <button className="rounded-lg border border-primary/50 px-6 py-3 font-semibold text-foreground hover:bg-primary/10 transition-colors duration-200">
                  View Documentation
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Products;
