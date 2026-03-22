'use client';

import Container from '@/components/atoms/Container';
import Layer from '@/components/atoms/Layer';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const KnowUs = () => {
  return (
    <Layer>
      <Container>
        <div className="flex items-center justify-center gap-8 mb-[60px] max-[992px]:flex-wrap max-[992px]:text-center">
          <motion.img
            src="/assets/about/a1.webp"
            alt="about img"
            className="max-w-full w-[550px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-[46px] text-(--fifth-color) font-bold">
              Who We Are?
            </h2>
            <p className="text-(--six-color) text-base leading-normal mt-3 mb-4">
              At Wénor Shop, we create stylish and modern clothing collections
              that combine quality and comfort. Our mission is to provide unique
              fashion pieces that make you feel confident and trendy every day.
              We focus on creativity, sustainability, and delivering an
              exceptional shopping experience for our customers.
            </p>
            <abbr className="leading-normal">
              Discover stunning designs and collections at Wénor Shop, crafted
              with care and attention to detail to suit your style and
              personality.
            </abbr>
          </motion.div>
        </div>
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-(--fifth-color) text-[50px] font-bold mb-6"
          >
            Download Our{' '}
            <Link
              href="#"
              className="underline text-(--purple-color)"
              target="_blank"
            >
              App
            </Link>
          </motion.h1>
          <motion.video
            autoPlay
            loop
            muted
            className="max-w-full w-fit m-auto rounded-[20px] min-[992px]:h-[600px] max-md:h-[250px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <source src="/assets/about/video.mp4" type="video/mp4" />
          </motion.video>
        </div>
      </Container>
    </Layer>
  );
};

export default KnowUs;
