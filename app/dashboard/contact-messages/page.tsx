import ContactMessagesPage from '@/features/dashboard/contact-messages';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Messages - Wénor Dashboard',
  description:
    'View and manage messages submitted from the contact form in the Wénor dashboard.',
};

const ContactMessages = () => <ContactMessagesPage />;

export default ContactMessages;
