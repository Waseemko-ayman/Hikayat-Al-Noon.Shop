'use client';
import { useEffect, useState } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Cell, Pie, PieChart } from 'recharts';
import { Card } from '../ui/card';
import CardHeaderContent from '../ui/display/CardHeader';
import { VisitorsStatsChartConfig } from '@/config/charts';
import useAPI from '@/Hooks/useAPI';
import { VisitorsStatsProps } from '@/interfaces';

const VisitorsStats = () => {
  const { data, get } = useAPI<VisitorsStatsProps>('get_visitors_stats', true);

  const [chartData, setChartData] = useState<
    { name: string; value: number; fill: string }[]
  >([]);

  useEffect(() => {
    if (!data) return;
    setChartData([
      {
        name: 'Total Visitors',
        value: (data as unknown as VisitorsStatsProps)?.total_visits ?? 0,
        fill: 'var(--chart-1)',
      },
      {
        name: 'Total Unique Visitors',
        value: (data as unknown as VisitorsStatsProps)?.unique_visitors ?? 0,
        fill: 'var(--chart-2)',
      },
      {
        name: 'Today Unique Visitors',
        value:
          (data as unknown as VisitorsStatsProps)?.today_unique_visitors ?? 0,
        fill: 'var(--chart-3)',
      },
    ]);
  }, [data]);

  useEffect(() => {
    get();
  }, [get]);

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
};

export default VisitorsStats;
