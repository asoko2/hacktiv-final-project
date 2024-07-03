import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FlashToaster } from "@/lib/flash-toaster";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIJUANG",
  description: "Sistem Informasi Pengajuan Barang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-300`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
