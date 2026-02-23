"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useCounter } from "../hooks/use-counter";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  growth: string;
  icon: LucideIcon;
  accent: string;
  index: number;
}

export function StatCard({
  label,
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  growth,
  icon: Icon,
  accent,
  index,
}: StatCardProps) {
  const { count, ref } = useCounter(value, 2200);

  const display = decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:glow-morph-intense"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div className="relative z-10">
        <Icon className="mb-4 h-5 w-5 text-morph" />
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold tracking-tight">
            {prefix}
            {display}
            {suffix}
          </p>
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-morph">
            <TrendingUp className="h-3 w-3" />
            {growth}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">{label}</p>
      </div>
    </motion.div>
  );
}
