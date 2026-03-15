import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CaterHub | Modern Catering Search",
  description: "A clean, minimalist platform to find perfect caterers for your events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-[#191919] text-[#111111] dark:text-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
