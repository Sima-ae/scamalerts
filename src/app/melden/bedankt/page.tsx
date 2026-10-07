import Link from "next/link";
import { PageShell } from "@/components/ui/page-shell";

export const metadata = { title: "Bedankt" };

export default function BedanktPage() {
  return (
    <PageShell
      hero={{
        eyebrow: "Melding ontvangen",
        title: "Bedankt voor je melding",
        description:
          "Ons team bekijkt je rapport. Na goedkeuring verschijnt het bij de openbare meldingen. Bij financieel verlies: doe ook aangifte en meld bij Fraudehelpdesk.",
        children: (
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/meldingen" className="btn-primary text-sm">
              Naar meldingen
            </Link>
            <Link href="/" className="btn-secondary text-sm">
              Home
            </Link>
          </div>
        ),
      }}
    />
  );
}
