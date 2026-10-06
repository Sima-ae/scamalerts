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
    return NextResponse.json({ error: "Ongeldige of ontbrekende API-key." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const domainParam = searchParams.get("domain");
  if (!domainParam) {
    return NextResponse.json({ error: "Parameter domain is verplicht." }, { status: 400 });
  }

  const analysis = await analyzeDomain(domainParam);
  const domain = normalizeDomain(domainParam);
  const profile = await prisma.domainProfile.upsert({
    where: { domain },
    update: {
      trustScore: analysis.score,
      trustLabel: analysis.label,
      signals: analysis.signals,
    },
    create: {
      domain,
      trustScore: analysis.score,
      trustLabel: analysis.label,
      signals: analysis.signals,
    },
  });

  return NextResponse.json({
    domain: profile.domain,
    score: profile.trustScore,
    label: profile.trustLabel,
    label_nl: trustLabelNL(profile.trustLabel),
    signals: analysis.signals,
    updated_at: profile.lastUpdated,
  });
}
