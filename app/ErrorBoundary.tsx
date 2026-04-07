/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Button from '@/components/atoms/Button';
import Image from 'next/image';
import React, { Component } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  handleClick = () => {
    location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative z-[6500] text-center flex items-center justify-center bg-[#f8f9ff] w-full h-screen">
          <div>
            <Image
              src="/assets/disconnected.png"
              alt="Service error - Cloud offline"
              title="Oops! Something went wrong. Please try again."
              className="mx-auto animate-zoom"
              width={150}
              height={150}
            />
            <h2 className="text-center text-lg md:text-xl lg:text-2xl mt-5 mb-2">
              Oops! Something Went Wrong
            </h2>
            <Button
              handleClick={this.handleClick}
              Icon={FaArrowsRotate}
              otherClassName="py-2 px-8 mx-auto"
            >
              Try Reloading the Page
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
