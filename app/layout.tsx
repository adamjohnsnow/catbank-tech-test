import "./globals.css";
import { Inter } from "next/font/google";
import { seedTables } from "@/components/table";

export const metadata = {
  title: "Catbank",
  description: "Techtest for SilverCat",
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
