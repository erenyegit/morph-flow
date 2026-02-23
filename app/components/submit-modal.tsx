"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface SubmitModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, title: "Project name" },
  { id: 2, title: "GitHub & Twitter" },
  { id: 3, title: "Team size" },
  { id: 4, title: "Review" },
];

const teamSizeOptions = ["1-5", "6-10", "11-25", "26-50", "50+"];

export function SubmitModal({ open, onClose }: SubmitModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    github: "",
    twitter: "",
    teamSize: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      setForm({ name: "", github: "", twitter: "", teamSize: "" });
      onClose();
    }, 2500);
  }

  function handleClose() {
    setStep(1);
    setForm({ name: "", github: "", twitter: "", teamSize: "" });
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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="glass-card relative z-10 w-full max-w-md rounded-[32px] p-8"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Connect your project</h3>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl p-1.5 text-muted transition hover:bg-surface-light hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-6 text-xs text-muted">
              Add your project to the Morph ecosystem directory. All submissions are reviewed.
            </p>

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
                  <CheckCircle2 className="h-8 w-8 text-morph" />
                </div>
                <p className="text-lg font-semibold text-morph">Project connected</p>
                <p className="text-sm text-muted">
                  We&apos;ll review and list your project shortly.
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
                        <label className="mb-1.5 block text-sm font-semibold text-foreground">
                          Project Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. MorphPay"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
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
                        <label className="mb-1.5 block text-sm font-semibold text-foreground">
                          GitHub URL
                        </label>
                        <input
                          required
                          type="url"
                          placeholder="https://github.com/your-org/repo"
                          value={form.github}
                          onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-foreground">
                          Twitter / X URL
                        </label>
                        <input
                          required
                          type="url"
                          placeholder="https://x.com/yourproject"
                          value={form.twitter}
                          onChange={(e) => setForm((f) => ({ ...f, twitter: e.target.value }))}
                          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
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
                      className="flex flex-col gap-5"
                    >
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-foreground">
                          Team size
                        </label>
                        <select
                          required
                          value={form.teamSize}
                          onChange={(e) => setForm((f) => ({ ...f, teamSize: e.target.value }))}
                          className="w-full appearance-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-morph/40 focus:ring-1 focus:ring-morph/20"
                        >
                          <option value="">Select team size</option>
                          {teamSizeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt} people
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="rounded-2xl border border-border bg-surface/50 p-5 text-sm"
                    >
                      <p className="font-bold text-foreground">{form.name}</p>
                      <p className="mt-2 truncate text-muted">{form.github}</p>
                      <p className="truncate text-morph">{form.twitter}</p>
                      <p className="mt-2 text-muted">Team: {form.teamSize} people</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-2 flex gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-morph/40 hover:text-morph"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-morph py-3 text-sm font-semibold text-background transition hover:bg-morph-dim"
                  >
                    {step < 4 ? (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Connect project"
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
