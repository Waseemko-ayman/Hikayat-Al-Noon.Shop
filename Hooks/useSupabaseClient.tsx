/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '@/config/api';

const fetchSupabaseData = async (
  tableName: string,
  filters?: Record<string, any>,
  priceRange?: [number, number],
  page = 1,
  limit = 8,
) => {
  let supabaseRef = supabase.from(tableName).select('*', { count: 'exact' });

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // He says to Supabase: Give me the products from index X to Y only
  supabaseRef = supabaseRef.range(from, to);

  supabaseRef = supabaseRef.order('created_at', {
    ascending: false,
  });

  let orderColumn: string | null = null;
  let orderAscending = false;

  if (filters) {
    for (const [column, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        if (column === 'order') {
          orderColumn = value;
        } else if (column === 'ascending') {
          orderAscending = value;
        } else if (column === 'title') {
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

  if (orderColumn) {
    supabaseRef = supabaseRef.order(orderColumn, {
      ascending: orderAscending,
    });
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange;

    if (minPrice !== undefined)
      supabaseRef = supabaseRef.gte('price', minPrice);
    if (maxPrice !== undefined)
      supabaseRef = supabaseRef.lte('price', maxPrice);
  }

  const { data, error, count } = await supabaseRef;

  if (error) throw error;

  return { data, count };
};

export default fetchSupabaseData;
