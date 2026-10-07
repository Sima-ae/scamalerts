"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Short lines that fit inside the ring; full label stays available for a11y. */
function compactLabelLines(label: string): string[] {
  const normalized = label.trim().toLowerCase();
  const map: Record<string, string[]> = {
    "zeer waarschijnlijk veilig": ["Zeer", "veilig"],
    "waarschijnlijk veilig": ["Waarschijnlijk", "veilig"],
    neutraal: ["Neutraal"],
    "mogelijk onveilig": ["Mogelijk", "onveilig"],
    "hoog risico": ["Hoog", "risico"],
    "zeer waarschijnlijk onveilig": ["Zeer", "onveilig"],
  };
  if (map[normalized]) return map[normalized];

  const words = label.trim().split(/\s+/);
  if (words.length <= 2) return words;
  return [words.slice(0, -1).join(" "), words[words.length - 1]!];
}

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
  const lines = compactLabelLines(label);

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
    <div
      className="relative mx-auto flex h-[152px] w-[152px] items-center justify-center md:mx-0 md:h-[168px] md:w-[168px]"
      role="img"
      aria-label={`Trust Score ${Math.round(clamped)}: ${label}`}
    >
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
      <div
        className="absolute inset-[18%] flex flex-col items-center justify-center text-center"
        aria-hidden
      >
        <span
          className="font-display text-[2.35rem] leading-none tracking-tight md:text-[2.75rem]"
          style={{ color: stroke }}
        >
          {Math.round(clamped)}
        </span>
        <span className="mt-1.5 max-w-full text-[0.62rem] font-semibold leading-[1.15] tracking-wide text-muted md:text-[0.68rem]">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
