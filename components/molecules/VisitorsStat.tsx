'use client';
import supabase from '@/config/api';
import { useEffect, useState } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Cell, Pie, PieChart } from 'recharts';
import { Card } from '../ui/card';
import CardHeaderContent from '../ui/display/CardHeader';
import { VisitorsStatsChartConfig } from '@/config/charts';

export function VisitorsStats() {
  const [chartData, setChartData] = useState<
    { name: string; value: number; fill: string }[]
  >([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      const { data, error } = await supabase.rpc('get_visitors_stats');
      if (error || !data) return;

      setChartData([
        {
          name: 'Total Visitors',
          value: data.total_visits ?? 0,
          fill: 'var(--chart-1)',
        },
        {
          name: 'Total Unique Visitors',
          value: data.unique_visitors ?? 0,
          fill: 'var(--chart-2)',
        },
        {
          name: 'Today Unique Visitors',
          value: data.today_unique_visitors ?? 0,
          fill: 'var(--chart-3)',
        },
      ]);
    };

    fetchVisitors();
  }, []);

  return (
    <Card className="col-span-3">
      <CardHeaderContent
        title="Unique Visitors"
        description="Number of unique visitors today and in total"
      />
      <ChartContainer
        config={VisitorsStatsChartConfig}
        className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartData} dataKey="value" nameKey="name" label>
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={
                  VisitorsStatsChartConfig[
                    entry.name === 'Today Unique Visitors'
                      ? 'today_unique'
                      : entry.name === 'Total Unique Visitors'
                        ? 'total_unique'
                        : 'total_visitors'
                  ].color
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </Card>
  );
}
