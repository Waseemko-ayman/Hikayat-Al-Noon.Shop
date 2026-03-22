import AboutPage from '@/features/about';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About - Wénor Shop',
  description: 'Learn more about Wénor Shop',
};

const About = () => <AboutPage />;

export default About;
