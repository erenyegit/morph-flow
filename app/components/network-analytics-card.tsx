"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useCounter } from "../hooks/use-counter";

// 30 days of simulated Morph Growth (index or TVL-like metric)
const days = 30;
const growthData = Array.from({ length: days }, (_, i) => {
  const t = i / (days - 1);
  const base = 70 + Math.sin(i * 0.4) * 12 + t * 25;
  return {
    day: i + 1,
    value: Math.round(base * 10) / 10,
    label: `Day ${i + 1}`,
  };
});

function CountUpPill({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  index,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  index: number;
}) {
  const { count, ref } = useCounter(value, 1800);
  const display =
    decimals > 0 ? count.toFixed(decimals) : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-xl border border-morph/15 bg-surface/80 px-4 py-2.5 backdrop-blur-sm"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-0.5 text-lg font-bold text-foreground">
        {prefix}
        {display}
        {suffix}
      </p>
    </motion.div>
  );
}

export function NetworkAnalyticsCard() {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, margin: "-20px" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bento-tilt glass-terminal flex h-full min-h-[340px] flex-col rounded-2xl p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">
          Network Analytics
        </h3>
        <span className="text-xs font-medium text-muted">Last 30 days</span>
      </div>
      <div className="mb-4 flex flex-wrap gap-3">
        <CountUpPill
          index={0}
          label="TVL"
          value={12.4}
          prefix="$"
          suffix="M"
          decimals={1}
        />
        <CountUpPill
          index={1}
          label="Daily Active Users"
          value={8.5}
          suffix="K"
          decimals={1}
        />
        <CountUpPill
          index={2}
          label="Growth Index"
          value={94}
          suffix=""
          decimals={0}
        />
      </div>
      <div ref={chartRef} className="flex-1 min-h-[180px]">
        {inView && (
          <ResponsiveContainer width="100%" height="100%" minHeight={180}>
            <AreaChart data={growthData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="morphGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A3E635" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#A3E635" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                axisLine={{ stroke: "rgba(163,230,53,0.15)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => String(v)}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(163,230,53,0.2)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#94a3b8" }}
                formatter={(value: number | undefined) => [value != null ? `${value}` : "—", "Morph Growth"]}
                labelFormatter={(_, payload) =>
                  payload?.[0]?.payload?.label ?? ""
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#A3E635"
                strokeWidth={2}
                fill="url(#morphGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      <p className="mt-2 text-[10px] font-medium text-muted">
        Morph Growth · Consumer Layer metrics
      </p>
    </motion.div>
  );
}
