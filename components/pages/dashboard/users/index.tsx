import GenericPage from '@/components/organism/GenericPage';
import AllUsers from './AllUsers';
import CreateUsers from './CreateUsers';

const UsersPage = () => {
  const tabsData = [
    { value: 'allUsers', label: 'All Users' },
    {
      value: 'createUsers',
      label: 'Create New User',
    },
  ];

  return (
    <GenericPage
      title="Create Users"
      description="Add new users and manage their roles on your platform"
      tabs={tabsData}
      allComponent={AllUsers}
      createComponent={CreateUsers}
    />
  );
};

export default UsersPage;
