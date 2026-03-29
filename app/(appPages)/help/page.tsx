import HelpPage from '@/features/help';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help - Hikayat Al-Noon',
  description:
    'Get help, support, and answers to your questions about Hikayat Al-Noon.',
};

const Help = () => <HelpPage />;

export default Help;
