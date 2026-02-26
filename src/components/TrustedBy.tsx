import ScrollReveal from "./ScrollReveal";

const brands = [
  "OpenAI", "Anthropic", "LangChain", "Chainlink",
  "Polygon", "Stripe", "Circle", "Alchemy",
];

const TrustedBy = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 border-t border-glass-border">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="text-center text-xs font-mono text-muted-foreground tracking-widest uppercase mb-12">
            Trusted by teams building the future
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-items-center">
            {brands.map((brand) => (
              <div
                key={brand}
                className="text-muted-foreground/40 font-display font-semibold text-lg tracking-tight transition-colors duration-300 hover:text-muted-foreground/70 select-none"
              >
                {brand}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TrustedBy;
