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
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPassScheme } from '@/validations/forms/resetPass.scheme';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState(true);

  // Notifications
  const { showToast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPassScheme),
    defaultValues: { password: '', password_confirmation: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: {
    password: string;
    password_confirmation: string;
  }) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;

      await supabase.auth.signOut();

      setSuccess(true);
      router.replace(PATHS.AUTH.LOGIN);
    } catch (error: any) {
      showToast(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  // It is confirmed that the user entered the page via a valid email link (Supabase recovery link) and not a normal login.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    /**
     * Reading the hash from the link
     *ُ Ex: /reset-password#access_token=123&type=recovery
     */
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const type = hashParams.get('type');

    if (!accessToken || type !== 'recovery') {
      setValidToken(false);
    }
  }, []);

  if (success) {
    return (
      <StatusPassword
        icon="check"
        title="Password Reset Successfully!"
        description="Your password has been reset. Redirecting to login..."
        linkText="Back to Login"
        linkHref={PATHS.AUTH.LOGIN}
      />
    );
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
        linkHref={PATHS.AUTH.FORGOT_PASSWORD}
      />
    );
  }

  return (
    <AuthTemplate
      headerTitle="Reset Password"
      headerDescription="Enter your new password below"
      handleFormSubmit={handleSubmit(onSubmit)}
      register={register}
      error={errors}
      submitBtnText="Reset Password"
      loadingText="Resetting password..."
      loading={loading}
      fieldsTypes={resetInputs}
    >
      <div className="text-center">
        <Link
          href={PATHS.AUTH.LOGIN}
          className="group inline-flex items-center gap-2 font-semibold hover:underline transition-colors text-(--forth-color)"
        >
          <ArrowLeft
            size={17}
            className="text-(--forth-color) animate-bounce-horizontal"
          />
          Back to Login
        </Link>
      </div>
    </AuthTemplate>
  );
};

export default ResetPasswordPage;
