/**
 * Public trust-score API. Implementation lives in `src/lib/trust/`.
 */
export type { TrustSignal, TrustResult } from "@/lib/trust/types";
export {
  analyzeDomain,
  scoreToLabel,
  trustLabelNL,
  groupSignals,
} from "@/lib/trust/analyze";
export type { AnalyzeOptions } from "@/lib/trust/analyze";
