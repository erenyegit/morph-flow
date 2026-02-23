"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const categoryColors: Record<string, string> = {
  Payment: "bg-morph/15 text-morph",
  Gaming: "bg-purple-500/15 text-purple-400",
  Social: "bg-sky-500/15 text-sky-400",
  DeFi: "bg-amber-500/15 text-amber-400",
};

interface ProjectCardProps {
  name: string;
  category: string;
  description: string;
  index: number;
}

export function ProjectCard({
  name,
  category,
  description,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group glass rounded-2xl p-6 transition-all duration-300 hover:border-morph/30 hover:glow-morph"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-morph/10 text-lg font-bold text-morph">
          {name.charAt(0)}
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[category] ?? "bg-zinc-500/15 text-zinc-400"}`}
        >
          {category}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">{name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>

      <a
        href="#"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-morph opacity-0 transition-all duration-300 group-hover:opacity-100 hover:underline"
      >
        Try App
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </motion.div>
  );
}
