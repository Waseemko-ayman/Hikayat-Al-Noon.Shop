'use client';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import useAPI from '@/Hooks/useAPI';
import { useEffect } from 'react';
import ProvidersStatsCard from '../molecules/ProvidersStatsCard';
import StatsCardSkeleton from '../Skeletons/StatsCardSkeleton';
import { AuthProvidersStatsProps } from '@/interfaces';

const AuthProvidersStats = () => {
  const { data, get, isLoading } =
    useAPI<AuthProvidersStatsProps>('auth.providers');

  const stats = (data as unknown as AuthProvidersStatsProps)?.stats ?? {
    email: 0,
    phone: 0,
    email_phone: 0,
  };

  const items = [
    {
      name: 'Email',
      value: stats.email,
      icon: FaEnvelope,
      color: 'bg-blue-500',
    },
    {
      name: 'Phone',
      value: stats.phone,
      icon: FaPhone,
      color: 'bg-green-500',
    },
    {
      name: 'Email & Phone',
      value: stats.email_phone,
      icon: FaUser,
      color: 'bg-purple-500',
    },
  ];

  useEffect(() => {
    get();
  }, [get]);

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-xl font-bold">Auth Providers Stats</h2>
        <p className="text-muted-foreground text-sm">
          Overview of users grouped by authentication method
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <StatsCardSkeleton key={i} />
            ))
          : items.map((item) => (
              <ProvidersStatsCard
                key={item.name}
                iconBgColor={item.color}
                Icon={item.icon}
                name={item.name}
                value={item.value}
              />
            ))}
      </div>
    </div>
  );
};

export default AuthProvidersStats;
