import ContactPage from '@/features/contact';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact - Hikayat Al-Noon',
  description: 'Get in touch with Clothes Shopping',
};

const Contact = () => <ContactPage />;

export default Contact;
