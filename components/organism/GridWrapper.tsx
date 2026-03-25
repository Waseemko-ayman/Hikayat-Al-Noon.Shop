import { GridWrapperProps } from '@/interfaces';
import { cn } from '@/lib/utils';
import React from 'react';

const GridWrapper = ({
  children,
  otherClassName,
  isScrollable = false,
  gridCols = 'lg:grid-cols-4',
  itemClassName = '',
  disableGridOnMd = false,
}: GridWrapperProps) => {
  // If isScrollable and disableGridOnMd are true, we use flex without grid on md and above
  const baseClass = isScrollable
    ? disableGridOnMd
      ? `flex overflow-x-auto scroll-smooth px-2 py-4 scrollbar-none ${otherClassName ?? ''}`
      : `flex max-md:overflow-x-auto max-md:scroll-smooth max-md:px-4 py-4 scrollbar-none md:grid md:grid-cols-3 ${gridCols} ${otherClassName ?? ''}`
    : `grid sm:grid-cols-2 md:grid-cols-3 ${gridCols} ${otherClassName ?? ''}`;

  return (
    <div className={cn('gap-5', baseClass, otherClassName ?? '')}>
      {isScrollable
        ? React.Children.map(children, (child) => (
            <div className={`max-md:min-w-[200px] shrink-0 ${itemClassName}`}>
              {child}
            </div>
          ))
        : children}
    </div>
  );
};

export default GridWrapper;
