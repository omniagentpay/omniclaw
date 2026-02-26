import ScrollReveal from "./ScrollReveal";

const footerLinks = {
  Product: ["SDK", "Adapters", "Safety Kernel", "Dashboard", "Pricing"],
  Resources: ["Documentation", "API Reference", "Changelog", "Blog", "Community"],
  Company: ["About", "Careers", "Press", "Contact", "Partners"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
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
                <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">O</span>
                </div>
                <span className="font-display font-bold text-lg text-foreground tracking-tight">
                  OmniClaw
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Payment infrastructure for autonomous AI agents.
              </p>
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
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 OmniAgentPay, Inc. All rights reserved.
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
