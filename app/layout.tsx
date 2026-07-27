import type { Metadata, Viewport } from "next";
import { Montserrat, Manrope, Cormorant } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { restaurant } from "@/lib/restaurant";

const display = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

// Антиква только для логотипа — как на фирменной вывеске
const logo = Cormorant({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pakhlava.ru"),
  title: {
    default: "Pakhlava — ресторан кавказской кухни · кухня высоких гор",
    template: "%s · Pakhlava",
  },
  description: restaurant.description,
  keywords: [
    "ресторан кавказской кухни",
    "Pakhlava",
    "хинкали",
    "хачапури",
    "шашлык на углях",
    "забронировать стол",
    "кавказская кухня Москва",
  ],
  openGraph: {
    title: "Pakhlava — кухня высоких гор",
    description: restaurant.description,
    type: "website",
    locale: "ru_RU",
    siteName: "Pakhlava",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable} ${logo.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
