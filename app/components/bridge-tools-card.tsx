"use client";

import { motion } from "framer-motion";
import { Zap, ExternalLink } from "lucide-react";

const BRIDGES = [
  { name: "Official Bridge", tag: "Standard", url: "https://bridge.morphl2.io/" },
  { name: "Orbiter Finance", tag: "Fastest", url: "https://www.orbiter.finance/", recommended: true },
  { name: "Rhino.fi", tag: "Lowest Fee", url: "https://app.rhino.fi/" },
];

export function BridgeToolsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card flex h-full flex-col rounded-2xl p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-morph" />
        <h3 className="text-lg font-bold text-foreground">Bridge & Tools</h3>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-morph opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-morph" />
        </span>
        <span className="text-sm font-medium text-foreground">Live Morph Gas</span>
        <span className="rounded-full bg-morph/15 px-2 py-0.5 text-xs font-semibold text-morph">
          0.001 Gwei
        </span>
      </div>
      <div className="space-y-2">
        {BRIDGES.map((b) => (
          <div
            key={b.name}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-surface/50 px-3 py-2"
          >
            <span className="text-sm font-medium text-foreground">{b.name}</span>
            <span className="text-xs text-muted">({b.tag})</span>
          </div>
        ))}
      </div>
      <a
        href={BRIDGES[1].url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex flex-1 items-end"
      >
        <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-morph py-2.5 text-sm font-semibold text-background transition hover:bg-morph-dim">
          Bridge Now
          <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </a>
    </motion.div>
  );
}
