'use client';
import { navItems } from '@/data';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import NavItemLink from './NavItemLink';
import { Crown, Shield } from 'lucide-react';
import { useUserInfo } from '@/context/UserInfoContext';
import Image from 'next/image';
import InlineError from './InlineError';
import Loading from '../atoms/Loading';
import { cn } from '@/lib/utils';

const NavLinks = ({
  isMobile,
  onLinkClick,
}: {
  isMobile?: boolean;
  onLinkClick?: () => void;
}) => {
  const pathname = usePathname();

  // Context
  const { user, isLoading, error } = useUserInfo();

  // Variables
  const linksStyleing = `relative py-1 text-base text-(--fifth-color) font-semibold cursor-pointer hover:text-(--forth-color) transition duration-200`;
  const MobileLinkTextColor = isMobile ? 'text-white' : 'text-(--fifth-color)';

  const userName = user?.display_name;
  const userRole = user?.role;
  const avatar = user?.avatar_url;

  return (
    <nav className={cn('flex flex-col', isMobile ? 'h-full' : '')}>
      <ul
        className={cn(
          !isMobile ? 'flex items-center justify-center gap-7' : 'mt-5',
        )}
      >
        {navItems.map((item, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 12,
              delay: idx * 0.08,
            }}
            className={`${linksStyleing} ${MobileLinkTextColor} ${
              item.name !== 'Cart' &&
              item.name !== 'Login' &&
              !isMobile &&
              'after:absolute after:left-0 after:bottom-0 after:bg-(--forth-color) after:w-0 after:h-0.5 hover:after:w-1/2 after:transition-all after:duration-300'
            } ${isMobile ? 'text-lg mb-4' : ''} ${
              pathname === '/' && item.name.toLowerCase() === 'home'
                ? isMobile
                  ? 'bg-(--forth-color) p-2 rounded-lg'
                  : 'after:w-1/2 text-(--forth-color)'
                : pathname.slice(1) === item.name.toLowerCase()
                  ? isMobile
                    ? 'bg-(--forth-color) p-2 rounded-lg'
                    : 'after:w-1/2 text-(--forth-color)'
                  : ''
            }`}
            onClick={onLinkClick}
          >
            <NavItemLink
              item={item}
              linksStyleing={linksStyleing}
              isMobile={isMobile}
            />
          </motion.li>
        ))}
      </ul>
      {isMobile && (
        <div className="mt-auto pb-5 w-full">
          <div className="flex items-center gap-2 rounded-lg min-sm:border-none max-lg:border-none max-md:border max-md:border-gray-300 lg:border lg:border-gray-300">
            {isLoading ? (
              <Loading
                showText={false}
                spinnerSize={30}
                otherClassName="bg-transparent!"
              />
            ) : error ? (
              <InlineError textColor="text-black" />
            ) : (
              user && (
                <div
                  title={`${userName} - ${userRole}`}
                  className="min-sm:w-[40px] min-sm:h-[40px] max-lg:w-[40px] max-lg:h-[40px] max-md:w-[50px] max-md:h-[50px] lg:w-[50px] lg:h-[50px] rounded-full overflow-hidden border-2 border-(--forth-color)"
                >
                  <Image
                    src={avatar || '/assets/user-avatar.png'}
                    alt="user avatar"
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              )
            )}
            <div className="min-sm:hidden max-lg:hidden max-md:block lg:block">
              <p
                className="text-lg font-medium truncate max-w-[170px] text-white"
                title={userName}
              >
                {isLoading ? 'Loading...' : userName}
              </p>
              <div
                className={`flex item-center justify-center gap-1 w-fit mt-1 px-3 py-1 rounded-full ${
                  userRole === 'ADMIN'
                    ? 'bg-red-100 text-red-700'
                    : userRole === 'MANAGER'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                }`}
              >
                {userRole === 'ADMIN' && <Shield size={14} />}
                {userRole === 'MANAGER' && <Crown size={14} />}
                <span className="text-sm">
                  {isLoading ? 'Loading...' : userRole}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavLinks;
