'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Button from '../atoms/Button';
import { FaArrowUp } from 'react-icons/fa6';

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Button
      variant="circle"
      handleClick={scrollToTop}
      otherClassName={cn(
        `fixed z-50 bottom-22 right-6 md:bottom-8 md:right-8 w-12 h-12 text-white p-4 shadow-lg hover:rotate-none! flex items-center justify-center bg-(--forth-color)! ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`,
      )}
      ariaLabel="Back To Top button"
    >
      <FaArrowUp className="text-lg" />
    </Button>
  );
};

export default FloatingButton;
