import CodeTerminal from "./CodeTerminal";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-obsidian-light" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(75 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(75 100% 50% / 0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="animate-fade-up">
          <p className="text-sm font-mono text-primary tracking-widest uppercase mb-6">
            Powered by OmniAgentPay
          </p>
        </div>

        <h1 className="animate-fade-up-delay-1 font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-8">
          <span className="text-foreground">Agents Think.</span>
          <br />
          <span className="text-gradient-lime">We Handle the Money.</span>
        </h1>

        <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          The payment infrastructure built for autonomous AI agents.
          Programmable wallets. Real-time settlement. Zero human friction.
        </p>

        <div className="animate-fade-up-delay-3">
          <CodeTerminal />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-light to-transparent" />
    </section>
  );
};

export default HeroSection;
