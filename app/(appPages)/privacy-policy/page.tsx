import PrivacyPolicyPage from '@/features/privacy-policy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read our privacy policy to learn how Hikayat Al-Noon collects, uses, and protects your data.',
};

const PrivacyPolicy = () => <PrivacyPolicyPage />;

export default PrivacyPolicy;
