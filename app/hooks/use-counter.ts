"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;

    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;
    let current = 0;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      current = Math.min(end, increment * frame);

      if (Number.isInteger(end)) {
        setCount(Math.round(current));
      } else {
        setCount(parseFloat(current.toFixed(1)));
      }

      if (frame >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return { count, ref };
}
