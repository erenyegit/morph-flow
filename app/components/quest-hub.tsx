"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Circle, Trophy } from "lucide-react";

const STORAGE_KEY = "morph-zoo-quests";

const QUESTS = [
  {
    id: "daily-checkin",
    title: "Daily Check-in",
    description: "Open Morph Zoo and claim your daily points.",
    xp: 10,
  },
  {
    id: "bridger",
    title: "The Bridger",
    description: "Bridge at least $10 to Morph.",
    xp: 50,
  },
  {
    id: "volume-booster",
    title: "Volume Booster",
    description: "Make a swap on BulbaSwap.",
    xp: 30,
  },
  {
    id: "social-warrior",
    title: "Social Warrior",
    description: "Follow Morph on X/Twitter.",
    xp: 20,
  },
] as const;

const TOTAL_XP = QUESTS.reduce((s, q) => s + q.xp, 0);

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadCompleted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const { date, completed } = JSON.parse(raw) as {
      date: string;
      completed: string[];
    };
    if (date !== getTodayKey()) return new Set();
    return new Set(completed);
  } catch {
    return new Set();
  }
}

function saveCompleted(completed: Set<string>) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        date: getTodayKey(),
        completed: Array.from(completed),
      })
    );
  } catch {}
}

export function QuestHub() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompleted(loadCompleted());
  }, []);

  const completedIds = Array.from(completed);
  const earnedXp = QUESTS.filter((q) => completed.has(q.id)).reduce(
    (s, q) => s + q.xp,
    0
  );

  function toggle(id: string) {
    const next = new Set(completed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompleted(next);
    saveCompleted(next);
  }

  return (
    <section id="quests" className="relative px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="quest-card-neon mb-10 rounded-2xl border-2 border-morph/30 bg-morph/5 px-6 py-5 text-center sm:px-8 sm:py-6"
        >
          <p className="text-lg font-bold text-foreground sm:text-xl">
            WANT TO GET AIRDROP?
          </p>
          <p className="mt-1 text-sm font-medium text-muted">
            Start completing missions below to maximize your Morph Zoo XP.
          </p>
        </motion.div>

        {/* Section header + Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-morph" />
            <h2 className="text-2xl font-bold text-foreground">
              Morph Zoo: Daily Quests
            </h2>
          </div>
          <div className="min-w-0 flex-1 sm:max-w-xs">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
              Today&apos;s XP Goal: {earnedXp} / {TOTAL_XP}
            </p>
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-light">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(earnedXp / TOTAL_XP) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-morph to-morph-dim"
              />
            </div>
          </div>
        </motion.div>

        {/* Task cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {QUESTS.map((quest, i) => {
            const done = completed.has(quest.id);
            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="quest-card-neon flex items-start gap-4 rounded-2xl border-2 border-morph/25 bg-surface/40 p-5 backdrop-blur-sm transition hover:border-morph/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(quest.id)}
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                    done
                      ? "bg-morph text-background"
                      : "border-2 border-morph/50 bg-transparent text-morph/70 hover:bg-morph/10 hover:border-morph"
                  }`}
                  aria-label={done ? "Mark incomplete" : "Mark completed"}
                >
                  {done ? (
                    <Check className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </button>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-foreground">{quest.title}</h3>
                  <p className="mt-0.5 text-sm text-muted">
                    {quest.description}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-morph">
                    +{quest.xp} XP
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
