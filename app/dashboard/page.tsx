import DashboardPage from '@/features/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Wénor',
  description:
    'Overview of your store performance, analytics, and management tools.',
};

const Dashboard = () => <DashboardPage />;

export default Dashboard;
