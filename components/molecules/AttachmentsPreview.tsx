// AttachmentsUploader.tsx
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { FaX } from 'react-icons/fa6';
import { FiUploadCloud } from 'react-icons/fi';
import Button from '../atoms/Button';
import { AttachmentsUploaderProps } from '@/interfaces';

const AttachmentsUploader = ({
  value = [], // upload => File | edit => string
  onChange, // upload => File | edit => string
}: AttachmentsUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    onChange([...value, ...newFiles]);
  };

  const removeAttachment = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const renderUploadTrigger = () => {
    return (
      <div
        className="w-full bg-[#f7f9fa] border border-gray-200 p-6 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <FiUploadCloud className="mx-auto text-4xl text-black mb-4" />
        <p className="text-sm font-bold text-black select-none">
          Upload Gallery Images
        </p>
      </div>
    );
  };

  const getImageSrc = (item: File | string) => {
    if (typeof item === 'string') return item;
    return URL.createObjectURL(item);
  };

  return (
    <>
      {renderUploadTrigger()}

      <input
        type="file"
        ref={fileInputRef}
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {value.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {value.map((file, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-sm group"
            >
              <Image
                src={getImageSrc(file)}
                alt="attachment"
                width={100}
                height={100}
              />
              <Button
                type="button"
                variant="circle"
                aria-label="Remove attachment"
                handleClick={() => removeAttachment(index)}
                otherClassName="absolute top-0 right-0 !bg-red-500 text-white !w-6 !h-6 flex items-center justify-center hover:!bg-red-500"
              >
                <FaX />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AttachmentsUploader;
