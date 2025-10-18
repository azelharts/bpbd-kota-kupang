import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BPBD - Badan Penanggulangan Bencana Daerah",
  description:
    "Website resmi Badan Penanggulangan Bencana Daerah untuk informasi dan penanggulangan bencana",
  keywords:
    "bencana, tanggap darurat, BPBD, kupang, kota kupang, ntt, nusa tenggara timur, penanggulangan bencana, alam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} overflow-x-hidden`}>
        <SessionProvider>
          <main className="">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
