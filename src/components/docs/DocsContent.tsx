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

  "/docs/nanopayments": `# Nanopayments (EIP-3009)

Gas-free sub-cent USDC micro-payments via Circle Gateway batch settlement.

## Overview

The Nanopayments adapter implements EIP-3009 \`TransferWithAuthorization\` — buyers sign an EIP-712 message and Circle batches the settlement. This makes sub-cent API metering economical at any scale.

**Key properties:**
- Zero gas cost per payment — Circle absorbs and batches
- Minimum denomination: \`$0.00050\` (configurable)
- Auto-routed: any \`amount < nanopayments_micro_threshold\` uses this adapter
- Full guard kernel applied before signing

## Quick Start

\`\`\`python
from omniclaw.protocols.nanopayments import NanopaymentClient

nano = NanopaymentClient(
    wallet=agent_wallet,
    gateway_address="0xCircleGateway...",
    domain_name="GatewayWalletBatched",
    domain_version="1",
)

# Authorize a micro-payment (EIP-712 signed, not yet settled)
auth = await nano.authorize(
    to="0xSeller...",
    amount="0.00050",
    valid_after=0,
    valid_before=int(time.time()) + 3600,
)

# Circle batches and settles at end of epoch
\`\`\`

## Auto-Routing via OmniClaw.pay()

You don't need to use NanopaymentClient directly. The main \`pay()\` method auto-routes:

\`\`\`python
# Amounts below threshold are automatically sent via Nanopayments
result = await client.pay(
    from_wallet_id=wallet.id,
    to="0xSeller...",
    amount="0.00050",   # Below threshold → Nanopayments adapter selected
    currency="USDC",
)
\`\`\`

## Seller Middleware (FastAPI)

Accept micro-payments in your API with three lines:

\`\`\`python
from fastapi import FastAPI, Depends
from omniclaw.protocols.nanopayments.middleware import GatewayMiddleware

app = FastAPI()
payment = GatewayMiddleware(gateway_address="0xCircleGateway...")

@app.get("/api/data")
async def get_data(verified=Depends(payment.verify)):
    return {"data": "premium content"}
\`\`\`
`,

  "/docs/nanopayments/signing": `# EIP-3009 Signing

Technical details of the EIP-712 authorization signature used by Nanopayments.

## Domain Separator

\`\`\`python
domain = {
    "name": "GatewayWalletBatched",
    "version": "1",
    "chainId": chain_id,
    "verifyingContract": gateway_address,
}
\`\`\`

## TransferWithAuthorization Type

\`\`\`python
types = {
    "TransferWithAuthorization": [
        {"name": "from",         "type": "address"},
        {"name": "to",           "type": "address"},
        {"name": "value",        "type": "uint256"},
        {"name": "validAfter",   "type": "uint256"},
        {"name": "validBefore",  "type": "uint256"},
        {"name": "nonce",        "type": "bytes32"},
    ]
}
\`\`\`

## Signing Example

\`\`\`python
from omniclaw.protocols.nanopayments.signing import build_transfer_authorization

auth = build_transfer_authorization(
    from_address=wallet.address,
    to=recipient,
    value=amount_wei,
    valid_after=0,
    valid_before=int(time.time()) + 3600,
    nonce=os.urandom(32),
    private_key=private_key,
    domain=domain,
)
\`\`\`
`,

  "/docs/nanopayments/middleware": `# Seller Middleware

Expose paid API endpoints with the \`GatewayMiddleware\` FastAPI dependency.

## Installation

\`\`\`bash
pip install omniclaw[nanopayments]
\`\`\`

## Usage

\`\`\`python
from fastapi import FastAPI, Depends, HTTPException
from omniclaw.protocols.nanopayments.middleware import GatewayMiddleware

app = FastAPI()
payment = GatewayMiddleware(
    gateway_address="0xCircleGateway...",
    min_amount="0.00050",
    chain_id=8453,  # Base
)

@app.get("/api/inference")
async def run_inference(auth=Depends(payment.verify)):
    # auth.from_address, auth.amount, auth.nonce available
    return {"result": "..."}
\`\`\`

The middleware:
1. Reads the \`X-Payment-Authorization\` header
2. Verifies the EIP-712 signature against the Gateway contract
3. Rejects expired or replayed nonces
4. Returns \`402 Payment Required\` with payment details if missing
`,

  "/docs/trust-gate": `# Trust Gate (ERC-8004)

On-chain agent identity + reputation verification before every payment.

## Overview

The ERC-8004 Trust Gate is a 10-checkpoint pipeline that verifies agent identity and reputation before authorizing payments. It reads three on-chain registries:

| Registry | Purpose |
|:---------|:--------|
| **Identity Registry** | ERC-721 extension — mints an identity NFT per agent |
| **Reputation Registry** | Accumulates feedback signals with tamper-evidence |
| **Validation Registry** | Cryptographic + economic verification |

## The 10-Check Pipeline

Every inbound payment from an agent runs these checks in sequence:

1. **Blocklist** — Reject if agent address is on blocklist
2. **Admin Whitelist** — Skip remaining checks if explicitly whitelisted
3. **Identity Resolution** — Lookup NFT identity on ERC-8004 registry
4. **Fraud Tag Check** — Reject if agent has active fraud tags
5. **New Agent Check** — Apply stricter policy for newly registered agents
6. **Minimum Signal Count** — Require a minimum number of reputation signals
7. **Minimum WTS** — Require Weighted Trust Score ≥ threshold
8. **High-Value Threshold** — Extra checks for large transactions
9. **Attestation Check** — Verify required attestation types present
10. **Final Approval** — Emit TrustCheckCompleted event

## Configuration

\`\`\`python
client = OmniClaw(
    trust_policy="standard",   # "permissive" | "standard" | "strict"
    rpc_url="https://eth.llamarpc.com",
)

# Or override per-payment
result = await client.pay(
    from_wallet_id=wallet.id,
    to="0xRecipient...",
    amount="100.00",
    check_trust=True,          # Force trust gate regardless of policy
)
\`\`\`

## Deployed Contracts

| Network | Address |
|:--------|:--------|
| Ethereum Mainnet | \`0x8a4E...d9F2\` |
| Base Mainnet | \`0x3C1b...a7E5\` |
| Sepolia Testnet | \`0xF2d9...c8B1\` |
`,

  "/docs/trust-gate/pipeline": `# 10-Check Trust Pipeline

Detailed walkthrough of each checkpoint in the ERC-8004 Trust Gate.

## Check Flow

\`\`\`
Request → [1] Blocklist → [2] Whitelist → [3] Identity → [4] Fraud Tags
        → [5] New Agent → [6] Min Signals → [7] Min WTS
        → [8] High-Value → [9] Attestation → [10] Approve
\`\`\`

Each check can return:
- \`APPROVED\` — passed, continue to next check
- \`HELD\` — requires manual review (ConfirmGuard trigger)
- \`BLOCKED\` — hard rejection, payment does not proceed

## Check 7: Weighted Trust Score (WTS)

The WTS is computed from the Reputation Registry on-chain:

\`\`\`
WTS = Σ(weight_i × score_i × recency_decay_i × verified_submitter_boost_i)
      ─────────────────────────────────────────────────────────────────────
                          Σ(weight_i)
\`\`\`

**Self-reviews are automatically filtered.** Recency decay uses exponential falloff with configurable half-life (default: 90 days).

## Check 8: High-Value Threshold

Triggered when \`amount ≥ trust_gate_config.high_value_usd_threshold\` (default: \`$500\`). Requires:
- WTS ≥ \`high_value_min_wts\` (default: \`0.80\`)
- At least one \`VERIFIED_OPERATOR\` attestation
`,

  "/docs/trust-gate/wts": `# Weighted Trust Score (WTS)

The WTS is OmniClaw's on-chain reputation metric for AI agents.

## Formula

\`\`\`
WTS = Σ(weight_i × score_i × recency_i × boost_i) / Σ(weight_i)
\`\`\`

Where:
- \`score_i\` ∈ [0, 1] — normalized feedback score
- \`weight_i\` — signal weight based on submitter tier
- \`recency_i\` — exponential decay: \`exp(-λ × days_since)\`
- \`boost_i\` — 1.0 for standard, 1.2 for verified submitters

## Score Tiers

| WTS Range | Tier | Behavior |
|:----------|:-----|:---------|
| 0.90–1.00 | Elite | All transactions approved |
| 0.75–0.89 | Verified | Standard transactions approved |
| 0.60–0.74 | Standard | Low-value approved, high-value held |
| 0.40–0.59 | Caution | All held for review |
| 0.00–0.39 | Blocked | All transactions rejected |

## Reading WTS On-Chain

\`\`\`python
# Via OmniClaw SDK
result = await client.trust_lookup("did:erc8004:base:0xAgent...")
print(result.wts)        # 0.87
print(result.tier)       # "verified"
print(result.blocklisted)  # False
\`\`\`
`,

  "/docs/policy-reference": `# Policy Reference

Guard configuration schema and policy management.

## Guard Config Schema

Each guard is configured via a JSON or Python dict. The full schema:

\`\`\`json
{
  "budget": {
    "daily_limit": "100.00",
    "weekly_limit": "500.00",
    "monthly_limit": "2000.00",
    "currency": "USDC",
    "reset_at": "00:00 UTC"
  },
  "rate_limit": {
    "max_transactions_per_minute": 10,
    "max_transactions_per_hour": 100,
    "burst_allowance": 5
  },
  "recipient": {
    "mode": "whitelist",
    "addresses": ["0xABCD...", "0xEF01..."],
    "domains": ["*.openai.com", "api.anthropic.com"],
    "deny_list": ["0xBAD0..."]
  },
  "single_tx": {
    "max_amount": "50.00",
    "currency": "USDC"
  },
  "confirm": {
    "enabled": true,
    "threshold_amount": "25.00",
    "webhook_url": "https://your-app.com/hitl-webhook",
    "timeout_seconds": 300,
    "timeout_action": "reject"
  }
}
\`\`\`

## Applying a Policy

\`\`\`python
await client.add_budget_guard(wallet.id, daily_limit="100.00")
await client.add_rate_limit_guard(wallet.id, max_transactions_per_minute=10)
await client.add_recipient_guard(wallet.id, mode="whitelist",
    domains=["*.openai.com"])
await client.add_single_tx_guard(wallet.id, max_amount="50.00")
await client.add_confirm_guard(wallet.id,
    threshold_amount="25.00",
    webhook_url="https://your-app.com/hitl")
\`\`\`
`,

  "/docs/policy-reference/examples": `# Policy Examples

## Minimal Policy (Development)

\`\`\`python
await client.add_budget_guard(wallet.id, daily_limit="10.00")
\`\`\`

## Standard Agent Policy

\`\`\`python
await client.add_budget_guard(wallet.id, daily_limit="100.00")
await client.add_rate_limit_guard(wallet.id, max_transactions_per_minute=5)
await client.add_recipient_guard(wallet.id, mode="whitelist",
    domains=["*.openai.com", "api.anthropic.com"])
await client.add_single_tx_guard(wallet.id, max_amount="20.00")
\`\`\`

## Enterprise Policy with HITL

\`\`\`python
await client.add_budget_guard(wallet.id, daily_limit="1000.00",
    weekly_limit="5000.00")
await client.add_rate_limit_guard(wallet.id,
    max_transactions_per_minute=20,
    max_transactions_per_hour=200)
await client.add_recipient_guard(wallet.id, mode="whitelist",
    addresses=["0xApprovedVendor1...", "0xApprovedVendor2..."])
await client.add_single_tx_guard(wallet.id, max_amount="500.00")
await client.add_confirm_guard(wallet.id,
    threshold_amount="100.00",
    webhook_url="https://compliance.corp.com/approval",
    timeout_seconds=3600,
    timeout_action="reject")
\`\`\`
`,

  "/docs/cctp": `# Cross-Chain Payments (CCTP)

Bridge USDC across chains using Circle's Cross-Chain Transfer Protocol.

## Overview

The \`GatewayAdapter\` implements CCTP v2. It burns USDC on the source chain, obtains an attestation from Circle's attestation service, and mints USDC on the destination chain — atomically.

## Usage

\`\`\`python
from omniclaw.protocols.gateway import GatewayAdapter

gw = GatewayAdapter(
    source_chain="ethereum",
    destination_chain="base",
)

bridge_tx = await gw.bridge(
    amount="100.00",
    recipient="0xRecipient...",
    source_wallet_id=wallet.id,
)

print(bridge_tx.status)          # "pending_attestation"
print(bridge_tx.attestation_hash)  # Circle attestation hash
\`\`\`

## Auto-Routing

\`OmniClaw.pay()\` auto-selects the Gateway adapter when \`from_chain != to_chain\`:

\`\`\`python
result = await client.pay(
    from_wallet_id=eth_wallet.id,
    to="0xBaseRecipient...",
    amount="100.00",
    currency="USDC",
    to_chain="base",   # Triggers CCTP bridge
)
\`\`\`

## Supported Routes

| Source | Destination | Estimated Time |
|:-------|:------------|:---------------|
| Ethereum | Base | ~90s |
| Ethereum | Arbitrum | ~90s |
| Base | Ethereum | ~90s |
| Base | Polygon | ~90s |
| Polygon | Ethereum | ~90s |

## Bridge Timeout & Retry

If attestation takes too long, the circuit breaker triggers and the operation is queued or retried per the strategy:

\`\`\`python
result = await client.pay(
    ...,
    strategy="retry_then_fail",
    max_retries=3,
    retry_delay=30,
)
\`\`\`
`,

  "/docs/production": `# Production Hardening

Best practices and built-in resilience mechanisms for production deployments.

## Resilience Architecture

OmniClaw includes three built-in resilience mechanisms:

1. **Circuit Breaker** — Trips after consecutive failures; prevents cascading
2. **Retry with Backoff** — Exponential backoff with jitter
3. **Idempotency** — Deduplication key ensures one payment per intent

## Environment Variables

\`\`\`bash
CIRCLE_API_KEY=sk_live_...
OMNICLAW_NETWORK=mainnet          # arc_testnet | mainnet
OMNICLAW_REDIS_URL=redis://...    # Required for distributed locks
OMNICLAW_WEBHOOK_SECRET=whsec_... # For webhook signature verification
OMNICLAW_LOG_LEVEL=INFO
\`\`\`

## Health Check

\`\`\`python
health = await client.health_check()
print(health.circuit_breaker_state)  # "closed" | "open" | "half_open"
print(health.redis_connected)        # True
print(health.circle_api_status)      # "healthy"
\`\`\`
`,

  "/docs/production/circuit-breaker": `# Circuit Breaker

The circuit breaker prevents cascading failures by stopping requests to unhealthy upstreams.

## States

| State | Behavior |
|:------|:---------|
| \`closed\` | Normal operation — all requests pass through |
| \`open\` | Tripped — all requests fail fast with \`CircuitOpenError\` |
| \`half_open\` | Recovery — one probe request allowed; success → closed |

## Configuration

\`\`\`python
client = OmniClaw(
    circuit_breaker_threshold=5,     # Failures before tripping
    circuit_breaker_timeout=60,      # Seconds before half_open probe
    circuit_breaker_half_open_max=1, # Probes allowed in half_open
)
\`\`\`

## Handling CircuitOpenError

\`\`\`python
from omniclaw.exceptions import CircuitOpenError

try:
    result = await client.pay(...)
except CircuitOpenError as e:
    # Queue for retry, alert ops team
    await alert_ops(f"Circuit open: {e.adapter}")
\`\`\`
`,

  "/docs/production/idempotency": `# Idempotency & Deduplication

Prevent duplicate payments with idempotency keys.

## Overview

Pass an \`idempotency_key\` on every payment. OmniClaw stores the result keyed by this value. Retrying with the same key returns the original result without re-executing.

\`\`\`python
import uuid

idem_key = f"order-{order_id}-{uuid.uuid4()}"

result = await client.pay(
    from_wallet_id=wallet.id,
    to="0xSeller...",
    amount="49.99",
    currency="USDC",
    idempotency_key=idem_key,
)

# Safe to retry — same result returned
result2 = await client.pay(
    from_wallet_id=wallet.id,
    to="0xSeller...",
    amount="49.99",
    currency="USDC",
    idempotency_key=idem_key,  # Same key → cached result
)
assert result.tx_hash == result2.tx_hash
\`\`\`

## Storage Backend

Idempotency keys are stored in Redis (required for production):

\`\`\`bash
OMNICLAW_REDIS_URL=redis://localhost:6379/0
\`\`\`

TTL for idempotency records: **24 hours** (configurable).
`,

  "/docs/api-reference/wallet": `# create_agent_wallet()

Create a developer-controlled USDC wallet for an AI agent.

## Signature

\`\`\`python
async def create_agent_wallet(
    agent_name: str,
    blockchain: Network = Network.ARC_TESTNET,
    metadata: dict | None = None,
) -> tuple[WalletSet, Wallet]
\`\`\`

## Parameters

| Parameter | Type | Default | Description |
|:----------|:-----|:--------|:------------|
| \`agent_name\` | \`str\` | required | Human-readable name for the agent |
| \`blockchain\` | \`Network\` | \`ARC_TESTNET\` | Target blockchain network |
| \`metadata\` | \`dict\` | \`None\` | Optional key-value metadata |

## Returns

Returns a \`(WalletSet, Wallet)\` tuple.

| Field | Type | Description |
|:------|:-----|:------------|
| \`wallet.id\` | \`str\` | Unique wallet ID (used in \`pay()\`) |
| \`wallet.address\` | \`str\` | On-chain address (0x...) |
| \`wallet.blockchain\` | \`Network\` | Network the wallet is on |
| \`wallet.state\` | \`str\` | \`"LIVE"\` when ready |

## Example

\`\`\`python
wallet_set, wallet = await client.create_agent_wallet(
    agent_name="research-agent-01",
    blockchain=Network.BASE,
)
print(wallet.id)       # "wallet_abc123"
print(wallet.address)  # "0x7f3a...c9e1"
\`\`\`
`,

  "/docs/api-reference/trust": `# trust_lookup()

Evaluate an agent's on-chain ERC-8004 trust score and identity.

## Signature

\`\`\`python
async def trust_lookup(
    agent_id: str,       # DID or 0x address
    amount: str | None = None,
    chain: str = "ethereum",
) -> TrustResult
\`\`\`

## Parameters

| Parameter | Type | Description |
|:----------|:-----|:------------|
| \`agent_id\` | \`str\` | DID (\`did:erc8004:base:0x...\`) or raw address |
| \`amount\` | \`str\` | Optional — triggers high-value threshold check |
| \`chain\` | \`str\` | Chain to read registry from |

## TrustResult

| Field | Type | Description |
|:------|:-----|:------------|
| \`wts\` | \`float\` | Weighted Trust Score [0, 1] |
| \`tier\` | \`str\` | \`"elite" | "verified" | "standard" | "caution" | "blocked"\` |
| \`blocklisted\` | \`bool\` | True if on blocklist |
| \`attestations\` | \`int\` | Number of on-chain attestations |
| \`identity_resolved\` | \`bool\` | True if ERC-8004 NFT found |
| \`checks_passed\` | \`list[str]\` | Which of the 10 checks passed |
| \`decision\` | \`str\` | \`"APPROVED" | "HELD" | "BLOCKED"\` |

## Example

\`\`\`python
result = await client.trust_lookup(
    agent_id="did:erc8004:base:0xAgent...",
    amount="500.00",
)
print(result.wts)       # 0.87
print(result.decision)  # "APPROVED"
print(result.tier)      # "verified"
\`\`\`
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
