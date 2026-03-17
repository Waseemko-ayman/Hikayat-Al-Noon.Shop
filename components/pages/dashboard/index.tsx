'use client';

import DashboardStats from '@/components/organism/DashboardStats';
import dynamic from 'next/dynamic';

const LineMultiple = dynamic(
  () => import('@/components/charts/line-multiple'),
  { ssr: false },
);
const VisitorsStats = dynamic(
  () => import('@/components/molecules/VisitorsStat'),
  { ssr: false },
);

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track visitor activity and performance insights
        </p>
      </div>
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 max-md:mb-7">
        <div className="md:col-span-2 lg:col-span-5 space-y-5 overflow-x-auto">
          <LineMultiple />
        </div>
        <div className="md:col-span-1 lg:col-span-2 space-y-4">
          {/* <GoalProgress /> */}
          <VisitorsStats />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
