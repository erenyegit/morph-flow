"use client";

export function AnimatedBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="animate-float-slow absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-morph/[0.04] blur-[160px]" />
      <div className="animate-float-slower absolute -right-24 top-2/3 h-[400px] w-[400px] rounded-full bg-morph-dim/[0.03] blur-[140px]" />
      <div className="animate-float-slow absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-morph/[0.03] blur-[130px]" />
    </div>
  );
}
