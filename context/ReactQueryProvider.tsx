'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  /**
   * Why useState?
   * Because you want the QueryClient to be created only once, not every time it's rendered.
   */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 minute, The data is considered "fresh" for one minute, during which time fetch is reused.
            refetchOnWindowFocus: false, // Disable refetch on window focus
            retry: 1, // Retry failed queries once, If the request fails: it will try again only once.
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
