"use client";

import { motion } from "framer-motion";
import { DollarSign, Users, Zap } from "lucide-react";
import { useCounter } from "../hooks/use-counter";

const tickerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function TickerMetric({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  growth,
  icon: Icon,
  index,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  growth?: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const { count, ref } = useCounter(value, 2200);
  const display =
    decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      variants={tickerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="glass-card flex min-w-[160px] flex-1 items-center gap-4 rounded-[32px] px-6 py-5"
    >
      <Icon className="h-6 w-6 shrink-0 text-morph" />
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="truncate text-xl font-bold tracking-tight text-foreground">
            {prefix}
            {display}
            {suffix}
          </p>
          {growth && (
            <span className="shrink-0 rounded-full bg-morph/20 px-2 py-0.5 text-xs font-semibold text-morph">
              {growth}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs font-medium text-muted">{label}</p>
      </div>
    </motion.div>
  );
}

export function LiveTicker() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <TickerMetric
        index={0}
        label="Total Volume (TVL)"
        value={14.2}
        prefix="$"
        suffix="M"
        decimals={1}
        growth="+2.1%"
        icon={DollarSign}
      />
      <TickerMetric
        index={1}
        label="Active Users (24h)"
        value={12402}
        icon={Users}
      />
      <TickerMetric
        index={2}
        label="Payment TPS"
        value={18.5}
        decimals={1}
        icon={Zap}
      />
    </div>
  );
}
