import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { claimDomain } from "@/app/zakelijk/claimen/actions";
import { BRAND_NAME } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Domein claimen",
};

export default async function ClaimPage() {
  await requireUser();

  return (
    <div className="section-shell max-w-2xl py-14 md:py-16">
      <Link href="/zakelijk" className="text-sm font-semibold text-accent hover:underline">
        ← Voor bedrijven
      </Link>
      <h1 className="font-display mt-4 text-4xl text-ink">Claim je website</h1>
      <p className="mt-4 text-muted">
        Zakelijke accounts kunnen een domein claimen om te reageren op
        meldingen. Accreditatie is optioneel en staat los van de Trust Score op{" "}
        {BRAND_NAME}.
      </p>
      <form action={claimDomain} className="mt-8 space-y-4">
        <input
          name="domain"
          required
          placeholder="jouwbedrijf.nl"
          className="input-field"
        />
        <input
          name="companyName"
          required
          placeholder="Bedrijfsnaam"
          className="input-field"
        />
        <input
          name="contactEmail"
          type="email"
          required
          placeholder="zakelijk@email.nl"
          className="input-field"
        />
        <input
          name="evidenceUrl"
          placeholder="Bewijs-URL (KvK, website, etc.)"
          className="input-field"
        />
        <button className="btn-ink">Claim indienen</button>
      </form>
    </div>
  );
}
