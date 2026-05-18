import OrdersPage from '@/features/orders';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders',
  description: 'View your order history and track shipments',
};

const Orders = () => <OrdersPage />;

export default Orders;
