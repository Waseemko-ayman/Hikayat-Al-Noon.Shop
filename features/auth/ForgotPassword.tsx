'use client';

import { useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
import Input from '@/components/atoms/Input';
import AuthRedirect from '@/components/molecules/AuthRedirect';
import { PATHS } from '@/data/paths';
import AuthTemplate from '@/components/Template/AuthTemplate';
import StatusPassword from '@/components/molecules/StatusPassword';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading] = useState(false);
  const [error] = useState('');
  const [success] = useState(false);

  // const handleResetRequest = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');

  //   try {
  //     const { error } = await supabase.auth.resetPasswordForEmail(email, {
  //       redirectTo: `${window.location.origin}/reset-password`,
  //     });

  //     if (error) throw error;

  //     setSuccess(true);
  //   } catch (error: any) {
  //     setError(error.message || 'Failed to send reset email');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    <>
      <div className="space-y-2">
        <label htmlFor="email" className="text-(--fifth-color)">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          inputName="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          otherClassName="w-full !rounded-md"
        />
        <p className="text-xs mt-2 text-(--six-color)">
          We&rsquo;ll send a password reset link to this email
        </p>
      </div>
    </>
  );

  return (
    <AuthTemplate
      headerTitle="Forgot Password?"
      headerDescription="No worries! Enter your email and we'll send you reset instructions"
      error={error}
      formChildren={formContent}
      submitBtnText="Send Reset Link"
      loadingText="Sending..."
      loading={loading}
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
