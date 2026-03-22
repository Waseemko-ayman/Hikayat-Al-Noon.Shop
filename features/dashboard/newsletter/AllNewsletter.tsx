'use client';
import GenericAllTable from '@/components/organism/GenericAllTable';
import React from 'react';

const AllNewsletter = ({ value }: { value: string }) => {
  return (
    <GenericAllTable
      value={value}
      title="All Subscribers"
      description="View and manage newsletter subscribers"
      tableName="newsletter_subscribers"
      placeholder="Search for email..."
      deleteLocation="Newsletter"
      showEdit={false}
    />
  );
};

export default AllNewsletter;
