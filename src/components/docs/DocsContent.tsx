import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

const docsContent: Record<string, string> = {
  "/docs/quickstart": `# Quickstart

Get started with OmniClaw in minutes.

## Installation

\`\`\`bash
pip install omniclaw
\`\`\`

Or using \`uv\` (recommended for speed):

\`\`\`bash
uv add omniclaw
\`\`\`

**Requirements:**
- Python 3.10+
- A Circle Web3 Services API Key ([Get one here](https://console.circle.com))

## Get Started in 3 Lines

\`\`\`python
from omniclaw import OmniClaw

client = OmniClaw()  # Reads CIRCLE_API_KEY from env
result = await client.pay(wallet_id="...", recipient="0x...", amount=10.00)
\`\`\`

**Zero blockchain complexity. Zero private key management. One \`pay()\` call.**

## Complete Quick Start

### 1. Initialize the Client

\`\`\`python
import logging
from omniclaw import OmniClaw, Network

client = OmniClaw(
    network=Network.ARC_TESTNET,
    log_level=logging.INFO,
    trust_policy="standard",              # ERC-8004: "permissive" | "standard" | "strict"
    rpc_url="https://eth.llamarpc.com",    # RPC for on-chain identity reads
)
\`\`\`

### 2. Create a Wallet

\`\`\`python
wallet_set, wallet = await client.create_agent_wallet(agent_name="Agent-007")
print(f"Agent Wallet Address: {wallet.address}")
\`\`\`

### 3. Add Safety Guards

\`\`\`python
await client.add_budget_guard(wallet.id, daily_limit="100.00")
await client.add_recipient_guard(wallet.id, mode="whitelist",
    domains=["api.openai.com", "anthropic.com"])
\`\`\`

### 4. Execute Payment

\`\`\`python
result = await client.pay(
    wallet_id=wallet.id,
    recipient="0x742d35Cc6634C0532925a3b844Bc9e7595f5e4a0",
    amount="10.50",
    purpose="Server costs for Jan 2025",
    strategy="retry_then_fail",  # "fail_fast" | "retry_then_fail" | "queue_background"
    check_trust=True,            # ERC-8004 check: True | False | None (auto)
)
if result.success:
    print(f"Payment Confirmed! Tx: {result.blockchain_tx}")
    print(f"Trust Score: {result.metadata['trust']['wts']}")  # ERC-8004 WTS
\`\`\`

The \`pay()\` pipeline runs **10 steps** automatically:

1. **Trust Gate** (ERC-8004) → identity check + reputation scoring → \`APPROVED\` / \`HELD\` / \`BLOCKED\`
2. **Ledger entry** → audit trail created
3. **Guard chain** → budget, rate, recipient, confirm checks (atomic reserve)
4. **Fund lock** → distributed mutex acquired
5. **Balance check** → available = balance − reservations
6. **Circuit breaker** → check upstream health
7. **Router** → select adapter (Transfer / x402 / CCTP)
8. **Execute** → with retry strategy
9. **Commit/release** → guards finalized or rolled back
10. **Unlock** → mutex released

## Next Steps

- Read about [Core Concepts](/docs/core-concepts)
- Set up [Wallets](/docs/wallets)
- Configure [Payment Guards](/docs/payment-guards)
- Explore [MCP Integration](/docs/mcp-integration)
`,

  "/docs/core-concepts": `# Core Concepts

Understanding the fundamental architecture of OmniClaw.

## What is OmniClaw?

OmniClaw is a **developer SDK** that provides the complete payment infrastructure layer for autonomous AI agents. It's the first SDK to combine **payment execution**, **agent identity verification** (ERC-8004), and **enterprise-grade resilience** in a single library.

> 💡 *Think of it as Stripe for AI agents—except instead of helping merchants accept payments, we help agents make payments, verify trust, and coordinate safely.*

## Core Architecture

OmniClaw operates across three layers:

**Application Layer** → Research Agent, Trading Bot, HR Agent, Agent Swarms (Built with: LangChain, OmniCoreAgent, AutoGPT, etc.)

**OmniClaw SDK** → Trust Gate (ERC-8004), Safety Kernel (5 Guards), Payment Router (Transfer/x402/CCTP), Identity Resolver, Fund Lock (2PC/Mutex), Resilience (Circuit/Retry/Backoff), Intents (Auth/Capture), Ledger (Audit Trail), Webhooks

**Protocol Layer** → x402, ERC-8004, CCTP, UCP, AP2

**Blockchain Layer** → Ethereum, Base, Arbitrum, Optimism, Polygon, Solana

## Key Capabilities

| Capability | Description |
|:-----------|:------------|
| 💳 **Developer-Controlled Wallets** | USDC wallets powered by Circle with full programmatic control |
| 🛡️ **Safety Kernel** | Budget, rate, transaction, and recipient guards with atomic guarantees |
| 🌐 **Universal Payment Routing** | Seamless routing across x402 APIs, direct transfers, and cross-chain (CCTP) |
| 🔐 **ERC-8004 Trust Gate** | On-chain agent identity verification + reputation scoring |
| 🔒 **2-Phase Commit & Fund Locking** | Distributed mutex locks prevent double-spending across agent swarms |
| ⚡ **Circuit Breaker & Retry** | Distributed resilience layer with exponential backoff |
| 📊 **Complete Observability** | Built-in ledger, webhooks, and analytics for every transaction |
| 🔌 **Framework Agnostic** | Works with LangChain, OmniCoreAgent, AutoGPT, or any custom agent |

## Module Map

| Module | Path | Purpose |
|:-------|:-----|:--------|
| **Client** | \`omniclaw/client.py\` | Main SDK entry point — \`OmniClaw\` class |
| **Trust Gate** | \`omniclaw/trust/\` | ERC-8004 trust evaluation pipeline |
| **Identity** | \`omniclaw/identity/\` | Agent identity resolution & types |
| **Guards** | \`omniclaw/guards/\` | 5 safety guards with atomic guarantees |
| **Payment Router** | \`omniclaw/payment/\` | Intelligent routing (Transfer, x402, CCTP) |
| **Protocols** | \`omniclaw/protocols/\` | x402, CCTP adapter implementations |
| **Intents** | \`omniclaw/intents/\` | Auth/Capture workflows + fund reservation |
| **Ledger** | \`omniclaw/ledger/\` | Transaction audit trail + fund locking (2PC) |
| **Resilience** | \`omniclaw/resilience/\` | Circuit breaker + retry with backoff |
| **Storage** | \`omniclaw/storage/\` | Memory & Redis backends |
| **Core** | \`omniclaw/core/\` | Types, exceptions, ERC-8004 ABIs, config |
| **Webhooks** | \`omniclaw/webhooks/\` | Ed25519 signature verification |
| **Wallet** | \`omniclaw/wallet/\` | Circle wallet management |
`,

  "/docs/wallets": `# Wallet Management

OmniClaw provides programmatic wallet management through Circle's Web3 Services API. All wallets are developer-controlled with no private key management required.

## Agent Wallets

Create wallets for autonomous AI agents:

\`\`\`python
wallet_set, wallet = await client.create_agent_wallet(
    agent_name="ShoppingBot-1",
    blockchain=Network.ARC
)
print(f"Wallet Address: {wallet.address}")
print(f"Wallet ID: {wallet.id}")
\`\`\`

## User Wallets

Create wallets for end users:

\`\`\`python
wallet_set, wallet = await client.create_user_wallet(
    user_id="user_88123",
    blockchain=Network.SOLANA
)
\`\`\`

## Wallet Sets

Organize multiple wallets into sets for agent swarms or multi-chain deployments:

\`\`\`python
marketing_swarm = await client.create_wallet_set(name="marketing-swarm")
agent_a = await client.create_wallet(wallet_set_id=marketing_swarm.id, blockchain=Network.ETH)
agent_b = await client.create_wallet(wallet_set_id=marketing_swarm.id, blockchain=Network.ARC)
\`\`\`

## Supported Blockchains

OmniClaw supports wallets on multiple blockchain networks:

- **Ethereum** (Mainnet & Sepolia)
- **Base** (Mainnet & Sepolia)
- **Arbitrum** (Mainnet & Testnet)
- **Optimism** (Mainnet & Testnet)
- **Polygon** (Mainnet & Testnet)
- **Solana** (Mainnet & Devnet)

## Wallet Features

- **Zero Private Key Management** — All keys are managed by Circle
- **Multi-Chain Support** — Create wallets on any supported blockchain
- **Programmatic Control** — Full API control over wallet operations
- **USDC Native** — All wallets operate with USDC by default
- **Audit Trail** — All wallet operations are logged in the OmniClaw Ledger
`,

  "/docs/payment-guards": `# Payment Guards

Configure security guards to protect your cross-chain transactions.

## Overview

Payment guards provide multiple layers of security for your transactions.

## Configuration

Learn how to configure guards for your specific use case.
`,

  "/docs/mcp-integration": `# MCP Integration

Integrate OmniClaw with the Model Context Protocol.

## Overview

MCP integration allows AI models to interact with OmniClaw's payment infrastructure.

## Setup

Get started with MCP integration in your application.
`,
};

