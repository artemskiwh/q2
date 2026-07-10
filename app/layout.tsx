import type { Metadata, Viewport } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const sans = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://icon-rostov.ru"),
  title: {
    default: "ICON - караоке-ресторан в Ростове-на-Дону",
    template: "%s · ICON",
  },
  description:
    "ICON - караоке-ресторан в центре Ростова-на-Дону. Лучший звук в городе, авторская кухня и атмосфера до утра. Рейтинг 4.8 в 2ГИС. Бронируйте стол онлайн.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "ICON - караоке-ресторан в Ростове-на-Дону",
    description:
      "Лучший звук в городе, авторская кухня и атмосфера до утра.",
    type: "website",
    locale: "ru_RU",
    siteName: "ICON",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-ink font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
