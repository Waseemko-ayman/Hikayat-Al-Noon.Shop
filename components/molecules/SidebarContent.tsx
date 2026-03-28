import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/data';
import { PATHS } from '@/data/paths';
import Image from 'next/image';
import Link from 'next/link';
import InlineError from './InlineError';
import Loading from '../atoms/Loading';
import { useUserInfo } from '@/context/UserInfoContext';
import { Crown, Shield } from 'lucide-react';
import { useUnreadMessages } from '@/context/UnreadMessagesContext';

const SidebarContent = ({ pathname }: { pathname: string }) => {
  // Session Hook
  const { user, isLoading, error } = useUserInfo();
  const { unreadCount } = useUnreadMessages();

  const userName = user?.display_name;
  const userRole = user?.role;
  const avatar = user?.avatar_url;

  return (
    <div className="flex flex-col justify-between min-sm:items-center max-lg:items-center max-md:items-stretch lg:items-stretch h-full overflow-x-hidden">
      <div>
        <div className="flex items-center justify-center border-b border-b-gray-300 p-4">
          <Link
            href={PATHS.HOME}
            className="flex items-center gap-2 font-semibold"
          >
            {/* <picture> is used to display different images depending on the screen size. The browser decides which image to load before loading, so performance is better than solutions that rely on JavaScript. */}
            {/* <picture>: It is a container that allows the identification of multiple image sources. */}
            <picture>
              {/* Image between md and lg */}
              <source
                media="(min-width:639px) and (max-width:1023px)"
                srcSet="/assets/landing/tab-logo.webp"
              />

              {/* Default image */}
              <Image
                src="/assets/landing/logo.webp"
                alt="Wénor Logo"
                width={100}
                height={100}
                priority
              />
            </picture>
          </Link>
        </div>

        <div className="flex-1 overflow-auto p-2">
          <div className="flex flex-col items-center gap-4">
            <nav className="text-sm font-medium max-md:w-full lg:w-full space-y-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-black hover:bg-muted',
                    pathname === link.href && 'bg-muted text-black',
                  )}
                >
                  <link.icon className="h-5 w-5 max-md:h-4 max-md:w-4 lg:h-4 lg:w-4" />
                  <span className="min-sm:hidden max-lg:hidden max-md:block lg:block">
                    {link.title}
                  </span>
                  {link.title === 'Contact Messages' && unreadCount > 0 && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-t-gray-300 p-3">
        <div className="flex items-center gap-2 rounded-lg min-sm:border-none max-lg:border-none max-md:border max-md:border-gray-300 lg:border lg:border-gray-300 p-4">
          {isLoading ? (
            <Loading
              showText={false}
              spinnerSize={30}
              otherClassName="bg-transparent!"
            />
          ) : error ? (
            <InlineError textColor="text-black" />
          ) : (
            <div
              title={`${userName} - ${userRole}`}
              className="min-sm:w-[40px] min-sm:h-[40px] max-lg:w-[40px] max-lg:h-[40px] 
              max-md:w-[50px] max-md:h-[50px] lg:w-[50px] lg:h-[50px]
              rounded-full overflow-hidden border-2 border-(--forth-color)"
            >
              <Image
                src={avatar || '/assets/user-avatar.png'}
                alt="user avatar"
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="min-sm:hidden max-lg:hidden max-md:block lg:block">
            <p
              className="text-sm font-medium truncate max-w-[140px]"
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
              <span className="text-xs">
                {isLoading ? 'Loading...' : userRole}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
