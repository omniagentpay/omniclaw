import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Shield3D from "./Shield3D";
import FloatingElements from "./FloatingElements";
import { ArrowRight, Play, ShieldCheck, Zap } from "lucide-react";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
    layoutEffect: false, // Use regular effect for better performance
  });

  const fontWeight = useTransform(scrollYProgress, [0, 0.5], [900, 300], {
    clamp: true, // Prevent unnecessary calculations
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-14 sm:pt-16 overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(75 100% 50% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(75 100% 50% / 0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      
      {/* Dynamic Background Elements */}
      <FloatingElements />

      {/* 3D Shield behind text */}
      <Shield3D />

      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[100rem] mx-auto">
        {/* Center-aligned layout consistent with rest of site */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] 2xl:text-[7.5rem] 3xl:text-[9rem] tracking-tight leading-[0.88] mb-6 sm:mb-7 md:mb-8"
            style={{ fontWeight }}
          >
            <span className="text-foreground">Agents Think.</span>
            <br />
            <span className="text-gradient-lime">We Govern the Money.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl xl:max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14 leading-relaxed"
          >
            The payment infrastructure built for autonomous AI agents.
            Programmable wallets. Real-time settlement. Zero human friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-3xl mx-auto flex flex-col items-center"
          >
            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-16 w-full sm:w-auto">
              <a
                href="/docs/quickstart"
                className="magnetic-button-glow flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:brightness-110 transition-all text-sm sm:text-base border border-transparent"
              >
                <span>Start Building Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#video"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-glass-bg/50 backdrop-blur-md text-foreground font-semibold rounded-xl border border-glass-border hover:bg-glass-bg hover:border-primary/50 transition-all text-sm sm:text-base"
              >
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="w-3 h-3 text-primary ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </a>
            </div>

            {/* Visual Metrics / Trust Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 w-full pt-8 border-t border-glass-border/60">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-xl sm:text-2xl font-bold font-mono text-foreground">{'<'} 400ms</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Settlement Time</span>
              </div>
              <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-x border-glass-border/60 pt-6 sm:pt-0 sm:px-12">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span className="text-xl sm:text-2xl font-bold font-mono text-foreground">100%</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Atomic Safety</span>
              </div>
              <div className="flex flex-col items-center border-t sm:border-t-0 border-glass-border/60 pt-6 sm:pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl sm:text-2xl font-bold font-mono text-foreground">$50M+</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Secured Volume</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
