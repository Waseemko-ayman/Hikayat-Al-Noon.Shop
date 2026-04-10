/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/config/api';

const fetchSupabaseData = async (
  tableName: string,
  filters?: Record<string, any>,
  priceRange?: [number, number],
) => {
  let supabaseRef = supabase.from(tableName).select('*');

  if (filters) {
    for (const [column, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        if (column === 'title') {
          supabaseRef = supabaseRef.ilike(column, `%${value}%`);
        } else if (column === 'message') {
          supabaseRef = supabaseRef.or(
            `username.ilike.%${value}%,email.ilike.%${value}%,subject.ilike.%${value}%,message.ilike.%${value}%`,
          );
        } else if (column === 'discount' && value === true) {
          supabaseRef = supabaseRef.gt('discount', 0);
        } else if (column === 'rating_avg' && value === true) {
          supabaseRef = supabaseRef.order('rating_avg', {
            ascending: false,
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

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange;

    if (minPrice !== undefined)
      supabaseRef = supabaseRef.gte('price', minPrice);
    if (maxPrice !== undefined)
      supabaseRef = supabaseRef.lte('price', maxPrice);
  }

  const { data, error } = await supabaseRef;

  if (error) throw error;

  return data;
};

export default fetchSupabaseData;
