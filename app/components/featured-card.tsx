"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, FileText, Twitter } from "lucide-react";
import { Sparkline } from "./sparkline";
import type { Project } from "./project-card";

const categoryBadge: Record<string, { cls: string; glow: string }> = {
  Payment: { cls: "bg-morph/15 text-morph", glow: "badge-glow-green" },
  Gaming: { cls: "bg-purple-500/15 text-purple-400", glow: "badge-glow-purple" },
  Social: { cls: "bg-sky-500/15 text-sky-400", glow: "badge-glow-sky" },
  DeFi: { cls: "bg-amber-500/15 text-amber-400", glow: "badge-glow-amber" },
  Infrastructure: { cls: "bg-blue-500/15 text-blue-400", glow: "badge-glow-blue" },
};

const statusConfig: Record<string, { label: string; cls: string; glow: string }> = {
  mainnet: { label: "Mainnet Live", cls: "bg-morph/15 text-morph", glow: "badge-glow-green" },
  incubated: { label: "Incubated", cls: "bg-purple-500/15 text-purple-400", glow: "badge-glow-purple" },
  testnet: { label: "Testnet", cls: "bg-amber-400/15 text-amber-400", glow: "badge-glow-amber" },
};

const defaultSparkline = [42, 48, 45, 52, 58, 55, 62, 68, 72, 70, 75, 78];

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
  sparklineData = defaultSparkline,
  index,
}: FeaturedCardProps) {
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
      className="glass-featured group relative rounded-[32px] p-8 transition-shadow duration-300 hover:glow-morph-intense"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-morph/10 text-2xl font-bold text-morph">
          {name.charAt(0)}
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusStyle.cls} ${statusStyle.glow}`}>
          {statusLabel ?? statusStyle.label}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <h3 className="text-xl font-bold text-foreground">{name}</h3>
        <span className={`rounded-full px-3 py-0.5 text-[10px] font-semibold ${badge.cls} ${badge.glow}`}>
          {category}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted">24h activity</span>
        <Sparkline data={sparklineData} width={100} height={32} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-light">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${activity}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-morph to-morph-dim"
          />
        </div>
        <span className="text-xs font-bold text-morph">{activity}%</span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-1.5 rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-morph" aria-label="Twitter">
            <Twitter className="h-4 w-4" />
            {twitterFollowers && <span className="text-xs font-medium">{twitterFollowers}</span>}
          </a>
          <a href="#" className="rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-morph" aria-label="Docs">
            <FileText className="h-4 w-4" />
          </a>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 rounded-full bg-morph/10 px-4 py-1.5 text-sm font-semibold text-morph transition hover:bg-morph/20"
        >
          Launch App
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
