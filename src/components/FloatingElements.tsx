import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingElements = () => {
  const [elements, setElements] = useState<{ x: number; y: number; scale: number; opacity: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random floating orbs on mount
    const newElements = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.2,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * -20 // Start at different points in animation
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px]"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: "20vw",
            height: "20vw",
            background: i % 2 === 0 
              ? "radial-gradient(circle, hsl(75 100% 50% / 0.8) 0%, transparent 70%)" 
              : "radial-gradient(circle, hsl(190 100% 50% / 0.6) 0%, transparent 70%)",
            opacity: el.opacity,
            transform: `scale(${el.scale}) transform(-50%, -50%)`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [el.scale, el.scale * 1.2, el.scale],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "linear",
            delay: el.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
