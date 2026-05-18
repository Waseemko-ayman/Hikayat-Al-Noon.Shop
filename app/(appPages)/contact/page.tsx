import ContactPage from '@/features/contact';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Hikayat Al-Noon',
};

const Contact = () => <ContactPage />;

export default Contact;
