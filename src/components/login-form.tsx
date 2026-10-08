"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email")),
      password: String(form.get("password")),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Ongeldige inloggegevens.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-4 text-center">
      <div>
        <label className="text-sm font-medium text-ink">E-mail</label>
        <input
          name="email"
          type="email"
          required
          className="input-field mt-1"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink">Wachtwoord</label>
        <input
          name="password"
          type="password"
          required
          className="input-field mt-1"
        />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-ink w-full disabled:opacity-60"
      >
        {loading ? "Bezig…" : "Inloggen"}
      </button>
    </form>
  );
}
