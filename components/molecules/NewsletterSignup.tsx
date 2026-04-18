/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import Container from '../atoms/Container';
import Layer from '../atoms/Layer';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { motion } from 'framer-motion';
import { useToast } from '@/lib/toast';
import useAPI from '@/Hooks/useAPI';
import ButtonLoading from '../atoms/ButtonLoading';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  // Notifications
  const { showToast } = useToast();

  // Hooks
  const { add, isLoading } = useAPI('newsletter_subscribers');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await add({ email });
      showToast('🎉 Successfully subscribed!');
      setEmail('');
    } catch (error: any) {
      console.error('Error sending data to Database:', error);
      showToast(error?.message || 'Subscription faild!', 'error');
    }
  };
  return (
    <Layer otherClassName="overflow-hidden min-h-[25vh] flex relative bg-(--forth-color) before:content-[''] before:absolute before:top-0 before:right-[-60px] before:md:right-[-50px] before:w-[50%] before:h-full before:bg-[#054c48] before:skew-x-[20deg]">
      <Container otherClassName="w-full flex flex-col items-center justify-center lg:flex-row lg:justify-between gap-2.5">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-start"
        >
          <h2 className="text-(--white-color) text-3xl font-bold">
            Sign Up For Newsletters
          </h2>
          <p className="text-white/90 text-base">
            Get E-mail updates about our latest shop and{' '}
            <span className="text-(--third-color)">special offers</span>
          </p>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          onSubmit={onSubmit}
          className="max-w-full flex flex-col "
        >
          <div className="flex items-center flex-col sm:flex-row gap-2.5 sm:gap-0 justify-center">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              inputName="email"
              placeholder="Your email address"
              variant="secondary"
              otherClassName="max-sm:rounded-none"
              required
            />
            <Button
              variant="primary"
              borderRadius="rounded-none sm:rounded-l-none sm:rounded-r-md"
              otherClassName="w-full hover:bg-(--forth-color)! max-md:border max-md:border-white"
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoading text="Sign up..." /> : 'Sign up'}
            </Button>
          </div>
        </motion.form>
      </Container>
    </Layer>
  );
};

export default NewsletterSignup;
