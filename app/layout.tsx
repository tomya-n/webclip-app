import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "./components/layouts/Footer";
import { Header } from "./components/layouts/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebClip App",
  description: "portfolio app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="home flex justify-center min-h-screen bg-sky-100">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
