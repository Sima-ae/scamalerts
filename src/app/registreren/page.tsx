import Link from "next/link";
import { RegisterForm } from "@/components/register-form";

export const metadata = { title: "Registreren" };

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <h1 className="text-center font-[family-name:var(--font-display)] text-4xl text-white">
        Account aanmaken
      </h1>
      <p className="mt-3 text-center text-slate-400">
        Al een account?{" "}
        <Link href="/inloggen" className="text-teal-300 hover:underline">
          Inloggen
        </Link>
      </p>
      <div className="mt-10">
        <RegisterForm />
      </div>
    </div>
  );
}
