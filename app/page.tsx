"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Blocks,
  Gauge,
  Zap,
  Rocket,
  ExternalLink,
} from "lucide-react";
import { ProjectCard } from "./components/project-card";
import type { Project } from "./components/project-card";
import { StatCard } from "./components/stat-card";
import { SubmitModal } from "./components/submit-modal";

const stats = [
  {
    label: "Total Transactions",
    value: 1200000,
    suffix: "+",
    prefix: "",
    decimals: 0,
    growth: "↑ 12.4%",
    icon: Activity,
    accent: "from-morph/20 to-transparent",
  },
  {
    label: "Active Consumer Apps",
    value: 45,
    suffix: "+",
    prefix: "",
    decimals: 0,
    growth: "↑ 8.1%",
    icon: Blocks,
    accent: "from-morph-dim/20 to-transparent",
  },
  {
    label: "Avg. Transaction Fee",
    value: 0.01,
    suffix: "",
    prefix: "<$",
    decimals: 2,
    growth: "↓ 3.2%",
    icon: Gauge,
    accent: "from-morph/20 to-transparent",
  },
  {
    label: "TPS",
    value: 12.5,
    suffix: "",
    prefix: "",
    decimals: 1,
    growth: "↑ 5.2%",
    icon: Zap,
    accent: "from-morph-dim/20 to-transparent",
  },
];

const projects: Project[] = [
  {
    name: "MorphPay",
    category: "Payment",
    description:
      "Next-gen crypto card solutions for seamless everyday spending.",
    status: "mainnet",
    featured: true,
  },
  {
    name: "Zoo Wallet",
    category: "Gaming",
    description:
      "Official consumer engagement & rewards hub powered by Morph.",
    status: "mainnet",
    featured: true,
  },
  {
    name: "BitStore",
    category: "Payment",
    description:
      "Integrated payment gateway bridging crypto and retail commerce.",
    status: "mainnet",
  },
  {
    name: "BulbaSwap",
    category: "DeFi",
    description: "Native liquidity layer optimized for consumer asset swaps.",
    status: "mainnet",
  },
  {
    name: "SocialMorph",
    category: "Social",
    description:
      "Decentralized identity and social graph for the consumer web.",
    status: "testnet",
  },
  {
    name: "MorphBridge",
    category: "Infrastructure",
    description:
      "Canonical bridge for fast L1 ↔ L2 asset transfers on Morph.",
    status: "mainnet",
  },
];

const filters = ["All", "Payment", "DeFi", "Gaming", "Infrastructure", "Social"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="grid-bg min-h-screen bg-background text-foreground">
      {/* ───────── NAVBAR ───────── */}
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-morph">morph</span>
            <span className="font-normal text-muted">.directory</span>
          </span>
          <div className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#pulse" className="transition hover:text-foreground">
              Network
            </a>
            <a href="#directory" className="transition hover:text-foreground">
              Directory
            </a>
            <a href="#grant" className="transition hover:text-foreground">
              Grants
            </a>
          </div>
          <a
            href="#directory"
            className="rounded-full bg-morph px-4 py-2 text-sm font-semibold text-background transition hover:bg-morph-dim"
          >
            Launch App
          </a>
        </div>
      </nav>

      {/* ───────── HERO ───────── */}
      <section className="radial-hero relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-morph/[0.07] blur-[140px]" />
          <div className="absolute right-1/4 top-1/3 h-[350px] w-[350px] rounded-full bg-morph-dim/[0.05] blur-[110px]" />
          <div className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-morph/[0.04] blur-[100px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-morph/20 bg-morph/5 px-4 py-1.5 text-xs font-medium text-morph"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-morph opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-morph" />
            </span>
            Live on Mainnet
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Explore the{" "}
            <span className="text-gradient-morph">Morph Consumer Layer</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            The ultimate directory and real-time pulse for Morph&apos;s{" "}
            <span className="font-semibold text-morph">$150M</span> Payment &
            Consumer Ecosystem.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a
              href="#directory"
              className="group inline-flex items-center gap-2 rounded-full bg-morph px-6 py-3 text-sm font-semibold text-background transition hover:bg-morph-dim"
            >
              Explore Apps
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-morph/40 hover:text-morph"
            >
              Submit Project
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-xs text-muted"
        >
          <span>Scroll to explore</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-muted/60 to-transparent" />
        </motion.div>
      </section>

      {/* ───────── LIVE NETWORK PULSE ───────── */}
      <section id="pulse" className="radial-stats relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-bold sm:text-3xl">
              Live Network Pulse
            </h2>
            <p className="mt-2 text-sm text-muted">
              Real-time metrics from the Morph L2 network
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ECOSYSTEM DIRECTORY ───────── */}
      <section id="directory" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row"
          >
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Ecosystem Directory
              </h2>
              <p className="mt-2 text-sm text-muted">
                Discover apps building the consumer future on Morph
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    tag === activeFilter
                      ? "bg-morph text-background"
                      : "border border-border text-muted hover:border-morph/40 hover:text-morph"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.name} {...project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ───────── GRANT BANNER ───────── */}
      <section id="grant" className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glow-morph gradient-morph mx-auto max-w-5xl rounded-3xl border border-morph/20 p-10 text-center sm:p-16"
        >
          <Rocket className="mx-auto mb-5 h-10 w-10 text-morph" />
          <h2 className="text-2xl font-bold sm:text-4xl">
            Building on Morph?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted">
            Get a slice of the{" "}
            <span className="font-semibold text-morph">
              $150M Payment Accelerator
            </span>{" "}
            fund. We back founders building the consumer layer of crypto.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-morph px-8 py-3.5 text-sm font-semibold text-background transition hover:bg-morph-dim"
          >
            Apply for Grant
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="border-t border-border px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:flex-row">
          <div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-morph">morph</span>
              <span className="font-normal text-muted">.directory</span>
            </span>
            <p className="mt-2 text-xs text-muted">
              &copy; {new Date().getFullYear()} Morph. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
            <a href="#" className="transition hover:text-foreground">
              Docs
            </a>
            <a href="#" className="transition hover:text-foreground">
              Blog
            </a>
            <a href="#" className="transition hover:text-foreground">
              Careers
            </a>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <a href="#" className="transition hover:text-morph" aria-label="X">
              𝕏
            </a>
            <a
              href="#"
              className="transition hover:text-morph"
              aria-label="Discord"
            >
              Discord
            </a>
            <a
              href="#"
              className="transition hover:text-morph"
              aria-label="GitHub"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* ───────── SUBMIT MODAL ───────── */}
      <SubmitModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
