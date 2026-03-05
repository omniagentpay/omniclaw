import Navbar from "@/components/Navbar";
import SideNavigation from "@/components/SideNavigation";
import SiteFooter from "@/components/SiteFooter";

const SecurityPolicy = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <SideNavigation />
      <div className="relative z-2 pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Security Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: March 6, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Security Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw is built from the ground up with security as a first-class concern. Our architecture
                prioritizes the safety of autonomous AI agent financial transactions through cryptographic
                verification, atomic controls, and comprehensive monitoring. This document outlines our security
                practices and commitments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Guard Kernel: Core Security Engine</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Four-Gate Architecture</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All transactions pass through four atomic safety gates before execution: BudgetGuard (spending
                    limits), RateLimitGuard (velocity controls), RecipientGuard (allowlist verification), and
                    ConfirmGuard (human-in-the-loop approval). Each gate enforces immutable rules with sub-12ms
                    latency.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Atomic Execution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Guard operations are atomic—either all gates pass or the entire transaction is rejected.
                    There is no partial execution or edge cases that could bypass controls.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Monitoring</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every transaction is logged with full context: gate results, policy applied, agent identity,
                    and timestamp. Enterprise audit trails are immutable and exportable for compliance.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. ERC-8004 Agent Identity Verification</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw integrates the Ethereum standard ERC-8004 for trustless agent identity and reputation
                verification. Every agent is verified on-chain against:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li>28 keccak256-verified contract selectors</li>
                <li>On-chain identity registry (ERC-721 extension)</li>
                <li>Weighted Trust Score from verified feedback signals</li>
                <li>Fraud detection tags and attestation records</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Two-sided X402 payments enable agents to receive funds while maintaining the same Guard controls
                applied to outbound payments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Encryption and Data Protection</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Transport Security</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All API communications use TLS 1.3 encryption. Wallet keys and sensitive credentials are
                    transmitted over encrypted channels only.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">At-Rest Encryption</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Transaction records, policy configurations, and audit logs are encrypted at rest using
                    AES-256-GCM. Wallet keys are stored in encrypted vaults with hardware security module (HSM)
                    backing.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Key Management</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cryptographic keys are rotated regularly and stored in isolated, access-controlled environments.
                    No single person has access to production master keys.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Access Control and Authentication</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Multi-Factor Authentication (MFA)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Dashboard access requires MFA (TOTP or security keys). High-risk operations require additional
                    confirmation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Role-Based Access Control (RBAC)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Dashboard seats support role-based permissions: Operator (view-only), Risk Officer (policy
                    management), and Policy Admin (all access). Permissions are enforced at the API level.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">API Key Management</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    API keys are rotated regularly and support IP whitelisting. Compromised keys can be revoked
                    instantly.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Fraud Detection and Prevention</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                OmniClaw employs multiple layers of fraud detection:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Real-time transaction pattern analysis</li>
                <li>ERC-8004 fruad tag verification for incoming payments</li>
                <li>Machine learning models for anomaly detection</li>
                <li>Velocity-based rate limiting per agent and recipient</li>
                <li>Allowlist enforcement at the guard layer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Infrastructure Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw infrastructure is deployed on globally distributed cloud platforms with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li>DDoS protection and rate limiting</li>
                <li>Auto-scaling and high availability across regions</li>
                <li>Automated vulnerability scanning and patching</li>
                <li>Regular penetration testing by independent security firms</li>
                <li>Intrusion detection and threat monitoring 24/7</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Blockchain Integration Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw integrates with Ethereum, Base, Polygon, and other networks. We:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li>Verify all on-chain contract interactions with formal verification when available</li>
                <li>Validate signatures and attestations cryptographically</li>
                <li>Support Circle CCTP for atomic cross-chain settlement with attestation verification</li>
                <li>Monitor smart contract state for unauthorized changes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Incident Response</h2>
              <p className="text-muted-foreground leading-relaxed">
                In the event of a security incident, OmniClaw has a documented incident response plan that includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li>Immediate containment and investigation</li>
                <li>Notification to affected users within 24 hours</li>
                <li>Detailed forensic analysis</li>
                <li>Root cause analysis and remediation</li>
                <li>Transparent communication with regulatory bodies as required</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Compliance and Standards</h2>
              <p className="text-muted-foreground leading-relaxed">
                OmniClaw is designed to meet the stringent requirements of regulated financial institutions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li>SOC 2 Type II certified infrastructure</li>
                <li>GDPR, CCPA, and applicable data protection compliance</li>
                <li>FinCEN MSB and state money transmitter compliance ready</li>
                <li>Audit trail requirements for HITL approval workflows</li>
                <li>AML/KYC integration support for regulated deployments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Continuous Improvement</h2>
              <p className="text-muted-foreground leading-relaxed">
                We continuously improve our security posture through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                <li>Regular security audits by third-party firms</li>
                <li>Bug bounty program for community researchers</li>
                <li>Threat modeling workshops and security reviews</li>
                <li>Staff security training and certifications</li>
                <li>Monitoring of emerging threats and vulnerabilities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Reporting Security Issues</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you discover a security vulnerability, please email contact@omniclaw.ai with details.
                Do not publicly disclose the vulnerability until we have had time to address it. We take all
                reports seriously and will acknowledge receipt within 24 hours.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For security questions or concerns:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>General Contact: contact@omniclaw.ai</p>
                <p>OmniClaw, Inc.</p>
                <p>123 Crypto Lane</p>
                <p>San Francisco, CA 94105</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default SecurityPolicy;
