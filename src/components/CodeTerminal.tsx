const CodeTerminal = () => {
  const lines = [
    { prefix: ">>>", code: 'from omniclaw import Agent, PaymentClient' },
    { prefix: ">>>", code: 'client = PaymentClient(api_key="sk_live_...")' },
    { prefix: ">>>", code: 'client.pay(to="vendor_ai", amount=0.003, currency="USDC")' },
  ];

  return (
    <div className="terminal-bg overflow-hidden max-w-2xl mx-auto">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="h-3 w-3 rounded-full bg-destructive/60" />
        <div className="h-3 w-3 rounded-full bg-primary/40" />
        <div className="h-3 w-3 rounded-full bg-accent/40" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">agent_payment.py</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 space-y-2">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-3 font-mono text-sm">
            <span className="text-primary shrink-0">{line.prefix}</span>
            <span className="text-foreground/90">{line.code}</span>
          </div>
        ))}
        <div className="flex gap-3 font-mono text-sm mt-3">
          <span className="text-accent">✓</span>
          <span className="text-accent">Payment confirmed — tx_7f3a...c9e1</span>
        </div>
        <div className="flex gap-3 font-mono text-sm">
          <span className="text-primary">{">>>"}</span>
          <span className="h-4 w-2 bg-primary animate-terminal-blink" />
        </div>
      </div>
    </div>
  );
};

export default CodeTerminal;
