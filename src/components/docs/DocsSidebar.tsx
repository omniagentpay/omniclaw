import { NavLink, useLocation, Link } from "react-router-dom";
import { ChevronRight, ExternalLink, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  badge?: "new" | "beta";
  children?: NavItem[];
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Getting Started",
    items: [
      { title: "Quickstart", url: "/docs/quickstart" },
      {
        title: "Core Concepts",
        url: "/docs/core-concepts",
        children: [
          { title: "Overview", url: "/docs/core-concepts" },
          { title: "Architecture", url: "/docs/core-concepts/architecture" },
          { title: "Security Model", url: "/docs/core-concepts/security" },
        ],
      },
    ],
  },
  {
    label: "Wallets & Payments",
    items: [
      {
        title: "Wallets",
        url: "/docs/wallets",
        children: [
          { title: "Overview", url: "/docs/wallets" },
          { title: "Integration", url: "/docs/wallets/integration" },
          { title: "Best Practices", url: "/docs/wallets/best-practices" },
        ],
      },
      {
        title: "Payment Guards",
        url: "/docs/payment-guards",
        children: [
          { title: "Overview", url: "/docs/payment-guards" },
          { title: "Configuration", url: "/docs/payment-guards/configuration" },
          { title: "Custom Guards", url: "/docs/payment-guards/custom" },
        ],
      },
    ],
  },
  {
    label: "Protocols",
    items: [
      {
        title: "MCP Integration",
        url: "/docs/mcp-integration",
        children: [
          { title: "Overview", url: "/docs/mcp-integration" },
          { title: "Setup", url: "/docs/mcp-integration/setup" },
          { title: "16 Tools Reference", url: "/docs/mcp-integration/api" },
        ],
      },
      {
        title: "Nanopayments",
        url: "/docs/nanopayments",
        badge: "new",
        children: [
          { title: "Overview", url: "/docs/nanopayments" },
          { title: "EIP-3009 Signing", url: "/docs/nanopayments/signing" },
          { title: "Seller Middleware", url: "/docs/nanopayments/middleware" },
        ],
      },
      { title: "Cross-chain (CCTP)", url: "/docs/cctp" },
    ],
  },
  {
    label: "Security",
    items: [
      {
        title: "Trust Gate (ERC-8004)",
        url: "/docs/trust-gate",
        children: [
          { title: "Overview", url: "/docs/trust-gate" },
          { title: "10-Check Pipeline", url: "/docs/trust-gate/pipeline" },
          { title: "Trust Score (WTS)", url: "/docs/trust-gate/wts" },
        ],
      },
      {
        title: "Policy Reference",
        url: "/docs/policy-reference",
        children: [
          { title: "Guard Config Schema", url: "/docs/policy-reference" },
          { title: "Examples", url: "/docs/policy-reference/examples" },
        ],
      },
    ],
  },
  {
    label: "Production",
    items: [
      {
        title: "Production Hardening",
        url: "/docs/production",
        children: [
          { title: "Overview", url: "/docs/production" },
          { title: "Circuit Breaker", url: "/docs/production/circuit-breaker" },
          { title: "Idempotency", url: "/docs/production/idempotency" },
        ],
      },
    ],
  },
  {
    label: "API Reference",
    items: [
      {
        title: "SDK Methods",
        url: "/docs/api-reference/pay",
        children: [
          { title: "client.pay()", url: "/docs/api-reference/pay" },
          { title: "create_agent_wallet()", url: "/docs/api-reference/wallet" },
          { title: "trust_lookup()", url: "/docs/api-reference/trust" },
        ],
      },
    ],
  },
];

// ── NavItem row ────────────────────────────────────────────────────────
interface NavRowProps {
  item: NavItem;
  expanded: Record<string, boolean>;
  toggle: (key: string) => void;
}

const NavRow = ({ item, expanded, toggle }: NavRowProps) => {
  const location = useLocation();
  const key = item.url.split("/").pop() || "";
  const isExpanded = expanded[key];
  const hasChildren = !!item.children?.length;

  const isChildActive = item.children?.some(
    (c) => location.pathname === c.url || location.pathname.startsWith(c.url + "/")
  );
  const isSelfActive = location.pathname === item.url;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => toggle(key)}
          className={cn(
            "w-full flex items-center justify-between py-1.5 px-2 text-[13px] rounded-md transition-colors duration-150",
            isSelfActive || isChildActive
              ? "text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
          )}
        >
          <span className="flex items-center gap-2 text-left">
            {item.title}
            {item.badge && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-primary/15 text-primary">
                {item.badge}
              </span>
            )}
          </span>
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-muted-foreground/60 transition-transform duration-150",
              isExpanded && "rotate-90"
            )}
          />
        </button>
        {isExpanded && (
          <div className="mt-0.5 mb-1 ml-2 pl-3 border-l border-border/50 space-y-0.5">
            {item.children?.map((child) => (
              <NavLink
                key={child.url}
                to={child.url}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-1.5 px-2 text-[13px] rounded-md transition-colors duration-150",
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
                  )
                }
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.url}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 py-1.5 px-2 text-[13px] rounded-md transition-colors duration-150",
          isActive
            ? "text-primary font-medium bg-primary/8"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
        )
      }
    >
      {item.title}
      {item.badge && (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-primary/15 text-primary">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
};

// ── Sidebar component ──────────────────────────────────────────────────
interface DocsSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const DocsSidebar = ({ collapsed = false, onToggle }: DocsSidebarProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    navGroups.forEach((g) =>
      g.items.forEach((item) => {
        init[item.url.split("/").pop() || ""] = true;
      })
    );
    return init;
  });

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  // ── Collapsed icon rail ────────────────────────────────
  if (collapsed) {
    return (
      <div className="flex flex-col items-center h-full gap-1 pt-3 pb-3">
        <Link
          to="/"
          className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary shrink-0 mb-2"
          title="OmniClaw Home"
        >
          <span className="text-[11px] font-bold text-black">OC</span>
        </Link>
        {onToggle && (
          <button
            onClick={onToggle}
            title="Expand sidebar"
            className="flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </button>
        )}
        <div className="flex-1" />
        <div className="flex flex-col items-center gap-3 pb-4">
          {navGroups.map((g) => (
            <div
              key={g.label}
              className="h-1.5 w-1.5 rounded-full bg-border"
              title={g.label}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar header */}
      <div className="px-4 pt-5 pb-4 border-b border-border">
        <div className="flex items-start justify-between mb-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-black">OC</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground leading-none mb-0.5 group-hover:text-primary transition-colors">
              OmniClaw
            </div>
            <div className="text-[11px] text-muted-foreground">SDK Documentation</div>
          </div>
        </Link>
        {onToggle && (
          <button
            onClick={onToggle}
            title="Collapse sidebar"
            className="flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0 mt-0.5"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-primary/10 text-primary border border-primary/20">
            v1.0.0
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono text-muted-foreground bg-muted/60 border border-border/50">
            Python 3.10+
          </span>
        </div>
      </div>

      {/* Navigation groups */}
      <nav className="flex-1 overflow-y-auto scrollbar-docs px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="px-2 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {group.label}
              </span>
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavRow
                  key={item.url}
                  item={item}
                  expanded={expanded}
                  toggle={toggle}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border">
        <a
          href="https://github.com/omnuron/omniclaw"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>View on GitHub</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default DocsSidebar;
