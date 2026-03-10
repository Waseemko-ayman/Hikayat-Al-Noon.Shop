'use client';
import LineMultiple from '@/components/charts/line-multiple';
import { VisitorsStats } from '@/components/molecules/VisitorsStat';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Welcome to your order management orders
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-2 lg:col-span-5 space-y-5">
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
