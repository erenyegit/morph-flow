"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, Twitter, Flame } from "lucide-react";
import type { Project } from "./project-card";

const categoryBadge: Record<string, { cls: string; glow: string }> = {
  Payment: { cls: "bg-morph/15 text-morph", glow: "badge-glow-green" },
  Gaming: { cls: "bg-purple-500/15 text-purple-400", glow: "badge-glow-purple" },
  Social: { cls: "bg-sky-500/15 text-sky-400", glow: "badge-glow-sky" },
  DeFi: { cls: "bg-amber-500/15 text-amber-400", glow: "badge-glow-amber" },
  Infrastructure: { cls: "bg-blue-500/15 text-blue-400", glow: "badge-glow-blue" },
};

interface FeaturedCardProps extends Project {
  index: number;
}

export function FeaturedCard({
  name,
  category,
  description,
  status,
  activity = 0,
  statusLabel,
  twitterFollowers,
  index,
}: FeaturedCardProps) {
  const badge = categoryBadge[category] ?? { cls: "bg-zinc-500/15 text-zinc-400", glow: "" };
  const statusText = status === "mainnet" ? "Mainnet Ready" : "Active Testnet";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
      className="group relative glass-featured rounded-2xl p-8 transition-shadow duration-300 hover:glow-morph-intense"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-morph/10 text-2xl font-bold text-morph">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs font-medium text-muted">{statusLabel ?? statusText}</span>
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
              status === "mainnet"
                ? "bg-morph/15 text-morph"
                : "bg-amber-400/15 text-amber-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status === "mainnet" ? "bg-morph" : "bg-amber-400"
              }`}
            />
            {statusText}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <h3 className="text-xl font-bold text-foreground">{name}</h3>
        <span className={`rounded-full px-3 py-0.5 text-[10px] font-semibold ${badge.cls} ${badge.glow}`}>
          {category}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

      {/* Popularity meter */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-light">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${activity}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-morph to-morph-dim"
          />
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-morph">
          <Flame className="h-3 w-3" />
          {activity}%
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-1.5 rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-morph" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
            {twitterFollowers && (
              <span className="text-xs font-medium">{twitterFollowers}</span>
            )}
          </a>
          <a href="#" className="rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-morph" aria-label="Docs">
            <FileText className="h-4 w-4" />
          </a>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 rounded-full bg-morph/10 px-4 py-1.5 text-sm font-medium text-morph transition hover:bg-morph/20"
        >
          Launch App
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
