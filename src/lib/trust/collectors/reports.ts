import { prisma } from "@/lib/prisma";
import type { TrustSignal } from "@/lib/trust/types";

const SOURCE = "Gemodereerde meldingen op dit platform";

export async function collectReports(domain: string): Promise<{
  signals: TrustSignal[];
  reports: {
    id: string;
    title: string;
    description: string;
    publishedAt: Date | null;
    createdAt: Date;
    categoryName: string | null;
  }[];
}> {
  try {
    const profile = await prisma.domainProfile.findUnique({
      where: { domain },
      select: { id: true },
    });

    if (!profile) {
      return {
        signals: [
          {
            key: "community",
            label: "Community-meldingen",
            positive: null,
            detail: "Nog geen goedgekeurde meldingen voor dit domein. Geen meldingen betekent niet automatisch dat een site veilig is.",
            weight: 18,
            group: "community",
            delta: 0,
            source: SOURCE,
            raw: { count: 0 },
          },
        ],
        reports: [],
      };
    }

    const reports = await prisma.scamReport.findMany({
      where: { domainId: profile.id, status: "APPROVED" },
      orderBy: { publishedAt: "desc" },
      take: 10,
      select: {
        id: true,
        title: true,
        description: true,
        publishedAt: true,
        createdAt: true,
        category: { select: { name: true } },
      },
    });

    const count = reports.length;
    const categories = [
      ...new Set(
        reports
          .map((r) => r.category?.name)
          .filter((n): n is string => Boolean(n)),
      ),
    ].slice(0, 3);

    let positive: boolean | null = null;
    let delta = 0;
    let detail =
      "Nog geen goedgekeurde meldingen voor dit domein. Geen meldingen betekent niet automatisch dat een site veilig is.";

    if (count === 1) {
      positive = false;
      delta = -12;
      detail = `1 goedgekeurde melding${categories.length ? ` (${categories.join(", ")})` : ""}`;
    } else if (count >= 2 && count <= 3) {
      positive = false;
      delta = -20;
      detail = `${count} goedgekeurde meldingen${categories.length ? ` (${categories.join(", ")})` : ""}`;
    } else if (count >= 4) {
      positive = false;
      delta = -30;
      detail = `${count} goedgekeurde meldingen${categories.length ? ` (${categories.join(", ")})` : ""}`;
    }

    return {
      signals: [
        {
          key: "community",
          label: "Community-meldingen",
          positive,
          detail,
          weight: 18,
          group: "community",
          delta,
          source: SOURCE,
          raw: { count, categories },
        },
      ],
      reports: reports.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        publishedAt: r.publishedAt,
        createdAt: r.createdAt,
        categoryName: r.category?.name ?? null,
      })),
    };
  } catch {
    return {
      signals: [
        {
          key: "community",
          label: "Community-meldingen",
          positive: null,
          detail: "Meldingen konden nu niet worden geladen.",
          weight: 18,
          group: "community",
          delta: 0,
          unavailable: true,
          source: SOURCE,
        },
      ],
      reports: [],
    };
  }
}
