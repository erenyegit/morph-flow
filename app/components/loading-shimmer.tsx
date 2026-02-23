"use client";

import { motion } from "framer-motion";

export function LoadingShimmer({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="h-12 w-12 rounded-2xl border-2 border-morph/30 border-t-morph shimmer" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-16 rounded-full bg-surface-light shimmer"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-sm font-medium text-muted">Loading ecosystem data...</p>
      </div>
    </motion.div>
  );
}
