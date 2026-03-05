import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: March 6, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw, Inc. ("Company," "we," "us," or "our") operates the OmniClaw platform and services.
                We are committed to protecting your privacy and ensuring you have a positive experience on our
                website and when using our services. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you visit our website and use our payment infrastructure for
                AI agents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide directly, such as your name, email address, organization,
                    and contact information when you register for an account, subscribe to our dashboard, or
                    contact us for support.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Transaction Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When using OmniClaw's payment infrastructure, we collect information about transactions
                    processed through our platform, including wallet addresses, transaction amounts, timestamps,
                    and guard kernel validation results. This is necessary for settlement, audit trails, and
                    compliance purposes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Usage Data</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We automatically collect information about your interactions with our website and dashboard,
                    including IP addresses, browser type, pages visited, and referring URLs.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>To provide, maintain, and improve our services</li>
                <li>To process transactions and generate billing invoices</li>
                <li>To send service-related announcements and updates</li>
                <li>To respond to your inquiries and support requests</li>
                <li>To monitor and analyze platform activity for security and fraud prevention</li>
                <li>To comply with legal obligations and regulatory requirements</li>
                <li>To generate anonymized analytics and improve user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement comprehensive security measures to protect your data, including encryption,
                secure authentication, and access controls. All transaction data is encrypted in transit and at
                rest. We conduct regular security audits and maintain compliance with industry standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use third-party service providers for payment processing, analytics, and infrastructure.
                These providers are contractually bound to maintain the confidentiality and security of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain transaction data for as long as necessary to fulfill regulatory requirements, typically
                7 years for audit and compliance purposes. You can request deletion of personal information
                subject to legal and contractual obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your jurisdiction, you may have the right to access, correct, or delete your
                personal information. To exercise these rights, please contact us at contact@omniclaw.ai.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
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

export default PrivacyPolicy;
