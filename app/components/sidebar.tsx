"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  BarChart3,
  FolderOpen,
  Zap,
  Target,
} from "lucide-react";

const navItems = [
  { href: "#", icon: Home, label: "Home" },
  { href: "#analytics", icon: BarChart3, label: "Analytics" },
  { href: "#directory", icon: FolderOpen, label: "Projects" },
  { href: "#bridge-tools", icon: Zap, label: "Bridge" },
  { href: "#quests", icon: Target, label: "Quests" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col border-r border-border/50 bg-background/80 backdrop-blur-[25px] md:w-20">
      <div className="flex flex-1 flex-col items-center gap-2 py-6">
        <Link
          href="#"
          className="mb-4 flex items-center gap-2 px-2"
          aria-label="Morph Directory Home"
        >
          <span className="text-xl font-bold text-morph">m</span>
        </Link>
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-muted transition hover:bg-surface-light hover:text-morph"
            title={item.label}
            aria-label={item.label}
          >
            <item.icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
      <div className="border-t border-border/50 p-3">
        <div className="flex items-center gap-2 rounded-lg bg-surface/60 px-2 py-2">
          <span className="live-dot" aria-hidden />
          <span className="text-[10px] font-medium leading-tight text-muted">
            Morph Network: Operational
          </span>
        </div>
      </div>
    </aside>
  );
}
