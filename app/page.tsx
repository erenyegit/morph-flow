"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
import { SubmitModal } from "./components/submit-modal";
import { Fab } from "./components/fab";
import { BentoCta } from "./components/bento-cta";
import { BridgeToolsCard } from "./components/bridge-tools-card";
import { BottomNav } from "./components/bottom-nav";
import { LoadingShimmer } from "./components/loading-shimmer";
import { Sidebar } from "./components/sidebar";
import { NetworkAnalyticsCard } from "./components/network-analytics-card";
import { DailyZooQuestCard } from "./components/daily-zoo-quest-card";
import { LiveStatsCards } from "./components/live-stats-cards";
import { ProjectDetailDrawer } from "./components/project-detail-drawer";

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
    websiteUrl: "https://bitget.com",
    docsUrl: "https://bitget.com/docs",
    discordActivity: "High",
    ecosystemFit: "Core infrastructure for Morph’s consumer layer. Enables seamless onboarding and multi-chain access for the $150M Payment Ecosystem.",
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
    websiteUrl: "https://alchemypay.io",
    docsUrl: "https://docs.alchemypay.io",
    discordActivity: "Active",
    ecosystemFit: "Direct alignment with Morph’s payment vision. Powers fiat on-ramps and real-world spending for Consumer Layer apps.",
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
    websiteUrl: "https://abyssworld.com",
    discordActivity: "Very High",
    ecosystemFit: "Showcases Morph’s capacity for high-quality gaming. Drives adoption and proves L2 performance for consumer entertainment.",
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
    websiteUrl: "https://pyth.network",
    docsUrl: "https://docs.pyth.network",
    ecosystemFit: "Critical data layer for DeFi and payment apps on Morph. Ensures accurate pricing and settlement for the Consumer Layer.",
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
    websiteUrl: "https://morphpay.io",
    ecosystemFit: "Native payment rails for Morph. Turns crypto into everyday spend—core to the $150M Payment Accelerator narrative.",
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
    hasQuest: true,
    zooPoints: 30,
    websiteUrl: "https://bulbaswap.io",
    discordActivity: "Growing",
    ecosystemFit: "Primary DEX for Morph’s consumer assets. Enables swaps and liquidity for payment and gaming use cases.",
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
    hasQuest: true,
    zooPoints: 20,
    websiteUrl: "https://morphl2.io/zoo",
    ecosystemFit: "Central hub for Morph Zoo Incentives and Ecosystem Rewards. Drives daily engagement on the Consumer Layer.",
  },
];

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

const stagger = { visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const itemReveal = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function openModal() {
      setModalOpen(true);
    }
    document.addEventListener("open-submit-modal", openModal);
    return () => document.removeEventListener("open-submit-modal", openModal);
  }, []);

  const filteredProjects = useMemo(() => {
    let list = allProjects;
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
      <div className="ambient-glows">
        <div className="glow-1" aria-hidden />
        <div className="glow-2" aria-hidden />
        <div className="glow-3" aria-hidden />
      </div>

      <LoadingShimmer show={isLoading} />

      <Sidebar />

      {/* Main: offset by sidebar */}
      <main className="relative pl-16 md:pl-20">
        {/* Compact top bar */}
        <header className="sticky top-0 z-30 border-b border-border/40 bg-background/80 py-4 backdrop-blur-[25px]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-foreground">
                <span className="text-morph">morph</span>
                <span className="font-normal text-muted">.directory</span>
              </span>
              <span className="rounded-full border border-morph/20 bg-morph/5 px-2 py-0.5 text-[10px] font-semibold text-morph">
                Ecosystem Terminal
              </span>
            </div>
            <a
              href="#directory"
              className="rounded-full bg-morph px-4 py-2 text-sm font-semibold text-background transition hover:bg-morph-dim"
            >
              Explore
            </a>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {/* Bento: Top row — 60% Analytics + 40% Daily Quest */}
          <motion.section
            id="analytics"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="mb-8 grid gap-6 lg:grid-cols-[3fr_2fr]"
          >
            <motion.div variants={itemReveal}>
              <NetworkAnalyticsCard />
            </motion.div>
            <motion.div variants={itemReveal} id="quests">
              <DailyZooQuestCard />
            </motion.div>
          </motion.section>

          {/* Bento: Middle row — 3 Live Stats */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-8"
          >
            <motion.div variants={itemReveal}>
              <LiveStatsCards />
            </motion.div>
          </motion.section>

          {/* Bridge & Tools */}
          <motion.section
            id="bridge-tools"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <BridgeToolsCard />
          </motion.section>

          {/* Project Directory — filterable grid */}
          <section id="directory" className="relative py-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Project Directory
              </h2>
              <p className="mt-1 text-sm font-medium text-muted">
                Deep insights into Morph Consumer Layer partners
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-4 text-sm font-medium text-foreground outline-none transition placeholder:text-muted focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
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

            <motion.div
              layout
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [perspective:1000px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.length === 0 ? (
                  <motion.p
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full py-12 text-center text-sm font-medium text-muted"
                  >
                    No projects match your search.
                  </motion.p>
                ) : (
                  filteredProjects.map((project, i) => (
                    <motion.div key={project.name} layout variants={itemReveal}>
                      <ProjectCard
                        {...project}
                        index={i}
                        onSelect={() => setSelectedProject(project)}
                      />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </section>
        </div>

        {/* Grant Roadmap */}
        <section id="resource" className="relative py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-0">
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

        <BentoCta />

        {/* Footer */}
        <footer className="relative border-t border-border px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-center text-xs font-medium text-muted/80">
            Powered by Morph Community
          </p>
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
      </main>
      <>
        <ProjectDetailDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
        <Fab onClick={() => setModalOpen(true)} />
        <BottomNav />
        <SubmitModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    </div>
  );
}
