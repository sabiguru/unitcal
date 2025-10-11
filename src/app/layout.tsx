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
    <html lang="en">
      <head>
        {/* Performance optimization - DNS prefetch and preconnect */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.ezojs.com" />
        <link rel="dns-prefetch" href="//cmp.gatekeeperconsent.com" />
        <link rel="dns-prefetch" href="//the.gatekeeperconsent.com" />
        <link rel="dns-prefetch" href="//privacy.gatekeeperconsent.com" />
        
        <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="//www.ezojs.com" crossOrigin="" />
        
        {/* Favicon and PWA icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Seobility Verification */}
        <meta name="seobility" content="eeb290f1902ff1f4679f69365f3ac07c" />
        
        {/* Ezoic Privacy Scripts - with resource hints for faster loading */}
        <link rel="preload" href="https://cmp.gatekeeperconsent.com/min.js" as="script" />
        <link rel="preload" href="https://the.gatekeeperconsent.com/cmp.min.js" as="script" />
        <script src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false"></script>
        <script src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false"></script>
        
        {/* Ezoic Header Script with preload */}
        <link rel="preload" href="//www.ezojs.com/ezoic/sa.min.js" as="script" />
        <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `
        }}></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
