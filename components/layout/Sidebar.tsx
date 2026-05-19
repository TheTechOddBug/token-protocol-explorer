"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Key, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavSection {
  title: string;
  color: string;
  items: NavItem[];
}

const NAV: NavSection[] = [
  {
    title: "OAuth 1.0a",
    color: "text-orange-400",
    items: [
      { label: "Happy Path (3-legged flow)", href: "/oauth1a/happy-path" },
    ],
  },
  {
    title: "AWS SigV4",
    color: "text-amber-400",
    items: [
      { label: "API Request", href: "/aws-sigv4/api-request" },
    ],
  },
  {
    title: "OAuth 2.0",
    color: "text-indigo-400",
    items: [
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
    title: "OpenID Connect",
    color: "text-violet-400",
    items: [
      { label: "Authorization Code Flow", href: "/oidc/basic-flow" },
    ],
  },
  {
    title: "HTTP Signatures",
    color: "text-teal-400",
    items: [
      { label: "RFC 9421 (Basic)", href: "/http-signatures/rfc9421" },
      { label: "Signature-Key Schemes", href: "/http-signatures/signature-key-schemes" },
    ],
  },
  {
    title: "CB4A",
    color: "text-cyan-400",
    items: [
      { label: "Happy Path (Token Minting)", href: "/cb4a/happy-path" },
    ],
  },
  {
    title: "MCP Auth",
    color: "text-purple-400",
    items: [
      { label: "Auth Code + PKCE", href: "/mcp-auth/authorization-code-pkce" },
    ],
  },
  {
    title: "AAuth",
    color: "text-rose-400",
    items: [
      { label: "Protocol Explorer ↗", href: process.env.NEXT_PUBLIC_AAUTH_URL || "https://explorer.aauth.dev", external: true },
    ],
  },
  {
    title: "Client Instance Assertion",
    color: "text-green-400",
    items: [
      { label: "Client Credentials (Self-Acting)", href: "/client-instance-assertion/client-credentials" },
      { label: "Auth Code (Delegation)", href: "/client-instance-assertion/authz-code-delegation" },
      { label: "SPIFFE Workload (SPIRE → OAuth)", href: "/client-instance-assertion/spiffe-workload" },
    ],
  },
  {
    title: "PIC",
    color: "text-pink-400",
    items: [
      { label: "Federation Bridge Entry", href: "/pic/federation-entry" },
      { label: "Causal Authority Transition", href: "/pic/causal-authority-transition" },
      { label: "Cross-Domain Federation", href: "/pic/cross-domain" },
      { label: "AI Agent Orchestration", href: "/pic/ai-agent-orchestration" },
    ],
  },
  {
    title: "ID-JAG (Xaa)",
    color: "text-sky-400",
    items: [
      { label: "Cross-Domain Access (Xaa)", href: "/id-jag/cross-domain" },
    ],
  },
];

function SidebarSection({ section, defaultOpen }: { section: NavSection; defaultOpen: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(defaultOpen);
  const isActive = section.items.some((i) => pathname === i.href);

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Key className={cn("h-4 w-4 shrink-0", section.color)} />
        <span className="flex-1 text-left">{section.title}</span>
        {open ? (
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
        )}
      </button>

      {open && (
        <div className="mt-0.5 ml-4 border-l border-border pl-3 space-y-0.5">
          {section.items.map((item) => {
            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                    "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <span className="flex-1">{item.label}</span>
                </a>
              );
            }
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar border-r border-border">
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-border shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">PE</span>
          </div>
          <span className="font-semibold text-sm tracking-tight">Protocol Explorer</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 rounded">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          Protocols
        </p>
        {NAV.map((section) => {
          const defaultOpen = section.items.some((i) => pathname === i.href || pathname.startsWith(i.href + "/"));
          return (
            <SidebarSection key={section.title} section={section} defaultOpen={defaultOpen || true} />
          );
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-border px-4 py-3 flex items-center gap-2">
        <a
          href="https://github.com/christian-posta/token-protocol-explorer"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>Open Source</span>
        </a>
      </div>
    </div>
  );
}
