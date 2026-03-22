/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { supabase } from '@/lib/supabase';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/toast';
import { resetInputs } from '@/data';
import { PATHS } from '@/data/paths';
import AuthTemplate from '@/components/Template/AuthTemplate';
import StatusPassword from '@/components/molecules/StatusPassword';
import supabase from '@/config/api';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [password] = useState('');
  const [confirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error] = useState('');
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState(true);

  // Notifications
  const { showToast } = useToast();

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const type = hashParams.get('type');

    if (type === 'recovery' && accessToken) {
      setValidToken(true);
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    showToast('');

    if (password !== confirmPassword) {
      showToast('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      showToast(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    <StatusPassword
      icon="check"
      title="Password Reset Successfully!"
      description="Your password has been reset. Redirecting to login..."
      linkText="Back to Login"
      linkHref="/login"
    />;
  }

  if (!validToken) {
    return (
      <StatusPassword
        icon="lock"
        iconBgColor="#fee2e2"
        iconColor="#dc2626"
        title="Invalid or Expired Link"
        description="This password reset link is invalid or has expired. Please request a new one."
        linkText="Request New Link"
        linkHref="/forgot-password"
      />
    );
  }

  return (
    <AuthTemplate
      headerTitle="Reset Password"
      headerDescription="Enter your new password below"
      handleFormSubmit={handleResetPassword}
      error={error}
      submitBtnText="Reset Password"
      loadingText="Resetting password..."
      loading={loading}
      fieldsTypes={resetInputs}
    >
      <div className="mt-8 text-center">
        <Link
          href={PATHS.AUTH.LOGIN}
          className="text-sm hover:underline transition-colors text-(--forth-color)"
        >
          Back to Login
        </Link>
      </div>
    </AuthTemplate>
  );
};

export default ResetPasswordPage;
