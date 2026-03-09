'use client';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { VisitorsStats } from '@/components/molecules/VisitorsStat';

const data = [
  {
    name: 'A',
    uv: 400,
    pv: 240,
    amt: 2400,
  },
  {
    name: 'B',
    uv: 300,
    pv: 456,
    amt: 2400,
  },
  {
    name: 'C',
    uv: 300,
    pv: 139,
    amt: 2400,
  },
  {
    name: 'D',
    uv: 200,
    pv: 980,
    amt: 2400,
  },
  {
    name: 'E',
    uv: 278,
    pv: 390,
    amt: 2400,
  },
  {
    name: 'F',
    uv: 189,
    pv: 480,
    amt: 2400,
  },
];

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
          <LineChart
            style={{
              width: '100%',
              aspectRatio: 1.618,
              maxWidth: 800,
              margin: 'auto',
            }}
            responsive
            data={data}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            <RechartsDevtools />
          </LineChart>
          {/* <OrderChart
            startDate={startDate}
            endDate={endDate}
            activeTab={activeTab}
            dateData={dateData}
            setActiveTab={setActiveTab}
            addLoading={addLoading}
          /> */}
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
