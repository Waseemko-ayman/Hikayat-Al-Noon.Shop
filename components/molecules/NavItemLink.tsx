'use client';
import React from 'react';
import UserPopover from './UserPopover';
import { useCartContext } from '@/context/CartContext';
import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';
import { NavItemLinkProps } from '@/interfaces';
import { useSession } from '@/Hooks/useSession';
import ButtonLoading from '../atoms/ButtonLoading';

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
          <div className="flex items-center gap-1">
            <FaCartShopping
              className={`${linksStyleing} text-[var(--fifth-color)] text-base`}
              size={25}
            />
            <span className="text-[var(--white-color)] bg-[var(--forth-color)] w-fit py-0.5 px-2 rounded-sm text-sm text-center font-bold">
              {isLoading ? (<ButtonLoading />) : (cartItems?.length)}
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
