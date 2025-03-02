import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import { Manrope } from "next/font/google";
import LayoutProvider from "@/components/wrap/layout-provider-wrapper";

const manRope = Manrope({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formwavelabs",
  description: "A multi-step form creation",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manRope.className}>
      <body>
        <LayoutProvider>
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Navbar />
            <div className="h-[94vh] w-full">{children}</div>
          </div>
        </LayoutProvider>
      </body>
    </html>
  );
}
