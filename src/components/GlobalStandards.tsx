import { motion } from "framer-motion";
import { Award, Shield, CheckCircle2, Star, Trophy, Medal } from "lucide-react";
import { useState } from "react";

const awards = [
  {
    id: 1,
    title: "Security Excellence",
    issuer: "Blockchain Security Alliance",
    year: "2024",
    icon: Shield,
    height: "h-48",
  },
  {
    id: 2,
    title: "Innovation Award",
    issuer: "Web3 Foundation",
    year: "2024",
    icon: Star,
    height: "h-64",
  },
  {
    id: 3,
    title: "Best Infrastructure",
    issuer: "Ethereum Foundation",
    year: "2024",
    icon: Trophy,
    height: "h-56",
  },
  {
    id: 4,
    title: "Developer Choice",
    issuer: "DeveloperDAO",
    year: "2024",
    icon: Medal,
    height: "h-52",
  },
  {
    id: 5,
    title: "Audit Certified",
    issuer: "Trail of Bits",
    year: "2024",
    icon: CheckCircle2,
    height: "h-60",
  },
];

const certifications = [
  { id: 1, name: "SOC 2", angle: 0 },
  { id: 2, name: "ISO 27001", angle: 45 },
  { id: 3, name: "GDPR", angle: 90 },
  { id: 4, name: "HIPAA", angle: 135 },
  { id: 5, name: "PCI DSS", angle: 180 },
  { id: 6, name: "CCPA", angle: 225 },
  { id: 7, name: "NIST", angle: 270 },
  { id: 8, name: "FIDO2", angle: 315 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const HolographicCard = ({ award, index }: { award: typeof awards[0]; index: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = award.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`${award.height} relative overflow-hidden rounded-xl glass-card group cursor-pointer`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
             hsl(75 100% 50% / 0.1) 0%, 
             hsl(220 20% 7% / 0.8) 50%)`
          : "hsl(220 20% 7% / 0.5)",
      }}
    >
      {/* Shine effect - mimics light hitting a physical trophy */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-xl"
        style={{
          background: `radial-gradient(
            ellipse 200% 100% at ${mousePosition.x}% ${mousePosition.y}%,
            hsl(75 100% 50% / 0.4) 0%,
            hsl(190 100% 50% / 0.2) 30%,
            transparent 60%
          )`,
        }}
      />
      
      {/* Moving shine highlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(
            ${Math.atan2(mousePosition.y - 50, mousePosition.x - 50) * (180 / Math.PI) + 90}deg,
            transparent 0%,
            transparent ${Math.max(0, mousePosition.x - 30)}%,
            hsl(0 0% 100% / 0.3) ${mousePosition.x - 10}%,
            hsl(75 100% 50% / 0.5) ${mousePosition.x}%,
            hsl(190 100% 50% / 0.3) ${mousePosition.x + 10}%,
            transparent ${Math.min(100, mousePosition.x + 30)}%,
            transparent 100%
          )`,
          transform: `translate(${(mousePosition.x - 50) * 0.05}px, ${(mousePosition.y - 50) * 0.05}px)`,
        }}
      />
      
      {/* Holographic gradient border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `conic-gradient(
            from ${mousePosition.x * 3.6}deg at ${mousePosition.x}% ${mousePosition.y}%,
            hsl(75 100% 50% / 0.4),
            hsl(190 100% 50% / 0.4),
            hsl(75 100% 50% / 0.4)
          )`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      <div className="relative h-full p-6 flex flex-col justify-between z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xs font-mono text-muted-foreground">{award.year}</span>
        </div>
        
        <div>
          <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
            {award.title}
          </h3>
          <p className="text-sm text-muted-foreground font-mono">{award.issuer}</p>
        </div>
      </div>
    </motion.div>
  );
};

const CertificationBadge = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => {
  const radius = 140;
  const angleRad = (cert.angle * Math.PI) / 180;
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  return (
    <motion.div
      variants={itemVariants}
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="glass-card px-4 py-2 rounded-full border border-glass-border hover:border-primary/50 transition-colors">
        <span className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
          {cert.name}
        </span>
      </div>
    </motion.div>
  );
};

const GlobalStandards = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 border-t border-glass-border">
      <div className="container mx-auto max-w-7xl xl:max-w-[90rem] 2xl:max-w-[100rem] 3xl:max-w-[120rem]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="text-xs sm:text-sm font-mono text-primary tracking-widest uppercase mb-3 sm:mb-4">
            Global Recognition
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-foreground tracking-tight mb-3 sm:mb-4">
            Elite Certification
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl xl:max-w-3xl mx-auto">
            Recognized by industry leaders and trusted by developers worldwide.
          </p>
        </motion.div>

        {/* Awards Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-16 sm:mb-20 md:mb-24 lg:mb-32"
        >
          {awards.map((award, index) => (
            <HolographicCard key={award.id} award={award} index={index} />
          ))}
        </motion.div>

        {/* Certifications Orbit */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          <div className="text-center mb-16">
            <motion.p
              variants={itemVariants}
              className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-8"
            >
              Certifications & Compliance
            </motion.p>
          </div>

          <div className="relative h-[400px] flex items-center justify-center">
            {/* Central Seal */}
            <motion.div
              variants={itemVariants}
              className="relative z-10"
            >
              <div className="glass-card p-8 rounded-full border-2 border-primary/30 relative">
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
                <div className="relative z-10 text-center">
                  <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="font-display font-bold text-lg text-foreground mb-1">
                    Verified by
                  </p>
                  <p className="font-display font-bold text-2xl text-primary">
                    OmniClaw
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Orbiting Certifications */}
            {certifications.map((cert, index) => (
              <CertificationBadge key={cert.id} cert={cert} index={index} />
            ))}

            {/* Connecting lines (optional decorative element) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              {certifications.map((cert) => {
                const radius = 140;
                const angleRad = (cert.angle * Math.PI) / 180;
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;
                return (
                  <line
                    key={cert.id}
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${x}px)`}
                    y2={`calc(50% + ${y}px)`}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary/20"
                  />
                );
              })}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalStandards;
