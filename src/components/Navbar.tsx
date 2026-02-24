const Navbar = () => {
  const links = [
    { label: "Docs", href: "#docs" },
    { label: "Github", href: "#github" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">O</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            OmniClaw
          </span>
        </div>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#get-started"
            className="btn-shimmer glow-pulse rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
