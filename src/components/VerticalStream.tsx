import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Transaction {
  id: string;
  to: string;
  amount: number;
  status: "approved" | "blocked";
  timestamp: string;
  type: string;
}

const TX_POOL: Transaction[] = [
  { id: "tx_a8f2", to: "api.openai.com", amount: 0.012, status: "approved", timestamp: "now", type: "inference" },
  { id: "tx_c3d1", to: "search.brave.com", amount: 0.003, status: "approved", timestamp: "1s ago", type: "search" },
  { id: "tx_e5b7", to: "api.anthropic.com", amount: 0.008, status: "approved", timestamp: "3s ago", type: "inference" },
  { id: "tx_d7e4", to: "unknown.vendor.xyz", amount: 12.5, status: "blocked", timestamp: "5s ago", type: "transfer" },
  { id: "tx_f1a9", to: "storage.pinata.cloud", amount: 0.001, status: "approved", timestamp: "7s ago", type: "storage" },
  { id: "tx_g2b8", to: "api.cohere.ai", amount: 0.005, status: "approved", timestamp: "9s ago", type: "inference" },
  { id: "tx_h4c6", to: "suspicious.endpoint", amount: 50.0, status: "blocked", timestamp: "11s ago", type: "transfer" },
  { id: "tx_j5d3", to: "graph.thegraph.com", amount: 0.002, status: "approved", timestamp: "13s ago", type: "query" },
  { id: "tx_k6e2", to: "api.perplexity.ai", amount: 0.015, status: "approved", timestamp: "15s ago", type: "search" },
  { id: "tx_m7f1", to: "rate.exceeded.api", amount: 0.001, status: "blocked", timestamp: "17s ago", type: "inference" },
];

const VerticalStream = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(TX_POOL.slice(0, 5));
  const indexRef = useRef(5);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextTx = { ...TX_POOL[indexRef.current % TX_POOL.length] };
      nextTx.id = `${nextTx.id}_${Date.now()}`;
      nextTx.timestamp = "now";

      setTransactions((prev) => {
        const updated = prev.map((t, i) => ({
          ...t,
          timestamp: `${(i + 1) * 2}s ago`,
        }));
        return [nextTx, ...updated.slice(0, 7)];
      });

      indexRef.current++;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-accent tracking-widest uppercase mb-4">
              Transaction Ledger
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
              The Vertical Stream
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real-time ledger updates flowing in 3D perspective.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            className="max-w-3xl mx-auto relative"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "50% 0%",
            }}
          >
            {/* Fade gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

            <div
              className="space-y-2"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <AnimatePresence initial={false}>
                {transactions.map((tx, i) => {
                  const depth = i * 0.06;
                  const opacity = Math.max(0, 1 - i * 0.12);
                  const scale = 1 - depth * 0.3;
                  const translateZ = -i * 30;

                  return (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, y: -60, rotateX: -15 }}
                      animate={{
                        opacity,
                        y: 0,
                        rotateX: i * -1.5,
                        scale,
                        z: translateZ,
                      }}
                      exit={{ opacity: 0, y: 40 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className="glass-card px-5 py-4 flex items-center justify-between origin-top"
                      style={{
                        transformStyle: "preserve-3d",
                        willChange: "transform, opacity", // GPU acceleration hint
                        transform: `perspective(1200px) rotateX(${i * -1.5}deg) scale(${scale})`,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${tx.status === "approved" ? "bg-primary/10" : "bg-destructive/10"}`}>
                          {tx.status === "approved" ? (
                            <CheckCircle size={15} className="text-primary" />
                          ) : (
                            <AlertTriangle size={15} className="text-destructive" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-mono text-foreground font-medium">
                            {tx.to}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-muted-foreground font-mono">
                              {tx.id.split("_").slice(0, 2).join("_")}
                            </span>
                            <span className="text-xs text-muted-foreground/60">
                              {tx.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-sm font-mono font-bold tabular-nums ${tx.status === "approved" ? "text-foreground" : "text-destructive"}`}>
                          {tx.status === "blocked" ? "−" : ""}${tx.amount.toFixed(3)}
                        </div>
                        <div className="flex items-center gap-2 justify-end mt-0.5">
                          <span className={`text-[10px] font-mono uppercase tracking-wider ${tx.status === "approved" ? "text-primary" : "text-destructive"}`}>
                            {tx.status}
                          </span>
                          <span className="text-[10px] text-muted-foreground/50">
                            {tx.timestamp}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VerticalStream;
