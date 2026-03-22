'use client';
import React from 'react';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import { PATHS } from '@/data/paths';
import { BackgroundLines } from '@/components/ui/background-lines';
import { LayoutTextFlip } from '@/components/ui/layout-text-flip';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();

  // عامل تباطؤ (weight)
  const yTitle = useTransform(scrollY, [0, 800], [0, 160]);
  const yHeading = useTransform(scrollY, [0, 800], [0, 140]);
  const yText = useTransform(scrollY, [0, 800], [0, 120]);
  const yButton = useTransform(scrollY, [0, 800], [0, 100]);

  return (
    <BackgroundLines>
      <div className="min-h-[80vh] relative flex item-center justify-center w-full flex-col">
        <Container otherClassName="text-center z-10 max-sm:text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div
              style={{ y: yTitle }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-(--forth-color)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LayoutTextFlip
                text="Wénor "
                words={['Collection', 'Style', 'Fashion', 'Vibe']}
              />
            </motion.div>

            <motion.h1
              style={{ y: yHeading }}
              className="py-4 text-3xl md:text-4xl lg:text-5xl xl:text-7xl text-(--fifth-color) font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Define your look <br />
              <span className="text-(--forth-color)">
                Wear confidence every day
              </span>
            </motion.h1>

            <motion.p
              style={{ y: yText }}
              className="text-base text-(--seconde-color)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Modern fashion designed for simplicity, comfort, and timeless
              style.
            </motion.p>

            <motion.div
              style={{ y: yButton }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                href={PATHS.SHOP.ROOT}
                variant="cover"
                otherClassName="mt-4 inline-block"
              >
                Shop Now
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </BackgroundLines>
  );
};

export default Hero;
