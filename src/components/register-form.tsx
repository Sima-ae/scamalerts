"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export function RegisterForm() {
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
    const signedIn = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    if (!signedIn || signedIn.error || signedIn.ok === false) {
      setLoading(false);
      setError("Account aangemaakt, maar inloggen lukte niet. Log zelf in.");
      return;
    }
    window.location.assign("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-4 text-center">
      <div>
        <label className="text-sm font-medium text-ink">Naam</label>
        <input name="name" required className="input-field mt-1" />
      </div>
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
          minLength={8}
          className="input-field mt-1"
        />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-ink w-full disabled:opacity-60"
      >
        {loading ? "Bezig…" : "Account aanmaken"}
      </button>
    </form>
  );
}
