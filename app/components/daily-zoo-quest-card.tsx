"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Circle, Trophy } from "lucide-react";

const STORAGE_KEY = "morph-zoo-quests";

const QUESTS = [
  { id: "daily-checkin", title: "Daily Check-in", xp: 10 },
  { id: "bridger", title: "The Bridger", xp: 50 },
  { id: "volume-booster", title: "Volume Booster", xp: 30 },
  { id: "social-warrior", title: "Social Warrior", xp: 20 },
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
    const { date, completed } = JSON.parse(raw) as { date: string; completed: string[] };
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
      JSON.stringify({ date: getTodayKey(), completed: Array.from(completed) })
    );
  } catch {}
}

export function DailyZooQuestCard() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCompleted(loadCompleted());
  }, []);

  const earnedXp = QUESTS.filter((q) => completed.has(q.id)).reduce((s, q) => s + q.xp, 0);

  function toggle(id: string) {
    const next = new Set(completed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompleted(next);
    saveCompleted(next);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bento-tilt glass-terminal flex h-full flex-col rounded-2xl p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-morph" />
          <h3 className="text-lg font-bold text-foreground">Daily Zoo Quest</h3>
        </div>
        <span className="rounded-full bg-morph/15 px-2.5 py-0.5 text-xs font-semibold text-morph">
          {earnedXp}/{TOTAL_XP} XP
        </span>
      </div>
      <p className="mb-4 text-xs font-medium text-muted">
        Morph Zoo Incentives · Ecosystem Rewards
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-surface-light">
        <motion.div
          animate={{ width: `${(earnedXp / TOTAL_XP) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="h-full rounded-full bg-gradient-to-r from-morph to-morph-dim"
        />
      </div>
      <ul className="mt-4 space-y-2">
        {QUESTS.map((quest, i) => {
          const done = completed.has(quest.id);
          return (
            <li key={quest.id}>
              <button
                type="button"
                onClick={() => toggle(quest.id)}
                className="flex w-full items-center gap-3 rounded-lg py-2 text-left transition hover:bg-surface-light/50"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    done ? "bg-morph text-background" : "border border-morph/40 text-muted"
                  }`}
                >
                  {done ? <Check className="h-3 w-3" strokeWidth={3} /> : <Circle className="h-3 w-3" />}
                </span>
                <span className="flex-1 text-sm font-medium text-foreground">{quest.title}</span>
                <span className="text-xs font-semibold text-morph">+{quest.xp}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <a
        href="https://www.morphl2.io/zoo"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-morph/15 py-2.5 text-sm font-semibold text-morph transition hover:bg-morph/25"
      >
        Open Morph Zoo
      </a>
    </motion.div>
  );
}
