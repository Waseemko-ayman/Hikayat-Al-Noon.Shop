'use client';
import GenericPage from '@/components/organism/GenericPage';
import AllFAQ from './AllFAQ';
import { MessageCircleQuestion } from 'lucide-react';
import CreateFAQS from './createFAQS';

const FAQPage = () => {
  const tabsData = [
    { value: 'allFAQ', label: 'All FAQ' },
    {
      value: 'createFAQS',
      label: 'Create New FAQ',
    },
  ];

  return (
    <GenericPage
      title="All FAQ"
      description="Manage FAQ for your store"
      Icon={MessageCircleQuestion}
      tabs={tabsData}
      allComponent={AllFAQ}
      createComponent={CreateFAQS}
    />
  );
};

export default FAQPage;
