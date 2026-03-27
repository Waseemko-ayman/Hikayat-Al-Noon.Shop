// CartTableSkeleton.tsx
'use client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CartTableSkeleton = () => {
  const headers = 7; // نفس عدد أعمدة الجدول
  const rows = 3; // عدد صفوف الـ Skeleton

  return (
    <div className="overflow-x-auto">
      <table className="text-center border-spacing-0 max-w-full w-full">
        <thead>
          <tr>
            {Array.from({ length: headers }).map((_, i) => (
              <th
                key={i}
                className="p-[15px] bg-(--forth-color) border border-[#2d2d2d80]"
              >
                <Skeleton className="w-20 h-6 mx-auto" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rIndex) => (
            <tr key={rIndex}>
              {Array.from({ length: headers }).map((_, cIndex) => (
                <td key={cIndex} className="p-[15px] border border-[#2d2d2d80]">
                  <Skeleton className="w-16 h-6 mx-auto" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTableSkeleton;
