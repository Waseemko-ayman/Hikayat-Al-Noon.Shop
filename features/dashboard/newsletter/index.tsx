'use client';
import GenericPage from '@/components/organism/GenericPage';
import AllNewsletter from './AllNewsletter';
import { FiMail } from 'react-icons/fi';

const NewsletterPage = () => {
  const tabsData = [{ value: 'allNewsletter', label: 'All Newsletter' }];

  return (
    <GenericPage
      title="Newsletter Subscribers"
      description="View and manage your newsletter subscribers"
      Icon={FiMail}
      tabs={tabsData}
      allComponent={AllNewsletter}
    />
  );
};

export default NewsletterPage;
