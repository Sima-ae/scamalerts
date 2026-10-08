import { TrustLabel } from "@prisma/client";

export type TrustSignalGroup =
  | "reputatie"
  | "heuristiek"
  | "certificaat"
  | "technisch"
  | "community";

export type TrustSignal = {
  key: string;
  label: string;
  /** true = reassuring, false = risk, null = neutral / not determinable */
  positive: boolean | null;
  detail: string;
  weight: number;
  group: TrustSignalGroup;
  /** Score delta applied when this signal is evaluated */
  delta?: number;
  /** Data source the signal was derived from, shown to the user */
  source?: string;
  /** True when the source could not be consulted; signal carries no score */
  unavailable?: boolean;
  raw?: Record<string, unknown>;
};

export type SourceStatus = {
  name: string;
  status: "ok" | "unavailable" | "not_configured";
  detail?: string;
};

export type TrustResult = {
  domain: string;
  score: number;
  label: TrustLabel;
  signals: TrustSignal[];
  sources: SourceStatus[];
  cached: boolean;
  collectedAt: string;
  version: number;
};

export type SignalsPayload = {
  version: number;
  collectedAt: string;
  items: TrustSignal[];
  sources: SourceStatus[];
};

export const TRUST_SIGNALS_VERSION = 9;
/** Blocklists change quickly; keep cached verdicts short-lived. */
export const TRUST_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
