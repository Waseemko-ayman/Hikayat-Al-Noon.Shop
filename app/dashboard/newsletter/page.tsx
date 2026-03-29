import NewsletterPage from '@/features/dashboard/newsletter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter - Hikayat Al-Noon Dashboard',
  description:
    'Manage and send newsletters to your subscribers from the Hikayat Al-Noon dashboard.',
};

const Newsletter = () => <NewsletterPage />;

export default Newsletter;
