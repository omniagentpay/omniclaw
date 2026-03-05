import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";
import ScrollReveal from "@/components/ScrollReveal";

const Products = () => {
  const products = [
    {
      id: "omnicall",
      name: "OmniCall",
      tagline: "Revolutionary Voice Negotiation System",
      description:
        "Introducing OmniCall AI, a revolutionary voice negotiation system that operates autonomously through a swarm of eight agents. This cutting-edge technology eliminates the need for manual phone calls, streamlining the booking process into a single effortless command.",
      features: [
        "Autonomous swarm of 8 agents",
        "Voice negotiation capabilities",
        "One-command booking",
        "No manual intervention required",
        "Natural conversation flow",
      ],
    },
    {
      id: "omnicoreagent",
      name: "OmniCoreAgent",
      tagline: "Framework for building autonomous AI agents",
      description:
        "The brain for building production AI agents. It gives agents the ability to reason, use tools, remember context, and execute real-world tasks reliably.",
      features: [
        "Multi-tool integration",
        "Context memory management",
        "Real-world task execution",
        "Reliable reasoning engine",
        "Production-ready framework",
      ],
    },
    {
      id: "omnidaemon",
      name: "OmniDaemon",
      tagline: "Event-driven runtime for autonomous execution",
      description:
        "Event-driven runtime that runs agents automatically. It listens for events and triggers agents to act without human intervention. The engine that makes agents run autonomously.",
      features: [
        "Event-driven architecture",
        "Automatic agent triggering",
        "Asynchronous execution",
        "No human intervention needed",
        "Scalable event processing",
      ],
    },
    {
      id: "omnimemory",
      name: "OmniMemory",
      tagline: "Persistent memory system for AI agents",
      description:
        "Persistent memory system for AI agents. It stores context, history, knowledge, and state across Redis, databases, and vector stores. The memory layer that makes agents stateful and intelligent over time.",
      features: [
        "Context persistence",
        "Multi-backend support (Redis, databases, vector stores)",
        "Knowledge management",
        "Long-term state retention",
        "Intelligent recall system",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-6xl px-6 md:px-12">
          {/* Header */}
          <ScrollReveal>
            <div className="mb-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">OmniClaw Products</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comprehensive suite of AI agent infrastructure and governance solutions designed to empower
                enterprises with autonomous, controlled, and intelligent systems.
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
