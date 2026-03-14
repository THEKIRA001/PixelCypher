import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "PixelCypher Studio",
  description: "Branding • Video Editing • Website Design",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full w-full font-inter">
        <div className="h-full w-full flex justify-center items-center">{children}</div>
      </body>
    </html>
  );
}
