'use client';

import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import React from 'react';
import { motion } from 'framer-motion';

const AboutDeveloper = () => {
  return (
    <Layer>
      <Container otherClassName="overflow-x-hidden">
        <div className="flex items-center justify-center gap-10 max-[992px]:flex-col max-[992px]:text-center">
          {/* Developer Image */}
          <motion.img
            src="/assets/about/the-developer.jpg"
            alt="Developer"
            className="w-full max-w-[550px] rounded-lg shadow-lg order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          />

          {/* Developer Info */}
          <motion.div
            className="max-w-lg order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-sm font-medium tracking-wider text-(--forth-color) uppercase mb-2">
              About the Developer
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance mb-4">
              Hello, I&apos;m the creator behind Hikayat Al-Noon
            </h2>
            <p className="text-(--six-color) text-base leading-relaxed mb-3">
              At Hikayat Al-Noon, we create stylish and modern clothing
              collections that combine quality and comfort. Our mission is to
              provide unique fashion pieces that make you feel confident and
              trendy every day. We focus on creativity, sustainability, and
              delivering an exceptional shopping experience for our customers.
            </p>
            <p className="text-(--six-color) text-base leading-relaxed font-medium">
              Discover stunning designs and collections at Hikayat Al-Noon,
              crafted with care and attention to detail to suit your style and
              personality.
            </p>
          </motion.div>
        </div>
      </Container>
    </Layer>
  );
};

export default AboutDeveloper;
