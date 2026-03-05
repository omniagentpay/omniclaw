import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";

const Careers = () => {
  const positions = [
    {
      title: "Senior Smart Contract Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Build and audit ERC-8004 smart contracts. Experience with formal verification required.",
    },
    {
      title: "Backend Engineer (Python/TypeScript)",
      department: "Engineering",
      location: "San Francisco, CA (Remote OK)",
      type: "Full-time",
      description: "Build payment processing, guard kernel validation, and settlement services.",
    },
    {
      title: "Product Manager, Enterprise",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Own the enterprise dashboard roadmap. Drive adoption with Fortune 500 customers.",
    },
    {
      title: "Security Engineer",
      department: "Security",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Threat modeling, penetration testing, incident response. Led SOC 2 Type II certification.",
    },
    {
      title: "DevOps / Infrastructure Engineer",
      department: "Engineering",
      location: "San Francisco, CA (Remote OK)",
      type: "Full-time",
      description: "Build global payment infrastructure with sub-400ms settlement. Kubernetes, monitoring, DDoS mitigation.",
    },
    {
      title: "BD / Strategic Partnerships",
      department: "Business Development",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Partner with LangChain, Anthropic, OpenAI, and enterprise frameworks. Build the ecosystem.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Careers at OmniClaw</h1>
          
          <div className="mb-8 p-4 md:p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm">
            <p className="text-sm md:text-base font-semibold text-foreground mb-2">🚀 Coming Soon</p>
            <p className="text-sm md:text-base text-muted-foreground">
              We're building our careers page. In the meantime, if you're interested in joining OmniClaw, reach out to <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">contact@omniclaw.ai</a>.
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Join Our Team</h2>
              <p className="text-muted-foreground leading-relaxed">
                We're building the control plane for autonomous AI agents. We're looking for talented engineers,
                product managers, and operators who believe the future is agents + money. We offer competitive
                compensation, equity, healthcare, and the chance to shape the agent economy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Current Openings</h2>
              <div className="space-y-6">
                {positions.map((pos, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-6 bg-card/30">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{pos.title}</h3>
                        <p className="text-sm text-muted-foreground">{pos.department}</p>
                      </div>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-md">
                        {pos.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{pos.location}</p>
                    <p className="text-muted-foreground leading-relaxed">{pos.description}</p>
                    <button className="mt-4 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Why OmniClaw?</h2>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li><strong>Timing:</strong> You're building at the inflection point of autonomous AI agents</li>
                <li><strong>Impact:</strong> Your work enables $1T+ in autonomous transactions by 2030</li>
                <li><strong>Technical Depth:</strong> Cryptography, smart contracts, distributed systems, real-time payment settlement</li>
                <li><strong>Team:</strong> Founded by entrepreneurs who've shipped at scale before</li>
                <li><strong>Equity:</strong> Meaningful ownership that compounds as we grow</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Culture</h2>
              <p className="text-muted-foreground leading-relaxed">
                We value clarity, speed, and technical rigor. We ship to production, not to committees.
                We test everything that touches money. We believe in async communication and deep work.
                We're remote-friendly but have an office in San Francisco for those who want it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Apply Now</h2>
              <p className="text-muted-foreground leading-relaxed">
                Interested in joining us? Send your resume and a brief note about why you're excited about
                OmniClaw to:
              </p>
              <div className="mt-4">
                <a
                  href="mailto:contact@omniclaw.ai"
                  className="text-primary hover:text-primary/80 transition-colors font-semibold"
                >
                  contact@omniclaw.ai
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default Careers;
