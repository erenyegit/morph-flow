"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MORPH_ZOO_URL = "https://www.morphl2.io/zoo";

export function BentoCta() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative px-6 py-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border/50 bg-surface/80 px-6 py-8 backdrop-blur-[25px] sm:flex-row sm:px-10">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Join the $150M Payment Revolution
            </h2>
            <p className="mt-1 text-sm font-medium text-muted">
              Ecosystem rewards and the future of the Consumer Layer.
            </p>
          </div>
          <a
            href={MORPH_ZOO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-morph px-6 py-3 text-sm font-semibold text-background transition hover:bg-morph-dim"
          >
            Join the Movement
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
