import ContactMessagesPage from '@/features/dashboard/contact-messages';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Messages - Hikayat Al-Noon Dashboard',
  description:
    'View and manage messages submitted from the contact form in the Hikayat Al-Noon dashboard.',
};

const ContactMessages = () => <ContactMessagesPage />;

export default ContactMessages;
