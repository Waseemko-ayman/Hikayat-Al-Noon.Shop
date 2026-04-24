import React from 'react';
import { FaSpinner } from 'react-icons/fa6';

const Loading = ({
  MainHightScreen,
  otherClassName,
  spinnerClassName,
  spinnerSize = 36,
  showText = true,
  loadingText = 'Loading fashion...',
}: {
  MainHightScreen?: boolean;
  otherClassName?: string;
  spinnerClassName?: string;
  spinnerSize?: number;
  showText?: boolean;
  loadingText?: string;
}) => {
  return (
    <div
      className={`flex items-center justify-center text-(--seconde-color) py-10 ${
        MainHightScreen ? 'min-h-screen' : ''
      } ${otherClassName}`}
    >
      <div
        className={`${
          showText ? 'flex flex-col items-center gap-4' : ''
        } animate-pulse`}
      >
        <FaSpinner
          className={`animate-spin text-(--forth-color) ${spinnerClassName}`}
          size={spinnerSize}
        />
        {showText && (
          <p className="text-lg font-medium tracking-widest">
            {loadingText ?? 'Loading...'}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
