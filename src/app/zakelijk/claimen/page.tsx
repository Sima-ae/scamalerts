import { requireUser } from "@/lib/auth-helpers";
import { claimDomain } from "@/app/zakelijk/claimen/actions";

export const dynamic = "force-dynamic";

export default async function ClaimPage() {
  await requireUser();

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-white">
        Claim je website
      </h1>
      <p className="mt-4 text-slate-300">
        Zakelijke accounts kunnen een domein claimen om te reageren op meldingen.
        Accreditatie is optioneel en staat los van de Trust Score.
      </p>
      <form action={claimDomain} className="mt-8 space-y-4">
        <input
          name="domain"
          required
          placeholder="jouwbedrijf.nl"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
        />
        <input
          name="companyName"
          required
          placeholder="Bedrijfsnaam"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
        />
        <input
          name="contactEmail"
          type="email"
          required
          placeholder="zakelijk@email.nl"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
        />
        <input
          name="evidenceUrl"
          placeholder="Bewijs-URL (KvK, website, etc.)"
          className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white"
        />
        <button className="rounded-md bg-teal-400 px-4 py-2 font-medium text-[#062018]">
          Claim indienen
        </button>
      </form>
    </div>
  );
}
