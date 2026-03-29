import UsersPage from '@/features/dashboard/users';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users - Hikayat Al-Noon Dashboard',
  description:
    'Manage registered users, view profiles, and control user access in the Hikayat Al-Noon dashboard.',
};

const Users = () => <UsersPage />;

export default Users;
