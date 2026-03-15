import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Catering Search | Find Your Perfect Caterer",
  description: "A premium platform to search and filter the best caterers in your area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-sans antialiased bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 min-h-screen`}
      >
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_50%)] pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
