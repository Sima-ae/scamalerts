import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { analyzeDomain, trustLabelNL } from "@/lib/trust-score";
import { normalizeDomain } from "@/lib/utils";

async function authorize(req: Request) {
  const key = req.headers.get("x-api-key");
  if (!key) return null;
  const keyHash = createHash("sha256").update(key).digest("hex");
  const record = await prisma.apiKey.findUnique({ where: { keyHash } });
  if (!record || record.revokedAt) return null;
  await prisma.apiKey.update({
    where: { id: record.id },
    data: { lastUsedAt: new Date() },
  });
  return record;
}

export async function GET(req: Request) {
  const auth = await authorize(req);
  if (!auth) {
    return NextResponse.json(
      { error: "Ongeldige of ontbrekende API-key." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(req.url);
  const domainParam = searchParams.get("domain");
  if (!domainParam) {
    return NextResponse.json(
      { error: "Parameter domain is verplicht." },
      { status: 400 },
    );
  }

  const refresh = searchParams.get("refresh") === "1";
  const analysis = await analyzeDomain(domainParam, { refresh });
  const domain = normalizeDomain(domainParam);

  const profile = await prisma.domainProfile.findUnique({
    where: { domain },
  });

  return NextResponse.json({
    domain: analysis.domain,
    score: analysis.score,
    label: analysis.label,
    label_nl: trustLabelNL(analysis.label),
    signals: analysis.signals,
    cached: analysis.cached,
    collected_at: analysis.collectedAt,
    version: analysis.version,
    updated_at: profile?.lastUpdated ?? analysis.collectedAt,
  });
}
