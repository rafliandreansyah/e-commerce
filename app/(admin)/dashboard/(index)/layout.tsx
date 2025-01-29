import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../globals.css";
export const metadata: Metadata = {
  title: "Dashboard",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={inter.className}>{children}</section>;
}
