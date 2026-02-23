"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Search,
  ChevronRight,
  Layers,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { ProjectCard } from "./components/project-card";
import type { Project } from "./components/project-card";
import { FeaturedCard } from "./components/featured-card";
import { HeroProjectCard } from "./components/hero-project-card";
import { LiveTicker } from "./components/live-ticker";
import { SubmitModal } from "./components/submit-modal";
import { AnimatedBg } from "./components/animated-bg";
import { Fab } from "./components/fab";
import { BottomNav } from "./components/bottom-nav";
import { LoadingShimmer } from "./components/loading-shimmer";

const spark = (base: number, variance: number, points: number) =>
  Array.from({ length: points }, (_, i) =>
    Math.round(base + Math.sin(i * 0.7) * variance + (i / points) * 20)
  );

const allProjects: Project[] = [
  {
    name: "Bitget Wallet",
    category: "Infrastructure",
    description: "The primary gateway for Morph users. Multi-chain wallet with built-in swap and bridge.",
    status: "mainnet",
    featured: true,
    activity: 95,
    statusLabel: "Mainnet Live",
    twitterFollowers: "520k+",
    sparklineData: spark(70, 12, 12),
  },
  {
    name: "Alchemy Pay",
    category: "Payment",
    description: "Global on-ramp for Morph consumer apps. Fiat-to-crypto payments in 173+ countries.",
    status: "mainnet",
    featured: true,
    activity: 88,
    statusLabel: "Mainnet Live",
    twitterFollowers: "120k+",
    sparklineData: spark(65, 10, 12),
  },
  {
    name: "Abyss World",
    category: "Gaming",
    description: "AAA action RPG on Morph. Next-gen blockchain gaming with immersive gameplay.",
    status: "mainnet",
    activity: 82,
    statusLabel: "Mainnet Live",
    twitterFollowers: "80k+",
    sparklineData: spark(60, 14, 12),
  },
  {
    name: "Pyth Network",
    category: "Infrastructure",
    description: "Oracle providing real-time market data to Morph dApps. Sub-second price feeds.",
    status: "mainnet",
    activity: 78,
    statusLabel: "Mainnet Live",
    twitterFollowers: "250k+",
    sparklineData: spark(55, 15, 12),
  },
  {
    name: "MorphPay",
    category: "Payment",
    description: "Next-gen crypto card solutions for seamless everyday spending on Morph.",
    status: "mainnet",
    activity: 71,
    statusLabel: "Mainnet Live",
    twitterFollowers: "50k+",
    sparklineData: spark(50, 12, 12),
  },
  {
    name: "BulbaSwap",
    category: "DeFi",
    description: "Native liquidity layer optimized for consumer asset swaps on Morph.",
    status: "incubated",
    activity: 65,
    statusLabel: "Incubated",
    twitterFollowers: "35k+",
    sparklineData: spark(45, 10, 12),
  },
  {
    name: "Zoo Wallet",
    category: "Gaming",
    description: "Consumer engagement & rewards hub powered by Morph.",
    status: "testnet",
    activity: 58,
    statusLabel: "Testnet",
    twitterFollowers: "28k+",
    sparklineData: spark(40, 12, 12),
  },
];

const featuredProjects = allProjects.filter((p) => p.featured);
const discoveryProjects = allProjects.filter((p) => !p.featured);
const topProject = featuredProjects[0];

