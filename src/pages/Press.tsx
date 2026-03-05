import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";

const Press = () => {
  const releases = [
    {
      date: "March 6, 2026",
      title: "OmniClaw Launches First Production SDK for ERC-8004 Agent Identity Verification",
      excerpt: "Enterprise-grade payment infrastructure for autonomous AI agents now generally available. Integrates on-chain agent identity, atomic spend controls, and compliance dashboard.",
      link: "#",
    },
    {
      date: "February 15, 2026",
      title: "OmniClaw Raises $8M Seed Round Led by a16z",
      excerpt: "Institutional funding to build the governance and trust layer for autonomous AI agents. Participants include Sequoia, Paradigm, and leading agent framework founders.",
      link: "#",
    },
    {
      date: "January 20, 2026",
      title: "ERC-8004 Ratification: Ethereum Foundation Designates Agent Identity Standard",
      excerpt: "OmniClaw contributed 28 contract selectors to the ERC-8004 specification for trustless AI agent verification. Standard now deployed on Ethereum, Base, and Sepolia.",
      link: "#",
    },
  ];

  const mediaKit = [
    { title: "Logo (Dark)", format: "PNG, SVG" },
    { title: "Logo (Light)", format: "PNG, SVG" },
    { title: "Founder Photos", format: "High-res JPEG" },
    { title: "Product Screenshots", format: "PNG" },
    { title: "Architecture Diagrams", format: "PDF, PNG" },
  ];

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Press & Media</h1>
          
          <div className="mb-8 p-4 md:p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm">
            <p className="text-sm md:text-base font-semibold text-foreground mb-2">🚀 Coming Soon</p>
            <p className="text-sm md:text-base text-muted-foreground">
              Our press kit and media resources are being updated. For press inquiries, contact <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">contact@omniclaw.ai</a>.
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Latest News</h2>
              <div className="space-y-6">
                {releases.map((release, idx) => (
                  <div key={idx} className="border-l-2 border-primary pl-6 py-2">
                    <p className="text-xs text-muted-foreground font-mono mb-2">{release.date}</p>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{release.title}</h3>
                    <p className="text-muted-foreground mb-3">{release.excerpt}</p>
                    <a href={release.link} className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors">
                      Read Full Release →
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Media Kit</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Download our media kit with logos, photos, and product materials for journalists and bloggers.
              </p>
              <div className="space-y-3">
                {mediaKit.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card/30">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.format}</p>
                    </div>
                    <button className="text-primary hover:text-primary/80 text-sm font-semibold transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-sm">
                Download All (ZIP)
              </button>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Press Coverage</h2>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <p className="text-sm font-semibold text-foreground mb-1">Featured in</p>
                  <p className="text-muted-foreground text-sm">Cointelegraph, The Block, Crypto Briefing, Blockchain Council</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <p className="text-sm font-semibold text-foreground mb-1">Speaking Engagements</p>
                  <p className="text-muted-foreground text-sm">
                    Consensus 2026, ETHDenver, Ethereum Magicians, AI Agent Summit
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">For Journalists</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Interested in covering OmniClaw or interviewing our team? We're always excited to discuss
                the future of autonomous AI agents and the infrastructure they need.
              </p>
              <div className="bg-card/50 border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">Media Contact</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  <strong>Name:</strong> Sarah Chen<br />
                  <strong>Title:</strong> Head of Communications<br />
                  <strong>Email:</strong> <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">contact@omniclaw.ai</a><br />
                  <strong>Phone:</strong> +1 (555) 0101
                </p>
                <p className="text-muted-foreground text-sm mt-4">
                  Response time: 24 hours during business days. Media inquiries outside business hours
                  will be addressed the next business day.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Follow Us</h2>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</a>
              </div>
            </section>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default Press;
