import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export const metadata = { title: "Inloggen" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h1 className="text-center font-[family-name:var(--font-display)] text-4xl text-white">
        Inloggen
      </h1>
      <p className="mt-3 text-center text-slate-400">
        Nog geen account?{" "}
        <Link href="/registreren" className="text-teal-300 hover:underline">
          Registreren
        </Link>
      </p>
      <div className="mt-10">
        <LoginForm />
      </div>
    </div>
  );
}
