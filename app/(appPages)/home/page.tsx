import HomePage from '@/features/home';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Home - Clothes Shopping',
  description: 'Welcome to the Clothes Shopping Home Page',
};

const Home = () => <HomePage />;

export default Home;
