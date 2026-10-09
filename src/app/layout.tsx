import type { Metadata, Viewport } from "next";
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
import { ContentProtection } from "@/components/content-protection";
import { BRAND_NAME, BRAND_URL } from "@/lib/brand";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? BRAND_URL),
  title: {
    default: `${BRAND_NAME} — Website controleren en scams melden`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "All Scams helpt je websites te checken, verdachte praktijken te melden en Nederlandse scam-trucs te begrijpen. Duidelijke Trust Score, actuele meldingen en praktische gidsen.",
  openGraph: {
    title: `${BRAND_NAME} — controleer websites en meld fraude`,
    description:
      "Nederlandstalig platform voor websitecontrole, scam-meldingen en fraudepreventie.",
    locale: "nl_NL",
    type: "website",
    url: BRAND_URL,
    siteName: BRAND_NAME,
  },
  twitter: {
    card: "summary",
    title: BRAND_NAME,
    description:
      "Controleer een website, bekijk meldingen en leer scams herkennen.",
  },
  icons: {
    icon: [{ url: "/all-scams-favicon.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/all-scams-favicon.png", sizes: "192x192" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="content-protect flex min-h-full flex-col overflow-x-hidden bg-background font-sans text-foreground">
        <Providers>
          <SiteHeader />
          <main className="w-full flex-1">{children}</main>
          <SiteFooter />
          <ContentProtection />
        </Providers>
      </body>
    </html>
  );
}
