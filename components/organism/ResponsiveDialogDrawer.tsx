'use client';

import React from 'react';
import CustomDrawer from '../molecules/CustomDrawer';
import CustomDialog from '../molecules/CustomDialog';
import { ResponsiveDialogDrawerProps } from '@/interfaces';

const ResponsiveDialogDrawer: React.FC<ResponsiveDialogDrawerProps> = ({
  open,
  setOpen,
  trigger,
  children,
  contentClassName,
  isMobile,
  showLastTwo,
}) => {
  const Component = isMobile ? CustomDrawer : CustomDialog;

  const title = 'Hikayat Al-Noon';
  const description = 'Hikayat Al-Noon – Your style, your way';

  return (
    <Component
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      title={title}
      description={description}
      contentClassName={contentClassName}
      headerClassName="p-0"
      showLastTwo={showLastTwo}
    >
      {children}
    </Component>
  );
};

export default ResponsiveDialogDrawer;
