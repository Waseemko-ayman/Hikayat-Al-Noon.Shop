'use client';
import React, { useState } from 'react';
import Input from '../atoms/Input';
import { Eye, EyeOff } from 'lucide-react';
import { InputTypes } from '@/utils/types';
import { FormProps } from '@/interfaces';

const passwordFields = [
  'password',
  'password_confirmation',
  'currentPassword',
  'newPassword',
  'confirmNewPassword',
] as const;

// Type for password field names / Converts the array to a Union Type
type PasswordField = (typeof passwordFields)[number];

const Form = ({ error, register, fieldsTypes }: FormProps) => {
  const [showPassword, setShowPassword] = useState<
    Record<PasswordField, boolean>
  >({
    password: false,
    password_confirmation: false,
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const isPasswordField = (name: string): name is PasswordField =>
    passwordFields.includes(name as PasswordField);

  const toggleShow = (name: PasswordField) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getIcon = (name: string) => {
    if (!isPasswordField(name)) return undefined;
    return showPassword[name] ? EyeOff : Eye;
  };

  const getInputType = (name: string, type: string) =>
    isPasswordField(name) && showPassword[name] ? 'text' : (type as InputTypes);

  return (
    <>
      {fieldsTypes?.map((input) => {
        const { id, label, type, name, placeholder } = input;
        return (
          <Input
            key={id}
            type={getInputType(name, type)}
            label={label}
            inputName={name}
            placeholder={placeholder}
            Icon={getIcon(name)}
            onIconClick={
              isPasswordField(name) ? () => toggleShow(name) : undefined
            }
            iconWrapper={
              isPasswordField(name) ? 'right-3 top-1/2 -translate-y-1/2' : ''
            }
            inputClassName={isPasswordField(name) ? 'pr-9' : ''}
            otherClassName="w-full rounded-md!"
            iconClassName="text-(--forth-color)"
            isRequired
            register={register}
            error={error}
          />
        );
      })}
    </>
  );
};

export default Form;
