import { useEffect, useRef } from "react";

const MeshBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationId: number | null = null;
    let time = 0;
    let isVisible = true;

    // Use IntersectionObserver to pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !animationId) {
          draw();
        } else if (!isVisible && animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    const resizeHandler = () => {
      resize();
      if (!animationId && isVisible) draw();
    };
    window.addEventListener("resize", resizeHandler, { passive: true });

    const blobs = [
      { x: 0.2, y: 0.15, r: 400, color: [30, 30, 60], speed: 0.0003 },
      { x: 0.7, y: 0.1, r: 350, color: [15, 50, 60], speed: 0.0004 },
      { x: 0.5, y: 0.35, r: 500, color: [40, 20, 55], speed: 0.00025 },
      { x: 0.15, y: 0.55, r: 380, color: [20, 40, 50], speed: 0.00035 },
      { x: 0.8, y: 0.5, r: 420, color: [35, 25, 65], speed: 0.0002 },
      { x: 0.4, y: 0.7, r: 360, color: [25, 35, 45], speed: 0.00045 },
      { x: 0.6, y: 0.85, r: 440, color: [18, 45, 55], speed: 0.0003 },
    ];

    const draw = () => {
      if (!isVisible) {
        animationId = null;
        return;
      }

      time += 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.fillStyle = "hsl(220, 25%, 4%)";
      ctx.fillRect(0, 0, w, h);

      for (const blob of blobs) {
        const bx = blob.x * w + Math.sin(time * blob.speed) * 120;
        const by = blob.y * h + Math.cos(time * blob.speed * 1.3) * 80;
        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, blob.r);
        gradient.addColorStop(0, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, 0.4)`);
        gradient.addColorStop(1, `rgba(${blob.color[0]}, ${blob.color[1]}, ${blob.color[2]}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      animationId = requestAnimationFrame(draw);
    };

    if (isVisible) draw();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ willChange: "contents" }}
      />
      {/* Film grain noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
};

export default MeshBackground;
