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
  title: 'Home - Wénor Shop',
  description: 'Welcome to the Wénor Shop Home Page',
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
