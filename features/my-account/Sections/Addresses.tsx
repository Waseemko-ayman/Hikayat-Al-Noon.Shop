import Button from '@/components/atoms/Button';
import AccountAddrCard from '@/components/molecules/AccountAddrCard';
import AccountSectionHeader from '@/components/molecules/AccountSectionHeader';
import React from 'react';

const addressInfo = [
  {
    id: 1,
    type: 'Home',
    address: '123 Main Street, Apt 4B',
    city: 'New York, NY 10001',
    default: true,
  },
  {
    id: 2,
    type: 'Work',
    address: '456 Business Ave, Suite 200',
    city: 'New York, NY 10002',
    default: false,
  },
];

const Addresses = () => {
  return (
    <div className="space-y-4">
      <div className="bg-(--white-color) border-(--seven-color)">
        <div className="bg-(--seconde-color) text-(--white-color) rounded-t-lg">
          <AccountSectionHeader
            title="Shipping Addresses"
            description="Manage your delivery addresses"
          />
        </div>
        <div className="pt-6 space-y-4">
          {addressInfo.map((addr) => (
            <AccountAddrCard key={addr.id} addr={addr} />
          ))}
        </div>
        <Button otherClassName="inline-block mt-5">Add New</Button>
      </div>
    </div>
  );
};

export default Addresses;
