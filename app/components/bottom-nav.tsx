"use client";

import Link from "next/link";
import { Home, Trophy, LayoutGrid, BookOpen, Plus } from "lucide-react";

export function BottomNav() {
  function openSubmit() {
    document.dispatchEvent(new CustomEvent("open-submit-modal"));
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 pb-safe backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-3">
        <Link
          href="#"
          className="flex flex-col items-center gap-0.5 rounded-lg px-4 py-1.5 text-muted transition hover:bg-surface-light hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link
          href="#quests"
          className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-muted transition hover:bg-surface-light hover:text-foreground"
        >
          <Trophy className="h-5 w-5" />
          <span className="text-[10px] font-medium">Quests</span>
        </Link>
        <Link
          href="#directory"
          className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-muted transition hover:bg-surface-light hover:text-foreground"
        >
          <LayoutGrid className="h-5 w-5" />
          <span className="text-[10px] font-medium">Apps</span>
        </Link>
        <Link
          href="#resource"
          className="flex flex-col items-center gap-0.5 rounded-lg px-4 py-1.5 text-muted transition hover:bg-surface-light hover:text-foreground"
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-[10px] font-medium">Grants</span>
        </Link>
        <button
          type="button"
          onClick={openSubmit}
          className="flex flex-col items-center gap-0.5 rounded-lg px-4 py-1.5 text-morph transition hover:bg-surface-light"
        >
          <Plus className="h-5 w-5" />
          <span className="text-[10px] font-medium">Submit</span>
        </button>
      </div>
    </nav>
  );
}
