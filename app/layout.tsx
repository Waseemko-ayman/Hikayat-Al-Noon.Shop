import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { UpdateContentProvider } from '@/context/updateContentContext';
import AuthProvider from '@/context/AuthContext';
import { UserInfoProvider } from '@/context/UserInfoContext';
import AnalyticsProvider from '@/context/AnalyticsProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wenorshop.vercel.app/'),

  title: {
    default: 'Wénor Shop | Fashion Store',
    template: '%s | Wénor Shop',
  },

  description:
    'Wénor Shop offers trendy and high-quality clothing for all styles. Explore our collection of fashion items online.',

  keywords: [
    'Wénor Shop',
    'Clothing',
    'Fashion',
    'Online Store',
    'Men Fashion',
    'Women Fashion',
    'Shop Online',
  ],

  authors: [
    { name: 'Wénor Shop' },
    { name: 'Waseem', url: 'https://waseem-portfolio-phi.vercel.app' },
  ],
  creator: 'Waseem',

  openGraph: {
    title: 'Wénor Shop',
    description: 'Trendy and high-quality clothing online store.',
    url: 'https://wenorshop.vercel.app/',
    siteName: 'Wénor Shop',
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wénor Shop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Wénor Shop',
    description: 'Trendy and high-quality clothing online store.',
    images: ['/assets/og-image.png'],
  },

  icons: {
    icon: '/assets/landing/tab-logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/landing/tab-logo.webp" sizes="any" />
        <link
          rel="preconnect"
          href="https://usodykqqnbeiohqwkwfy.supabase.co"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider>
          <AuthProvider>
            <UserInfoProvider>
              <UpdateContentProvider>
                <CartProvider>{children}</CartProvider>
              </UpdateContentProvider>
            </UserInfoProvider>
          </AuthProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
