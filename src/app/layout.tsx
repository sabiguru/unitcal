import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Debug logging for production
if (typeof window === 'undefined') {
  // Server-side error logging
  process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  });

  process.on('uncaughtException', (error) => {
    console.error('🚨 Uncaught Exception:', error);
  });
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://calcfort.com'),
  title: "Calcfort — Free Online Calculators",
  description: "Free calculators for maths, finance, health and engineering. Get instant results — fast, accurate and easy to use.",
  keywords: ["calculator", "online calculator", "unit converter", "math calculator", "financial calculator", "conversion tool", "calcfort"],
  authors: [{ name: "CalcFort" }],
  creator: "CalcFort",
  publisher: "CalcFort",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calcfort.com",
    siteName: "CalcFort",
    title: "Calcfort — Free Online Calculators",
    description: "Free calculators for maths, finance, health and engineering. Get instant results — fast, accurate and easy to use.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CalcFort - Your Source for Online Calculator Tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcfort — Free Online Calculators",
    description: "Free calculators for maths, finance, health and engineering. Get instant results — fast, accurate and easy to use.",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: "https://calcfort.com"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EXX45NBE5F"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EXX45NBE5F');
          `
        }}></script>

        {/* Performance optimization - DNS prefetch and preconnect */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.ezojs.com" />
        <link rel="dns-prefetch" href="https://cmp.gatekeeperconsent.com" />
        <link rel="dns-prefetch" href="https://the.gatekeeperconsent.com" />
        <link rel="dns-prefetch" href="https://privacy.gatekeeperconsent.com" />
        <link rel="dns-prefetch" href="https://g.ezoic.net" />

        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.ezojs.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cmp.gatekeeperconsent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://the.gatekeeperconsent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://privacy.gatekeeperconsent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://g.ezoic.net" crossOrigin="anonymous" />

        {/* Favicon and PWA icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Seobility Verification */}
        <meta name="seobility" content="eeb290f1902ff1f4679f69365f3ac07c" />

        {/* Ezoic Privacy Scripts - defer for better performance */}
        <script defer src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false"></script>
        <script defer src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false"></script>

        {/* Ezoic Header Script - async loading */}
        <script async src="https://www.ezojs.com/ezoic/sa.min.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `
        }}></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Footer />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
