import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer, Header } from "@/components/system";
import ChatWidget from "@/components/system/Chat/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fallbackSiteUrl = "https://www.murillowolf.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const normalizedSiteUrl = configuredSiteUrl
  ? configuredSiteUrl.startsWith("http")
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`
  : fallbackSiteUrl;
const metadataBaseUrl = new URL(normalizedSiteUrl);
const defaultTitle = "Murillo Wolf | Senior Software Engineer in Virginia";
const siteDescription =
  "Senior software engineer based in Alexandria, Virginia focused on scalable customer experience platforms, prompt engineering, and human-centered product design.";

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl,
  title: {
    default: defaultTitle,
    template: "%s | Murillo Wolf • Virginia Software Engineer",
  },
  description: siteDescription,
  applicationName: "Murillo Wolf Portfolio",
  keywords: [
    "Murillo Wolf",
    "Murillo Wolf Cavalheiro",
    "Virginia software engineer",
    "Alexandria VA developer",
    "customer experience platforms",
    "prompt engineering consultant",
    "Next.js expert",
    "frontend architecture",
    "United States software engineer",
    "product engineering Alexandria",
  ],
  authors: [{ name: "Murillo Wolf Cavalheiro", url: normalizedSiteUrl }],
  creator: "Murillo Wolf Cavalheiro",
  publisher: "Murillo Wolf Cavalheiro",
  category: "Technology",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: normalizedSiteUrl,
    title: defaultTitle,
    description: siteDescription,
    siteName: "Murillo Wolf Portfolio",
    images: [
      {
        url: `${normalizedSiteUrl}/me.png`,
        width: 1200,
        height: 1200,
        alt: "Murillo Wolf – Senior Software Engineer based in Alexandria, Virginia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
    images: [`${normalizedSiteUrl}/me.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  other: {
    "geo.region": "US-VA",
    "geo.placename": "Alexandria",
    "geo.position": "38.8048;-77.0469",
    ICBM: "38.8048, -77.0469",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Murillo Wolf Cavalheiro",
    jobTitle: "Senior Software Engineer",
    description: siteDescription,
    url: normalizedSiteUrl,
    image: `${normalizedSiteUrl}/me.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alexandria",
      addressRegion: "VA",
      addressCountry: "US",
    },
    areaServed: ["United States", "Virginia", "Washington DC", "Remote"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "consultation",
        telephone: "+55 18 99770-8504",
        availableLanguage: ["English", "Portuguese"],
      },
    ],
    knowsAbout: [
      "Customer experience platforms",
      "Next.js",
      "React",
      "Prompt engineering",
      "Conversational AI",
      "Frontend architecture",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Murillo Wolf Portfolio",
    url: normalizedSiteUrl,
    inLanguage: "en-US",
    description: siteDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${normalizedSiteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-l to-[#f4f9fb]  from-[#dff2e1] text-foreground antialiased`}
      >
        <Script
          id="site-structured-data"
          strategy="beforeInteractive"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
