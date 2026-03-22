import PrivacyPolicyPage from '@/features/privacy-policy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Wénor Shop',
  description:
    'Read our privacy policy to learn how Wénor Shop collects, uses, and protects your data.',
};

const PrivacyPolicy = () => <PrivacyPolicyPage />;

export default PrivacyPolicy;
