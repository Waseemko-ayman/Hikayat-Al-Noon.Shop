/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import Image from 'next/image';
import Button from '../atoms/Button';

const ErrorFetching = ({ error }: { error?: any }) => {
  const handleClick = () => {
    location.reload();
  };

  return (
    <div className="text-center px-3 pb-10 mt-10 relative z-20">
      <Image
        src="/assets/disconnected.png"
        alt="Cloud with a lightning bolt"
        title="Cloud with a lightning bolt"
        className="mx-auto animate-zoom"
        width={128}
        height={128}
      />
      <h2 className="text-center text-lg md:text-xl lg:text-xl mt-4 mb-2">
        {error?.response?.message || 'Sorry! Something went wrong.'}
      </h2>
      <Button
        handleClick={handleClick}
        Icon={FaArrowsRotate}
        otherClassName="py-2 px-5 mx-auto text-base"
      >
        Let&apos;s Try Again
      </Button>
    </div>
  );
};

export default ErrorFetching;
