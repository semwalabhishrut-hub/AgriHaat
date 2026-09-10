import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { LanguageProvider } from "@/components/site/language-context";

export const metadata: Metadata = {
  title: "AgriHaat",
  description: "Farmer-first agricultural procurement platform",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AgriHaat",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#16803A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/agrihaat-logo.jpeg" />
      </head>
      <body className="bg-[#FAFAF7] text-[#172019] antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}