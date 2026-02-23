"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText, Target, Twitter } from "lucide-react";
import type { Project } from "./project-card";

const statusConfig: Record<string, { label: string; cls: string }> = {
  mainnet: { label: "Mainnet Ready", cls: "bg-morph/15 text-morph" },
  incubated: { label: "Incubated", cls: "bg-purple-500/15 text-purple-400" },
  testnet: { label: "Testnet", cls: "bg-amber-400/15 text-amber-400" },
};

export function ProjectDetailDrawer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border/50 bg-background/90 shadow-2xl backdrop-blur-[25px]"
            role="dialog"
            aria-modal="true"
            aria-label={`Details: ${project.name}`}
          >
            <div className="flex items-center justify-between border-b border-border/50 p-4">
              <h2 className="text-lg font-bold text-foreground">{project.name}</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-muted transition hover:bg-surface-light hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  statusConfig[project.status]?.cls ?? statusConfig.mainnet.cls
                }`}
              >
                {project.statusLabel ?? statusConfig[project.status]?.label ?? "Mainnet Ready"}
              </span>
              <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

              <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-muted">
                Social Pulse
              </h4>
              <div className="mt-2 flex flex-wrap gap-3">
                {project.twitterFollowers && (
                  <div className="flex items-center gap-2 rounded-xl bg-surface/80 px-3 py-2">
                    <Twitter className="h-4 w-4 text-morph" />
                    <span className="text-sm font-medium text-foreground">
                      {project.twitterFollowers} followers
                    </span>
                  </div>
                )}
                {project.discordActivity && (
                  <div className="flex items-center gap-2 rounded-xl bg-surface/80 px-3 py-2">
                    <span className="text-sm font-medium text-foreground">
                      Discord: {project.discordActivity}
                    </span>
                  </div>
                )}
              </div>

              {project.ecosystemFit && (
                <>
                  <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-muted">
                    Ecosystem Fit
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {project.ecosystemFit}
                  </p>
                </>
              )}

              <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-muted">
                Actions
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-morph/15 px-4 py-2.5 text-sm font-semibold text-morph transition hover:bg-morph/25"
                  >
                    Visit Website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.docsUrl && (
                  <a
                    href={project.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-morph/30 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-morph/10"
                  >
                    View Docs
                    <FileText className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.hasQuest && (
                  <a
                    href="https://www.morphl2.io/zoo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-morph/30 px-4 py-2.5 text-sm font-semibold text-morph transition hover:bg-morph/10"
                  >
                    Go to Quest
                    <Target className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