const filters = ["All", "Payment", "DeFi", "Gaming", "Infrastructure", "Social"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const MORPH_GRANTS_URL = "https://www.morphl2.io/grants/";

const grantSteps = [
  {
    step: 1,
    title: "Build on Testnet",
    description: "Deploy and test your dApp on Morph testnet. Validate UX and integrations.",
    icon: Layers,
  },
  {
    step: 2,
    title: "Get Community Support",
    description: "Share your project, gather feedback, and build a user base in the Morph ecosystem.",
    icon: Zap,
  },
  {
    step: 3,
    title: "Apply for $150M Payment Accelerator",
    description: "Submit your application to the Morph Foundation for grants and accelerator support.",
    icon: CheckCircle2,
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function openModal() {
      setModalOpen(true);
    }
    document.addEventListener("open-submit-modal", openModal);
    return () => document.removeEventListener("open-submit-modal", openModal);
  }, []);

  const filteredDiscovery = useMemo(() => {
    let list = discoveryProjects;
    if (activeFilter !== "All") {
      list = list.filter((p) => p.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeFilter, searchQuery]);

  return (
    <div className="grid-bg relative min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <div className="matte-bg" />
      <div className="mesh-gradient" />
      <div className="noise-overlay" />
      <AnimatedBg />

      <LoadingShimmer show={isLoading} />

      {/* ───────── NAVBAR ───────── */}
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <span className="text-lg font-bold tracking-tight text-foreground">
            <span className="text-morph">morph</span>
            <span className="font-normal text-muted">.directory</span>
          </span>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
            <a href="#pulse" className="transition hover:text-foreground">Pulse</a>
            <a href="#directory" className="transition hover:text-foreground">Directory</a>
            <a href="#resource" className="transition hover:text-foreground">Grants</a>
          </div>
          <a
            href="#directory"
            className="rounded-full bg-morph px-4 py-2 text-sm font-semibold text-background transition hover:bg-morph-dim"
          >
            Explore
          </a>
        </div>
      </nav>

      {/* ───────── HERO ───────── */}
      <section className="radial-hero relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-morph/[0.06] blur-[140px]" />
          <div className="absolute right-1/4 top-1/3 h-[350px] w-[350px] rounded-full bg-morph-dim/[0.04] blur-[110px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-morph/20 bg-morph/5 px-4 py-1.5 text-xs font-semibold text-morph"
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
            className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            The Gateway to{" "}
            <span className="text-gradient-morph">Morph Consumer Layer</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-xl text-base font-medium leading-relaxed text-muted sm:text-lg"
          >
            High-utility ecosystem dashboard for Morph&apos;s{" "}
            <span className="font-bold text-morph">$150M</span> Payment &
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
              className="inline-flex items-center gap-2 rounded-full border border-morph/30 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-morph hover:bg-morph/10 hover:text-morph"
            >
              Connect your project
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
      <section id="pulse" className="radial-stats relative px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Live Network Pulse</h2>
            <p className="mt-2 text-sm font-medium text-muted">
              Real-time metrics from the Morph L2 network
            </p>
          </motion.div>
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <LiveTicker />
          </motion.div>
        </div>
      </section>

      {/* ───────── ECOSYSTEM DIRECTORY ───────── */}
      <section id="directory" className="relative px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Ecosystem Directory
            </h2>
            <p className="mt-2 text-sm font-medium text-muted">
              Discover real Morph partners and community projects
            </p>
          </motion.div>

          {/* Search + Segmented filter */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-border bg-surface py-2.5 pl-9 pr-4 text-sm font-medium text-foreground outline-none transition placeholder:text-muted focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
              />
            </div>
            <div className="segmented-control inline-flex flex-wrap gap-1 p-1">
              {filters.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    tag === activeFilter
                      ? "bg-morph text-background"
                      : "text-muted hover:bg-surface-light hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Hero Card (top project) */}
          {topProject && (
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16 [perspective:1000px]"
            >
              <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted">
                Featured App Spotlight
              </h3>
              <HeroProjectCard {...topProject} index={0} />
            </motion.div>
          )}

          {/* Featured row */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted">
              Featured Partners
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 [perspective:1000px]">
              {featuredProjects.slice(1).map((project, i) => (
                <FeaturedCard key={project.name} {...project} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Discovery grid */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-muted">
              Discover More
            </h3>
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [perspective:1000px]">
              <AnimatePresence mode="popLayout">
                {filteredDiscovery.length === 0 ? (
                  <motion.p
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full py-12 text-center text-sm font-medium text-muted"
                  >
                    No projects match your search. Try a different filter or query.
                  </motion.p>
                ) : (
                  filteredDiscovery.map((project, i) => (
                    <ProjectCard key={project.name} {...project} index={i} />
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───────── GRANT ROADMAP ───────── */}
      <section id="resource" className="relative px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glow-morph gradient-morph rounded-[32px] border border-morph/20 p-8 sm:p-12"
          >
            <div className="mb-10 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-morph" />
              <h2 className="text-2xl font-bold text-foreground sm:text-4xl">Grant Roadmap</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm font-medium text-muted">
                From testnet to accelerator. Follow these steps to apply for the $150M Payment Accelerator.
              </p>
            </div>

            <div className="space-y-6">
              {grantSteps.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5 rounded-2xl border border-morph/10 bg-background/40 p-5 backdrop-blur-xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-morph/15">
                    <item.icon className="h-6 w-6 text-morph" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-morph">
                      Step {item.step}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-muted">{item.description}</p>
                  </div>
                  {i < grantSteps.length - 1 && (
                    <ChevronRight className="hidden shrink-0 text-morph/50 sm:block" />
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={MORPH_GRANTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-morph px-8 py-3.5 text-sm font-semibold text-background transition hover:bg-morph-dim"
              >
                Official Morph Grants
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-morph/40 px-8 py-3.5 text-sm font-semibold text-morph transition hover:bg-morph/10"
              >
                Connect your project
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="relative border-t border-border px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                <span className="text-morph">morph</span>
                <span className="font-normal text-muted">.directory</span>
              </span>
              <p className="mt-2 text-xs font-medium text-muted">
                &copy; {new Date().getFullYear()} Morph-Flow. Community tool.
              </p>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-muted/90">
                Morph-Flow is a community-driven ecosystem directory. Not
                officially affiliated with Morph Labs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted">
              <a href="#" className="transition hover:text-foreground">Docs</a>
              <a href="#" className="transition hover:text-foreground">Blog</a>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <a href="#" className="transition hover:text-morph" aria-label="X">𝕏</a>
              <a href="#" className="transition hover:text-morph" aria-label="Discord">Discord</a>
              <a href="#" className="transition hover:text-morph" aria-label="GitHub">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      <Fab onClick={() => setModalOpen(true)} />
      <BottomNav />
      <SubmitModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
