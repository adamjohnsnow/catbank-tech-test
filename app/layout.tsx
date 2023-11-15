import { seed } from "@/lib/seed";
import "./globals.css";
import { Inter } from "next/font/google";
import seedTables from "@/components/table";

export const metadata = {
  metadataBase: new URL("https://postgres-starter.vercel.app"),
  title: "Vercel Postgres Demo",
  description: "A simple Next.js app with Vercel Postgres as the database",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  seedTables();
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
