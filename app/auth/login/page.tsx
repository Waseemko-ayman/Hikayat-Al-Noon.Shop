import LoginPage from '@/features/auth/Login';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Login - Hikayat Al-Noon',
};

const Login = () => <LoginPage />;

export default Login;
