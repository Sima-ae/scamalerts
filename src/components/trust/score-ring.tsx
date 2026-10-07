"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function ScoreRing({
  score,
  label,
  tone = "neutral",
}: {
  score: number;
  label: string;
  tone?: "good" | "warn" | "bad" | "neutral";
}) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? score : 0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference - (clamped / 100) * circumference;

  const stroke =
    tone === "good"
      ? "var(--trust)"
      : tone === "bad"
        ? "var(--danger)"
        : tone === "warn"
          ? "#b45309"
          : "var(--accent)";

  useEffect(() => {
    if (reduce) {
      setValue(score);
      return;
    }
    const id = requestAnimationFrame(() => setValue(score));
    return () => cancelAnimationFrame(id);
  }, [score, reduce]);

  return (
    <div className="relative mx-auto flex h-[148px] w-[148px] items-center justify-center md:mx-0 md:h-[168px] md:w-[168px]">
      <svg
        viewBox="0 0 128 128"
        className="h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-line/70"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: reduce
              ? undefined
              : "stroke-dashoffset 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display text-4xl leading-none tracking-tight text-ink md:text-5xl"
          style={{ color: stroke }}
        >
          {Math.round(clamped)}
        </span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}
