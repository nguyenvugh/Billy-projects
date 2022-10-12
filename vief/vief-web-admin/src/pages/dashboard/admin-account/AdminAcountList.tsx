import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { AdminAccountListDashboard } from 'src/sections/@dashboard/admin-account/admin-account-list/AdminAccountList';

export default function AdminAcountList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Admin Account">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <AdminAccountListDashboard />
      </Container>
    </Page>
  );
}