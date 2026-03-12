/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Button from '@/components/atoms/Button';
import Loading from '@/components/atoms/Loading';
import { useSession } from '@/Hooks/useSession';
import { userInfoButtons } from '@/data';
import { CheckCircle, Crown, Shield, User, XCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AccountSidebarProps } from '@/interfaces';
import AccountInfoSkeleton from '@/components/Skeletons/AccountInfoSkeleton';

const AccountSidebar = ({
  activeTab,
  setActiveTab,
  data: userProfile,
  isLoading,
  uploading,
}: AccountSidebarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Session Hook
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
      <div className="bg-white border-(--seven-color)">
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
              className="object-cover rounded-full border-2 border-(--forth-color)"
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
            <>
              {userRole && (
                <div
                  className={`flex item-center justify-center gap-2 w-fit mx-auto mb-2 px-3 py-1 rounded-full ${
                    userRole === 'ADMIN'
                      ? 'bg-red-100 text-red-700'
                      : userRole === 'MANAGER'
                        ? 'bg-blue-100 text-blue-700'
                        : userRole === 'USER'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {userRole === 'ADMIN' && <Shield size={14} />}
                  {userRole === 'MANAGER' && <Crown size={14} />}
                  {userRole === 'USER' && <User size={14} />}
                  <span className="text-xs font-semibold capitalize">
                    {userRole}
                  </span>
                </div>
              )}
              <h1 className="text-(--fifth-color) font-semibold">{userName}</h1>
              <p className="text-(--six-color)">{userEmail}</p>
              <div className="flex items-center justify-center gap-1 text-gray-600 mt-3 text-sm">
                <p>Registered via: </p>
                <span className="font-medium capitalize">
                  {session?.user?.app_metadata?.provider === 'email'
                    ? 'Email'
                    : session?.user?.app_metadata?.provider}
                </span>
              </div>
              <div
                className={`flex items-center justify-center gap-1 ${
                  emailVerified ? 'text-green-600' : 'text-red-600'
                } font-semibold mt-1`}
              >
                {emailVerified ? (
                  <CheckCircle size={16} />
                ) : (
                  <XCircle size={16} />
                )}

                <p>Email {emailVerified ? 'verified' : 'not verified'}</p>
              </div>
            </>
          )}
        </div>
        <div className="bg-(--seven-color)" />
        <div className="pt-6 space-y-2">
          {userInfoButtons.map((btn) => {
            const { id, text } = btn;
            return (
              <div key={id} className="flex flex-col gap-2">
                <Button
                  variant="primary"
                  otherClassName={`w-full justify-start ${
                    activeTab === text.toLowerCase()
                      ? '!bg-(--first-color) !text-(--forth-color)'
                      : ''
                  }`}
                  handleClick={() => setActiveTab(text.toLowerCase())}
                  aria-label={text}
                >
                  {text}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default AccountSidebar;
