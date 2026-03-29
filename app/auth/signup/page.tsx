import SignupPage from '@/features/auth/Signup';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Signup - Hikayat Al-Noon',
};

const Signup = () => <SignupPage />;

export default Signup;
