import { useEffect, useState, useMemo, useCallback, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Layers,
  Zap,
  Code,
  Rocket,
  Play,
  Activity,
  Shield,
  BarChart3,
  Award,
  Users,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "infrastructure", label: "Infrastructure", icon: Layers },
  { id: "protocol", label: "Protocol", icon: Zap },
  { id: "mcp", label: "MCP Tools", icon: Code },
  { id: "quickstart", label: "Quick Start", icon: Rocket },
  { id: "video", label: "Video", icon: Play },
  { id: "liveflow", label: "Live Flow", icon: Activity },
  { id: "safety", label: "Safety", icon: Shield },
  { id: "trust-gate", label: "ERC-8004", icon: Award },
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "standards", label: "Standards", icon: Award },
  { id: "trusted", label: "Trusted By", icon: Users },
];

const SideNavigation = () => {
  const [activeId, setActiveId] = useState<string>("hero");
  const [isVisible, setIsVisible] = useState(true); // Start visible to prevent re-initialization
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeIdRef = useRef<string>("hero");
  const isUserScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isClickingRef = useRef<boolean>(false);
  const clickedSectionRef = useRef<string | null>(null);

  // Remove the visibility delay to prevent re-initialization

  useEffect(() => {
    // Intersection Observer to track active section - primary method
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is in upper-middle viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      // Skip updates during user-initiated scrolling or clicking to prevent conflicts
      if (isUserScrollingRef.current || isClickingRef.current) return;

      // Find the entry with the highest intersection ratio that's currently visible
      let maxRatio = 0;
      let activeEntry: IntersectionObserverEntry | null = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeEntry = entry;
        }
      });

      if (activeEntry && activeEntry.intersectionRatio > 0.15) {
        const id = activeEntry.target.id;
        // Don't update if this is the section we just clicked
        if (id && id !== activeIdRef.current && id !== clickedSectionRef.current) {
          activeIdRef.current = id;
          setActiveId(id);
        }
      }
    }, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle scroll events - only as fallback when observer doesn't trigger quickly enough
    const handleScroll = () => {
      // Mark that user is scrolling
      isUserScrollingRef.current = true;
      
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Clear scrolling flag after scroll ends (debounce)
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 200);

      // Skip if user just clicked a section
      if (isClickingRef.current) return;

      // Find which section is closest to viewport center
      const viewportCenter = window.innerHeight / 2 + window.scrollY;
      let bestMatch: { id: string; distance: number } | null = null;

      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          const elementCenter = elementTop + element.offsetHeight / 2;
          
          const distance = Math.abs(elementCenter - viewportCenter);

          // Only consider elements that are at least partially visible
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (!bestMatch || distance < bestMatch.distance) {
              bestMatch = { id: item.id, distance };
            }
          }
        }
      });

      // Don't update if this is the section we just clicked
      if (bestMatch && bestMatch.id !== activeIdRef.current && bestMatch.id !== clickedSectionRef.current) {
        activeIdRef.current = bestMatch.id;
        setActiveId(bestMatch.id);
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = useCallback((id: string, closeMenu = false) => {
    // Mark that user is clicking and which section they clicked
    isClickingRef.current = true;
    clickedSectionRef.current = id;
    
    // Immediately update active state and ref to prevent blinking
    activeIdRef.current = id;
    setActiveId(id);
    
    // Mark that this is a user-initiated scroll
    isUserScrollingRef.current = true;

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (closeMenu) {
        setMobileMenuOpen(false);
      }

      // Clear flags after smooth scroll completes
      setTimeout(() => {
        isUserScrollingRef.current = false;
        isClickingRef.current = false;
        
        // Verify the section is in view after scroll
        const currentElement = document.getElementById(id);
        if (currentElement) {
          const rect = currentElement.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
          if (isInView) {
            // Ensure the clicked section remains active
            activeIdRef.current = id;
            setActiveId(id);
          }
        }
        
        // Clear the clicked section ref after a delay to allow normal observer behavior
        setTimeout(() => {
          clickedSectionRef.current = null;
        }, 300);
      }, 1000); // Wait for smooth scroll to complete (increased for safety)
    }
  }, []);

  // Desktop Side Navigation (lg and above) - Memoized to prevent re-renders
  const DesktopNav = useMemo(() => (
    <motion.div
      initial={{ opacity: 1, x: 0, y: '-50%' }}
      animate={{ opacity: 1, x: 0, y: '-50%' }}
      transition={{ duration: 0 }}
      className="fixed right-2 sm:right-3 md:right-4 lg:right-4 xl:right-6 2xl:right-8 top-1/2 z-50 hidden lg:block"
    >
      <nav className="relative">
        <div className="bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full px-2 sm:px-3 py-3 sm:py-4 shadow-lg">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "relative group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-primary/30 text-primary scale-110 shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10 hover:scale-105"
                  )}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className={cn(
                    "w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300",
                    isActive && "scale-110"
                  )} />
                  
                  {/* Tooltip - Desktop only */}
                  <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden xl:block">
                    <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 text-xs font-medium text-foreground whitespace-nowrap shadow-lg">
                      {item.label}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-background/95"></div>
                    </div>
                  </div>

                  {/* Active indicator - use key to prevent re-initialization */}
                  {isActive && (
                    <motion.div
                      key={`desktop-active-${item.id}`}
                      layoutId="desktopActiveIndicator"
                      className="absolute inset-0 rounded-full bg-primary/40 border-2 border-primary/60 shadow-inner"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Pulse animation for active state - only animate if active */}
                  {isActive && (
                    <motion.div
                      key={`desktop-pulse-${item.id}`}
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </motion.div>
  ), [activeId, scrollToSection]);

  // Mobile Bottom Navigation Bar - Memoized to prevent re-renders
  const MobileNav = useMemo(() => (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0 }}
      className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
    >
      <div className="bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full px-2 py-2 shadow-lg">
        <div className="flex items-center justify-between gap-1 overflow-x-auto scrollbar-hide">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-[60px] px-2 py-1.5 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-primary/30 text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
                aria-label={item.label}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] font-medium truncate w-full text-center">
                  {item.label.split(' ')[0]}
                </span>
                {isActive && (
                  <motion.div
                    key={`mobile-active-${item.id}`}
                    layoutId="mobileActiveIndicator"
                    className="absolute inset-0 rounded-full bg-primary/20 border border-primary/40"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          
          {/* More button for remaining items */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "relative flex flex-col items-center justify-center min-w-[60px] px-2 py-1.5 rounded-full transition-all duration-300",
                  "text-muted-foreground hover:text-primary hover:bg-primary/10"
                )}
                aria-label="More sections"
              >
                <Menu className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] font-medium">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh] rounded-t-2xl">
              <div className="py-4">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Navigation</h3>
                <div className="grid grid-cols-2 gap-3">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeId === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id, true)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                          isActive
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10 border border-border"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                        {isActive && (
                          <motion.div
                            key={`sheet-active-${item.id}`}
                            className="ml-auto w-2 h-2 rounded-full bg-primary"
                            layoutId="mobileSheetActive"
                            initial={false}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.div>
  ), [activeId, mobileMenuOpen, scrollToSection, setMobileMenuOpen]);

  return (
    <>
      {DesktopNav}
      {MobileNav}
    </>
  );
};

export default memo(SideNavigation);
