import MainDashboardLayout from '@/components/organism/Layouts/MainDashboardLayout';
import { UnreadMessagesProvider } from '@/context/UnreadMessagesContext';
import type React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UnreadMessagesProvider>
      <MainDashboardLayout>{children}</MainDashboardLayout>
    </UnreadMessagesProvider>
  );
}
