'use client';
import React from 'react';
import { PATHS } from '@/data/paths';
import AuthRedirect from '@/components/molecules/AuthRedirect';
import AuthTemplate from '@/components/Template/AuthTemplate';
import { signupInputs } from '@/data';
import { signupFormData } from '@/interfaces';
import { useAuthContext } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpEmailschema } from '@/validations/forms/signup.schema';

const SignupPage = () => {
  // Aith Cotntext
  const { signup, isLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpEmailschema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: signupFormData) => {
    const payload = {
      email: data.email || '',
      password: data.password || '',
      options: { data: { display_name: data.name || '' } },
    };

    if (payload) signup(payload);
  };

  return (
    <AuthTemplate
      headerTitle="Create Your Account"
      headerDescription="Sign up to get started and enjoy all features"
      error={errors}
      register={register}
      fieldsTypes={signupInputs}
      handleFormSubmit={handleSubmit(onSubmit)}
      submitBtnText="Sign Up"
      loadingText="Signing up..."
      loading={isLoading}
    >
      <AuthRedirect
        text="Already have an account?"
        linkText="Sign in"
        href={PATHS.AUTH.LOGIN}
      />
    </AuthTemplate>
  );
};

export default SignupPage;
