'use client';
import React from 'react';
import AuthTemplate from '@/components/Template/AuthTemplate';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useAuthContext } from '@/context/AuthContext';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const otpSchema = yup.object({
  otp: yup.string().required(),
});

type OtpFormData = yup.InferType<typeof otpSchema>;

const OTPPage = () => {
  // Auth Context
  const { verifyPhoneOTP, isLoading } = useAuthContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = async (data: OtpFormData) => {
    verifyPhoneOTP(data);
  };

  const formContent = (
    <div className="flex items-center justify-center mb-8">
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <InputOTP maxLength={6} {...field}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        )}
      />
    </div>
  );

  return (
    <AuthTemplate
      headerTitle="Verify OTP"
      headerDescription="Enter the 6-digit code sent to your email"
      handleFormSubmit={handleSubmit(onSubmit)}
      error={errors}
      submitBtnText="Verify Code"
      loadingText="Verifying..."
      loading={isLoading}
      formChildren={formContent}
    />
  );
};

export default OTPPage;
