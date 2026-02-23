"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface FabProps {
  onClick: () => void;
}

export function Fab({ onClick }: FabProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-morph shadow-lg shadow-morph/25 transition hover:bg-morph-dim md:bottom-8 md:right-8"
      aria-label="Submit your project"
    >
      <Plus className="h-6 w-6 text-background" />
    </motion.button>
  );
}
