"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const BRIDGES = [
  {
    id: "orbiter",
    name: "Orbiter Finance",
    tag: "Fastest",
    url: "https://www.orbiter.finance/",
    recommended: true,
  },
  {
    id: "rhino",
    name: "Rhino.fi",
    tag: "Lowest Fee",
    url: "https://app.rhino.fi/",
    recommended: false,
  },
  {
    id: "official",
    name: "Official Bridge",
    tag: "Standard",
    url: "https://bridge.morphl2.io/",
    recommended: false,
  },
];

const bestBridge = BRIDGES[0];

export function NetworkBar() {
  return (
    <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Live Gas */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-morph opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-morph" />
            </span>
            <span className="text-sm font-semibold text-foreground">
              Live Morph Gas:
            </span>
          </div>
          <span className="rounded-full bg-morph/15 px-2.5 py-0.5 text-xs font-bold text-morph">
            0.001 Gwei (Cheap)
          </span>
        </div>

        {/* Bridge Quick-View */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-muted">Bridge:</span>
          <div className="flex flex-wrap gap-2">
            {BRIDGES.map((b) => (
              <span
                key={b.id}
                className="rounded-lg border border-border/60 bg-surface/60 px-2.5 py-1 text-[10px] font-medium text-muted"
              >
                <span className="text-foreground">{b.name}</span>
                <span className="ml-1 text-muted">({b.tag})</span>
              </span>
            ))}
          </div>
          <a
            href={bestBridge.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-morph px-3 py-1.5 text-xs font-semibold text-background transition hover:bg-morph-dim"
          >
            <Zap className="h-3 w-3" />
            Bridge Now
          </a>
        </div>
      </div>
    </div>
  );
}
