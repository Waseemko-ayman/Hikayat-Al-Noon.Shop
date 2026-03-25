/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Tabs } from '@/components/ui/tabs';
import React, { useState } from 'react';
import TabsNavigation from '../ui/display/TabsNavigation';
import Layer from '../atoms/Layer';
import PageTitle from '../atoms/PageTitle';

interface GenericPageProps {
  title: string;
  description: string;
  tabs: { value: string; label: string }[];
  allComponent?: React.ComponentType<{
    value: string;
    onTabChange: (val: string) => void;
    onEditIdChange: (id: string | number | null) => void;
  }>;
  createComponent?: React.ComponentType<{
    value: string;
    editId: string | number | null;
    onTabChange: (val: string) => void;
    onEditIdChange: (id: string | number | null) => void;
  }>;
  overviewComponent?: React.ComponentType<{
    value: string;
    onTabChange: (val: string) => void;
  }>;
  overviewTabValue?: string; // ← أضفنا هذا
  Icon?: React.ElementType;
  // Any other component can be added in the future.
  [key: string]: any;
}

const GenericPage = ({
  title,
  description,
  tabs,
  allComponent: AllComponent,
  createComponent: CreateComponent,
  overviewComponent: OverviewComponent,
  overviewTabValue,
  Icon,
}: GenericPageProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value);
  const [editId, setEditId] = useState<string | number | null>(null);

  return (
    <Layer otherClassName="py-0!">
      <PageTitle title={title} description={description} Icon={Icon} />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsNavigation tabs={tabs} />

        {/* Render AllComponent إذا كان موجود والتاب يطابق قيمته */}
        {AllComponent &&
          activeTab ===
            tabs.find((tab) => tab.value === tabs[0]?.value)?.value && (
            <AllComponent
              value={activeTab}
              onTabChange={setActiveTab}
              onEditIdChange={setEditId}
            />
          )}

        {/* Render CreateComponent إذا كان موجود */}
        {CreateComponent &&
          activeTab ===
            tabs.find((tab) => tab.value === tabs[1]?.value)?.value && (
            <CreateComponent
              value={activeTab}
              editId={editId}
              onTabChange={setActiveTab}
              onEditIdChange={setEditId}
            />
          )}

        {/* Render OverviewComponent إذا كان موجود */}
        {OverviewComponent && activeTab === overviewTabValue && (
          <OverviewComponent value={activeTab} onTabChange={setActiveTab} />
        )}

        {/* {OverviewComponent &&
          activeTab ===
            tabs.find((tab) => tab.value === tabs[2]?.value)?.value && (
            <OverviewComponent value={activeTab} />
          )} */}
      </Tabs>
    </Layer>
  );
};

export default GenericPage;
