"use client";

import { useState } from "react";
import type { ReportRisk } from "@prisma/client";
import { reportRiskOptions } from "@/lib/report-risk";

export function RiskSelect({ defaultValue }: { defaultValue: ReportRisk | "" }) {
  const [value, setValue] = useState<ReportRisk | "">(defaultValue);
  const selected = reportRiskOptions.find((option) => option.value === value);

  return (
    <select
      name="risk"
      value={value}
      onChange={(event) => setValue(event.target.value as ReportRisk | "")}
      className="input-field mt-1 font-semibold"
      style={{ color: selected?.color }}
    >
      <option value="">Niet ingesteld</option>
      {reportRiskOptions.map((option) => (
        <option key={option.value} value={option.value} style={{ color: option.color }}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
