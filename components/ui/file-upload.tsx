/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { IconUpload } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

export const FileUpload = ({
  onChange,
  value,
  text,
}: {
  onChange: (files: File[]) => void;
  value?: File | string | null | any;
  text?: string;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isFile = value instanceof File;

  const fileName = isFile
    ? value.name
    : preview?.split('/').pop() || 'Current Image';

  const fileSize = isFile
    ? (value.size / (1024 * 1024)).toFixed(2) + ' MB'
    : 'N/A';

  const fileType = isFile
    ? value.type
    : fileName.includes('.')
      ? `image/${fileName.split('.').pop()}`
      : 'N/A';

  const fileModified = isFile
    ? new Date(value.lastModified).toLocaleDateString()
    : 'N/A';

  const handleFileChange = (newFiles: File[]) => {
    const selectedFile = newFiles[0] ?? null;
    if (onChange) {
      onChange(selectedFile ? [selectedFile] : []);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => console.log(error),
  });

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    // The value is a file from the user.
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);

      // This is a cleanup; it removes the temporary link from memory when a file or component changes or is decompiled, to prevent memory leakage.
      return () => URL.revokeObjectURL(url);
    } else {
      // If value is a pre-existing link (string URL, as in the case of edit)
      setPreview(value);
    }
  }, [value]);

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        className="group/file block cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full">
            {preview ? (
              <motion.div
                layoutId="file-upload"
                className={cn(
                  'relative overflow-hidden w-full min-w-0 border border-(--seven-color) z-40 bg-white flex flex-col md:flex-row items-start md:items-center gap-3 p-4 rounded-md shadow-sm',
                )}
              >
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex justify-between w-full items-center gap-4">
                    <p className="text-base text-neutral-700 truncate max-w-[200px]">
                      {fileName}
                    </p>
                    <p className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 shadow-input">
                      {fileSize}
                    </p>
                  </div>
                  <div className="flex text-sm items-start md:items-center w-full mt-2 justify-between text-neutral-600">
                    <p className="px-2 py-1 rounded-md bg-gray-100">
                      {fileType}
                    </p>
                    <p>modified {fileModified}</p>
                  </div>
                </div>
                <div className="group relative w-full md:w-[90px] h-[150px] md:h-[90px] shrink-0 overflow-hidden rounded-md border border-(--seven-color)">
                  <Image
                    src={preview}
                    alt="preview"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'relative z-40 bg-white border border-dashed border-(--seven-color) dark:bg-neutral-900 flex items-center justify-center h-12 w-full',
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600" />
                  </motion.p>
                ) : (
                  <div className="flex flex-cols items-center justify-center gap-3">
                    <ImagePlus size={24} />
                    <div className="text-(--text-secondary) space-y-2">
                      <p className="font-medium">{text}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
