import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const plusJakartaSans = localFont({
  src: [
    {
      path: "../../public/fonts/plus-jakarta-sans/plus-jakarta-sans-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/plus-jakarta-sans/plus-jakarta-sans-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
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
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5C7GJSB4B6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5C7GJSB4B6');
          `}
        </Script>
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
