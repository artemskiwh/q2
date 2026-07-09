import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://icon-rostov.ru"),
  title: {
    default: "ICON — караоке-ресторан в Ростове-на-Дону",
    template: "%s · ICON",
  },
  description:
    "ICON — караоке-ресторан в центре Ростова-на-Дону. Лучший звук в городе, авторская кухня, бар и атмосфера до утра. Рейтинг 4.8 в 2ГИС. Бронируйте стол онлайн.",
  keywords: [
    "караоке Ростов-на-Дону",
    "ресторан Ростов",
    "ICON караоке",
    "караоке-ресторан",
    "забронировать стол Ростов",
    "караоке на Социалистической",
  ],
  openGraph: {
    title: "ICON — караоке-ресторан в Ростове-на-Дону",
    description:
      "Лучший звук в городе, авторская кухня и атмосфера до утра. Рейтинг 4.8 в 2ГИС.",
    type: "website",
    locale: "ru_RU",
    siteName: "ICON",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
