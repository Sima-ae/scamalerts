import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { dashboardPath } from "@/lib/dashboard-path";

export const dynamic = "force-dynamic";

export default async function DashboardRedirectPage() {
  const session = await auth();
  if (!session?.user) redirect("/inloggen?callbackUrl=/dashboard");
  redirect(dashboardPath(session.user.role));
}
