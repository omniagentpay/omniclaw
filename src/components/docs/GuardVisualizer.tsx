import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuardPanel {
  name: string;
  icon: React.ReactNode;
  status: "pending" | "allowed" | "blocked" | "simulation";
}

const GuardVisualizer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

const guards: GuardPanel[] = [
  {
    name: "Budget",
    icon: <Shield className="h-5 w-5" />,
    status: "pending",
  },
  {
    name: "Rate Limit",
    icon: <Clock className="h-5 w-5" />,
    status: "pending",
  },
  {
    name: "Single Tx",
    icon: <CheckCircle className="h-5 w-5" />,
    status: "pending",
  },
  {
    name: "Recipient",
    icon: <Shield className="h-5 w-5" />,
    status: "pending",
  },
  {
    name: "Simulation",
    icon: <Clock className="h-5 w-5" />,
    status: "simulation",
  },
];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= guards.length) {
          setIsAnimating(false);
          setTimeout(() => {
            setActiveStep(0);
            setIsAnimating(true);
          }, 500);
          return guards.length;
        }
        setIsAnimating(true);
        return prev + 1;
      });
    }, 1500);

    // Start animation
    setIsAnimating(true);
    setActiveStep(0);

    return () => clearInterval(interval);
  }, []);

  const getGuardStatus = (index: number): GuardPanel["status"] => {
    if (index < activeStep) return "allowed";
    if (index === activeStep && isAnimating) return "allowed";
    if (index === guards.length - 1) return "simulation";
    return "pending";
  };

  const getStatusColor = (status: GuardPanel["status"]) => {
    switch (status) {
      case "allowed":
        return "border-[#10b981] bg-[#10b981]/10";
      case "simulation":
        return "border-[#f59e0b] bg-[#f59e0b]/10";
      case "blocked":
        return "border-destructive bg-destructive/10";
      default:
        return "border-border/20 bg-card/50";
    }
  };

  const getStatusIcon = (status: GuardPanel["status"]) => {
    switch (status) {
      case "allowed":
        return <CheckCircle className="h-5 w-5 text-[#10b981]" />;
      case "simulation":
        return <Clock className="h-5 w-5 text-[#f59e0b]" />;
      case "blocked":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-border/30" />;
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 font-display text-foreground">
          Guard Visualizer
        </h2>
        <p className="text-sm text-muted-foreground">
          Watch a payment request flow through the guard system in real-time
        </p>
      </div>

      <div className="relative">
        {/* Guard Panels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 relative">
          {/* Request Pulse - travels through panels */}
          {isAnimating && activeStep <= guards.length && (
            <div
              className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-1000 ease-in-out"
              style={{
                left: `calc(${((activeStep + 0.5) / guards.length) * 100}% - 0.375rem)`,
              }}
            >
              <div className="h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse" />
            </div>
          )}
          {guards.map((guard, index) => {
            const status = getGuardStatus(index);
            const isActive = index === activeStep && isAnimating;

            return (
              <div
                key={guard.name}
                className={cn(
                  "relative border rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 backdrop-blur-sm transition-all duration-500",
                  getStatusColor(status),
                  isActive && "scale-105 shadow-lg"
                )}
              >
                {/* Glass panel effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3">
                  <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-background/50">
                    <div className={cn(
                      "transition-colors h-4 w-4 sm:h-5 sm:w-5",
                      status === "allowed" && "text-[#10b981]",
                      status === "simulation" && "text-[#f59e0b]",
                      status === "blocked" && "text-destructive",
                      status === "pending" && "text-muted-foreground"
                    )}>
                      {guard.icon}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-0.5 sm:mb-1">
                      {guard.name}
                    </h3>
                    <div className="flex justify-center">
                      {getStatusIcon(status)}
                    </div>
                  </div>

                  {/* Status text */}
                  <div className="text-[10px] sm:text-xs font-mono mt-0.5 sm:mt-1">
                    {status === "allowed" && (
                      <span className="text-[#10b981]">ALLOWED</span>
                    )}
                    {status === "simulation" && (
                      <span className="text-[#f59e0b]">SIMULATION</span>
                    )}
                    {status === "blocked" && (
                      <span className="text-destructive">BLOCKED</span>
                    )}
                    {status === "pending" && (
                      <span className="text-muted-foreground">PENDING</span>
                    )}
                  </div>
                </div>

                {/* Pulse effect when active */}
                {isActive && (
                  <div className="absolute inset-0 rounded-lg animate-ping opacity-20">
                    <div className={cn(
                      "w-full h-full rounded-lg",
                      status === "allowed" ? "bg-[#10b981]" : "bg-[#f59e0b]"
                    )} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Flow indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-1 w-12 bg-border/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(activeStep / guards.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {activeStep}/{guards.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GuardVisualizer;
