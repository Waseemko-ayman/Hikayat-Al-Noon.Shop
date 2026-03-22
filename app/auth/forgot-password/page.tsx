import ForgotPasswordPage from '@/features/auth/ForgotPassword';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Forget Password - Wénor Shop',
};

const ForgotPassword = () => <ForgotPasswordPage />;

export default ForgotPassword;
