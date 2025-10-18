import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL('https://cryptocurrenciesworldcup.vercel.app'),
  title: "Cryptocurrencies World Cup - CWC",
  description: "The most epic cryptocurrency competition. 16 tokens, one winner. Launching November 1st, 2025!",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/assets/cup.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "🏆 Cryptocurrencies World Cup - CWC 🏆",
    description: "The most epic cryptocurrency competition is coming! 16 tokens will battle for the ultimate crypto championship. Launching November 1st, 2025! 🚀",
    url: "https://cryptocurrenciesworldcup.vercel.app",
    siteName: "Cryptocurrencies World Cup",
    images: [
      {
        url: '/assets/cwc.png',
        width: 1200,
        height: 630,
        alt: 'Cryptocurrencies World Cup - The Ultimate Crypto Tournament',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "🏆 Cryptocurrencies World Cup - CWC 🏆",
    description: "The most epic cryptocurrency competition is coming! 16 tokens will battle for the ultimate crypto championship. Launching November 1st, 2025! 🚀",
    images: ['/assets/cwc.png'],
    creator: '@cryptoworlcup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
