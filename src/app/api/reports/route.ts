import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { analyzeDomain } from "@/lib/trust-score";
import { normalizeDomain } from "@/lib/utils";
import {
  EVIDENCE_MAX_FILES,
  isAllowedEvidenceFile,
  saveEvidenceFile,
} from "@/lib/evidence-upload";

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

function field(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const data = schema.parse({
      title: field(form, "title"),
      description: field(form, "description"),
      domain: field(form, "domain") || null,
      channel: field(form, "channel") || null,
      categoryId: field(form, "categoryId") || null,
      reporterName: field(form, "reporterName") || null,
      reporterEmail: field(form, "reporterEmail") || null,
      amountLost: field(form, "amountLost") || null,
    });

    const files = form
      .getAll("evidence")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (files.length > EVIDENCE_MAX_FILES) {
      return NextResponse.json(
        { error: `Je kunt maximaal ${EVIDENCE_MAX_FILES} bestanden toevoegen.` },
        { status: 400 },
      );
    }

    for (const file of files) {
      if (!isAllowedEvidenceFile(file)) {
        return NextResponse.json(
          {
            error:
              "Bijlagen moeten een afbeelding (JPG, PNG, WebP, GIF) of PDF zijn van maximaal 5 MB.",
          },
          { status: 400 },
        );
      }
    }

    const session = await auth();

    let domainId: string | undefined;
    let identifierType: string | undefined;
    let identifierValue: string | undefined;

    if (data.domain?.trim()) {
      let domain = normalizeDomain(data.domain);
      const analysis = await analyzeDomain(domain).catch(() => null);
      if (analysis) {
        domain = analysis.domain;
        const profile = await prisma.domainProfile.findUnique({
          where: { domain },
        });
        if (profile) {
          domainId = profile.id;
        }
      }
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

    for (const file of files) {
      const saved = await saveEvidenceFile(report.id, file);
      await prisma.evidenceFile.create({
        data: {
          reportId: report.id,
          filename: saved.filename,
          storagePath: saved.storagePath,
          mimeType: saved.mimeType,
          sizeBytes: saved.sizeBytes,
        },
      });
    }

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
