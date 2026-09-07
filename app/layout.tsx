import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileFrame from "@/components/layout/MobileFrame";
import BottomNav from "@/components/layout/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "1Fi - Mutual Fund backed EMIs & Marketplace",
  description: "Shop today, Pay later using Mutual funds. No credit score required. No interest. Backed by your investments.",
  applicationName: "1Fi",
};

export const viewport: Viewport = {
  themeColor: "#712CDC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`}>
      <body className={`h-full font-sans antialiased text-gray-900 bg-[#f3f4f8] ${inter.className}`}>
        <MobileFrame>
          <main className="flex-1 pb-24">{children}</main>
          <BottomNav />
        </MobileFrame>
      </body>
    </html>
  );
}
