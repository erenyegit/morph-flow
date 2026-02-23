"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, Twitter, Flame } from "lucide-react";

const categoryBadge: Record<string, { cls: string; glow: string }> = {
  Payment: { cls: "bg-morph/15 text-morph", glow: "badge-glow-green" },
  Gaming: { cls: "bg-purple-500/15 text-purple-400", glow: "badge-glow-purple" },
  Social: { cls: "bg-sky-500/15 text-sky-400", glow: "badge-glow-sky" },
  DeFi: { cls: "bg-amber-500/15 text-amber-400", glow: "badge-glow-amber" },
  Infrastructure: { cls: "bg-blue-500/15 text-blue-400", glow: "badge-glow-blue" },
};

export interface Project {
  name: string;
  category: string;
  description: string;
  status: "mainnet" | "testnet";
  featured?: boolean;
  activity?: number;
  statusLabel?: string;
}

interface ProjectCardProps extends Project {
  index: number;
}

export function ProjectCard({
  name,
  category,
  description,
  status,
  activity = 0,
  statusLabel,
  index,
}: ProjectCardProps) {
  const badge = categoryBadge[category] ?? { cls: "bg-zinc-500/15 text-zinc-400", glow: "" };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
      className="group relative glass-card rounded-2xl p-6 transition-shadow duration-300 hover:glow-morph-intense"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-morph/10 text-lg font-bold text-morph">
          {name.charAt(0)}
        </div>
        <div className="flex items-center gap-2">
          {statusLabel && (
            <span className="text-xs font-medium">{statusLabel}</span>
          )}
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
            {status === "mainnet" ? "Mainnet" : "Testnet"}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${badge.cls} ${badge.glow}`}>
          {category}
        </span>
      </div>

      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {description}
      </p>

      {/* Activity bar */}
      <div className="mt-4 flex items-center gap-2.5">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-light">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${activity}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-morph to-morph-dim"
          />
        </div>
        <span className="flex items-center gap-0.5 text-[10px] font-medium text-muted">
          <Flame className="h-2.5 w-2.5 text-morph" />
          {activity}%
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
        <div className="flex items-center gap-2.5">
          <a
            href="#"
            className="rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-morph"
            aria-label="Twitter"
          >
            <Twitter className="h-3.5 w-3.5" />
          </a>
          <a
            href="#"
            className="rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-morph"
            aria-label="Docs"
          >
            <FileText className="h-3.5 w-3.5" />
          </a>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-morph opacity-0 transition-all duration-300 group-hover:opacity-100 hover:underline"
        >
          Try App
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
