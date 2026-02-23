"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface SubmitModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = ["Payment", "DeFi", "Gaming", "Infrastructure", "Social"];

const steps = [
  { id: 1, title: "Project basics" },
  { id: 2, title: "Links & social" },
  { id: 3, title: "Review & submit" },
];

export function SubmitModal({ open, onClose }: SubmitModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    twitter: "",
    website: "",
    description: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      setForm({ name: "", category: "", twitter: "", website: "", description: "" });
      onClose();
    }, 2500);
  }

  function handleClose() {
    setStep(1);
    setForm({ name: "", category: "", twitter: "", website: "", description: "" });
    onClose();
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
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-card relative z-10 w-full max-w-md rounded-2xl p-8"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-bold">Submit Your Project</h3>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-1.5 text-muted transition hover:bg-surface-light hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step indicator */}
            {!submitted && (
              <div className="mb-6 flex gap-2">
                {steps.map((s) => (
                  <div
                    key={s.id}
                    className={`h-1 flex-1 rounded-full ${
                      s.id <= step ? "bg-morph" : "bg-surface-light"
                    }`}
                  />
                ))}
              </div>
            )}

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 py-8 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-morph/15">
                  <Heart className="h-7 w-7 text-morph" />
                </div>
                <p className="text-lg font-semibold text-morph">Thank you!</p>
                <p className="text-sm text-muted">
                  Your project has been submitted for community review.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-muted">
                          Project Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. MorphPay"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-muted">
                          Category
                        </label>
                        <select
                          required
                          value={form.category}
                          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                          className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                        >
                          <option value="">Select category</option>
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-muted">
                          Short description
                        </label>
                        <textarea
                          value={form.description}
                          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                          placeholder="One line about your project"
                          rows={2}
                          className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-muted">
                          Twitter / X Link
                        </label>
                        <input
                          required
                          type="url"
                          placeholder="https://x.com/yourproject"
                          value={form.twitter}
                          onChange={(e) => setForm((f) => ({ ...f, twitter: e.target.value }))}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-muted">
                          Website (optional)
                        </label>
                        <input
                          type="url"
                          placeholder="https://yourproject.com"
                          value={form.website}
                          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="rounded-xl border border-border bg-surface/50 p-4 text-sm"
                    >
                      <p className="font-medium text-foreground">{form.name}</p>
                      <p className="mt-1 text-muted">{form.category}</p>
                      {form.description && (
                        <p className="mt-2 text-muted">{form.description}</p>
                      )}
                      <p className="mt-2 truncate text-morph">{form.twitter}</p>
                      {form.website && (
                        <p className="truncate text-muted">{form.website}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-2 flex gap-3">
                  {step > 1 && !submitted && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-1 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition hover:border-morph/40 hover:text-morph"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-morph py-3 text-sm font-semibold text-background transition hover:bg-morph-dim"
                  >
                    {step < 3 ? (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Submit for Review"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
