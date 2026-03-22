import HelpPage from '@/features/help';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help - Wénor Shop',
  description:
    'Get help, support, and answers to your questions about Wénor Shop.',
};

const Help = () => <HelpPage />;

export default Help;
