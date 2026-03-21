import React from 'react';
import CardWrapper from '../Template/CardWrapper';
import { ProvidersStatsCardProps } from '@/interfaces';

const ProvidersStatsCard = ({
  iconBgColor,
  Icon,
  name,
  value,
}: ProvidersStatsCardProps) => {
  return (
    <CardWrapper
      contentClassName="items-center! justify-start"
      flexVariant="row"
    >
      <div className={`${iconBgColor} p-3 rounded-full text-white text-xl`}>
        {Icon && <Icon />}
      </div>
      <div>
        <div className="text-sm text-muted-foreground">{name}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </CardWrapper>
  );
};

export default ProvidersStatsCard;
