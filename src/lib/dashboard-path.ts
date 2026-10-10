export function dashboardPath(role?: string | null) {
  if (role === "ADMIN" || role === "EDITOR") return "/admin/dashboard";
  return "/user/dashboard";
}
