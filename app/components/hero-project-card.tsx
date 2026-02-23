"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, FileText, Twitter } from "lucide-react";
import { Sparkline } from "./sparkline";
import type { Project } from "./project-card";

const categoryBadge: Record<string, string> = {
  Payment: "bg-morph/15 text-morph",
  Gaming: "bg-purple-500/15 text-purple-400",
  Social: "bg-sky-500/15 text-sky-400",
  DeFi: "bg-amber-500/15 text-amber-400",
  Infrastructure: "bg-blue-500/15 text-blue-400",
};

const defaultSparkline = [40, 48, 52, 58, 62, 70, 75, 78, 82, 88, 90, 95];

interface HeroProjectCardProps extends Project {
  index: number;
}

export function HeroProjectCard({
  name,
  category,
  description,
  status,
  activity = 0,
  twitterFollowers,
  sparklineData = defaultSparkline,
  index,
}: HeroProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3]);

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

  const badgeCls = categoryBadge[category] ?? "bg-zinc-500/15 text-zinc-400";
  const isMainnet = status === "mainnet";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01, transition: { duration: 0.25 } }}
      className="glass-featured relative overflow-hidden rounded-[32px] p-8 transition-shadow duration-300 hover:glow-morph-intense sm:p-10"
    >
      <div className="absolute right-6 top-6 rounded-full bg-morph/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-morph">
        Featured by Morph
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-morph/10 text-2xl font-bold text-morph">
            {name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{name}</h2>
              <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${badgeCls}`}>
                {category}
              </span>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{description}</p>
            <div className="mt-4 flex items-center gap-4">
              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                  isMainnet ? "bg-morph/15 text-morph" : "bg-amber-400/15 text-amber-400"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isMainnet ? "bg-morph" : "bg-amber-400"}`} />
                {isMainnet ? "Mainnet Live" : "Testnet"}
              </span>
              <a href="#" className="flex items-center gap-1.5 text-xs text-muted hover:text-morph">
                <Twitter className="h-3.5 w-3.5" />
                {twitterFollowers}
              </a>
            </div>
          </div>
        </div>
        <a
          href="#"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-morph px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-morph-dim"
        >
          Launch App
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            24h activity
          </p>
          <Sparkline data={sparklineData} width={180} height={48} />
        </div>
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Community interest
          </p>
          <div className="h-3 overflow-hidden rounded-full bg-surface-light">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${activity}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-morph to-morph-dim"
            />
          </div>
          <p className="mt-1 text-sm font-bold text-morph">{activity}%</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-border/40 pt-6">
        <a href="#" className="rounded-lg p-2 text-muted transition hover:bg-surface-light hover:text-morph" aria-label="Docs">
          <FileText className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}
