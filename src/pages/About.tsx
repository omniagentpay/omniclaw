import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";

const About = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">About OmniClaw</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw empowers enterprises to harness autonomous AI agents with financial capabilities.
                We believe autonomous AI agents represent the next frontier in business automation, but they need
                robust, trustworthy infrastructure to handle money safely. Our mission is to provide the control
                plane and governance layer that sits between AI agents and the financial system.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">The Problem We Solve</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In 2026, corporate AI agents are predicted to handle $1 trillion in autonomous transactions
                in the US retail sector alone, with $30 trillion in the broader economy by 2030. Yet enterprises
                lack atomic controls over agent spending. Current solutions are either:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Too simple (generic payment wrappers without agent-specific guards)</li>
                <li>Too rigid (centralized approval workflows that kill autonomy)</li>
                <li>Too fragmented (no unified identity or reputation system for agents)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This creates a compliance nightmare and a missed opportunity for enterprises to unlock
                agent productivity safely.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Solution</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Guard Kernel</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Atomic spend controls that run in real-time. BudgetGuard, RateLimitGuard, RecipientGuard,
                    and ConfirmGuard form an immutable chain of validation. No partial execution. No edge cases.
                    Sub-12ms latency.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">ERC-8004 Trust Gate</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    On-chain agent identity and reputation. Every agent is verified against a Weighted Trust Score
                    built from verified feedback signals. Two-sided X402 payments enable agents to both pay and
                    receive funds with the same guard controls applied.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Enterprise Dashboard</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Real-time control plane. View live transaction flows, manage guard policies, approve high-value
                    payments through HITL workflows, and export immutable audit trails for compliance. Role-based
                    access for Risk Officers, Policy Admins, and Operators.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Revenue Model</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">1. Transaction Fees</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Basis points on USDC volume processed through our adapters (Transfer, X402, CCTP).
                    Free tier available for open-source frameworks and startups.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">2. Dashboard Licensing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Per-seat, per-month pricing for enterprise control plane access. Tiered by role:
                    Operator (view-only), Risk Officer (policy management), Policy Admin (full access).
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">3. Premium Add-ons</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Trust Gate + ERC-8004 RPC endpoints for high-value, regulated, and A2A use cases.
                    Custom pricing for enterprise deployments.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Market Opportunity</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">The timing is now:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Corporate AI Agent Market:</strong> $7.84B (2025) → $52.62B (2030) at 41% CAGR</li>
                <li><strong>X402 Adoption:</strong> 50M+ transactions, 500% YoY growth, adopted by Stripe, Cloudflare, Google</li>
                <li><strong>Agentic Commerce:</strong> $1T US retail by 2030, $30T autonomous transaction market by 2030</li>
                <li><strong>First Incidents Predicted:</strong> 2026 will see the first enterprise AI agent financial security incidents</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Why OmniClaw?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Three competitive advantages no other vendor has combined:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Guard Kernel:</strong> Atomic spend controls built into the infrastructure layer</li>
                <li><strong>ERC-8004 Integration:</strong> On-chain agent identity + reputation with 10-check Trust Gate</li>
                <li><strong>Enterprise Dashboard:</strong> HITL workflows, audit trails, and compliance export in one platform</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This creates a defensible moat: as more agents register on ERC-8004 and accumulate reputation signals,
                our platform becomes more valuable to enterprises. Network effects compound automatically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Want to learn more? Reach out to us:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>Email: contact@omniclaw.ai</p>
                <p>Phone: +1 (555) 0100</p>
                <p>OmniClaw, Inc.</p>
                <p>123 Crypto Lane</p>
                <p>San Francisco, CA 94105</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default About;
