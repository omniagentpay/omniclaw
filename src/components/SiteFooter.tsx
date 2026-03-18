import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const footerLinks = {
  Features: ["SDK", "Adapters", "Safety Kernel", "Dashboard", "Pricing"],
  Resources: ["Documentation", "API Reference", "Changelog", "Blog", "Community"],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
    { label: "Partners", href: "/partners" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

const SiteFooter = () => {
  return (
    <footer className="border-t border-glass-border bg-background/30 backdrop-blur-xl">
      <ScrollReveal>
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="OmniClaw logo" className="h-7 w-7 rounded-md" />
                <span className="font-display font-bold text-lg text-foreground tracking-tight">
                  OmniClaw
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Payment infrastructure for autonomous AI agents.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Contact</p>
                  <a href="mailto:contact@omniclaw.ai" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    contact@omniclaw.ai
                  </a>
                  <br />
                  <a href="tel:+1-555-0100" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    +1 (555) 0100
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground mb-1">Address</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    123 Crypto Lane<br />
                    San Francisco, CA 94105<br />
                    United States
                  </p>
                </div>
              </div>

              {/* System Status */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card/40">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground font-mono">All Systems Operational</span>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-foreground mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => {
                    const linkKey = typeof link === "string" ? link : link.label;
                    const linkHref = typeof link === "string" ? "#" : link.href;
                    const isInternal = typeof link === "object" && link.href.startsWith("/");
                    
                    return (
                      <li key={linkKey}>
                        {isInternal ? (
                          <Link
                            to={linkHref}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                          >
                            {linkKey}
                          </Link>
                        ) : (
                          <a
                            href={linkHref}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                          >
                            {linkKey}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 OmniClaw, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default SiteFooter;
