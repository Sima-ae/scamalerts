"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { normalizeDomain } from "@/lib/utils";
import { analyzeDomain } from "@/lib/trust-score";

export async function claimDomain(formData: FormData) {
  const session = await requireUser();
  const domainRaw = String(formData.get("domain") ?? "");
  const companyName = String(formData.get("companyName") ?? "");
  const contactEmail = String(formData.get("contactEmail") ?? "");
  const evidenceUrl = String(formData.get("evidenceUrl") ?? "") || null;
  const domain = normalizeDomain(domainRaw);
  if (!domain || !companyName || !contactEmail) {
    redirect("/zakelijk/claimen");
  }

  const analysis = await analyzeDomain(domain);
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

  await prisma.businessClaim.create({
    data: {
      companyName,
      contactEmail,
      evidenceUrl,
      userId: session.user.id,
      domainId: profile.id,
      status: "PENDING",
    },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role: session.user.role === "USER" ? "BUSINESS" : session.user.role },
  });

  redirect("/dashboard");
}
