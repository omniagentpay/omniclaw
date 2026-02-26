import { MessageSquare, Wallet, Play, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CodeBlock from "./CodeBlock";

const MCPIntegrationContent = () => {

  const installationCode = `# Using uv (recommended)
uv add omniclaw

# Or using pip
pip install omniclaw`;

  const configCode = `# In your Claude Desktop MCP configuration
# ~/.config/claude_desktop/claude_desktop_config.json

{
  "mcpServers": {
    "omniclaw": {
      "command": "uvx",
      "args": ["omniclaw-mcp"],
      "env": {
        "CIRCLE_API_KEY": "your_circle_api_key_here"
      }
    }
  }
}`;

  return (
    <article className="max-w-none">
      {/* Hero Section */}
      <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 tracking-tight font-display text-foreground">
            OmniClaw for MCP
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl">
            Enable Claude Desktop and other MCP-compatible AI assistants to execute
            payments autonomously with enterprise-grade security and guard systems.
          </p>
        </div>

        {/* Hero Graphic */}
        <div className="relative my-8 sm:my-12 md:my-16 py-6 sm:py-8 md:py-12">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 hidden md:block">
            <div className="absolute inset-0 bg-primary animate-pulse opacity-40" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center max-w-5xl mx-auto">
            {/* Claude Desktop Chat Bubble */}
            <div className="relative">
              <div className="bg-card border border-border/20 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-foreground mb-1">Claude</div>
                    <div className="text-xs text-muted-foreground">Claude Desktop</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-sm text-foreground/80 leading-relaxed">
                    "Purchase 50 USDC worth of API credits from the vendor."
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Processing payment...
                  </div>
                </div>
              </div>
            </div>

            {/* OmniClaw Payment Ledger */}
            <div className="relative">
              <div className="bg-obsidian-light border border-border/20 rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">OmniClaw Ledger</div>
                    <div className="text-xs text-muted-foreground">Payment Execution</div>
                  </div>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-border/20">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-[#10b981]">SETTLED</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/20">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="text-foreground">50.00 USDC</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/20">
                    <span className="text-muted-foreground">Network:</span>
                    <span className="text-foreground">Arc</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Tx Hash:</span>
                    <span className="text-foreground/60">0x7f3a...c9e1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Success Timeline */}
      <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl mx-auto">
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight font-display text-foreground">
            Quick Start
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed">
            Get OmniClaw MCP integration running in three simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 sm:left-8 md:left-10 top-0 bottom-0 w-0.5 bg-border/20" />

          {/* Step 1: Installation */}
          <div className="relative flex gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-[#10b981]/20 border-2 border-[#10b981] flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#10b981]" />
              </div>
            </div>
            <div className="flex-1 pt-1 sm:pt-2">
              <div className="mb-3 sm:mb-4">
                <div className="text-[10px] sm:text-xs font-mono text-muted-foreground mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Step 1
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 font-display text-foreground">
                  Installation
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4 sm:mb-5 md:mb-6">
                  Install OmniClaw using your preferred package manager. We recommend <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">uv</code> for faster dependency resolution.
                </p>
              </div>
              <CodeBlock code={installationCode} language="bash" />
            </div>
          </div>

          {/* Step 2: Configuration */}
          <div className="relative flex gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-[#10b981]/20 border-2 border-[#10b981] flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#10b981]" />
              </div>
            </div>
            <div className="flex-1 pt-1 sm:pt-2">
              <div className="mb-3 sm:mb-4">
                <div className="text-[10px] sm:text-xs font-mono text-muted-foreground mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Step 2
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 font-display text-foreground">
                  Configuration
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4 sm:mb-5 md:mb-6">
                  Configure your MCP server with your Circle API key. Add the OmniClaw MCP server
                  to your Claude Desktop configuration file.
                </p>
              </div>
              <CodeBlock code={configCode} language="json" />
              <div className="mt-4 p-4 bg-card/50 border border-border/20 rounded-lg">
                <p className="text-sm text-foreground/70">
                  <strong className="text-foreground">Note:</strong> Your Circle API key is securely
                  stored in your MCP server environment. Never commit API keys to version control.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Live Demo */}
          <div className="relative flex gap-4 sm:gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-[#10b981]/20 border-2 border-[#10b981] flex items-center justify-center">
                <Play className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#10b981]" />
              </div>
            </div>
            <div className="flex-1 pt-1 sm:pt-2">
              <div className="mb-3 sm:mb-4">
                <div className="text-[10px] sm:text-xs font-mono text-muted-foreground mb-1.5 sm:mb-2 uppercase tracking-wider">
                  Step 3
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 font-display text-foreground">
                  Live Demo
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4 sm:mb-5 md:mb-6">
                  Watch OmniClaw in action. This demonstration shows Claude Desktop executing
                  a payment through the MCP protocol with full guard system validation.
                </p>
              </div>
              <div className="relative bg-obsidian-light border border-border/20 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="relative z-10 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Video demonstration coming soon
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    This placeholder will show a live recording of the integration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-32 max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto border-t border-border/20 pt-12 sm:pt-16 md:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 font-display text-foreground">
              MCP Protocol Support
            </h3>
            <p className="text-foreground/70 leading-relaxed mb-4">
              OmniClaw implements the Model Context Protocol specification, enabling seamless
              integration with Claude Desktop and other MCP-compatible AI assistants.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              All payment operations are exposed as MCP tools, allowing AI agents to
              autonomously execute transactions with proper guard system oversight.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 font-display text-foreground">
              Security & Compliance
            </h3>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Every payment request flows through OmniClaw's multi-layered guard system,
              ensuring budget limits, rate limits, and recipient validation are enforced.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              All transactions are recorded in the OmniClaw Ledger with full audit trail
              for compliance and debugging purposes.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MCPIntegrationContent;
