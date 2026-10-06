"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name")),
      email: String(form.get("email")),
      password: String(form.get("password")),
    };
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoading(false);
      setError(data.error ?? "Registratie mislukt.");
      return;
    }
    await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });
    setLoading(false);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4">
      <div>
        <label className="text-sm text-slate-300">Naam</label>
        <input
          name="name"
          required
          className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="text-sm text-slate-300">E-mail</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
        />
      </div>
      <div>
        <label className="text-sm text-slate-300">Wachtwoord</label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className="mt-1 w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
        />
      </div>
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-teal-400 py-2.5 font-semibold text-[#062018] hover:bg-teal-300"
      >
        {loading ? "Bezig…" : "Account aanmaken"}
      </button>
    </form>
  );
}
