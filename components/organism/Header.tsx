'use client';
import React, { useState } from 'react';
import Container from '../atoms/Container';
import Link from 'next/link';
import Image from 'next/image';
import { PATHS } from '@/data/paths';
import NavLinks from '../molecules/NavLinks';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { FaAlignLeft } from 'react-icons/fa6';
import useIsMobile from '@/Hooks/useIsMobile';
import { navItems } from '@/data';
import NavItemLink from '../molecules/NavItemLink';
import Logo from '../atoms/Logo';

const Header = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile(800);

  const MobileNavbar = navItems.filter(
    (item) => item.name === 'Login' || item.name === 'Cart',
  );

  // Variables
  const StyledLinks = (itemName: string) =>
    `relative py-1 text-base font-semibold cursor-pointer transition duration-200 ${
      itemName === 'Cart'
        ? 'text-(--fifth-color)'
        : isMobile
          ? 'text-white'
          : 'text-(--fifth-color)'
    } hover:text-(--forth-color)`;

  const handleLinkClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <header className="bg-(--header-bg-color) py-5 sticky top-0 z-50 shadow-[0_30px_60px_rgba(0,0,0,0.10)]">
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <Container otherClassName="flex items-center justify-between h-10">
            <Logo />
            <div className="flex items-center gap-2">
              {MobileNavbar.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 60,
                    damping: 12,
                    delay: idx * 0.08,
                  }}
                >
                  <NavItemLink
                    item={item}
                    linksStyleing={StyledLinks(item.name)}
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 60,
                  damping: 12,
                  delay: 0.1,
                }}
              >
                <SheetTrigger>
                  <FaAlignLeft
                    fontSize="large"
                    className="text-2xl text-(--fifth-color) hover:text-(--forth-color) transition duration-200 cursor-pointer"
                    aria-label="Open side menu"
                  />
                </SheetTrigger>
              </motion.div>
            </div>
          </Container>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="sr-only">sss</SheetTitle>
            </SheetHeader>
            <NavLinks isMobile={isMobile} onLinkClick={handleLinkClick} />
          </SheetContent>
        </Sheet>
      ) : (
        <Container>
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 60,
                damping: 12,
                delay: 0.1,
              }}
            >
              <Link href={PATHS.HOME}>
                <Image
                  src="/assets/landing/logo.webp"
                  alt="Cata Logo"
                  title="Cata Logo"
                  width={60}
                  height={60}
                />
              </Link>
            </motion.div>
            <NavLinks />
          </div>
        </Container>
      )}
    </header>
  );
};

export default Header;
