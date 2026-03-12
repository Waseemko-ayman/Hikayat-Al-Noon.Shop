import supabase from '@/config/api';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useSession = (): Session | null => {
  const [session, setSession] = useState<Session | null>(null);

  const fetchSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data?.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return session;
};
