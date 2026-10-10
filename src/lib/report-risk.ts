import type { ReportRisk, TrustLabel } from "@prisma/client";

export const reportRiskOptions: {
  value: ReportRisk;
  label: string;
  color: string;
}[] = [
  { value: "HIGH", label: "Hoog risico", color: "#dc2626" },
  { value: "LOW", label: "Laag risico", color: "#ea580c" },
  { value: "NONE", label: "Geen risico", color: "#16a34a" },
];

export function riskFromTrustLabel(label: TrustLabel | null | undefined): ReportRisk | null {
  if (label === "VERY_LIKELY_UNSAFE" || label === "HIGH_RISK") return "HIGH";
  if (label === "POTENTIALLY_UNSAFE") return "LOW";
  if (label === "LIKELY_SAFE" || label === "VERY_LIKELY_SAFE") return "NONE";
  return null;
}

export function reportRiskView(
  risk: ReportRisk | null | undefined,
  trustLabel: TrustLabel | null | undefined,
): { label: string; color: string } | null {
  const chosen = risk ?? riskFromTrustLabel(trustLabel);
  const option = reportRiskOptions.find((item) => item.value === chosen);
  if (option) return { label: option.label, color: option.color };
  return null;
}
