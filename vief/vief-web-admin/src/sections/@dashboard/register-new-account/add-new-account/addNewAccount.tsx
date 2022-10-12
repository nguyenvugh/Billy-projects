import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { AddFormNewAccount } from './components/addNewAccountForm';

export default function AddNewAccountDashboard() {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Create a new account"
        links={[
          { name:BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.admin.root },
          { name:BREADCUMBS.ADD_NEW_ACCOUNT, href: PATH_DASHBOARD.admin.new },
          { name: 'Add New Account' },
        ]}
      />
      <AddFormNewAccount />
    </>
  );
}
