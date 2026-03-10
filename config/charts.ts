import { ChartConfig } from '@/components/ui/chart';

export const chartColors = {
  chart1: 'var(--chart-1)',
  chart2: 'var(--chart-2)',
  chart3: 'var(--chart-3)',
};

export const VisitorsStatsChartConfig = {
  total_visitors: {
    label: 'Total Visitors',
    color: chartColors.chart1,
  },
  total_unique: {
    label: 'Total Unique Visitors',
    color: chartColors.chart2,
  },
  today_unique: {
    label: 'Today Unique Visitors',
    color: chartColors.chart3,
  },
} satisfies ChartConfig;

export const LineMultipleChartConfig = {
  visits: {
    label: 'Daily Visits',
    color: chartColors.chart1,
  },
  total_unique: {
    label: 'Total Unique Visitors',
    color: chartColors.chart2,
  },
  today_unique: {
    label: 'Today Unique Visitors',
    color: chartColors.chart3,
  },
} satisfies ChartConfig;
