import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { FavoritesProvider } from "@/components/FavoritesProvider";
import { ProfileProvider } from "@/components/ProfileProvider";
import { AgeGate } from "@/components/AgeGate";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tyag-moskva.ru"),
  title: {
    default: "TYAG Moskva — оптовый магазин вейпов и одноразок",
    template: "%s · TYAG Moskva",
  },
  description:
    "Оптовая поставка одноразок WAKA, ELFBAR, GEEKBAR, DUALL, под-систем VAPORESSO XROS и Geek Vape Hero. Доставка по РФ, маркировка Честный знак.",
  keywords: [
    "опт вейпы",
    "одноразки оптом",
    "ELFBAR оптом",
    "WAKA оптом",
    "GEEKBAR оптом",
    "VAPORESSO XROS",
    "оптовый магазин вейпов Москва",
  ],
  openGraph: {
    title: "TYAG Moskva — оптовый магазин вейпов",
    description:
      "Одноразки, под-системы, картриджи и аксессуары — поставка в розничные сети.",
    type: "website",
    locale: "ru_RU",
    siteName: "TYAG Moskva",
  },
  twitter: {
    card: "summary_large_image",
    title: "TYAG Moskva — оптовый магазин вейпов",
    description:
      "Одноразки, под-системы, картриджи и аксессуары. Доставка по РФ.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="min-h-screen pb-20 font-sans antialiased lg:pb-0">
        <ProfileProvider>
          <FavoritesProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <MobileBottomNav />
              <AgeGate />
            </CartProvider>
          </FavoritesProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
