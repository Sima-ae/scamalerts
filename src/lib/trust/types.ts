import { TrustLabel } from "@prisma/client";

export type TrustSignalGroup =
  | "technisch"
  | "certificaat"
  | "community"
  | "heuristiek";

export type TrustSignal = {
  key: string;
  label: string;
  positive: boolean | null;
  detail: string;
  weight: number;
  group: TrustSignalGroup;
  /** Score delta applied when this signal is evaluated */
  delta?: number;
  raw?: Record<string, unknown>;
};

export type TrustResult = {
  domain: string;
  score: number;
  label: TrustLabel;
  signals: TrustSignal[];
  cached: boolean;
  collectedAt: string;
  version: number;
};

export type SignalsPayload = {
  version: number;
  collectedAt: string;
  items: TrustSignal[];
};

export const TRUST_SIGNALS_VERSION = 7;
export const TRUST_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
