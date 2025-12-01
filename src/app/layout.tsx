import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anchor Systems | AI & RAG Solutions",
  description: "Custom LLM Chatbots and Enterprise RAG Systems tailored for your business.",
  openGraph: {
    title: "Anchor Systems | AI & RAG Solutions",
    description: "Custom LLM Chatbots and Enterprise RAG Systems tailored for your business.",
    url: "https://anchorsystems.ai", // Placeholder URL
    siteName: "Anchor Systems",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor Systems | AI & RAG Solutions",
    description: "Custom LLM Chatbots and Enterprise RAG Systems tailored for your business.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-200`}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
