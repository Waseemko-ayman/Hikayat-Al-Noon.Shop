import { useQuery } from '@tanstack/react-query';
import supabase from '@/config/api';

export const useOrderStatus = (orderId?: string | number | null) => {
  return useQuery({
    queryKey: ['order-status', orderId],
    enabled: !!orderId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, status')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 30, // 30s كاش
  });
};
