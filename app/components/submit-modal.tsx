"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface SubmitModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = ["Payment", "DeFi", "Gaming", "Infrastructure", "Social"];

export function SubmitModal({ open, onClose }: SubmitModalProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-card relative z-10 w-full max-w-md rounded-2xl p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">Submit Your Project</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 py-8 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-morph/15 text-2xl">
                  ✓
                </div>
                <p className="text-lg font-semibold text-morph">Submitted!</p>
                <p className="text-sm text-muted">
                  We&apos;ll review your project shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-muted">
                    Project Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. MorphPay"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-muted">
                    Category
                  </label>
                  <select
                    required
                    className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                  >
                    <option value="" className="text-muted">
                      Select category
                    </option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-muted">
                    Twitter / X Link
                  </label>
                  <input
                    required
                    type="url"
                    placeholder="https://x.com/yourproject"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-1 w-full rounded-xl bg-morph py-3 text-sm font-semibold text-background transition hover:bg-morph-dim"
                >
                  Submit for Review
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
