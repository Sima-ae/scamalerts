import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { BRAND_NAME } from "@/lib/brand";

export const metadata = { title: "Inloggen" };

export default function LoginPage() {
  return (
    <div className="section-shell py-16">
      <h1 className="font-display text-center text-4xl text-ink">Inloggen</h1>
      <p className="mt-3 text-center text-muted">
        Nog geen account bij {BRAND_NAME}?{" "}
        <Link href="/registreren" className="font-semibold text-accent hover:underline">
          Registreren
        </Link>
      </p>
      <div className="mt-10">
        <LoginForm />
      </div>
    </div>
  );
}
