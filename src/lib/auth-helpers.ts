import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { Role } from "@prisma/client";

export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/inloggen");
  return session;
}

export async function requireRole(roles: Role[]) {
  const session = await requireUser();
  if (!roles.includes(session.user.role)) redirect("/dashboard");
  return session;
}
