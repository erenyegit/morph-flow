"use client";

import { motion } from "framer-motion";
import { Users, Fuel, Activity, Zap } from "lucide-react";
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
  const { count, ref } = useCounter(value, 2000);
  const display =
    decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      variants={tickerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="glass-card flex min-w-[140px] flex-1 items-center gap-4 rounded-xl px-5 py-4"
    >
      <Icon className="h-5 w-5 shrink-0 text-morph" />
      <div className="min-w-0">
        <p className="truncate text-lg font-bold tracking-tight">
          {prefix}
          {display}
          {suffix}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted">{label}</span>
          {growth && (
            <span className="text-xs font-medium text-morph">{growth}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function LiveTicker() {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-3 lg:flex-nowrap">
      <TickerMetric
        index={0}
        label="Total Value Locked"
        value={12.4}
        prefix="$"
        suffix="M"
        decimals={1}
        growth="↑ 4.2%"
        icon={Activity}
      />
      <TickerMetric
        index={1}
        label="24h Active Wallets"
        value={8420}
        icon={Users}
      />
      <TickerMetric
        index={2}
        label="Gas Price"
        value={0.001}
        suffix=" Gwei"
        decimals={3}
        icon={Fuel}
      />
      <TickerMetric
        index={3}
        label="Transactions"
        value={1200000}
        suffix="+"
        icon={Activity}
      />
      <TickerMetric
        index={4}
        label="TPS"
        value={12.5}
        decimals={1}
        icon={Zap}
      />
    </div>
  );
}
