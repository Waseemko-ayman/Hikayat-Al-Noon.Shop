'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '@/components/atoms/Input';
import AuthRedirect from '@/components/molecules/AuthRedirect';
import AuthTemplate from '@/components/Template/AuthTemplate';
import StatusPassword from '@/components/molecules/StatusPassword';

import { PATHS } from '@/data/paths';
import { useToast } from '@/lib/toast';

import { forgotPassScheme } from '@/validations/forms/forgotPass.scheme';
import supabase from '@/config/api';
import { ForgotPasswordFormValues } from '@/interfaces';

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { showToast } = useToast();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPassScheme),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const email = watch('email');

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${PATHS.AUTH.RESET_PASSWORD}`,
      });

      if (error) {
        showToast(error.message, 'error');
        return;
      }

      setSuccess(true);

      showToast('Password reset email sent successfully');
    } catch (error) {
      console.error(error);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <StatusPassword
        icon="check"
        title="Check Your Email"
        description={`We've sent a password reset link to ${email}. Please check your email and click the link to reset your password.`}
        linkText="Back to Login"
        linkHref={PATHS.AUTH.LOGIN}
        infoText="Didn't receive the email? Check your spam folder or try again with a different email address."
      />
    );
  }

  const formContent = (
    <div className="space-y-2">
      <Input
        id="email"
        type="email"
        label="Email Address"
        inputName="email"
        placeholder="you@example.com"
        otherClassName="w-full !rounded-md"
        {...register('email')}
      />

      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}

      <p className="text-xs mt-2 text-(--six-color)">
        We&rsquo;ll send a password reset link to this email
      </p>
    </div>
  );

  return (
    <AuthTemplate
      headerTitle="Forgot Password?"
      headerDescription="No worries! Enter your email and we'll send you reset instructions"
      error={errors}
      formChildren={formContent}
      submitBtnText="Send Reset Link"
      loadingText="Sending..."
      loading={loading}
      handleFormSubmit={handleSubmit(onSubmit)}
    >
      <AuthRedirect
        text="Remember your password?"
        linkText="Sign in"
        href={PATHS.AUTH.LOGIN}
      />
    </AuthTemplate>
  );
};

export default ForgotPasswordPage;
