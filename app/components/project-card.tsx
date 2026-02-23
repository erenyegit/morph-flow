"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, FileText, Twitter, Target } from "lucide-react";
import { Sparkline } from "./sparkline";

const categoryBadge: Record<string, { cls: string; glow: string }> = {
  Payment: { cls: "bg-morph/15 text-morph", glow: "badge-glow-green" },
  Gaming: { cls: "bg-purple-500/15 text-purple-400", glow: "badge-glow-purple" },
  Social: { cls: "bg-sky-500/15 text-sky-400", glow: "badge-glow-sky" },
  DeFi: { cls: "bg-amber-500/15 text-amber-400", glow: "badge-glow-amber" },
  Infrastructure: { cls: "bg-blue-500/15 text-blue-400", glow: "badge-glow-blue" },
};

const statusConfig: Record<string, { label: string; cls: string; glow: string }> = {
  mainnet: {
    label: "Mainnet Live",
    cls: "bg-morph/15 text-morph",
    glow: "badge-glow-green",
  },
  incubated: {
    label: "Incubated",
    cls: "bg-purple-500/15 text-purple-400",
    glow: "badge-glow-purple",
  },
  testnet: {
    label: "Testnet",
    cls: "bg-amber-400/15 text-amber-400",
    glow: "badge-glow-amber",
  },
};

export interface Project {
  name: string;
  category: string;
  description: string;
  status: "mainnet" | "testnet" | "incubated";
  featured?: boolean;
  activity?: number;
  statusLabel?: string;
  twitterFollowers?: string;
  sparklineData?: number[];
  hasQuest?: boolean;
  zooPoints?: number;
  websiteUrl?: string;
  docsUrl?: string;
  ecosystemFit?: string;
  discordActivity?: string;
}

const defaultSparkline = [42, 48, 45, 52, 58, 55, 62, 68, 72, 70, 75, 78];

interface ProjectCardProps extends Project {
  index: number;
  onSelect?: () => void;
}

export function ProjectCard({
  name,
  category,
  description,
  status,
  activity = 0,
  statusLabel,
  twitterFollowers,
  sparklineData = defaultSparkline,
  hasQuest,
  zooPoints = 0,
  index,
  onSelect,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = (e.clientX - centerX) / rect.width;
    const relY = (e.clientY - centerY) / rect.height;
    x.set(relX);
    y.set(relY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const badge = categoryBadge[category] ?? { cls: "bg-zinc-500/15 text-zinc-400", glow: "" };
  const statusStyle = statusConfig[status] ?? statusConfig.mainnet;

  return (
    <motion.div
      ref={cardRef}
      layout
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        onSelect?.();
      }}
      onKeyDown={onSelect ? (e) => e.key === "Enter" && onSelect() : undefined}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
      className="group relative glass-card cursor-pointer p-6 transition-shadow duration-300 hover:glow-morph-intense"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-morph/10 text-lg font-bold text-morph">
          {name.charAt(0)}
        </div>
        <div className="flex items-center gap-2">
          {hasQuest && (
            <div className="group/quest relative">
              <span className="inline-flex items-center gap-1 rounded-full bg-morph/20 px-2 py-0.5 text-[10px] font-semibold text-morph">
                <Target className="h-2.5 w-2.5" />
                Quest
              </span>
              <div className="absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 rounded-lg bg-surface-light px-2.5 py-1.5 text-[10px] font-medium text-foreground opacity-0 shadow-xl transition-opacity group-hover/quest:opacity-100 pointer-events-none whitespace-nowrap">
                Completing this gives you {zooPoints} Zoo Points.
              </div>
            </div>
          )}
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusStyle.cls} ${statusStyle.glow}`}
          >
            {statusLabel ?? statusStyle.label}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <h3 className="text-lg font-bold text-foreground">{name}</h3>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${badge.cls} ${badge.glow}`}>
          {category}
        </span>
      </div>

      <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>

      {/* 24h Sparkline */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
          24h activity
        </span>
        <Sparkline data={sparklineData} width={88} height={28} />
      </div>

      {/* Popularity bar */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-light">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${activity}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-morph to-morph-dim"
          />
        </div>
        <span className="text-xs font-bold text-morph">{activity}%</span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
        <div className="flex items-center gap-2.5">
          <a
            href="#"
            className="flex items-center gap-1 rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-morph"
            aria-label="Twitter"
          >
            <Twitter className="h-3.5 w-3.5" />
            {twitterFollowers && (
              <span className="text-[10px] font-medium">{twitterFollowers}</span>
            )}
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
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-morph opacity-0 transition-all duration-300 group-hover:opacity-100 hover:underline"
        >
          Try App
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
