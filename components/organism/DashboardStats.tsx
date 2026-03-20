'use client';

import StatsCard from '@/components/molecules/StatsCard';
import { useEffect } from 'react';
import { FaChartLine, FaUsers, FaCalendarDay } from 'react-icons/fa';
import StatsCardSkeleton from '../Skeletons/StatsCardSkeleton';
import useAPI from '@/Hooks/useAPI';
import { VisitorsStatsProps } from '@/interfaces';

const DashboardStats = () => {
  const { data, get, isLoading } = useAPI<VisitorsStatsProps>(
    'get_visitors_stats',
    true,
  );

  const items = [
    {
      name: 'Total Visitors',
      value: (data as unknown as VisitorsStatsProps)?.total_visits ?? 0,
      fill: 'var(--chart-1)',
      icon: FaChartLine,
    },
    {
      name: 'Total Unique Visitors',
      value: (data as unknown as VisitorsStatsProps)?.unique_visitors ?? 0,
      fill: 'var(--chart-2)',
      icon: FaUsers,
    },
    {
      name: 'Today Unique Visitors',
      value:
        (data as unknown as VisitorsStatsProps)?.today_unique_visitors ?? 0,
      fill: 'var(--chart-3)',
      icon: FaCalendarDay,
    },
  ];

  useEffect(() => {
    get();
  }, [get]);

  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3">
      {isLoading || items.length === 0
        ? Array.from({ length: 3 }).map((_, i) => <StatsCardSkeleton key={i} />)
        : items.map((stat, index) => (
            <div key={stat.name} className="min-w-[250px]">
              <StatsCard
                key={index}
                title={stat.name}
                value={stat.value}
                icon={stat.icon}
              />
            </div>
          ))}
    </div>
  );
};

export default DashboardStats;
