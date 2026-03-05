import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const products = [
    { label: "OmniCall", href: "/products#omnicall", description: "Voice negotiation system" },
    { label: "OmniCoreAgent", href: "/products#omnicoreagent", description: "AI agent framework" },
    { label: "OmniDaemon", href: "/products#omnidaemon", description: "Event-driven runtime" },
    { label: "OmniMemory", href: "/products#omnimemory", description: "Persistent memory system" },
  ];

  const otherLinks = [
    { label: "Docs", href: "/docs" },
    { label: "Github", href: "https://github.com/omnuron/omniclaw" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-glass-border bg-background/40 backdrop-blur-2xl">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="OmniClaw logo" className="h-8 w-8 sm:h-9 sm:w-9 rounded-md" />
          <span className="font-display font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-foreground tracking-tight">
            OmniClaw
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          {/* Products Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              onClick={() => setIsProductsOpen(!isProductsOpen)}
              className="text-xs sm:text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground flex items-center gap-1"
            >
              Products
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  isProductsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 mt-2 w-48 rounded-lg border border-glass-border bg-card/95 backdrop-blur-xl shadow-lg transition-all duration-200 overflow-hidden ${
                isProductsOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <div className="py-2">
                {products.map((product) => (
                  <Link
                    key={product.label}
                    to={product.href}
                    onClick={() => setIsProductsOpen(false)}
                    className="block px-4 py-2.5 hover:bg-primary/10 transition-colors duration-150 border-l-2 border-transparent hover:border-primary"
                  >
                    <div className="text-xs sm:text-sm text-foreground font-medium">
                      {product.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {product.description}
                    </div>
                  </Link>
                ))}
                <div className="border-t border-border my-2" />
                <Link
                  to="/products"
                  onClick={() => setIsProductsOpen(false)}
                  className="block px-4 py-2.5 hover:bg-primary/10 transition-colors duration-150 text-xs sm:text-sm text-primary font-medium"
                >
                  View All Products →
                </Link>
              </div>
            </div>
          </div>

          {/* Other Links */}
          {otherLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs sm:text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}

          <a
            href="#get-started"
            className="btn-shimmer rounded-lg bg-primary px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 whitespace-nowrap"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
