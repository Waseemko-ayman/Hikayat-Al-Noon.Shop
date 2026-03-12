'use client';
import React from 'react';
import { motion } from 'framer-motion';

const SecondaryHeading = ({ title }: { title: string }) => {
  const StyledHeading = 'text-[17px] font-bold mb-3.5';
  return (
    <motion.h3
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className={StyledHeading}
    >
      {title}
    </motion.h3>
  );
};

export default SecondaryHeading;
