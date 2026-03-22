import MyAccountPage from '@/features/my-account';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'My Account - Wénor Shop',
  description:
    'Manage your account, view orders, and update personal details on Clothes Shipping.',
  keywords: [
    'clothes',
    'shipping',
    'shopping',
    'account',
    'orders',
    'profile',
    'clothing store',
  ],
  // authors: [{ name: 'Clothes Shipping', url: 'https://example.com' }],
  // creator: 'Clothes Shipping',
  // publisher: 'Clothes Shipping',
  // applicationName: 'Clothes Shipping',
  // openGraph: {
  //   title: 'My Account — Clothes Shipping',
  //   description:
  //     'Manage your account, view orders, and update personal details on Clothes Shipping.',
  //   url: 'https://example.com/my-account',
  //   siteName: 'Clothes Shipping',
  //   images: [
  //     {
  //       url: 'https://example.com/og-image.jpg',
  //       width: 1200,
  //       height: 630,
  //       alt: 'Clothes Shipping account overview',
  //     },
  //   ],
  //   locale: 'en_US',
  //   type: 'website',
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'My Account — Clothes Shipping',
  //   description:
  //     'Manage your account, view orders, and update personal details on Clothes Shipping.',
  //   images: ['https://example.com/og-image.jpg'],
  //   creator: '@your_twitter_handle',
  // },
  // icons: {
  //   icon: '/favicon.ico',
  //   shortcut: '/favicon-16x16.png',
  //   apple: '/apple-touch-icon.png',
  // },
  // robots: {
  //   index: false,
  //   follow: false,
  // },
  // alternates: {
  //   canonical: 'https://example.com/my-account',
  // },
};

const MyAccount = () => <MyAccountPage />;

export default MyAccount;
