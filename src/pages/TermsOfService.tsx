import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";

const TermsOfService = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: March 6, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the OmniClaw website and services ("Services"), you accept and agree to
                be bound by the terms and provision of this agreement. If you do not agree to abide by the above,
                please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. License and Use Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw grants you a limited, non-exclusive, non-transferable license to use our SDK and
                services solely for your internal business purposes. The free SDK tier allows unrestricted usage
                for development and production. Our paid plans (Dashboard seats, Trust Gate RPC add-ons) are
                licensed on a subscription basis and subject to the pricing terms agreed upon.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Payment Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Transaction Fees</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    OmniClaw charges transaction volume fees calculated as basis points on USDC processed through
                    our adapters. Fees are charged in real-time and deducted directly from settlement amounts.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Dashboard Licensing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Enterprise dashboard access is licensed on a per-seat, per-month basis. Pricing varies by
                    role (Operator, Risk Officer, Policy Admin). Seats are billed monthly in advance.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Premium Add-ons</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Trust Gate + ERC-8004 RPC endpoints for high-value and regulated use cases are available as
                    premium add-ons with custom pricing.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Guard Kernel and Safety</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw's Guard Kernel enforces atomic spend controls through BudgetGuard, RateLimitGuard,
                RecipientGuard, and ConfirmGuard. While we design these controls to be reliable, you acknowledge
                that no system is infallible. You are responsible for testing the Guard Kernel in your
                environment and setting appropriate limits. We provide audit trails and real-time monitoring but
                are not liable for edge cases or misconfigurations of guard policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree not to use OmniClaw services to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Engage in money laundering, fraud, or other financial crimes</li>
                <li>Facilitate unauthorized access to blockchain networks or smart contracts</li>
                <li>Attempt to circumvent Guard Kernel controls or security measures</li>
                <li>Harass, defame, or harm any person or entity</li>
                <li>Transmit viruses, malware, or malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, OMNICLAW AND ITS OFFICERS, DIRECTORS, EMPLOYEES,
                AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES, OR LOST PROFITS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR
                LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER WILL NOT EXCEED THE FEES PAID BY YOU IN THE PAST
                12 MONTHS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless OmniClaw from any claims, damages, or costs
                arising from your use of our services, misuse of the Guard Kernel, or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate your access to OmniClaw services at any time for
                violations of these terms or for any reason we deem appropriate. Upon termination, your right to
                use the services ceases immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact:
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

export default TermsOfService;
