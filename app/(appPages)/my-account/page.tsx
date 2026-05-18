import MyAccountPage from '@/features/my-account';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'My Account',
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
};

const MyAccount = () => <MyAccountPage />;

export default MyAccount;
