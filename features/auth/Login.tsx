'use client';
import { PATHS } from '@/data/paths';
import AuthRedirect from '@/components/molecules/AuthRedirect';
import { loginInputs } from '@/data';
import AuthTemplate from '@/components/Template/AuthTemplate';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormData } from '@/interfaces';
import { useAuthContext } from '@/context/AuthContext';
import { loginScheme } from '@/validations/forms/login.shema';

const LoginPage = () => {
  // Auth Context
  const { login, isLoading } = useAuthContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginScheme),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    login(data);
  };

  return (
    <AuthTemplate
      headerTitle="Welcome Back"
      headerDescription="Sign in to your account to continue"
      error={errors}
      register={register}
      fieldsTypes={loginInputs}
      handleFormSubmit={handleSubmit(onSubmit)}
      submitBtnText="Sign In"
      loadingText="Signing in..."
      loading={isLoading}
    >
      <AuthRedirect
        text="Don’t have an account?"
        linkText="Create account"
        href={PATHS.AUTH.SIGNUP}
      />
    </AuthTemplate>
  );
};

export default LoginPage;
