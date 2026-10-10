"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const destination = callbackUrl.startsWith("/") ? callbackUrl : "/dashboard";

    try {
      const res = await signIn("credentials", {
        email: String(form.get("email")),
        password: String(form.get("password")),
        redirect: false,
        callbackUrl: destination,
      });
      if (!res || res.error || res.ok === false) {
        setError("Ongeldige inloggegevens.");
        setLoading(false);
        return;
      }
      window.location.assign(res.url && res.url.startsWith("/") ? res.url : destination);
    } catch {
      setError("Inloggen lukt nu niet. Probeer het opnieuw.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-4 text-center">
      <div>
        <label className="text-sm font-medium text-ink">E-mail</label>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input-field mt-1"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-ink">Wachtwoord</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
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
