import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Language = "python" | "typescript" | "curl";

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
}

const parameters: Parameter[] = [
  {
    name: "wallet_id",
    type: "string",
    required: true,
    description: "The unique identifier of the wallet to send payment from",
  },
  {
    name: "recipient",
    type: "string",
    required: true,
    description: "The recipient address or identifier. Can be a blockchain address (0x...) or x402 endpoint URL (https://...)",
  },
  {
    name: "amount",
    type: "string",
    required: true,
    description: "The amount to send as a string (e.g., '10.50')",
  },
  {
    name: "purpose",
    type: "string",
    required: false,
    description: "Optional description of the payment purpose for ledger records",
  },
  {
    name: "strategy",
    type: "string",
    required: false,
    description: "Retry strategy: 'fail_fast' | 'retry_then_fail' | 'queue_background'",
    default: "retry_then_fail",
  },
  {
    name: "check_trust",
    type: "bool | None",
    required: false,
    description: "ERC-8004 trust check: True (force), False (skip), None (auto)",
    default: "None",
  },
  {
    name: "destination_chain",
    type: "Network",
    required: false,
    description: "For cross-chain payments, specify the destination blockchain network",
  },
];

const codeExamples: Record<Language, string> = {
  python: `from omniclaw import OmniClaw, Network

client = OmniClaw(network=Network.ARC_TESTNET)

# Execute payment
result = await client.pay(
    wallet_id=wallet.id,
    recipient="0x742d35Cc6634C0532925a3b844Bc9e7595f5e4a0",
    amount="10.50",
    purpose="Server costs for Jan 2025",
    strategy="retry_then_fail",
    check_trust=True
)

if result.success:
    print(f"Payment Confirmed! Tx: {result.blockchain_tx}")
    print(f"Trust Score: {result.metadata['trust']['wts']}")`,
  typescript: `import { OmniClaw, Network } from '@omniclaw/sdk';

const client = new OmniClaw({
  apiKey: 'your_api_key',
  network: Network.ARC
});

// Execute payment with x402 handshake
const result = await client.pay({
  wallet_id: 'wallet_abc123',
  recipient: 'https://vendor.example.com/pay',
  amount: 50.00,
  currency: 'USDC',
  metadata: { order_id: 'order_456' }
});

console.log(\`Status: \${result.status}\`);
console.log(\`Transaction: \${result.tx_hash}\`);`,
  curl: `curl -X POST https://api.omniclaw.com/v1/payments \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "wallet_id": "wallet_abc123",
    "recipient": "https://vendor.example.com/pay",
    "amount": "50.00",
    "currency": "USDC",
    "metadata": {
      "order_id": "order_456"
    }
  }'`,
};

const responseExample = {
  status: "settled",
  tx_hash: "0x7f3a8b2c9e1d4f6a5b8c3d2e1f4a7b9c6d5e8f2a1b4c7d9e2f5a8b1c4d7e0f3a",
  network: "Arc",
  amount: "50.00",
  currency: "USDC",
  timestamp: "2024-01-15T10:30:00Z",
  x402_handshake: {
    endpoint: "https://vendor.example.com/pay",
    method: "POST",
    status_code: 200,
    response_time_ms: 145,
  },
};

