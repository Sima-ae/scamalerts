"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function moderateReport(formData: FormData) {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  const id = String(formData.get("id"));
  const action = String(formData.get("action"));
  if (!["APPROVED", "REJECTED", "HIDDEN"].includes(action)) return;

  await prisma.scamReport.update({
    where: { id },
    data: {
      status: action as "APPROVED" | "REJECTED" | "HIDDEN",
      publishedAt: action === "APPROVED" ? new Date() : null,
    },
  });

  await prisma.moderationAction.create({
    data: {
      action,
      reportId: id,
      moderatorId: session.user.id,
      note: `Status gezet op ${action}`,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/meldingen");
  revalidatePath("/");
}
