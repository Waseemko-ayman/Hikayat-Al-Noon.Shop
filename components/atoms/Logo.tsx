import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { PATHS } from '@/data/paths';

export interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 60, className = '' }: LogoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 60, // It gives you smooth movement without annoying vibration
        damping: 12, // It gives you smooth movement without annoying vibration
        delay: 0.1,
      }}
      className={className}
    >
      <Link href={PATHS.HOME} aria-label="Go to home page">
        <Image
          src="/assets/landing/noon-logo.webp"
          alt="Hikayat Al-Noon"
          title="Hikayat Al-Noon"
          width={size}
          height={size}
        />
      </Link>
    </motion.div>
  );
};

export default Logo;
