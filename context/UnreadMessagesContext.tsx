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
      .select('id', { count: 'exact' }) // نحتاج فقط العدد، مش البيانات نفسها
      .eq('isRead', false);

    if (!error && data) setUnreadCount(data.length);
  };

  useEffect(() => {
    fetchUnread(); // عند تحميل الـ Provider لأول مرة، نجيب العدد الحالي

    // === إعداد الاستماع للوقت الحقيقي ===
    const subscription = supabase
      .channel('public:messages') // إنشاء قناة للاستماع للجدول
      // on(): تحدد نوع الأحداث اللي بدنا نسمعها
      .on(
        'postgres_changes', // نوع الأحداث: أي تغيير في قاعدة البيانات
        { event: '*', schema: 'public', table: 'messages' }, // جميع الأحداث على جدول messages
        () => {
          fetchUnread(); // كل تغيير يحصل، نحدث عدد الرسائل غير المقروءة تلقائيًا
        },
      )
      .subscribe(); // تفعيل الاشتراك فعليًا

    // تنظيف الاشتراك عند إزالة المكون لتجنب تسرب الذاكرة
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
