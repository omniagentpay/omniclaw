import { NavLink, useLocation, Link } from "react-router-dom";
import { ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Quickstart",
    url: "/docs/quickstart",
  },
  {
    title: "Core Concepts",
    url: "/docs/core-concepts",
    children: [
      { title: "Overview", url: "/docs/core-concepts" },
      { title: "Architecture", url: "/docs/core-concepts/architecture" },
      { title: "Security Model", url: "/docs/core-concepts/security" },
    ],
  },
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
  {
    title: "MCP Integration",
    url: "/docs/mcp-integration",
    children: [
      { title: "Overview", url: "/docs/mcp-integration" },
      { title: "Setup", url: "/docs/mcp-integration/setup" },
      { title: "API Reference", url: "/docs/mcp-integration/api" },
    ],
  },
  {
    title: "Nanopayments",
    url: "/docs/nanopayments",
    children: [
      { title: "Overview", url: "/docs/nanopayments" },
      { title: "EIP-3009 Signing", url: "/docs/nanopayments/signing" },
      { title: "Seller Middleware", url: "/docs/nanopayments/middleware" },
    ],
  },
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
  {
    title: "Cross-chain (CCTP)",
    url: "/docs/cctp",
  },
  {
    title: "Production Hardening",
    url: "/docs/production",
    children: [
      { title: "Overview", url: "/docs/production" },
      { title: "Circuit Breaker", url: "/docs/production/circuit-breaker" },
      { title: "Idempotency", url: "/docs/production/idempotency" },
    ],
  },
  {
    title: "API Reference",
    url: "/docs/api-reference/pay",
    children: [
      { title: "client.pay()", url: "/docs/api-reference/pay" },
      { title: "create_agent_wallet()", url: "/docs/api-reference/wallet" },
      { title: "trust_lookup()", url: "/docs/api-reference/trust" },
    ],
  },
];

const DocsSidebar = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "core-concepts": true,
    wallets: true,
    "payment-guards": true,
    "mcp-integration": true,
    nanopayments: true,
    "trust-gate": true,
    "policy-reference": true,
    production: true,
    "api-reference": true,
  });

  const toggleExpanded = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <nav className="p-6 space-y-1">
      {navItems.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const key = item.url.split("/").pop() || "";
        const isExpanded = expanded[key];

        return (
          <div key={item.url}>
            {hasChildren ? (
              <>
                <button
                  onClick={() => toggleExpanded(key)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "text-muted-foreground"
                  )}
                >
                  <span>{item.title}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isExpanded && "rotate-90"
                    )}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                    {item.children?.map((child) => (
                      <NavLink
                        key={child.url}
                        to={child.url}
                        className={({ isActive }) =>
                          cn(
                            "block px-3 py-2 text-sm rounded-md transition-colors border border-transparent",
                            isActive
                              ? "bg-accent text-accent-foreground border-border"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          )
                        }
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 text-sm rounded-md transition-colors border",
                    isActive
                      ? "bg-accent text-accent-foreground border-border"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground border-transparent"
                  )
                }
              >
                {item.title}
              </NavLink>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default DocsSidebar;
