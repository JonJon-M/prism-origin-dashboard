import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prism Origin — Commercial Dashboard",
  description: "Glovo Supply Chain Purchase Analysis · April 2025",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  );
}
