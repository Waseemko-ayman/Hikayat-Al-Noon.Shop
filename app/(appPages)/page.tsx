import HomePage from '@/features/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - Wénor Shop',
  description: 'Welcome to the Wénor Shop Home Page',
};

const Home = () => <HomePage />;

export default Home;
