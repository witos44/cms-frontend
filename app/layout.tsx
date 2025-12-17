// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import { Toaster } from "sonner"; // ← INI SAJA

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NetSecure",
  description: "Security tools & remote work guides.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Language" content="en" />
      </head>

      <body className={inter.className}>
        <MainNav />

        <main className="pt-16">{children}</main>

        <Footer />

        {/* ✅ GLOBAL TOAST LAYER */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
