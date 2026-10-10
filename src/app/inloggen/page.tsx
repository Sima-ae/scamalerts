import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";
import { BRAND_NAME } from "@/lib/brand";
import { auth } from "@/lib/auth";

export const metadata = { title: "Inloggen" };

export default async function LoginPage() {
  const session = await auth();
  if (session?.user?.id) redirect("/dashboard");

  return (
    <div className="relative overflow-hidden">
      <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="section-shell relative z-10 py-16 md:py-20">
        <h1 className="font-display text-center text-4xl text-ink md:text-5xl">
          Inloggen
        </h1>
        <p className="mt-3 text-center text-muted">
          Nog geen account bij {BRAND_NAME}?{" "}
          <Link
            href="/registreren"
            className="font-semibold text-accent hover:underline"
          >
            Registreren
          </Link>
        </p>
        <div className="mx-auto mt-10 max-w-md">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
