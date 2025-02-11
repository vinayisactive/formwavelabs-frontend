import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import { Inter } from "next/font/google";
import LayoutProvider from "@/components/wrap/layout-provider-wrapper";

const InterFont = Inter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Formwavelabs",
  description: "A multi-step form creation",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={InterFont.className}>
      <body>
        <LayoutProvider>
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Navbar />
            <div className="h-[94vh]">{children}</div>
          </div>
        </LayoutProvider>
      </body>
    </html>
  );
}
