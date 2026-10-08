import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";
import { claimDomain } from "@/app/zakelijk/claimen/actions";
import { BRAND_NAME } from "@/lib/brand";
import { PageShell } from "@/components/ui/page-shell";
import { MEDIA } from "@/lib/media";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Domein claimen",
};

export default async function ClaimPage() {
  await requireUser();

  return (
    <PageShell
      hero={{
        eyebrow: "Zakelijk",
        title: "Claim je website",
        description: `Zakelijke accounts kunnen een domein claimen om te reageren op meldingen. Accreditatie is optioneel en staat los van de Trust Score op ${BRAND_NAME}.`,
        media: MEDIA.business,
      }}
    >
      <div className="mx-auto w-full max-w-xl text-center">
        <Link
          href="/zakelijk"
          className="text-sm font-semibold text-accent hover:underline"
        >
          ← Voor bedrijven
        </Link>
        <form
          action={claimDomain}
          className="mt-6 space-y-4 rounded-2xl border border-line bg-white/85 p-6 shadow-[0_24px_60px_-44px_rgba(15,28,46,0.5)] md:p-8"
        >
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
          <button className="btn-ink w-full">Claim indienen</button>
        </form>
      </div>
    </PageShell>
  );
}
