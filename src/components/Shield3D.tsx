import { motion } from "framer-motion";

const Shield3D = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: "1200px" }}>
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Shield shape - translucent hexagonal layers */}
        <svg width="420" height="480" viewBox="0 0 420 480" fill="none" className="opacity-[0.07]">
          <defs>
            <linearGradient id="shield-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(75, 100%, 50%)" />
              <stop offset="50%" stopColor="hsl(190, 100%, 50%)" />
              <stop offset="100%" stopColor="hsl(75, 100%, 50%)" />
            </linearGradient>
            <filter id="shield-blur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
          {/* Outer shield */}
          <path
            d="M210 20 L380 100 L380 300 L210 460 L40 300 L40 100 Z"
            stroke="url(#shield-grad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#shield-blur)"
          />
          {/* Middle shield */}
          <path
            d="M210 60 L350 125 L350 285 L210 420 L70 285 L70 125 Z"
            stroke="url(#shield-grad)"
            strokeWidth="1"
            fill="hsl(190, 100%, 50%)"
            fillOpacity="0.02"
          />
          {/* Inner shield */}
          <path
            d="M210 100 L320 150 L320 270 L210 380 L100 270 L100 150 Z"
            stroke="url(#shield-grad)"
            strokeWidth="0.5"
            fill="hsl(75, 100%, 50%)"
            fillOpacity="0.03"
          />
          {/* Core */}
          <circle cx="210" cy="240" r="40" stroke="url(#shield-grad)" strokeWidth="0.5" fill="hsl(75, 100%, 50%)" fillOpacity="0.04" />
          {/* Cross lines */}
          <line x1="210" y1="100" x2="210" y2="380" stroke="url(#shield-grad)" strokeWidth="0.3" opacity="0.5" />
          <line x1="100" y1="210" x2="320" y2="210" stroke="url(#shield-grad)" strokeWidth="0.3" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
};

export default Shield3D;
