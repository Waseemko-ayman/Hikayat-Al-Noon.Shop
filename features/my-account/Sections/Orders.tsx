import Button from '@/components/atoms/Button';
import AccountOrderCard from '@/components/molecules/AccountOrderCard';
import AccountSectionHeader from '@/components/molecules/AccountSectionHeader';
import { PATHS } from '@/data/paths';
import React from 'react';

const OrdersData = [
  {
    id: 'ORD-2024-001',
    date: 'Dec 10, 2024',
    status: 'Delivered',
    total: '$129.99',
    items: 3,
  },
  {
    id: 'ORD-2024-002',
    date: 'Dec 5, 2024',
    status: 'In Transit',
    total: '$89.50',
    items: 2,
  },
  {
    id: 'ORD-2024-003',
    date: 'Nov 28, 2024',
    status: 'Processing',
    total: '$199.99',
    items: 4,
  },
];

const Orders = () => {
  return (
    <div>
      <AccountSectionHeader
        title="Order History"
        description="Track and manage your orders"
      />
      <div className="pt-6 space-y-4">
        {OrdersData.map((order) => (
          <AccountOrderCard key={order.id} order={order} />
        ))}
      </div>
      <Button href={PATHS.ORDERS} otherClassName="inline-block mt-5">
        View All Orders
      </Button>
    </div>
  );
};

export default Orders;
