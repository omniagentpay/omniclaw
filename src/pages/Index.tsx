import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SafetyKernel from "@/components/SafetyKernel";
import TrustedBy from "@/components/TrustedBy";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SafetyKernel />
      <TrustedBy />

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">O</span>
            </div>
            <span className="font-display font-semibold text-sm text-foreground">OmniClaw</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 OmniAgentPay, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
