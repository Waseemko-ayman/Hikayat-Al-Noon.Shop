/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Loading from '@/components/atoms/Loading';
import { useSession } from '@/Hooks/useSession';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AccountSidebarProps } from '@/interfaces';
import AccountInfoSkeleton from '@/components/Skeletons/AccountInfoSkeleton';
import AccountTabs from '@/components/molecules/AccountTabs';
import AccountInfoCard from '@/components/molecules/AccountInfoCard';

const AccountSidebar = ({
  activeTab,
  setActiveTab,
  data: userProfile,
  isLoading,
  uploading,
}: AccountSidebarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const session = useSession();
  const { setValue } = useFormContext<any>();

  const userName = userProfile?.display_name;
  const userEmail = userProfile?.email;
  const avatarUrl = userProfile?.avatar_url;
  const userRole = userProfile?.role;
  const emailVerified =
    session?.user?.identities?.[0]?.identity_data?.email_verified;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userProfile?.id) return;
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setValue('avatar_file', file, { shouldDirty: true });
  };

  useEffect(() => {
    if (avatarUrl) setAvatarPreview(avatarUrl);
  }, [avatarUrl]);

  return (
    <aside className="space-y-4">
      <div className="bg-white border-(--seven-color) rounded-xl">
        {/* Profile Card */}
        <div className="text-center bg-white p-6 rounded-xl shadow-lg">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative w-[120px] h-[120px] overflow-hidden rounded-full shadow-lg flex items-center justify-center cursor-pointer mx-auto mb-3"
          >
            {uploading && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                <Loading spinnerSize={24} showText={false} />
              </div>
            )}
            <Image
              src={avatarPreview || '/assets/user-avatar.png'}
              alt="user"
              fill
              sizes="120px"
              className="object-cover rounded-full border-2 border-(--forth-color)"
              priority
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </button>

          {isLoading ? (
            <AccountInfoSkeleton />
          ) : (
            <AccountInfoCard
              userRole={userRole}
              userName={userName}
              userEmail={userEmail}
              emailVerified={emailVerified}
            />
          )}
        </div>

        {/* Buttons Section */}
        <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </aside>
  );
};

export default AccountSidebar;
