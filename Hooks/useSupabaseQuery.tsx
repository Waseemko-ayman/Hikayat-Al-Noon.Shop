/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import fetchSupabaseData from './useSupabaseClient';

export const useSupabaseQuery = (
  tableName: string,
  filters?: Record<string, any>,
  priceRange?: [number, number],
) => {
  return useQuery({
    // queryKey: This is the “identity name” of the request within the cache.
    // queryKey should include all parameters that affect the query result to ensure proper caching and refetching
    /**
     * So why did we start with "supabase" in the queryKey?
     * The main reason: Namespace (logical grouping)
     * Imagine cash as a tree:
      -- supabase
            ├── products
            │     ├── filters: {}
            │     ├── filters: {title:"shirt"}
            │
            ├── users
            │     ├── filters: {}
     * It's like saying: "All data coming from Supabase should be placed under this section."
     * ----------------------------------------------------
     * 🔥 Golden Rule :-
     * A queryKey must contain:
      - ✔ Data source (optional but good): Ex: ['supabase', .....]
      - ✔ Data type (tableName)
      - ✔ Everything that changes the result (filters, search, pagination)
     */
    queryKey: ['supabase', tableName, filters, priceRange],
    queryFn: () => fetchSupabaseData(tableName, filters, priceRange),
    staleTime: 1000 * 60,
  });
};
