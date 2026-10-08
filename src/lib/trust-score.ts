/**
 * Public trust-score API. Implementation lives in `src/lib/trust/`.
 */
export type { TrustSignal, TrustResult, SourceStatus } from "@/lib/trust/types";
export {
  analyzeDomain,
  scoreToLabel,
  trustLabelNL,
  groupSignals,
  InvalidDomainError,
} from "@/lib/trust/analyze";
export type { AnalyzeOptions } from "@/lib/trust/analyze";
export { parseDomain } from "@/lib/trust/domain-parts";
