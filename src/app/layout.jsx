import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "../styles/globals.css";
import ReduxLandingProvider from "@/components/hooks/ReduxLandingProvider";
import Script from "next/script";
import AnalyticsTracker from "@/components/ui/AnalyticsTracker";
import CookieBanner from "@/components/ui/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.pixelmuse.art/"),

  title: {
    default: "PixelMuse — Photography, Art & Design Inspiration",
    template: "%s — PixelMuse: Photography, Art & Design"
  },

  description:
    "PixelMuse is a creative publication dedicated to photography, art, and design. We explore visual storytelling through photography, digital art, illustration, graphic design, UI/UX, and contemporary visual culture — featuring tutorials, artist spotlights, and creative inspiration for all levels.",

  keywords: [
    "PixelMuse",
    "photography and art blog",
    "art and design inspiration",
    "photography inspiration",
    "visual storytelling",
    "digital art tutorials",
    "graphic design ideas",
    "UI UX design inspiration",
    "illustration techniques",
    "contemporary art trends",
    "creative photography",
    "aesthetic design",
    "visual culture",
    "creative process",
    "design resources",
    "art tutorials",
    "creative inspiration"
  ],

  openGraph: {
    title: "PixelMuse — Photography, Art & Design Inspiration",
    description:
      "Explore PixelMuse, a modern creative platform for photography, art, and design. Discover visual storytelling, photography guides, digital art tutorials, artist features, and inspiring creative ideas.",
    url: "https://www.pixelmuse.art/",
    siteName: "PixelMuse",
    images: [
      {
        // url: "/assets/pixelmuse-preview.png",
        width: 1200,
        height: 630,
        alt: "PixelMuse — Photography, Art & Design"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "PixelMuse — Photography, Art & Design Inspiration",
    description:
      "PixelMuse is a creative hub for photographers, artists, and designers. Explore tutorials, visual inspiration, creative techniques, and artistic insights.",
    // images: ["/assets/pixelmuse-preview.png"],
    creator: "@pixelmuse"
  },

  alternates: {
    canonical: "https://www.pixelmuse.art/"
  }
};


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // normal, semi-bold, bold
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-H1QYN3T4M0`}
          strategy="afterInteractive"
        />
        {/* <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H1QYN3T4M0', {
              page_path: window.location.pathname,
            });
          `}
        </Script> */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H1QYN3T4M0');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${poppins.className} antialiased`}
      >
        <AnalyticsTracker /> {/* 👈 placed here once */}
        <ReduxLandingProvider>
          {children}
        </ReduxLandingProvider>

        <CookieBanner />
      </body>
    </html>
  );
}
