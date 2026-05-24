'use client';
import React from 'react';
import { Check, Lock } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { StatusPasswordProps } from '@/interfaces';

const StatusPassword: React.FC<StatusPasswordProps> = ({
  title,
  description,
  icon,
  iconBgColor = '#dcfce7',
  iconColor = '#16a34a',
  linkText,
  linkHref,
  infoText,
  gradientFrom = 'var(--forth-color)',
  gradientTo = 'var(--seven-color)',
}) => {
  const IconComponent = icon === 'check' ? Check : Lock;

  return (
    <div className="w-full max-w-md bg-(--first-color) rounded-xl relative z-10 shadow-2xl border-0 overflow-hidden">
      <div className="p-8 text-center bg-white">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
          style={{ backgroundColor: iconBgColor }}
        >
          <IconComponent className="w-8 h-8" style={{ color: iconColor }} />
        </div>

        <h2 className="text-2xl font-bold mb-2 text-(--fifth-color)">
          {title}
        </h2>
        <p className="mb-8 text-(--six-color)">{description}</p>

        {linkText && linkHref && (
          <Button otherClassName="w-full" href={linkHref}>
            {linkText}
          </Button>
        )}

        {infoText && (
          <div className="mt-6 p-4 rounded-lg bg-[#f0f9ff] border border-[#bae6fd]">
            <p className="text-xs text-[#075985]">{infoText}</p>
          </div>
        )}
      </div>

      <div
        className="h-2"
        style={{
          background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
        }}
      ></div>
    </div>
  );
};

export default StatusPassword;
