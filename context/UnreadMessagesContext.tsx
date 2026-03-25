'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/config/api';

interface UnreadMessagesContextType {
  unreadCount: number;
  refreshUnread: () => void;
}

const UnreadMessagesContext = createContext<UnreadMessagesContextType>({
  unreadCount: 0,
  refreshUnread: () => {},
});

export const UnreadMessagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnread = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('id', { count: 'exact' })
      .eq('isRead', false);

    if (!error && data) setUnreadCount(data.length);
  };

  useEffect(() => {
    fetchUnread();

    // Realtime subscription
    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => {
          fetchUnread(); // كل تغيير يحدث يتم تحديث عدد الرسائل
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <UnreadMessagesContext.Provider
      value={{ unreadCount, refreshUnread: fetchUnread }}
    >
      {children}
    </UnreadMessagesContext.Provider>
  );
};

export const useUnreadMessages = () => useContext(UnreadMessagesContext);
