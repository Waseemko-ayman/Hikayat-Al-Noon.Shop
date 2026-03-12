/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Card = React.memo(
  ({ card, index }: { card: any; index: number }) => {
    return (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="bg-(--white-color) max-w-full border border-[#cce7d0] py-6 px-4 shadow-[20px_20px_34px_rgba(0,0,0,0.03)] text-center hover:shadow-[10px_10px_54px_rgba(70,62,221,0.1)] hover:-translate-y-2 transition-all duration-200"
      >
        <Image
          src={card.image}
          alt="features"
          width={200}
          height={200}
          className="mb-3 md:w-full"
        />
        <span
          className={`block text-sm md:text-[12px] text-(--forth-color) p-2 rounded-sm font-semibold ${card.bgColor}`}
        >
          {card.title}
        </span>
      </motion.div>
    );
  },
);

Card.displayName = 'Card';

type Card = {
  id: number;
  title: string;
  image: string;
  bgColor: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5">
      {cards.map((card, index) => (
        <Card key={card.title} card={card} index={index} />
      ))}
    </div>
  );
}
