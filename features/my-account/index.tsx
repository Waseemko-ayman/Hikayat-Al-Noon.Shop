/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import dynamic from 'next/dynamic';

import { memo, useEffect, useState } from 'react';
import Profile from './Sections/Profile';
import AccountSidebar from './Sections/AccountSidebar';
import Layer from '@/components/atoms/Layer';
import Container from '@/components/atoms/Container';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema } from '@/utils/profileSchema';
import { useToast } from '@/lib/toast';
import supabase from '@/config/api';
import { useUserInfo } from '@/context/UserInfoContext';
import useAPI from '@/Hooks/useAPI';

// const Addresses = memo(
//   dynamic(() => import('./Sections/Addresses'), { ssr: false }),
// );
const Settings = memo(
  dynamic(() => import('./Sections/Settings'), { ssr: false }),
);

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  // We use useEffect to generate names after mount (client-only)
  const [clientReady, setClientReady] = useState(false);

  // Notifications
  const { showToast } = useToast();

  // Hook
  const { edit } = useAPI('auth.users');

  // Context
  const { user: userProfile, setUser, isLoading } = useUserInfo();

  const userName = userProfile?.display_name || '';
  const [firstName, ...rest] = userName?.split(' ');
  const lastName = rest.join(' ');

  const initialUserInfo = {
    firstName: firstName || '',
    lastName: lastName || '',
    email: userProfile?.email || null,
    phone: userProfile?.phone || null,
    avatar_file: null, // Selected image file (do not upload here)
    avatar_url: userProfile?.avatar_url || '', // Image link coming from the API (for display only)
  };

  const methods = useForm<any>({
    resolver: yupResolver(profileSchema) as any,
    defaultValues: initialUserInfo,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, dirtyFields },
  } = methods;

  const onSubmit = async (data: any) => {
    const payload: any = {};
    setLoading(true);
    try {
      // Upload the image if available
      // avatar_file came from AccountSidebar via useFormContext
      // ✅ clientReady: Ensure this code runs only on the client to prevent hydration mismatch
      if (clientReady && data.avatar_file) {
        const filePath = `${userProfile?.id}-${Date.now()}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, data.avatar_file, { upsert: true }); // upsert: true → If the file already exists with the same name, it will be replaced.

        if (uploadError) {
          setUploading(false);
          showToast(String(uploadError), 'error');
          throw uploadError;
        }

        const { data: publicData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        payload.avatar_url = publicData.publicUrl;
      }

      // Remaining fields
      for (const key of Object.keys(dirtyFields)) {
        if (key === 'firstName' || key === 'lastName') {
          payload.display_name = `${data.firstName} ${data.lastName}`;
        } else if (key !== 'avatar_file') {
          payload[key] = data[key];
        }
      }

      /**
       * Check for anything to update.
       * If the user hasn't changed anything, the function stops without any update.
       */
      if (!Object.keys(payload).length) return;

      // Update Function
      await edit(userProfile.id, payload);

      // ✅ Update context only after success
      setUser((prev: any) => ({
        ...prev,
        ...payload,
      }));
      showToast('Successfully updated');
      // await refetch();
    } catch (err: any) {
      showToast(err.message || 'Update failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reset(initialUserInfo);
  }, [userProfile, reset]);

  useEffect(() => {
    setClientReady(true);
  }, []);

  return (
    <FormProvider {...methods}>
      <Layer otherClassName="pt-36 md:pt-48">
        <Container>
          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            {/* Sidebar */}
            <AccountSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              data={userProfile}
              isLoading={isLoading}
              uploading={uploading}
            />

            {/* Profile Tab */}
            <div className={activeTab === 'profile' ? 'block' : 'hidden'}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Profile
                  errors={errors}
                  register={register}
                  isLoading={isLoading}
                  loading={loading}
                />
              </form>
            </div>

            {/* <div className={activeTab === 'addresses' ? 'block' : 'hidden'}>
              <Addresses />
            </div> */}

            <div className={activeTab === 'settings' ? 'block' : 'hidden'}>
              <Settings />
            </div>
          </div>
        </Container>
      </Layer>
    </FormProvider>
  );
};

export default MyAccountPage;
