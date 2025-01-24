import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/nav/navbar";
import ReactQueryProvider from "@/utility/react-query-provider";

import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Formwavelabs",
  description: "A multi-step form creation",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={roboto.className}>
      <body >
        <ReactQueryProvider>
          <div className="w-screen flex flex-col justify-center items-center overflow-x-hidden">
            <Navbar />
            <div>{children}</div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
