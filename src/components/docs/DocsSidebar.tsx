import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
    title: "API Reference",
    url: "/docs/api-reference/pay",
    children: [
      { title: "client.pay()", url: "/docs/api-reference/pay" },
    ],
  },
];

const DocsSidebar = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "core-concepts": true,
    wallets: true,
    "payment-guards": true,
    "mcp-integration": true,
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
