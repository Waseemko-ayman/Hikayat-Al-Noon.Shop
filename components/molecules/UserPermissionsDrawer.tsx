/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '@/lib/toast';
import ResponsiveDialogDrawer from '../organism/ResponsiveDialogDrawer';
import Input from '../atoms/Input';
import Loading from '../atoms/Loading';
import useIsMobile from '@/Hooks/useIsMobile';
import useAPI from '@/Hooks/useAPI';
import Button from '../atoms/Button';
import ButtonLoading from '../atoms/ButtonLoading';
import { rolesOptions } from '@/data';
import { FaUser } from 'react-icons/fa6';

interface UserRolesDrawerProps {
  userId: string | number;
  open: boolean;
  setOpen: (val: boolean) => void;
  trigger?: React.ReactNode;
  onUpdated?: (updatedData: any) => void;
}

interface FormValues {
  role: string;
}

const UserPermissionsDrawer: React.FC<UserRolesDrawerProps> = ({
  userId,
  open,
  setOpen,
  trigger,
  onUpdated,
}) => {
  const { showToast } = useToast();
  const isMobile = useIsMobile();

  const { get, edit, data: user, isLoading } = useAPI('profiles');
  const userRole = user?.find((u: any) => u.id === userId)?.role;

  const schema = yup.object().shape({
    role: yup.string().required('Role is required'),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { role: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await edit(userId, data);
      showToast('Role updated successfully');
      onUpdated?.(data);
      setOpen(false);
    } catch (err: any) {
      showToast(err?.response?.message || 'حدث خطأ', 'error');
    }
  };

  useEffect(() => {
    if (open && userRole) {
      reset({ role: userRole });
    }
  }, [open, userRole, reset]);

  useEffect(() => {
    if (open) get();
  }, [open, get]);

  return (
    <ResponsiveDialogDrawer
      open={open}
      setOpen={setOpen}
      isMobile={isMobile}
      trigger={trigger}
      contentClassName="px-4! max-sm:pb-10!"
      showLastTwo={false}
    >
      {isLoading ? (
        <Loading otherClassName="py-4" />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-bold text-(--seconde-color)">
              <FaUser />
              <h2 className="text-xl">Role</h2>
            </div>
            <Input
              inputName="role"
              type="select"
              placeholder="Select Role"
              control={control}
              isMulti
              options={rolesOptions.map((opt: any) => ({
                id: opt.id,
                name: opt.name || '',
              }))}
              error={errors}
              otherClassName="w-full"
            />
          </div>
          <Button type="submit" otherClassName="p-3">
            {isLoading ? (
              <ButtonLoading text="Save Changes..." />
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>
      )}
    </ResponsiveDialogDrawer>
  );
};

export default UserPermissionsDrawer;
