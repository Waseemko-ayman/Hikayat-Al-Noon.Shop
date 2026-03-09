'use client';
import { useEffect, useRef } from 'react';
import supabase from '@/config/api';
import { usePathname } from 'next/navigation';

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * This is a flag to indicate if we've already recorded the visit.
   * The `useRef` function remains constant between renders, without causing the `useEffect` to be re-executed.
   */
  const tracked = useRef<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const recordVisit = async () => {
      /**
       * If the visit has already been recorded (tracked.current = pathname) → Stop execution.
       * If it has not yet been recorded → Set tracked.current = true and continue recording the visit.
       */
      if (tracked.current === pathname) return;
      tracked.current = pathname;

      const { data: authData } = await supabase.auth.getUser();
      const userId = authData?.user?.id || null;

      let visitorId = sessionStorage.getItem('visitor_id');
      if (!visitorId) {
        // This is the first entry in this tab.
        /**
         * Case 1: Unregistered visitor who has visited the site previously:
         * -- localStorage.getItem('visitor_id') => We use the same old visitor_id so that the visitor remains the same.
         * Case 2: New Visitor: crypto.randomUUID() => We create a new ID
         */
        visitorId = localStorage.getItem('visitor_id') || crypto.randomUUID();

        // Goal: The same tab will use the same visitor_id throughout the session.
        sessionStorage.setItem('visitor_id', visitorId);

        /**
         * For unregistered users
         * Therefore, an unregistered visitor will remain the same person upon returning to the site.
         */
        localStorage.setItem('visitor_id', visitorId);
      }

      // Prevent recording visits too frequently
      /**
       * This means a new visit will only be recorded after 10 seconds.
        Results: 
        --- Prevents dozens of visits from being recorded when quickly navigating between pages.
        --- Reduces the load on the Supabase database.
        --- Makes the statistics more realistic.
       */
      const lastVisit = sessionStorage.getItem(`last_visit_${pathname}`);
      const now = Date.now();

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (!lastVisit || now - Number(lastVisit) > 2000) {
        sessionStorage.setItem(`last_visit_${pathname}`, now.toString());

        if (profile?.role === 'ADMIN') return;
        
        // Calling the API route instead of the front end directly
        await fetch('/api/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: pathname, userId, visitorId }),
        });
      }
    };

    recordVisit();
  }, [pathname]);

  return <>{children}</>;
}
