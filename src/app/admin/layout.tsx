import { requireRole } from "@/lib/auth-helpers";
import { AdminNav } from "@/components/admin/admin-nav";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole(["ADMIN", "EDITOR"]);
  return (
    <div>
      <AdminNav role={session.user.role} />
      {children}
    </div>
  );
}
