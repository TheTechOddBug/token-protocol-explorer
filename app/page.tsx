import Link from "next/link";
import { ArrowRight, Key, Shield } from "lucide-react";

const GITHUB_URL = "https://github.com/christian-posta/token-protocol-explorer";

const PROTOCOLS = [
  {
    id: "oauth1a",
    name: "OAuth 1.0a",
    rfc: "RFC 5849",
    rfcUrl: "https://datatracker.ietf.org/doc/html/rfc5849",
    accent: "border-orange-500/35 hover:border-orange-500/55",
    iconWrap: "bg-orange-500/15 text-orange-400",
    description:
      "Three-legged authorization protocol using HMAC-SHA1 signed requests. Consumer obtains temporary credentials, user grants access, consumer exchanges for access token.",
    scenarios: [
      { label: "Happy Path (3-legged flow)", href: "/oauth1a/happy-path" },
    ],
  },
  {
    id: "aws-sigv4",
    name: "AWS SigV4",
    rfc: "AWS Docs",
    rfcUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html",
    accent: "border-amber-500/35 hover:border-amber-500/55",
    iconWrap: "bg-amber-500/15 text-amber-400",
    description:
      "AWS Signature Version 4 protocol for authenticating API requests. Features a 4-step signing process deriving a scope-limited signing key from the AWS secret access key.",
    scenarios: [
      { label: "API Request (STS)", href: "/aws-sigv4/api-request" },
    ],
  },
  {
    id: "oauth2",
    name: "OAuth 2.0",
    rfc: "RFC 6749",
    rfcUrl: "https://www.rfc-editor.org/rfc/rfc6749.txt",
    accent: "border-indigo-500/35 hover:border-indigo-500/55",
    iconWrap: "bg-indigo-500/15 text-indigo-400",
    description:
      "The industry-standard authorization framework. Explore the foundational Authorization Code grant with PKCE, Device Authorization for CLIs and IoT, advanced DPoP token binding, and token exchange patterns.",
    scenarios: [
      { label: "Authorization Code + PKCE", href: "/oauth2/authorization-code" },
      { label: "Device Authorization (RFC 8628)", href: "/oauth2/device-authorization" },
      { label: "Refresh Token Grant", href: "/oauth2/refresh-token" },
      { label: "PAR (RFC 9126)", href: "/oauth2/par" },
      { label: "RAR (RFC 9396)", href: "/oauth2/rar" },
      { label: "DPoP (RFC 9449)", href: "/oauth2/dpop" },
      { label: "Token Exchange: Delegation", href: "/oauth2/token-exchange-delegation" },
      { label: "Token Exchange: Impersonation", href: "/oauth2/token-exchange-impersonation" },
      { label: "Txn-Tokens (Draft)", href: "/oauth2/transaction-tokens" },
    ],
  },
  {
    id: "oidc",
    name: "OpenID Connect",
    rfc: "OIDC Core 1.0",
    rfcUrl: "https://openid.net/specs/openid-connect-core-1_0.html",
    accent: "border-violet-500/35 hover:border-violet-500/55",
    iconWrap: "bg-violet-500/15 text-violet-400",
    description:
      "The identity layer on top of OAuth 2.0. Where OAuth answers 'what can this client do?', OIDC answers 'who is this user?'. Introduces the ID Token, nonce, at_hash binding, and the UserInfo endpoint.",
    scenarios: [
      { label: "Authorization Code Flow", href: "/oidc/basic-flow" },
    ],
  },
  {
    id: "http-signatures",
    name: "HTTP Signatures",
    rfc: "RFC 9421",
    rfcUrl: "https://www.rfc-editor.org/rfc/rfc9421.txt",
    accent: "border-teal-500/35 hover:border-teal-500/55",
    iconWrap: "bg-teal-500/15 text-teal-400",
    description:
      "A powerful mechanism for creating and verifying digital signatures over HTTP messages, protecting integrity and authenticity of headers and payloads.",
    scenarios: [
      { label: "Basic Signature", href: "/http-signatures/rfc9421" },
      { label: "Signature-Key Header (Draft)", href: "/http-signatures/signature-key-schemes" },
    ],
  },
  {
    id: "cb4a",
    name: "Credential Broker for Agents",
    rfc: "draft-hartman-cb4a-00",
    rfcUrl: "https://datatracker.ietf.org/doc/draft-hartman-credential-broker-4-agents/",
    accent: "border-cyan-500/35 hover:border-cyan-500/55",
    iconWrap: "bg-cyan-500/15 text-cyan-400",
    description:
      "IETF draft protocol that solves credential sprawl in agentic AI systems. Instead of agents holding long-lived API keys, a Policy Decision Point (PDP) and Credential Delivery Point (CDP) collaborate to issue short-lived, DPoP-bound tokens.",
    scenarios: [
      { label: "Happy Path (Token Minting)", href: "/cb4a/happy-path" },
    ],
  },
  {
    id: "mcp-auth",
    name: "MCP Authorization",
    rfc: "MCP Auth Draft",
    rfcUrl: "https://modelcontextprotocol.io/",
    accent: "border-purple-500/35 hover:border-purple-500/55",
    iconWrap: "bg-purple-500/15 text-purple-400",
    description:
      "The Model Context Protocol Authorization flow utilizing OAuth 2.1, PKCE, and Protected Resource Metadata for secure client-server communication.",
    scenarios: [
      { label: "Auth Code + PKCE", href: "/mcp-auth/authorization-code-pkce" },
    ],
  },
  {
    id: "client-instance-assertion",
    name: "Client Instance Assertion",
    rfc: "IETF Draft",
    rfcUrl: "https://mcguinness.github.io/draft-mcguinness-oauth-client-instance-actor-assertion/draft-mcguinness-oauth-client-instance-actor-assertion.html",
    accent: "border-green-500/35 hover:border-green-500/55",
    iconWrap: "bg-green-500/15 text-green-400",
    description:
      "OAuth 2.0 extension enabling ephemeral runtime instances (containers, agents, functions) to be individually authenticated via short-lived JWT instance assertions, with sender-constrained access tokens bound to instance keys. Covers both self-acting (client_credentials) and user-delegation (authorization_code) flows.",
    scenarios: [
      { label: "Client Credentials (Self-Acting)", href: "/client-instance-assertion/client-credentials" },
      { label: "Auth Code (Delegation)", href: "/client-instance-assertion/authz-code-delegation" },
      { label: "SPIFFE Workload (SPIRE → OAuth)", href: "/client-instance-assertion/spiffe-workload" },
    ],
  },
  {
    id: "aauth",
    name: "AAuth",
    rfc: "aauth.dev",
    rfcUrl: "https://aauth.dev",
    accent: "border-rose-500/35 hover:border-rose-500/55",
    iconWrap: "bg-rose-500/15 text-rose-400",
    description:
      "AAuth is an Agent Authentication protocol designed for programmatic, autonomous agent-to-agent communication.",
    scenarios: [
      { label: "Protocol Explorer", href: process.env.NEXT_PUBLIC_AAUTH_URL || "https://explorer.aauth.dev", external: true },
    ],
  },
  {
    id: "pic",
    name: "PIC",
    rfc: "draft-pic-spec-00",
    rfcUrl: "https://github.com/pic-protocol/pic-spec",
    accent: "border-pink-500/35 hover:border-pink-500/55",
    iconWrap: "bg-pink-500/15 text-pink-400",
    description:
      "Provenance Identity Continuity — replaces Proof of Possession with Proof of Continuity. Authority is anchored to an immutable origin principal (p_0) and monotonically restricted at every causal hop, eliminating confused deputy and ambient authority attacks across microservices, federations, and AI agents.",
    scenarios: [
      { label: "Federation Bridge Entry", href: "/pic/federation-entry" },
      { label: "Causal Authority Transition", href: "/pic/causal-authority-transition" },
      { label: "Cross-Domain Federation", href: "/pic/cross-domain" },
      { label: "AI Agent Orchestration", href: "/pic/ai-agent-orchestration" },
    ],
  },
  {
    id: "id-jag",
    name: "ID-JAG (Xaa)",
    rfc: "IETF Draft",
    rfcUrl: "https://datatracker.ietf.org/doc/draft-ietf-oauth-identity-assertion-authz-grant/",
    accent: "border-sky-500/35 hover:border-sky-500/55",
    iconWrap: "bg-sky-500/15 text-sky-400",
    description:
      "Identity Assertion Authorization Grant — a cross-trust-domain protocol enabling users to access external services using their internal corporate identity. The internal IdP vouches for the user; the SaaS IdP independently decides whether to grant access.",
    scenarios: [
      { label: "Cross-Domain Access (Xaa)", href: "/id-jag/cross-domain" },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 space-y-14">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Key className="h-3.5 w-3.5" />
            <span>Token Protocol Explorer</span>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Open Source on GitHub</span>
          </a>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Protocol Explorer</h1>
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          X-ray vision for network authentication protocols. Pick a scenario, step through
          the requests, and watch the cryptographic math at every single hop.
        </p>
      </div>

      {/* Protocol list */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Protocols</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Each protocol is a self-contained explorer with annotated sequence diagrams and
            a step-by-step breakdown of the cryptographic signatures.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {PROTOCOLS.map((proto) => (
            <div
              key={proto.id}
              className={`rounded-xl border bg-card p-6 flex flex-col gap-4 transition-colors ${proto.accent}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${proto.iconWrap}`}
                >
                  <Shield className="h-5 w-5" />
                </div>
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-semibold tracking-tight">{proto.name}</h2>
                    <a
                      href={proto.rfcUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-muted-foreground bg-muted rounded px-1.5 py-0.5 hover:text-foreground transition-colors"
                    >
                      {proto.rfc} ↗
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {proto.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {proto.scenarios.map((s) => 
                  "external" in s && s.external ? (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                    >
                      {s.label} ↗
                    </a>
                  ) : (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                    >
                      {s.label}
                      <ArrowRight className="h-3 w-3 opacity-70" />
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="rounded-xl border border-dashed border-border/70 bg-muted/10 p-5 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          How it works
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Each scenario is a JSON file defining participants, HTTP requests, responses, and
          cryptographic artifacts. The UI is a media player — use Play/Pause or arrow keys
          to step through. Click any arrow in the sequence diagram to jump to that step.
          The right panel shows headers, bodies, and the full HMAC signature breakdown.
        </p>
      </section>
    </div>
  );
}
