"use client";

import { motion } from "framer-motion";
import { Fuel, Activity, DollarSign } from "lucide-react";
import { useCounter } from "../hooks/use-counter";

function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
  index,
  staticDisplay,
}: {
  label: string;
  value: number;
  suffix: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
  staticDisplay?: string;
}) {
  const { count, ref } = useCounter(value, 1500);
  const display =
    staticDisplay !== undefined
      ? staticDisplay
      : value % 1 !== 0
        ? count.toFixed(2)
        : String(Math.round(count));

  return (
    <motion.div
      ref={staticDisplay === undefined ? ref : undefined}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bento-tilt glass-terminal flex flex-col gap-2 rounded-2xl p-5"
    >
      <Icon className="h-5 w-5 text-morph" />
      <p className="text-2xl font-bold tracking-tight text-foreground">
        {display}
        {suffix}
      </p>
      <p className="text-xs font-medium text-muted">{label}</p>
    </motion.div>
  );
}

export function LiveStatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        index={0}
        label="Live Gas"
        value={0.001}
        suffix=" Gwei"
        icon={Fuel}
        staticDisplay="0.001"
      />
      <StatCard
        index={1}
        label="Payment TPS"
        value={18.5}
        suffix=""
        icon={Activity}
      />
      <StatCard
        index={2}
        label="Avg Bridge Fee"
        value={0.82}
        suffix="%"
        icon={DollarSign}
      />
    </div>
  );
}
