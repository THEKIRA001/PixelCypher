import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const chakra = Chakra_Petch({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelCypher Studio",
  description: "Branding • Video Editing • Website Design",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-base-950 text-base-200`}> 
        <div className="min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
