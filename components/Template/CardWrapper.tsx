import { CardWrapperProps } from '@/interfaces';
import React from 'react';

const CardWrapper = ({
  children,
  otherClassName,
  contentClassName,
  withFlex = true,
  flexVariant = 'responsive',
}: CardWrapperProps) => {
  const flexClasses =
    withFlex && flexVariant === 'responsive'
      ? 'flex items-start justify-between max-[426px]:flex-col max-[426px]:items-center max-[426px]:text-center'
      : withFlex && flexVariant === 'row'
        ? 'flex items-start justify-between'
        : '';

  return (
    <div
      className={`bg-white border border-(--seven-color) rounded-xl overflow-hidden hover:shadow-lg hover:border-(--forth-color)/30 transition-all duration-300 group ${otherClassName}`}
    >
      <div className={`${flexClasses} gap-4 p-5 ${contentClassName}`}>
        {children}
      </div>
      <div className="h-1 bg-gradient-to-r from-(--first-color) via-(--forth-color)/20 to-(--first-color)"></div>
    </div>
  );
};

export default CardWrapper;
