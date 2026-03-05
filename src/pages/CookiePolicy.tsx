import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";

const CookiePolicy = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: March 6, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small pieces of data stored on your browser or device that allow websites to
                remember information about your visits. They consist of a name, a value, and an expiration date.
                OmniClaw uses cookies to enhance your experience and provide essential functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies are necessary for the operation of our website and services. They enable
                    authentication, session management, and security features. Without these cookies, certain
                    features may not function properly.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Analytical Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use analytics cookies to understand how users interact with our website. These cookies
                    help us identify patterns, improve page performance, and optimize user experience. Data
                    collected is anonymized and aggregated.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Preference Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    These cookies remember your preferences, such as language selection and dashboard settings,
                    so we can provide a personalized experience on future visits.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Marketing Cookies</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may use marketing cookies to track the effectiveness of promotional campaigns and
                    advertisements. These are optional and require your consent.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain cookies from third-party services such as analytics providers, payment
                processors, and social media platforms. We do not control these cookies and recommend reviewing
                their privacy policies. Third-party cookies are subject to their respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Dashboard Session Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you access the OmniClaw dashboard, we use session cookies to maintain your authentication
                and session state. These cookies expire when you close your browser or log out. For security
                purposes, dashboard sessions automatically expire after 30 minutes of inactivity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Managing Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have control over cookies through:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Browser settings that allow you to accept, reject, or delete cookies</li>
                <li>Cookie preference centers on our website where you can opt-out of non-essential cookies</li>
                <li>Browser extensions that block or manage cookies</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Please note that disabling essential cookies may impact your ability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookie Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies have different lifespans depending on their purpose. Session cookies are deleted when
                you close your browser. Persistent cookies remain on your device until their expiration date or
                until you manually delete them. Analytics cookies typically expire after 24 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Do Not Track</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some browsers include a "Do Not Track" feature. Currently, there is no industry standard for
                recognizing Do Not Track signals, and OmniClaw does not respond to Do Not Track requests.
                However, you can use other tools, such as browser cookie controls, to limit first-party and
                third-party cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy periodically to reflect changes in our practices or applicable
                laws. We will notify you of significant changes by posting the updated policy on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our use of cookies, please contact:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>OmniClaw, Inc.</p>
                <p>123 Crypto Lane</p>
                <p>San Francisco, CA 94105</p>
                <p>Email: contact@omniclaw.ai</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default CookiePolicy;
