import GenericPage from '@/components/organism/GenericPage';
import React from 'react';
import AllNewsletter from './AllNewsletter';

const NewsletterPage = () => {
  const tabsData = [{ value: 'allNewsletter', label: 'All Newsletter' }];

  return (
    <GenericPage
      title="Newsletter Subscribers"
      description="View and manage your newsletter subscribers"
      tabs={tabsData}
      allComponent={AllNewsletter}
    />
  );
};

export default NewsletterPage;
