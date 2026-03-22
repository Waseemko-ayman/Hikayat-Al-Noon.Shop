import ResetPasswordPage from '@/features/auth/ResetPassword';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Reset Password - Wénor Shop',
};

const ResetPassword = () => <ResetPasswordPage />;

export default ResetPassword;
