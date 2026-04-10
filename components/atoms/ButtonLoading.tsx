import React from 'react';

const ButtonLoading = ({
  borderColor = 'border-white',
  otherClassName,
  text,
}: {
  borderColor?: string;
  otherClassName?: string;
  text?: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <span
        className={`animate-spin border-2 ${borderColor} border-t-transparent rounded-full w-4 h-4 inline-block ${otherClassName}`}
      />
      {text && <span>{text}</span>}
    </div>
  );
};

export default ButtonLoading;
