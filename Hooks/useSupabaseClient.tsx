/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/config/api';
import { useEffect, useState } from 'react';

export default function useSupabaseClient(
  tableName: string,
  filters?: Record<string, any>,
  priceRange?: [number, number],
) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let supabaseRef = supabase.from(tableName).select('*');
      if (filters) {
        for (const [column, value] of Object.entries(filters)) {
          if (value !== undefined && value !== null) {
            if (column === 'title') {
              // ilike: It performs case-insensitive text search.
              // %: It will return all products where the text is part of the title; without it, it will only return the title that matches the text completely.
              supabaseRef = supabaseRef.ilike(column, `%${value}%`);
            } else if (column === 'message') {
              supabaseRef = supabaseRef.or(
                `username.ilike.%${value}%,email.ilike.%${value}%,subject.ilike.%${value}%,message.ilike.%${value}%`,
              );
            } else if (column === 'discount' && value === true) {
              supabaseRef = supabaseRef.gt('discount', 0); // .gt: Greater than ex: 0
            } else if (column === 'rating_avg' && value === true) {
              // Uses `order()` for sorting.
              supabaseRef = supabaseRef.order('rating_avg', {
                ascending: false, // From largest to smallest
              });
            } else if (column === 'price') {
              supabaseRef = supabaseRef.order('price', {
                ascending: value,
              });
            } else {
              supabaseRef = supabaseRef.eq(column, value);
            }
          }
        }
      }

      // Price filtering
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange;
        if (minPrice !== undefined)
          supabaseRef = supabaseRef.gte('price', minPrice); // أكبر أو يساوي

        if (maxPrice !== undefined)
          supabaseRef = supabaseRef.lte('price', maxPrice); // أقل أو يساوي
      }

      const { data } = await supabaseRef;
      setData(data);
      setIsLoading(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : String(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tableName === 'profiles' && !filters?.id) return;
    fetchData();

    // Use JSON.stringify to compare object values instead of references.
    // Prevents unnecessary reruns when the object is recreated with same data.
  }, [tableName, JSON.stringify(filters), JSON.stringify(priceRange)]);

  const insertData = async (newRow: Record<string, any>) => {
    setIsLoading(true);
    try {
      const { data: insertedData, error } = await supabase
        .from(tableName)
        .insert([newRow]);

      if (error) throw error;

      setData((prev: any) =>
        prev ? [...prev, ...(insertedData ?? [])] : insertedData,
      );

      setIsLoading(false);
      return insertedData;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : String(error));
      setIsLoading(false);
      return null;
    }
  };

  return { data, error, isLoading, insertData, refetch: fetchData };
}
