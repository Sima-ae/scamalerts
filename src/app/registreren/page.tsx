import Link from "next/link";
import { RegisterForm } from "@/components/register-form";
import { BRAND_NAME } from "@/lib/brand";

export const metadata = { title: "Registreren" };

export default function RegisterPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="ambient-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="section-shell relative z-10 py-16 md:py-20">
        <h1 className="font-display text-center text-4xl text-ink md:text-5xl">
          Account aanmaken
        </h1>
        <p className="mt-3 text-center text-muted">
          Al een account bij {BRAND_NAME}?{" "}
          <Link
            href="/inloggen"
            className="font-semibold text-accent hover:underline"
          >
            Inloggen
          </Link>
        </p>
        <div className="mx-auto mt-10 max-w-md">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
