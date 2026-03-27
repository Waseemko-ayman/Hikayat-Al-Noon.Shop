'use client';

import Button from '@/components/atoms/Button';
import React from 'react';
import Layer from '../atoms/Layer';
import { motion } from 'framer-motion';
import Container from '../atoms/Container';
import { RepairServicesProps } from '@/interfaces';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const RepairServicesComp = ({
  title,
  subTitle,
  description,
  bntText,
  bgImage,
  buttonHref,
  otherClassName = '',
  padding = true,
}: RepairServicesProps) => {
  return (
    <Layer
      otherClassName={cn(
        'relative min-h-[30vh] md:min-h-[45vh] text-center flex items-center justify-center',
        padding && 'pt-32! md:pt-40!',
        otherClassName,
      )}
    >
      <Image
        src={bgImage}
        alt={title || 'banner'}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[3px]"></div>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="font-bold"
        >
          {title && <h2 className="text-xl text-(--white-color)">{title}</h2>}
          {subTitle && (
            <h5 className="text-3xl md:text-5xl text-(--white-color) my-5">
              {subTitle}
            </h5>
          )}
          {description && (
            <p className="text-(--white-color) text-base font-normal my-5">
              {description}
            </p>
          )}
          {bntText && (
            <Button variant="secondary" href={buttonHref}>
              {bntText}
            </Button>
          )}
        </motion.div>
      </Container>
    </Layer>
  );
};

export default RepairServicesComp;
