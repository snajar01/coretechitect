import type { Metadata } from "next";
import { Figtree, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const title = "Core Techitect — Data, AI & software";
const description =
  "Core Techitect designs and builds data foundations and migrations, AI and automation, custom software, websites, and cloud systems for growing businesses. Architecture first.";

export const metadata: Metadata = {
  metadataBase: new URL("https://coretechitect.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://coretechitect.com",
    siteName: "Core Techitect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
