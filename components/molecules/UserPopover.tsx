/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Image from 'next/image';
import AnimatedWrapper from './FramerMotion/AnimatedWrapper';
import NavItem from '../atoms/NavItem';
import { userList } from '@/data';
import { useAuthContext } from '@/context/AuthContext';
import Loading from '../atoms/Loading';
import { useUserInfo } from '@/context/UserInfoContext';

const UserPopover = () => {
  const { logout } = useAuthContext();

  // Supabase Hook
  const { user: userInfo, isLoading } = useUserInfo();

  const handleLogout = () => {
    logout();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {isLoading ? (
          <Loading
            showText={false}
            spinnerSize={25}
            otherClassName="bg-transparent! p-0!"
          />
        ) : (
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-(--forth-color)">
            <Image
              src={userInfo?.avatar_url || '/assets/user-avatar.png'}
              alt="user avatar"
              width={40}
              height={40}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <ul>
          {userList.map((item: any, index: number) => {
            if (item.title === 'Dashboard' && userInfo?.role !== 'ADMIN')
              return false;
            return (
              <AnimatedWrapper key={item.id} custom={index}>
                <li className="w-full">
                  <NavItem
                    Icon={item.icon}
                    name={item.title}
                    otherClassNameIcon={
                      item.title === 'logout' ? '!text-red-500' : ''
                    }
                    otherClassName={
                      item.title === 'logout'
                        ? '!text-red-500 hover:bg-red-50'
                        : ''
                    }
                    linkPath={
                      'link' in item ? (item.link as string) : undefined
                    }
                    onClick={item.title === 'logout' ? handleLogout : undefined}
                    showArrow={item.title !== 'logout'}
                    disablePrefetch={
                      item.title === 'Dashboard' || item.title === 'My Account'
                    }
                  />
                </li>
              </AnimatedWrapper>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
