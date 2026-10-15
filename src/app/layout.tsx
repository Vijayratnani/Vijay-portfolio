import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Hanken_Grotesk, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { CursorEffects } from "@/components/CursorEffects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { profile, siteUrl } from "@/data/profile";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const sans = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.headline,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description: profile.headline,
  },
  twitter: { card: "summary_large_image" },
};

// Runs before paint so a saved "light" choice never flashes dark.
// Also flags JS as available, so scroll-reveal never hides content when scripts are off.
const themeScript = `document.documentElement.classList.add("js");try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${serif.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <CursorEffects />
        {/* Page views only, and only on Vercel (elsewhere its script would 404). */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
