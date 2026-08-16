import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Golden Care Financial | Long-Term Care Planning",
  description:
    "Explore long-term care planning options with Golden Care Financial. Get personalized guidance to help protect your financial independence and prepare for the future.",
  keywords: [
    "Golden Care Financial",
    "long-term care",
    "long-term care planning",
    "long-term care insurance",
    "financial planning",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Golden Care Financial | Long-Term Care Planning",
    description:
      "Explore long-term care planning options with Golden Care Financial.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}