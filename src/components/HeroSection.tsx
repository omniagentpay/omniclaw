import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CodeTerminal from "./CodeTerminal";
import Shield3D from "./Shield3D";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const fontWeight = useTransform(scrollYProgress, [0, 0.5], [900, 300]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
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

      {/* 3D Shield behind text */}
      <Shield3D />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Asymmetric layout - headline offset left */}
        <div className="ml-0 md:-ml-8 lg:-ml-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-6">
              Powered by OmniAgentPay
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] tracking-tight leading-[0.88] mb-8"
            style={{ fontWeight }}
          >
            <span className="text-foreground">Agents Think.</span>
            <br />
            <span className="text-gradient-lime">We Handle the Money.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-14 leading-relaxed md:ml-8"
        >
          The payment infrastructure built for autonomous AI agents.
          Programmable wallets. Real-time settlement. Zero human friction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-2xl md:ml-8"
        >
          <CodeTerminal />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
