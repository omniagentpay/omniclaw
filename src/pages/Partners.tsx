import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";

const Partners = () => {
  const partnerCategories = [
    {
      name: "AI Agent Frameworks",
      description: "Native integration with leading agentic AI frameworks",
      partners: ["LangChain", "AutoGen", "CrewAI", "OpenAI Swarm", "Claude SDK"],
    },
    {
      name: "Payment & Settlement Infrastructure",
      description: "Strategic partnerships with payment processors and blockchain networks",
      partners: ["Circle (USDC, CCTP)", "Stripe", "PayPal", "Base (Coinbase)", "Polygon"],
    },
    {
      name: "Enterprise & Compliance",
      description: "Integration with enterprise platforms and compliance tooling",
      partners: ["Fireblocks", "Copper", "Ledger Enterprise", "Chainalysis"],
    },
    {
      name: "Cloud & Infrastructure",
      description: "Infrastructure partners for global deployment and scaling",
      partners: ["AWS", "Google Cloud", "Cloudflare", "DataStax"],
    },
  ];

  const partnerships = [
    {
      title: "Technical Integration Partnership – LangChain",
      status: "Active",
      description:
        "OmniClaw is integrated as a native payment tool in LangChain. Agents built in LangChain can access pay, simulate, and manage intent operations directly.",
    },
    {
      title: "Cross-Ecosystem Agreement – Ethereum Foundation",
      status: "Active",
      description:
        "OmniClaw contributed to ERC-8004 standardization. We participate in Ethereum Magicians working group for agent infrastructure.",
    },
    {
      title: "Go-to-Market Partnership – Anthropic",
      status: "Active",
      description:
        "Claude agents enabled with OmniClaw. Joint marketing and developer community engagement.",
    },
    {
      title: "Technology Partnership – Circle",
      status: "Active",
      description:
        "Native USDC and CCTP integration. OmniClaw is a recommended solution for agent payments in Circle's documentation.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Partners & Integrations</h1>
          
          <div className="mb-8 p-4 md:p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm">
            <p className="text-sm md:text-base font-semibold text-foreground mb-2">🚀 Coming Soon</p>
            <p className="text-sm md:text-base text-muted-foreground">
              New partnerships and integrations are being announced. Interested in partnering? Contact <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">contact@omniclaw.ai</a>.
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Ecosystem</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw works best as part of a larger ecosystem. We've built integrations and partnerships
                with the leading frameworks, payment networks, and infrastructure providers that enterprises
                rely on to build and run autonomous AI agents.
              </p>
            </section>

            {partnerCategories.map((category, idx) => (
              <section key={idx}>
                <h2 className="text-2xl font-semibold text-foreground mb-4">{category.name}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-3">
                  {category.partners.map((partner, pidx) => (
                    <span
                      key={pidx}
                      className="inline-block px-4 py-2 rounded-lg border border-border bg-card/30 text-sm text-foreground font-semibold"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Active Partnerships</h2>
              <div className="space-y-6">
                {partnerships.map((partnership, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-6 bg-card/30">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{partnership.title}</h3>
                      </div>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-md">
                        {partnership.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{partnership.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Partnership Opportunities</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Are you interested in partnering with OmniClaw? We're always open to discussions around:
              </p>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li><strong>Technical Integrations:</strong> Native support in frameworks, platforms, and tools</li>
                <li><strong>Go-to-Market:</strong> Joint customer development and co-marketing initiatives</li>
                <li><strong>Ecosystem Development:</strong> Standards work and community collaboration</li>
                <li><strong>Reseller / Channel:</strong> Become a reseller or channel partner for enterprise contracts</li>
                <li><strong>Investment / Funding:</strong> Strategic investors and institutional partnerships</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Become a Partner</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you'd like to explore a partnership with OmniClaw, reach out to us:
              </p>
              <div className="border border-border rounded-lg p-6 bg-card/30">
                <p className="text-muted-foreground">
                  <strong>Email:</strong> <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">contact@omniclaw.ai</a>
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Response Time:</strong> 24-48 hours
                </p>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  Please include information about your organization, the type of partnership you're interested in,
                  and how you think OmniClaw and your organization can create value together.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How to Use OmniClaw</h2>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <h3 className="font-semibold text-foreground mb-2">For Developers</h3>
                  <p className="text-muted-foreground text-sm">
                    Integrate the free OmniClaw SDK into your agent framework. Documentation available on GitHub.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <h3 className="font-semibold text-foreground mb-2">For Frameworks</h3>
                  <p className="text-muted-foreground text-sm">
                    Add OmniClaw as a native tool or integration in your framework's payment capabilities.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <h3 className="font-semibold text-foreground mb-2">For Enterprises</h3>
                  <p className="text-muted-foreground text-sm">
                    Deploy the enterprise dashboard for real-time control. Contact sales for custom integration.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default Partners;
