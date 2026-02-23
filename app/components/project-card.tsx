"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, Twitter } from "lucide-react";

const categoryColors: Record<string, string> = {
  Payment: "bg-morph/15 text-morph",
  Gaming: "bg-purple-500/15 text-purple-400",
  Social: "bg-sky-500/15 text-sky-400",
  DeFi: "bg-amber-500/15 text-amber-400",
  Infrastructure: "bg-blue-500/15 text-blue-400",
};

export interface Project {
  name: string;
  category: string;
  description: string;
  status: "mainnet" | "testnet";
  featured?: boolean;
}

interface ProjectCardProps extends Project {
  index: number;
}

export function ProjectCard({
  name,
  category,
  description,
  status,
  featured,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative glass-card rounded-2xl p-6 transition-shadow duration-300 hover:glow-morph-intense"
    >
      {featured && (
        <div className="absolute -top-2.5 right-4 rounded-full bg-morph px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
          Featured
        </div>
      )}

      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-morph/10 text-lg font-bold text-morph">
          {name.charAt(0)}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
              status === "mainnet"
                ? "bg-morph/15 text-morph"
                : "bg-amber-400/15 text-amber-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status === "mainnet" ? "bg-morph" : "bg-amber-400"
              }`}
            />
            {status === "mainnet" ? "Mainnet" : "Testnet"}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${categoryColors[category] ?? "bg-zinc-500/15 text-zinc-400"}`}
          >
            {category}
          </span>
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">{name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-morph"
            aria-label="Twitter"
          >
            <Twitter className="h-3.5 w-3.5" />
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
          className="inline-flex items-center gap-1.5 text-sm font-medium text-morph opacity-0 transition-all duration-300 group-hover:opacity-100 hover:underline"
        >
          Try App
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
