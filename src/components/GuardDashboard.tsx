import { Shield, Activity, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const GuardDashboard = () => {
  const [spent, setSpent] = useState(28.5);
  const limit = 50;

  useEffect(() => {
    // Reduce update frequency for better performance
    const interval = setInterval(() => {
      setSpent((prev) => {
        if (prev >= 31.2) return 28.5;
        return prev + 0.06; // Double increment to maintain same visual speed
      });
    }, 200); // Reduced from 100ms to 200ms
    return () => clearInterval(interval);
  }, []);

  const percentage = (spent / limit) * 100;
  const remaining = limit - spent;

  const recentTxs = [
    { id: "tx_a8f2", to: "api.openai.com", amount: 0.012, status: "approved", time: "2s ago" },
    { id: "tx_b3c1", to: "search.brave.com", amount: 0.003, status: "approved", time: "8s ago" },
    { id: "tx_d7e4", to: "unknown.vendor", amount: 12.50, status: "blocked", time: "14s ago" },
    { id: "tx_f1a9", to: "api.anthropic.com", amount: 0.008, status: "approved", time: "22s ago" },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <div className="container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[100rem]">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <p className="text-xs sm:text-sm font-mono text-accent tracking-widest uppercase mb-3 sm:mb-4">Runtime Protection</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-foreground tracking-tight mb-3 sm:mb-4">Atomic Guard</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl xl:max-w-2xl mx-auto">Every transaction is validated against programmable rules in real time. No exceptions.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          <ScrollReveal className="md:col-span-3">
            <div className="glass-card p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Activity size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Daily Budget</div>
                    <div className="text-xs text-muted-foreground">Resets in 6h 42m</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-mono text-primary font-medium">LIVE</span>
                </div>
              </div>

              <div className="relative h-3 rounded-full bg-muted overflow-hidden mb-4">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    background: percentage > 80 ? "hsl(0 84% 60%)" : "linear-gradient(90deg, hsl(75 100% 50%), hsl(90 100% 45%))",
                  }}
                />
                <div className="absolute inset-y-0 w-px bg-destructive/50" style={{ left: "80%" }} />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-3xl font-bold font-mono text-foreground">${spent.toFixed(2)}</span>
                  <span className="text-muted-foreground text-sm ml-1">/ ${limit.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Remaining</div>
                  <div className="text-sm font-mono font-semibold text-primary">${remaining.toFixed(2)}</div>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Recent Transactions</div>
                <div className="space-y-2">
                  {recentTxs.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        {tx.status === "approved" ? <CheckCircle size={14} className="text-primary shrink-0" /> : <AlertTriangle size={14} className="text-destructive shrink-0" />}
                        <div>
                          <div className="text-sm font-mono text-foreground">{tx.to}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={10} /> {tx.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-mono font-semibold ${tx.status === "approved" ? "text-foreground" : "text-destructive"}`}>
                          {tx.status === "blocked" ? "−" : ""}${tx.amount.toFixed(3)}
                        </div>
                        <div className={`text-xs font-mono ${tx.status === "approved" ? "text-primary" : "text-destructive"}`}>{tx.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="md:col-span-2 flex flex-col gap-4">
            <ScrollReveal delay={0.1}>
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Shield size={18} className="text-accent" />
                  </div>
                  <div className="text-sm font-semibold text-foreground">Guard Status</div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Budget Gate", status: "active" },
                    { label: "Rate Gate", status: "active" },
                    { label: "Recipient Gate", status: "active" },
                    { label: "Anomaly Detection", status: "learning" },
                  ].map((gate) => (
                    <div key={gate.label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{gate.label}</span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded ${gate.status === "active" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>{gate.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="glass-card p-5">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Today's Stats</div>
                <div className="space-y-3">
                  {[
                    { label: "Transactions", value: "1,247" },
                    { label: "Blocked", value: "3" },
                    { label: "Avg. Cost", value: "$0.008" },
                    { label: "Uptime", value: "99.99%" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="text-sm font-mono font-semibold text-foreground">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuardDashboard;
