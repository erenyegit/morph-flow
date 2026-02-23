"use client";

import Link from "next/link";

export function NetworkBar() {
  return (
    <div className="border-b border-border/40 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-morph opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-morph" />
          </span>
          <span className="text-sm font-medium text-foreground">
            Live Morph Gas:
          </span>
          <span className="rounded-full bg-morph/15 px-2 py-0.5 text-xs font-semibold text-morph">
            0.001 Gwei
          </span>
        </div>
        <Link
          href="#bridge-tools"
          className="text-xs font-medium text-muted transition hover:text-morph"
        >
          Bridge & Tools →
        </Link>
      </div>
    </div>
  );
}
