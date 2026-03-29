import AboutPage from '@/features/about';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About - Hikayat Al-Noon',
  description: 'Learn more about Hikayat Al-Noon',
};

const About = () => <AboutPage />;

export default About;
