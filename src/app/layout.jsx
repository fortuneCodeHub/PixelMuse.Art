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
    default: "PixelMuse — Art, Design & Creative Inspiration",
    template: "%s — PixelMuse: Art & Design Blog"
  },
  description:
    "PixelMuse is a vibrant art and design publication exploring digital art, illustration, photography, graphic design, UI/UX, visual culture, and creative inspiration. Discover tutorials, artist highlights, trend reports, and beautifully crafted stories for creators of all levels.",
  keywords: [
    "PixelMuse",
    "art and design blog",
    "digital art inspiration",
    "graphic design tutorials",
    "UI UX design",
    "visual storytelling",
    "illustration techniques",
    "modern art trends",
    "photography inspiration",
    "creative process",
    "aesthetic design",
    "brand identity design",
    "digital illustration",
    "creative lifestyle blog",
    "design resources",
    "art tutorials",
    "creative inspiration"
  ],

  openGraph: {
    title: "PixelMuse — Art, Design & Creative Inspiration",
    description:
      "Explore PixelMuse, a modern art and design blog featuring digital art tutorials, creative tools, aesthetic inspiration, artist stories, and visual design trends. A home for creators who love beauty and imagination.",
    url: "https://www.pixelmuse.art/",
    siteName: "PixelMuse",
    images: [
      {
        // url: "/assets/pixelmuse-preview.png",
        width: 1200,
        height: 630,
        alt: "PixelMuse — Art & Design Blog"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "PixelMuse — Art, Design & Creative Inspiration",
    description:
      "PixelMuse is a creative hub for designers, illustrators, and visual storytellers. Discover tutorials, inspiration, aesthetic trends, and artist insights.",
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
