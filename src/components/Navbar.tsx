import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
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
          {links.map((link) => (
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
          ))}
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
