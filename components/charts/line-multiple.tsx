/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import supabase from '@/config/api';
import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import Loading from '../atoms/Loading';
import ButtonLoading from '../atoms/ButtonLoading';
import { LineMultipleChartConfig } from '@/config/charts';

export const LineMultiple = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<
    {
      day: string;
      visits: number;
      total_unique: number;
      today_unique: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data: visits } = await supabase.rpc('get_daily_visits');
      const { data: stats } = await supabase.rpc('get_visitors_stats');

      if (!visits) return;

      setChartData(
        visits.map((row: any) => ({
          day: new Date(row.day).toLocaleDateString('en-US', {
            year: '2-digit',
            month: 'short',
            day: 'numeric',
          }),
          // day: row.day,
          visits: row.visits,
          total_unique: stats?.unique_visitors ?? 0,
          today_unique: stats?.today_unique_visitors ?? 0,
        })),
      );
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Card>
      <div className="w-full h-full flex flex-col p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold">
            {LineMultipleChartConfig.visits.label} Over Time
          </h3>
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? 'Loading...'
              : `${chartData[0]?.day} - ${chartData[chartData.length - 1]?.day}`}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-0">
          {isLoading ? (
            <Loading loadingText="Loading chart..." otherClassName="py-5" />
          ) : (
            <ChartContainer
              className="w-full h-[250px]"
              config={LineMultipleChartConfig}
            >
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  interval={Math.ceil(chartData.length / 10) - 1} // ← هذا يفرض عرض كل tick
                  angle={-30}
                  textAnchor="end"
                  height={60} // زيادة المسافة لتظهر النصوص بالكامل
                />

                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={false}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="var(--color-visits)"
                  strokeWidth={2}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="total_unique"
                  stroke="var(--color-total_unique)"
                  strokeWidth={2}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="today_unique"
                  stroke="var(--color-today_unique)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          )}
        </div>
        <div className="flex flex-col gap-1 text-sm text-center mt-4">
          <div className="flex items-center justify-center gap-2 leading-none font-medium">
            {/* Percentage increase between today and the previous day */}
            {/* → We obtain the percentage change compared to the previous day (for example, if the last day was 60 and the previous day was 50: (60-50)/50 = 0.2). */}
            {isLoading
              ? 'Calculating trend...'
              : chartData.length > 1
                ? `Trending up by ${Math.round(((chartData[chartData.length - 1]?.visits - chartData[chartData.length - 2]?.visits) / chartData[chartData.length - 2]?.visits) * 100)}% this month`
                : 'No trend data available'}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground flex items-center justify-center gap-2 leading-none">
            Showing total visitors for the last{' '}
            {isLoading ? (
              <ButtonLoading borderColor="border-muted-foreground" />
            ) : (
              chartData.length
            )}{' '}
            days
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LineMultiple;
