'use client';
import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { FaAlignLeft } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import NavLinks from '../molecules/NavLinks';
import useIsMobile from '@/Hooks/useIsMobile';
import NavItemLink from '../molecules/NavItemLink';
import { navItems } from '@/data';
import Logo from '../atoms/Logo';
import Link from 'next/link';
import Image from 'next/image';
import { PATHS } from '@/data/paths';

export const FloatingNav = ({ className }: { className?: string }) => {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [disableHover, setDisableHover] = useState(false);
  const [isTop, setIsTop] = useState(true);

  const isMobile = useIsMobile(800);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const MobileNavbar = navItems.filter(
    (item) => item.name === 'Login' || item.name === 'Cart',
  );

  const StyledLinks = (itemName: string) =>
    `relative py-1 text-base font-semibold cursor-pointer transition duration-200 ${
      itemName === 'Cart'
        ? 'text-(--fifth-color)'
        : isMobile
          ? 'text-white'
          : 'text-(--fifth-color)'
    } hover:text-(--forth-color)`;

  // scroll show/hide (اختياري تبعك)
  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsTop(y < 50);

    if (y < 50) {
      setVisible(true);
    } else {
      const direction = y - scrollY.getPrevious()!;
      if (direction < 0) setVisible(true);
      else setVisible(false);
    }
  });

  const handleLinkClick = () => {
    if (isMobile) setOpen(false);
  };

  useEffect(() => {
    setDisableHover(true);
    setTimeout(() => setDisableHover(false), 500);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
          width: isMobile ? '95%' : isTop ? '100%' : '70vw',
          top: isTop ? 0 : 40,
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className={cn(
          'flex items-center justify-between fixed z-40 inset-x-0 mx-auto p-3 md:px-10 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] gap-4 transition-all duration-300 overflow-hidden',
          isMobile
            ? isTop
              ? 'w-full! rounded-none'
              : 'w-[95%]'
            : isTop
              ? 'w-full md:w-full rounded-none top-0'
              : '',
          className,
        )}
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          backgroundColor: 'rgba(238, 240, 243, 0.75)',
        }}
      >
        {isMobile ? (
          <Sheet open={open} onOpenChange={setOpen}>
            <div className="flex items-center justify-between w-full">
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
                    layout
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
                  <SheetTrigger name="dialog">
                    <FaAlignLeft
                      className={cn(
                        'text-2xl text-(--fifth-color) transition duration-200 cursor-pointer',
                        disableHover ? '' : 'hover:text-(--forth-color)',
                      )}
                    />
                  </SheetTrigger>
                </motion.div>
              </div>
            </div>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <NavLinks isMobile={isMobile} onLinkClick={handleLinkClick} />
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center justify-between w-full">
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
                  src="/assets/landing/noon-logo.webp"
                  alt="Hikayat Al-Noon"
                  width={75}
                  height={75}
                  className="w-[75px] h-[75px]"
                />
              </Link>
            </motion.div>
            <NavLinks />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
