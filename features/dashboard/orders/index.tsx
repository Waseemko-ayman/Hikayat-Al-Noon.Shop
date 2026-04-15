'use client';
import GenericPage from '@/components/organism/GenericPage';
import { FiShoppingCart } from 'react-icons/fi';
import AllOrders from './AllOrders';

const OrdersPage = () => {
  const tabsData = [{ value: 'allOrders', label: 'All Orders' }];

  return (
    <GenericPage
      title="All Orders"
      description="Manage Orders for your store"
      Icon={FiShoppingCart}
      tabs={tabsData}
      allComponent={AllOrders}
    />
  );
};

export default OrdersPage;
