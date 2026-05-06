'use client';
import UserPopover from './UserPopover';
import { useCartContext } from '@/context/CartContext';
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';
import { NavItemLinkProps } from '@/interfaces';
import { useSession } from '@/Hooks/useSession';
import Loading from '../atoms/Loading';
import { ShoppingCart } from 'lucide-react';

const NavItemLink = ({ item, linksStyleing, isMobile }: NavItemLinkProps) => {
  // API Context
  const { cartItems, isLoading } = useCartContext();

  // Session Hook
  const session = useSession();

  return (
    <>
      {item.name === 'Login' && session && !isMobile ? (
        <UserPopover />
      ) : item.name === 'Cart' && !isMobile ? (
        <Link href={item.link} aria-label="My Cart">
          <div className="relative flex items-center gap-1 mt-2 mr-2">
            <ShoppingCart
              className={`${linksStyleing} text-(--fifth-color)`}
              size={30}
            />

            <span className="absolute -top-2 -right-2 bg-(--forth-color) text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {isLoading ? (
                <Loading
                  otherClassName="p-0! py-1!"
                  spinnerClassName="text-white!"
                  spinnerSize={12}
                  showText={false}
                />
              ) : (
                cartItems?.length
              )}
            </span>
          </div>
        </Link>
      ) : (
        <Link href={item.link} aria-label={item.name}>
          {item.name === 'Cart' && isMobile ? null : item.name === 'Login' &&
            isMobile ? null : item.name === 'Login' ? (
            <FiUser size={30} />
          ) : (
            item.name
          )}
        </Link>
      )}
    </>
  );
};

export default NavItemLink;
