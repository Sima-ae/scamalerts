import Link from "next/link";
import { RegisterForm } from "@/components/register-form";
import { BRAND_NAME } from "@/lib/brand";

export const metadata = { title: "Registreren" };

export default function RegisterPage() {
  return (
    <div className="section-shell py-16">
      <h1 className="font-display text-center text-4xl text-ink">
        Account aanmaken
      </h1>
      <p className="mt-3 text-center text-muted">
        Al een account bij {BRAND_NAME}?{" "}
        <Link href="/inloggen" className="font-semibold text-accent hover:underline">
          Inloggen
        </Link>
      </p>
      <div className="mt-10">
        <RegisterForm />
      </div>
    </div>
  );
}
