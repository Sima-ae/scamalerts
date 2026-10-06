import type { Metadata } from "next";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://all-scams.com",
  ),
  title: {
    default: "Scam Alerts — Controleer websites & meld scams | all-scams.com",
    template: "%s | Scam Alerts",
  },
  description:
    "Controleer of een website veilig is, bekijk actuele scam-meldingen in Nederland en meld fraude. Trust Score, kennisbank en hulp bij herstel.",
  openGraph: {
    title: "Scam Alerts | all-scams.com",
    description:
      "Het Nederlandse platform voor websitecontrole, scam-meldingen en fraudepreventie.",
    locale: "nl_NL",
    type: "website",
    url: "https://all-scams.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground font-sans">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
