import { Loader2 } from "lucide-react";

export function CheckingStatus({
  domain,
  compact = false,
  hero = false,
}: {
  domain?: string;
  compact?: boolean;
  hero?: boolean;
}) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Aan het controleren…
      </span>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        hero ? "text-white" : "text-ink"
      }`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={`relative flex h-16 w-16 items-center justify-center rounded-full border ${
          hero
            ? "border-white/25 bg-white/10"
            : "border-line bg-white shadow-[0_12px_40px_-28px_rgba(15,28,46,0.4)]"
        }`}
      >
        <Loader2
          className={`h-7 w-7 animate-spin ${hero ? "text-white" : "text-accent"}`}
          aria-hidden
        />
      </div>
      <p
        className={`mt-5 font-display text-2xl tracking-tight md:text-3xl ${
          hero ? "text-white" : "text-ink"
        }`}
      >
        Aan het controleren…
      </p>
      {domain ? (
        <p
          className={`mt-2 max-w-md break-all text-sm ${
            hero ? "text-white/70" : "text-muted"
          }`}
        >
          {domain}
        </p>
      ) : (
        <p className={`mt-2 text-sm ${hero ? "text-white/70" : "text-muted"}`}>
          We analyseren DNS, TLS, leeftijd en nabootsingssignalen.
        </p>
      )}
      <div
        className={`mt-6 h-1 w-40 overflow-hidden rounded-full ${
          hero ? "bg-white/15" : "bg-line"
        }`}
        aria-hidden
      >
        <div className="checking-bar h-full w-1/2 rounded-full bg-accent" />
      </div>
    </div>
  );
}
