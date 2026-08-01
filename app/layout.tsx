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

const title = "CoreTechitect — Data architecture & analytics";
const description =
  "CoreTechitect designs and builds modern data warehouses for organizations that have outgrown spreadsheets, dashboards no one trusts, and pipelines held together by one person's memory. Architecture first — then analytics that hold up in a board meeting.";

export const metadata: Metadata = {
  metadataBase: new URL("https://coretechitect.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://coretechitect.com",
    siteName: "CoreTechitect",
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
