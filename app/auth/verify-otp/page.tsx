import VerifyOTPPage from '@/features/auth/VerifyOTPPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Verify OTP - Hikayat Al-Noon',
  description: 'Verify your one-time password to access your account.',
  robots: 'noindex, nofollow', // Archiving and link tracking are prohibited
};

const OTP = () => <VerifyOTPPage />;

export default OTP;
