import HomePage from '@/features/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to the Hikayat Al-Noon Home Page',
};

const Home = () => <HomePage />;

export default Home;