const PayReferenceContent = () => {
  const [language, setLanguage] = useState<Language>("python");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTokenColor = (token: string, text: string): string => {
    // Tokyo Night / Vesper theme colors
    const colors: Record<string, string> = {
      keyword: "text-[#bb9af7]", // Purple
      string: "text-[#9ece6a]", // Green
      number: "text-[#ff9e64]", // Orange
      function: "text-[#7aa2f7]", // Blue
      comment: "text-[#565f89]", // Comment gray
      operator: "text-[#89ddff]", // Cyan
      punctuation: "text-[#c0caf5]", // Light blue
      default: "text-[#c0caf5]", // Default text
    };

    // Simple token detection
    if (text.startsWith("#") || text.startsWith("//")) return colors.comment;
    if (/^["'`]/.test(text)) return colors.string;
    if (/^\d/.test(text)) return colors.number;
    if (["await", "async", "import", "from", "const", "let", "var", "function", "class", "return", "if", "else"].includes(text.trim())) return colors.keyword;
    if (["=", "+", "-", "*", "/", "=>", "==", "!="].includes(text)) return colors.operator;
    if ([".", ",", ";", ":", "(", ")", "{", "}", "[", "]"].includes(text)) return colors.punctuation;
    
    return colors.default;
  };

  const highlightCode = (code: string, lang: Language): JSX.Element[] => {
    if (lang === "curl") {
      // Simple curl highlighting
      const lines = code.split("\n");
      return lines.map((line, i) => {
        const isHeader = line.includes("-H");
        const isData = line.includes("-d");
        const isUrl = line.includes("curl") || line.includes("https://");
        
        return (
          <span key={i} className={cn(
            isHeader && "text-[#7aa2f7]",
            isData && "text-[#9ece6a]",
            isUrl && "text-[#bb9af7]",
            !isHeader && !isData && !isUrl && "text-[#c0caf5]"
          )}>
            {line}
            {i < lines.length - 1 && "\n"}
          </span>
        );
      });
    }

    // Python/TypeScript highlighting
    const tokens = code.split(/(\s+|["'`].*?["'`]|\d+\.?\d*|[=+\-*/(){}[\];:,.<>!&|]+|\w+)/);
    return tokens.map((token, i) => (
      <span key={i} className={getTokenColor("", token)}>
        {token}
      </span>
    ));
  };

  return (
    <article className="max-w-none">
      <div className="mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 tracking-tight font-display text-foreground">
          client.pay()
        </h1>
        <p className="text-foreground/80 text-sm sm:text-base md:text-lg leading-relaxed">
          Execute a payment with automatic x402 protocol handshake. This method handles the complete
          payment flow including recipient verification, guard checks, and transaction settlement.
        </p>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
        {/* Left: Parameter List */}
        <div className="border border-border/5 rounded-lg bg-card p-4 sm:p-5 md:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 font-display text-foreground">
            Parameters
          </h2>
          <div className="space-y-6">
            {parameters.map((param) => (
              <div key={param.name} className="border-b border-border/5 pb-6 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-3 mb-2">
                  <code className="text-[#7aa2f7] font-mono text-sm font-semibold">
                    {param.name}
                  </code>
                  {param.required && (
                    <span className="text-xs px-2 py-0.5 rounded bg-destructive/20 text-destructive">
                      required
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground font-mono mb-2">
                  {param.type}
                  {param.default && (
                    <span className="text-foreground/60"> = {param.default}</span>
                  )}
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {param.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Code Playground */}
        <div className="border border-border/5 rounded-lg bg-card overflow-hidden">
          {/* Language Toggle */}
          <div className="border-b border-border/5 px-3 sm:px-4 py-2 sm:py-3 flex gap-1.5 sm:gap-2 flex-wrap">
            {(["python", "typescript", "curl"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  language === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {lang === "python" ? "Python" : lang === "typescript" ? "TypeScript" : "cURL"}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative">
            <div className="bg-obsidian-light p-5 overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {highlightCode(codeExamples[language], language)}
              </pre>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3 h-8 w-8 p-0"
              onClick={() => copyToClipboard(codeExamples[language])}
            >
              {copied ? (
                <Check className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Response Preview */}
          <div className="border-t border-border/5">
            <div className="px-4 py-3 border-b border-border/5">
              <h3 className="text-sm font-semibold text-foreground">Response Preview</h3>
            </div>
            <div className="bg-obsidian-light p-5">
              <pre className="font-mono text-xs leading-relaxed overflow-x-auto">
                <span className="text-[#565f89]">// x402 handshake successful</span>
                {"\n"}
                <span className="text-[#c0caf5]">{"{"}</span>
                {"\n"}
                <span className="text-[#7aa2f7]">  "status"</span>
                <span className="text-[#c0caf5]">: </span>
                <span className="text-[#9ece6a]">"{responseExample.status}"</span>
                <span className="text-[#c0caf5]">,</span>
                {"\n"}
                <span className="text-[#7aa2f7]">  "tx_hash"</span>
                <span className="text-[#c0caf5]">: </span>
                <span className="text-[#9ece6a]">"{responseExample.tx_hash}"</span>
                <span className="text-[#c0caf5]">,</span>
                {"\n"}
                <span className="text-[#7aa2f7]">  "network"</span>
                <span className="text-[#c0caf5]">: </span>
                <span className="text-[#9ece6a]">"{responseExample.network}"</span>
                {"\n"}
                <span className="text-[#c0caf5]">{"}"}</span>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Return Value Section */}
      <div className="mt-12 border-t border-border/5 pt-12">
        <h2 className="text-3xl font-bold mb-6 font-display tracking-tight text-foreground border-t border-border pt-12">
          Return Value
        </h2>
        <p className="text-foreground/80 mb-6 leading-relaxed">
          Returns a <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">PaymentResult</code> object
          containing the transaction details, ERC-8004 trust evaluation results, and execution metadata.
        </p>
        <div className="border border-border/5 rounded-lg bg-card p-6">
          <div className="bg-obsidian-light p-5 rounded-lg">
            <pre className="font-mono text-sm leading-relaxed overflow-x-auto">
              <span className="text-[#c0caf5]">{"{"}</span>
              {"\n"}
              <span className="text-[#7aa2f7]">  success</span>
              <span className="text-[#c0caf5]">: </span>
              <span className="text-[#ff9e64]">bool</span>
              <span className="text-[#c0caf5]">,</span>
              {"\n"}
              <span className="text-[#7aa2f7]">  blockchain_tx</span>
              <span className="text-[#c0caf5]">: </span>
              <span className="text-[#9ece6a]">string</span>
              <span className="text-[#c0caf5]">,</span>
              {"\n"}
              <span className="text-[#7aa2f7]">  metadata</span>
              <span className="text-[#c0caf5]">: </span>
              <span className="text-[#c0caf5]">{"{"}</span>
              {"\n"}
              <span className="text-[#7aa2f7]">    trust</span>
              <span className="text-[#c0caf5]">: </span>
              <span className="text-[#c0caf5]">{"{"}</span>
              {"\n"}
              <span className="text-[#7aa2f7]">      wts</span>
              <span className="text-[#c0caf5]">: </span>
              <span className="text-[#ff9e64]">number</span>
              <span className="text-[#c0caf5]">,</span>
              {"\n"}
              <span className="text-[#7aa2f7]">      verdict</span>
              <span className="text-[#c0caf5]">: </span>
              <span className="text-[#9ece6a]">"APPROVED" | "HELD" | "BLOCKED"</span>
              {"\n"}
              <span className="text-[#c0caf5]">    {"}"}</span>
              {"\n"}
              <span className="text-[#c0caf5]">  {"}"}</span>
              {"\n"}
              <span className="text-[#c0caf5]">{"}"}</span>
            </pre>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PayReferenceContent;
