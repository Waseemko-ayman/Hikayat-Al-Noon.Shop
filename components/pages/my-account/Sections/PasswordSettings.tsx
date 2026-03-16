/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import NoticeCard from '@/components/molecules/NoticeCard';
import AuthTemplate from '@/components/Template/AuthTemplate';
import { passSettingsInputs } from '@/data';
import { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import { PasswordFormValues } from '@/interfaces';
import supabase from '@/config/api';

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must include at least one uppercase letter')
    .matches(/[0-9]/, 'Must include at least one number'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const PasswordSettings = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit: SubmitHandler<PasswordFormValues> = async (data) => {
    setLoading(true);
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user?.email) throw new Error('User not found');

      const email = userData.user.email;

      // Check your current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: data.currentPassword,
      });

      if (signInError) throw new Error('Current password is incorrect');

      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;
      showToast('Password updated successfully');
      reset();
    } catch (err: any) {
      showToast(err.message || 'Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthTemplate
        otherClassName="mt-6 !max-w-full rounded-xl"
        error={errors}
        register={register}
        submitBtnText="Update Password"
        loadingText="Update Password..."
        loading={loading}
        fieldsTypes={passSettingsInputs}
        handleFormSubmit={handleSubmit(onSubmit)}
      />
      <NoticeCard
        icon={<FaExclamationTriangle className="text-yellow-500" size={20} />}
      >
        <span className="text-black font-semibold">Security Tip:</span> Choose a
        strong password that you don&rsquo;t use elsewhere. Consider using a
        password manager to keep your accounts secure.
      </NoticeCard>
    </div>
  );
};

export default PasswordSettings;
