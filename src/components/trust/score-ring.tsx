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
  size = "md",
}: {
  score: number;
  label: string;
  tone?: "good" | "warn" | "bad" | "neutral";
  size?: "sm" | "md";
}) {
  const small = size === "sm";
  const reduce = useReducedMotion();
  const [animated, setAnimated] = useState(0);
  const value = reduce ? score : animated;
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
    if (reduce) return;
    const id = requestAnimationFrame(() => setAnimated(score));
    return () => cancelAnimationFrame(id);
  }, [score, reduce]);

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center ${
        small
          ? "h-26 w-26"
          : "mx-auto h-38 w-38 md:mx-0 md:h-42 md:w-42"
      }`}
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
          className={`font-display leading-none tracking-tight ${
            small ? "text-[1.75rem]" : "text-[2.35rem] md:text-[2.75rem]"
          }`}
          style={{ color: stroke }}
        >
          {Math.round(clamped)}
        </span>
        <span
          className={`mt-1 max-w-full font-semibold leading-[1.15] tracking-wide text-muted ${
            small ? "text-[0.55rem]" : "text-[0.62rem] md:text-[0.68rem]"
          }`}
        >
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
