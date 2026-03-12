'use client';
import { navItems } from '@/data';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import NavItemLink from './NavItemLink';

const NavLinks = ({
  isMobile,
  onLinkClick,
}: {
  isMobile?: boolean;
  onLinkClick?: () => void;
}) => {
  const pathname = usePathname();

  // Variables
  const linksStyleing = `relative py-1 text-base text-(--fifth-color) font-semibold cursor-pointer hover:text-(--forth-color) transition duration-200`;
  const MobileLinkTextColor = isMobile ? 'text-white' : 'text-(--fifth-color)';

  return (
    <nav className={isMobile ? 'mt-5' : ''}>
      <ul
        className={`${
          !isMobile ? 'flex items-center justify-center gap-7' : ''
        }`}
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
    </nav>
  );
};

export default NavLinks;
