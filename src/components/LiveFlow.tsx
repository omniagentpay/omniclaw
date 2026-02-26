import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  ring: number;
  denied: boolean;
  phase: "traveling" | "checking" | "approved" | "denied" | "dissipating";
  life: number;
  maxLife: number;
  size: number;
}

const RING_POSITIONS = [
  { x: 280, label: "Budget Gate", color: "hsl(45, 100%, 55%)" },
  { x: 460, label: "Velocity Gate", color: "hsl(190, 100%, 50%)" },
  { x: 640, label: "Recipient Gate", color: "hsl(75, 100%, 50%)" },
];

const LiveFlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const [statusText, setStatusText] = useState("Awaiting transaction...");

  useEffect(() => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 860;
    const H = 320;
    canvas.width = W * 2;
    canvas.height = H * 2;
    ctx.scale(2, 2);

    let animId: number;
    let spawnTimer = 0;
    let deniedNext = false;
    let cycleCount = 0;

    const spawnParticle = () => {
      cycleCount++;
      deniedNext = cycleCount % 5 === 0; // Every 5th particle is denied
      const p: Particle = {
        x: 60,
        y: 160 + (Math.random() - 0.5) * 20,
        vx: 1.8 + Math.random() * 0.6,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: 1,
        ring: 0,
        denied: deniedNext,
        phase: "traveling",
        life: 0,
        maxLife: 600,
        size: 3 + Math.random() * 2,
      };
      particlesRef.current.push(p);
    };

    const drawRing = (x: number, y: number, label: string, color: string, active: boolean) => {
      // Outer glow
      if (active) {
        const glow = ctx.createRadialGradient(x, y, 20, x, y, 60);
        glow.addColorStop(0, color.replace(")", " / 0.15)").replace("hsl", "hsl"));
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(x - 60, y - 60, 120, 120);
      }

      // Glass ring
      ctx.beginPath();
      ctx.ellipse(x, y, 35, 50, 0, 0, Math.PI * 2);
      ctx.strokeStyle = active ? color : "hsl(220, 15%, 18%)";
      ctx.lineWidth = active ? 2 : 1;
      ctx.stroke();

      // Inner fill
      ctx.beginPath();
      ctx.ellipse(x, y, 33, 48, 0, 0, Math.PI * 2);
      ctx.fillStyle = active
        ? color.replace(")", " / 0.05)").replace("hsl", "hsl")
        : "hsl(220, 20%, 7% / 0.3)";
      ctx.fill();

      // Label
      ctx.font = "500 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = active ? color : "hsl(215, 12%, 40%)";
      ctx.fillText(label, x, y + 72);
    };

    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, W, H);

      spawnTimer++;
      if (spawnTimer > 120) {
        spawnParticle();
        spawnTimer = 0;
      }

      // Draw flow line
      ctx.beginPath();
      ctx.moveTo(60, 160);
      ctx.lineTo(800, 160);
      ctx.strokeStyle = "hsl(220, 15%, 12%)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Agent node
      ctx.beginPath();
      ctx.arc(60, 160, 14, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(220, 20%, 10%)";
      ctx.fill();
      ctx.strokeStyle = "hsl(75, 100%, 50% / 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.font = "600 9px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "hsl(75, 100%, 50%)";
      ctx.fillText("AI", 60, 163);
      ctx.fillStyle = "hsl(215, 12%, 40%)";
      ctx.font = "400 10px Inter, sans-serif";
      ctx.fillText("Agent", 60, 195);

      // Destination node
      ctx.beginPath();
      ctx.arc(800, 160, 14, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(220, 20%, 10%)";
      ctx.fill();
      ctx.strokeStyle = "hsl(190, 100%, 50% / 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.font = "600 8px Inter, sans-serif";
      ctx.fillStyle = "hsl(190, 100%, 50%)";
      ctx.fillText("PAY", 800, 163);
      ctx.fillStyle = "hsl(215, 12%, 40%)";
      ctx.font = "400 10px Inter, sans-serif";
      ctx.fillText("Execute", 800, 195);

      // Draw rings
      const activeRings = new Set<number>();
      for (const p of particlesRef.current) {
        if (p.phase === "checking") activeRings.add(p.ring);
      }

      RING_POSITIONS.forEach((ring, i) => {
        drawRing(ring.x, 160, ring.label, ring.color, activeRings.has(i));
      });

      // Update and draw particles
      let statusMsg = "Awaiting transaction...";
      const alive: Particle[] = [];

      for (const p of particlesRef.current) {
        p.life++;

        if (p.phase === "traveling") {
          p.x += p.vx;
          p.y += p.vy * 0.5;

          // Check if hitting a ring
          const nextRing = RING_POSITIONS[p.ring];
          if (nextRing && p.x >= nextRing.x - 10) {
            p.phase = "checking";
            p.x = nextRing.x;
            statusMsg = `Checking ${nextRing.label}...`;
          }

          // Past all rings
          if (p.ring >= RING_POSITIONS.length && p.x >= 780) {
            p.phase = "approved";
            statusMsg = "✓ Transaction approved";
          }
        } else if (p.phase === "checking") {
          // Hold at ring for 40 frames
          if (p.life % 40 === 0) {
            if (p.denied && p.ring === 1) {
              p.phase = "dissipating";
              statusMsg = "✗ Velocity limit exceeded — denied";
            } else {
              p.ring++;
              p.phase = "traveling";
              if (p.ring < RING_POSITIONS.length) {
                statusMsg = `Passed ${RING_POSITIONS[p.ring - 1].label} ✓`;
              }
            }
          }
        } else if (p.phase === "dissipating") {
          p.alpha -= 0.02;
          p.size += 0.15;
        } else if (p.phase === "approved") {
          p.alpha -= 0.03;
        }

        // Draw particle
        if (p.alpha > 0) {
          if (p.phase === "dissipating") {
            // Red dissipation glow
            const rGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
            rGlow.addColorStop(0, `hsl(0, 80%, 55% / ${p.alpha * 0.4})`);
            rGlow.addColorStop(1, "transparent");
            ctx.fillStyle = rGlow;
            ctx.fillRect(p.x - p.size * 6, p.y - p.size * 6, p.size * 12, p.size * 12);

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(0, 80%, 55% / ${p.alpha})`;
            ctx.fill();
          } else {
            // Golden particle with trail
            const trail = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
            trail.addColorStop(0, `hsl(45, 100%, 60% / ${p.alpha * 0.5})`);
            trail.addColorStop(1, "transparent");
            ctx.fillStyle = trail;
            ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(45, 100%, 65% / ${p.alpha})`;
            ctx.fill();

            // Light trail
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - 20, p.y);
            ctx.strokeStyle = `hsl(45, 100%, 55% / ${p.alpha * 0.3})`;
            ctx.lineWidth = p.size * 0.8;
            ctx.stroke();
          }
        }

        if (p.alpha > 0 && p.life < p.maxLife) {
          alive.push(p);
        }
      }

      particlesRef.current = alive;
      setStatusText(statusMsg);

      animId = requestAnimationFrame(draw);
    };

    // Spawn initial particle
    spawnParticle();
    draw();

    return () => cancelAnimationFrame(animId);
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative py-32 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary tracking-widest uppercase mb-4">
              Core Infrastructure
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
              Live Payment Flow
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Watch USDC flow through programmable guard rings in real time.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="glass-card p-6 md:p-10 max-w-5xl mx-auto overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full"
              style={{ maxHeight: "320px", aspectRatio: "860 / 320" }}
            />
            <motion.div
              className="mt-4 text-center"
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`text-sm font-mono ${statusText.includes("✗") ? "text-destructive" : statusText.includes("✓") ? "text-primary" : "text-muted-foreground"}`}>
                {statusText}
              </span>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LiveFlow;
