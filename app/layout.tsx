import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "NEMOVITOSTI V POLSKU",
    template: "%s | NEMOVITOSTI V POLSKU"
  },
  description: "SEO-first real-estate directory for Czech buyers focused on Trojmiasto.",
  openGraph: {
    type: "website",
    siteName: "NEMOVITOSTI V POLSKU"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