const DocsContent = () => {
  const location = useLocation();
  const content = docsContent[location.pathname] || docsContent["/docs/quickstart"];

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-obsidian-light">
      <div className="[&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:md:text-5xl [&_h1]:lg:text-6xl [&_h1]:2xl:text-7xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:sm:mb-5 [&_h1]:md:mb-6 [&_h1]:mt-0 [&_h1]:tracking-tight [&_h1]:font-display [&_h1]:text-foreground [&_section]:mb-8 [&_section]:sm:mb-10 [&_section]:md:mb-12">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: ({ node, inline, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const codeString = String(children).replace(/\n$/, "");
              
              if (!inline && language) {
                return <CodeBlock code={codeString} language={language} className="my-6" />;
              }
              
              return (
                <code
                  className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            h2: ({ children }: any) => (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-5 md:mb-6 font-display tracking-tight border-t border-border pt-8 sm:pt-10 md:pt-12 first:mt-0 first:border-t-0 first:pt-0">
                {children}
              </h2>
            ),
            h3: ({ children }: any) => (
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-6 sm:mt-7 md:mt-8 mb-3 sm:mb-3.5 md:mb-4 font-display">
                {children}
              </h3>
            ),
            p: ({ children }: any) => (
              <p className="text-foreground/80 leading-relaxed mb-6">{children}</p>
            ),
            ul: ({ children }: any) => (
              <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/80">
                {children}
              </ul>
            ),
            ol: ({ children }: any) => (
              <ol className="list-decimal list-inside mb-6 space-y-2 text-foreground/80">
                {children}
              </ol>
            ),
            a: ({ href, children }: any) => (
              <a
                href={href}
                className="text-primary hover:underline"
              >
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default DocsContent;
