'use client';
import useAPI from '@/Hooks/useAPI';
import { useEffect } from 'react';
import ProvidersStatsCard from '../molecules/ProvidersStatsCard';
import StatsCardSkeleton from '../Skeletons/StatsCardSkeleton';
import { AuthProvidersStatsProps } from '@/interfaces';
import { AuthProvidersStatsItems } from '@/data';

const AuthProvidersStats = () => {
  const { data, get, isLoading } =
    useAPI<AuthProvidersStatsProps>('auth.providers');

  const stats = (data as unknown as AuthProvidersStatsProps)?.stats ?? {
    email: 0,
    phone: 0,
    email_phone: 0,
  };

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

      <div className="flex gap-4 overflow-x-auto scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <StatsCardSkeleton key={i} />
            ))
          : AuthProvidersStatsItems(stats).map((item) => (
              <div key={item.name} className="min-w-[250px]">
                <ProvidersStatsCard
                  iconBgColor={item.color}
                  Icon={item.icon}
                  name={item.name}
                  value={item.value}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default AuthProvidersStats;
