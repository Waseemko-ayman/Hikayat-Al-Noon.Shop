import NewsletterPage from '@/features/dashboard/newsletter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter - Wénor Dashboard',
  description:
    'Manage and send newsletters to your subscribers from the Wénor dashboard.',
};

const Newsletter = () => <NewsletterPage />;

export default Newsletter;
