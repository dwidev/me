import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Dwi Fahmi — Terminal Portfolio",
  description:
    "A CLI-style portfolio website. Navigate with commands like help, about, projects, and socials.",
  keywords: ["portfolio", "developer", "terminal", "CLI", "software engineer"],
  authors: [{ name: "Dwi Fahmi" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
