import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";

const Contact = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Contact Us</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Have questions about OmniClaw? Want to discuss partnerships or explore enterprise options?
                We'd love to hear from you. Choose the right contact below based on your needs.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* General Inquiry */}
              <div className="border border-border rounded-lg p-6 bg-card/30">
                <h2 className="text-xl font-semibold text-foreground mb-4">General Inquiry</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Questions about OmniClaw, how we can help your organization, or general feedback.
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    <strong>Email:</strong><br />
                    <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">
                      contact@omniclaw.ai
                    </a>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>Response Time:</strong> 24-48 hours
                  </p>
                </div>
              </div>

              {/* Sales & Enterprise */}
              <div className="border border-border rounded-lg p-6 bg-card/30">
                <h2 className="text-xl font-semibold text-foreground mb-4">Sales & Enterprise</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Enterprise dashboard, custom deployment, high-volume pricing, and integration support.
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    <strong>Email:</strong><br />
                    <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">
                      contact@omniclaw.ai
                    </a>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>Phone:</strong> +1 (555) 0102
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>Response Time:</strong> 4 hours during business hours
                  </p>
                </div>
              </div>

              {/* Developer Support */}
              <div className="border border-border rounded-lg p-6 bg-card/30">
                <h2 className="text-xl font-semibold text-foreground mb-4">Developer Support</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  SDK implementation, API questions, documentation, and technical guidance.
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    <strong>Email:</strong><br />
                    <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">
                      contact@omniclaw.ai
                    </a>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>Discord:</strong> Join our dev community
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>Response Time:</strong> 6-12 hours
                  </p>
                </div>
              </div>

              {/* Security & Compliance */}
              <div className="border border-border rounded-lg p-6 bg-card/30">
                <h2 className="text-xl font-semibold text-foreground mb-4">Security & Compliance</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Security vulnerabilities, compliance audits, SOC 2 documentation, and incident reports.
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    <strong>Email:</strong><br />
                    <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">
                      contact@omniclaw.ai
                    </a>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>PGP Key:</strong> Available on request
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>Response Time:</strong> 4 hours
                  </p>
                </div>
              </div>

              {/* Partnerships */}
              <div className="border border-border rounded-lg p-6 bg-card/30">
                <h2 className="text-xl font-semibold text-foreground mb-4">Partnerships</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Strategic partnerships, integrations, framework collaborations, and ecosystem growth.
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    <strong>Email:</strong><br />
                    <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">
                      contact@omniclaw.ai
                    </a>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>Response Time:</strong> 24-48 hours
                  </p>
                </div>
              </div>

              {/* Careers */}
              <div className="border border-border rounded-lg p-6 bg-card/30">
                <h2 className="text-xl font-semibold text-foreground mb-4">Careers</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Job applications, early talent programs, and internship inquiries.
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    <strong>Email:</strong><br />
                    <a href="mailto:contact@omniclaw.ai" className="text-primary hover:text-primary/80">
                      contact@omniclaw.ai
                    </a>
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <strong>View Openings:</strong> See our careers page
                  </p>
                </div>
              </div>
            </div>

            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Office Location</h2>
              <div className="border border-border rounded-lg p-8 bg-card/30">
                <h3 className="text-lg font-semibold text-foreground mb-4">San Francisco Headquarters</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>OmniClaw, Inc.</p>
                  <p>123 Crypto Lane</p>
                  <p>San Francisco, CA 94105</p>
                  <p className="mt-4">
                    <strong>Hours:</strong> Monday–Friday, 9:00 AM – 6:00 PM PT
                  </p>
                  <p className="mt-4">
                    <em>We're remote-friendly. Most team members work from distributed locations.</em>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Social & Community</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Connect with us and the OmniClaw community:
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Twitter →
                </a>
                <a href="#" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  GitHub →
                </a>
                <a href="#" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Discord →
                </a>
                <a href="#" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  LinkedIn →
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

export default Contact;
