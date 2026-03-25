'use client';
import React from 'react';

const PageTitle = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon?: React.ElementType;
}) => {
  return (
    <div className="flex items-center gap-2 bg-(--forth-color) text-white rounded-lg p-4 mb-6">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div>
        <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-white/80">{description}</p>
      </div>
    </div>
  );
};

export default PageTitle;
