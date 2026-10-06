import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { analyzeDomain } from "@/lib/trust-score";
import { normalizeDomain } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(8).max(200),
  description: z.string().min(40).max(10000),
  domain: z.string().optional().nullable(),
  channel: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  reporterName: z.string().optional().nullable(),
  reporterEmail: z.string().email().optional().nullable().or(z.literal("")),
  amountLost: z.union([z.string(), z.number()]).optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    const session = await auth();

    let domainId: string | undefined;
    let identifierType: string | undefined;
    let identifierValue: string | undefined;

    if (data.domain?.trim()) {
      const analysis = await analyzeDomain(data.domain);
      const domain = normalizeDomain(data.domain);
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
      domainId = profile.id;
      identifierType = "domain";
      identifierValue = domain;
    }

    const amount =
      data.amountLost === null ||
      data.amountLost === undefined ||
      data.amountLost === ""
        ? null
        : Number(data.amountLost);

    const report = await prisma.scamReport.create({
      data: {
        title: data.title,
        description: data.description,
        channel: data.channel || null,
        categoryId: data.categoryId || null,
        reporterName: data.reporterName || null,
        reporterEmail: data.reporterEmail || null,
        amountLost: Number.isFinite(amount) ? amount : null,
        authorId: session?.user?.id,
        domainId,
        identifierType,
        identifierValue,
        status: "PENDING",
      },
    });

    return NextResponse.json({ id: report.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Controleer de ingevulde velden." },
        { status: 400 },
      );
    }
    console.error(err);
    return NextResponse.json(
      { error: "Serverfout bij opslaan van de melding." },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "APPROVED";
  const take = Math.min(Number(searchParams.get("limit") ?? 20), 100);

  const reports = await prisma.scamReport.findMany({
    where: { status: status as "APPROVED" | "PENDING" | "REJECTED" | "HIDDEN" },
    include: { domain: true, category: true },
    orderBy: { createdAt: "desc" },
    take,
  });

  return NextResponse.json({ data: reports });
}
