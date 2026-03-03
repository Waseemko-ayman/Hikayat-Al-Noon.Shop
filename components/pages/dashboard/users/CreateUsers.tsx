/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/lib/toast';
import useAPI from '@/Hooks/useAPI';
import SettingsTab from '@/components/molecules/SettingsTab';
import Button from '@/components/atoms/Button';
import ButtonLoading from '@/components/atoms/ButtonLoading';
import Input from '@/components/atoms/Input';
import { useUpdateContent } from '@/context/updateContentContext';
import supabase from '@/config/api';
import { CreateUsersFields, rolesOptions } from '@/data';
import { useState } from 'react';
import { InputTypes } from '@/utils/types';
import { Eye, EyeOff } from 'lucide-react';
import { CreateUsersProps, CreateUsersTableProps } from '@/interfaces';
import { createUsersSchema } from '@/validations/forms/createUsers.shema';

const initialUserInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: null,
  password: '',
  role: '',
  avatar_file: null, // Selected image file (do not upload here)
  avatar_url: '', // Image link coming from the API (for display only)
};

// ----------------------------------------------------------------

type CreateUserFormData = yup.InferType<typeof createUsersSchema>;

const CreateUsers = ({
  value,
  onEditIdChange,
  onTabChange,
}: CreateUsersTableProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const { triggerRefresh } = useUpdateContent();
  const refreshKey = 'users';

  const hadnleShowPass = () => {
    setShowPassword(!showPassword);
  };

  // -----------------------------------------

  // API
  const { isLoading: addLoading, add } = useAPI<CreateUsersProps>('auth.users');

  // ----------------------------------------------------------------

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any, any>({
    resolver: yupResolver(createUsersSchema),
    defaultValues: initialUserInfo,
  });

  // ----------------------------------------------------------------

  const onSubmit: SubmitHandler<CreateUserFormData> = async (data: any) => {
    try {
      const formData: Record<string, any> = {
        display_name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone || null,
        role: data.role,
        avatar_url: data.avatar_url || '',
      };

      // -------------------------------- USER AVATAR
      let fileToUpload: File | null = null;

      if (data.avatar_file) {
        fileToUpload = data.avatar_file;
      } else {
        // 1️⃣ Fetch the default image from the public folder
        // We use fetch to get the file as a Response
        const res = await fetch('/assets/user-avatar.png');

        // 2️⃣ Convert the Response to a Blob
        // A Blob is a binary representation of the file; we can create a File object from it
        const blob = await res.blob();

        // 3️⃣ Create a File object from the Blob
        // This file is ready to be uploaded to Supabase Storage, just like any file the user selects
        fileToUpload = new File([blob], 'user-avatar.png', {
          type: blob.type, // We maintain the file type (e.g., image/png)
        });
      }

      if (fileToUpload) {
        const filePath = `avatars/${fileToUpload.name}-${Date.now()}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, fileToUpload, { upsert: true }); // upsert: true → If the file already exists with the same name, it will be replaced.

        if (uploadError) {
          showToast(String(uploadError), 'error');
          throw uploadError;
        }

        const { data: publicData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        formData.avatar_url = publicData.publicUrl;
      }

      const response = await add(formData);

      if (response) {
        showToast('User created successfully');
        reset(initialUserInfo);
        onTabChange('allUsers');
        onEditIdChange(null);
        triggerRefresh(refreshKey);
      }
    } catch (error: any) {
      console.error(error);
      showToast(error?.message || 'Something went wrong', 'error');
    }
  };

  // ----------------------------------------------------------------

  return (
    <SettingsTab
      value={value}
      title="Create Product"
      description="Create New Product for your store"
    >
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid gap-5 md:grid-cols-2 mb-5">
          {CreateUsersFields.map(
            ({ id, label, name, type, placeholder, options = [] }: any) => {
              const fieldOptions =
                type === 'select'
                  ? rolesOptions.map((opt: any) => ({
                      id: opt.id,
                      name: opt.name || '',
                    }))
                  : options;

              const isPasswordField = name === 'password';
              const showPasswordIcon = isPasswordField
                ? showPassword
                  ? EyeOff
                  : Eye
                : undefined;

              return (
                <Input
                  key={id}
                  inputName={name}
                  type={
                    isPasswordField
                      ? showPassword
                        ? 'text'
                        : 'password'
                      : (type as InputTypes)
                  }
                  label={label}
                  placeholder={placeholder}
                  register={register}
                  options={fieldOptions}
                  control={control}
                  error={errors}
                  otherClassName="w-full"
                  Icon={showPasswordIcon}
                  onIconClick={hadnleShowPass}
                  FileUploadText="Personal photo"
                />
              );
            },
          )}
        </div>

        <Button type="submit" disabled={addLoading}>
          {addLoading ? (
            <ButtonLoading text="Save Changes..." />
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </SettingsTab>
  );
};

export default CreateUsers;
