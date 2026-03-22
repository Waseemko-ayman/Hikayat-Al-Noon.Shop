'use client';
import AccountSectionHeader from '@/components/molecules/AccountSectionHeader';
import SettingsCards from '@/components/molecules/SettingsCards';
import React, { useState } from 'react';
import PasswordSettings from './PasswordSettings';
import { SettingsStateProps } from '@/interfaces';
import EmailNotifications from './EmailNotifications';
import PaymentMethods from './PaymentMethods';

const contentMap: { [key: string]: React.ReactNode } = {
  emailNotifications: <EmailNotifications />,
  password: <PasswordSettings />,
  paymentMethods: <PaymentMethods />,
};

const Settings = () => {
  const [currentSetting, setCurrentSetting] =
    useState<SettingsStateProps | null>(null);

  const handleManage = (data: SettingsStateProps) => {
    setCurrentSetting(data);
  };

  return (
    <div className="space-y-4">
      <div className="bg-(--white-color) border-(--seven-color)">
        <AccountSectionHeader
          title={currentSetting ? currentSetting.title : 'Account Settings'}
          description={
            currentSetting
              ? currentSetting.description
              : 'Manage your preferences and security'
          }
          handleBack={
            currentSetting ? () => setCurrentSetting(null) : undefined
          }
        />
        {currentSetting ? (
          contentMap[currentSetting.key]
        ) : (
          <SettingsCards handleManage={handleManage} />
        )}
      </div>
    </div>
  );
};

export default Settings;
