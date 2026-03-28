import MainLayout from '@/components/organism/Layouts/MainLayout';
import React, { ReactNode } from 'react';

const MainAppLayout = ({ children }: { children: ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default MainAppLayout;
