"use client";

import { useEffect, useState } from "react";
import { copyrightLine } from "@/lib/brand";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

export function ContentProtection() {
  const [open, setOpen] = useState(false);
  const [line] = useState(() => copyrightLine());

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), 2200);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const showCopyright = (e?: Event) => {
      e?.preventDefault();
      e?.stopPropagation();
      setOpen(true);
    };

    const onContextMenu = (e: MouseEvent) => {
      showCopyright(e);
    };

    const onCopyCut = (e: ClipboardEvent) => {
      if (isEditableTarget(e.target)) return;
      e.preventDefault();
      showCopyright();
    };

    const onDragStart = (e: DragEvent) => {
      if (isEditableTarget(e.target)) return;
      e.preventDefault();
    };

    const onSelectStart = (e: Event) => {
      if (isEditableTarget(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const meta = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      // View source / save / print / select-all / copy outside fields
      if (
        key === "f12" ||
        (meta && shift && (key === "i" || key === "j" || key === "c" || key === "k")) ||
        (meta && (key === "u" || key === "s" || key === "p"))
      ) {
        e.preventDefault();
        showCopyright();
        return;
      }

      if (meta && (key === "c" || key === "x" || key === "a")) {
        if (isEditableTarget(e.target)) return;
        e.preventDefault();
        showCopyright();
      }
    };

    document.addEventListener("contextmenu", onContextMenu, true);
    document.addEventListener("copy", onCopyCut, true);
    document.addEventListener("cut", onCopyCut, true);
    document.addEventListener("dragstart", onDragStart, true);
    document.addEventListener("selectstart", onSelectStart, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu, true);
      document.removeEventListener("copy", onCopyCut, true);
      document.removeEventListener("cut", onCopyCut, true);
      document.removeEventListener("dragstart", onDragStart, true);
      document.removeEventListener("selectstart", onSelectStart, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="content-protect-layer fixed inset-0 z-[2147483647] flex items-center justify-center bg-ink/55 px-6"
      role="alertdialog"
      aria-modal="true"
      aria-label={line}
      onClick={() => setOpen(false)}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        className="pointer-events-none select-none rounded-md bg-white px-5 py-2.5 text-center shadow-2xl"
        style={{ zIndex: 2147483647 }}
      >
        <p className="text-sm font-semibold tracking-tight text-ink">{line}</p>
      </div>
    </div>
  );
}
