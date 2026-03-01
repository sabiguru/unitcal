import type { Metadata } from "next";
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
        {/* Performance optimization - DNS prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Google tag (gtag.js) - lazy load after page settles */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              function loadGtag() {
                if (document.getElementById('gtag-js')) return;
                const s = document.createElement('script');
                s.id = 'gtag-js';
                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-EXX45NBE5F';
                s.async = true;
                document.head.appendChild(s);
                gtag('js', new Date());
                gtag('config', 'G-EXX45NBE5F');
              }
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadGtag, { timeout: 2000 });
              } else {
                window.addEventListener('load', loadGtag);
              }
            `
          }}
        />

        {/* Favicon and PWA icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Seobility Verification */}
        <meta name="seobility" content="eeb290f1902ff1f4679f69365f3ac07c" />

        {/* Ezoic disabled for SEO improvement - re-enable after indexing is resolved
        <script defer src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false"></script>
        <script defer src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false"></script>
        <script async src="https://www.ezojs.com/ezoic/sa.min.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `
        }}></script>
        */}
      </head>
      <body
        className="antialiased"
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
