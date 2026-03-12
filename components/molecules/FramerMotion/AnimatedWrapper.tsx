'use client';
// import { useToggleLocale } from '@/hook/useToggleLocale';
import { AnimatedWrapperProps } from '@/interfaces';
import { motion, Variants, Transition, easeOut } from 'framer-motion';
import React from 'react';

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  custom = 0,
  variants,
  direction = 'y',
  distance = 40,
  duration = 0.7,
}) => {
  // const { isArabic } = useToggleLocale();

  const localizedDistance =
    direction === 'x' ? -distance : distance;

  const dynamicVariants: Variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'x' ? { x: localizedDistance } : { y: distance }),
    },
    visible: (i: number) => ({
      opacity: 1,
      ...(direction === 'x' ? { x: 0 } : { y: 0 }),
      transition: {
        delay: i * 0.1,
        duration,
        ease: easeOut,
      } as Transition,
    }),
  };

  return (
    <motion.div
      style={{ overflow: 'visible', willChange: 'transform' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants ?? dynamicVariants}
      custom={custom}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
