import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { EditAccountDashboard } from 'src/sections/@dashboard/register-new-account/edit-new-account/AdminAccountEdit';

export default function AdminAccountEdit() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Admin Account">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <EditAccountDashboard />
      </Container>
    </Page>
  );
}