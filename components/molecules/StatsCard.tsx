import { StatsCardProps } from '@/interfaces';
import React from 'react';
import CardWrapper from '../Template/CardWrapper';

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  const Icon = icon;
  return (
    <CardWrapper contentClassName="items-center! justify-start" flexVariant="row">
      {icon && <Icon className="text-orange-500" size={23} />}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </CardWrapper>
  );
};

export default StatsCard;
