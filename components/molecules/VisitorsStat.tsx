'use client';
import supabase from '@/config/api';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import CardHeaderContent from '../ui/display/CardHeader';

export function VisitorsStats() {
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);

  useEffect(() => {
    const fetchVisitors = async () => {
      const { data, error } = await supabase.rpc('get_visitors_stats');

      if (error || !data) return;

      setTodayVisitors(data.today_unique_visitors);
      setUniqueVisitors(data.unique_visitors);
    };

    fetchVisitors();
  }, []);

  return (
    <Card className="col-span-3">
      <CardHeaderContent
        title="Unique Visitors"
        description="Number of unique visitors today and in total"
      />
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between border-b border-b-gray-300 pb-2">
            <div className="text-sm font-medium">Today</div>
            <div className="font-bold">{todayVisitors}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">Total</div>
            <div className="font-bold">{uniqueVisitors}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
