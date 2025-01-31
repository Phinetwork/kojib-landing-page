// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientWrapper from "../components/ClientWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phi Network",
  description: "Run your own blockchain node on your device",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00FF99" />
        {/* Preload Fonts */}
        <link
          rel="preload"
          href="/_next/static/media/gyByhwUxId8gMEwcGFWNOITd-s.p.da1ebef7.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/or3nQ6H_1_WfwkMZI_qYFrcdmhHkjko-s.p.be19f591.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ colorScheme: "auto" }} // Let next-themes handle the color scheme
      >
        <ClientWrapper />
        {children}
      </body>
    </html>
  );
}
