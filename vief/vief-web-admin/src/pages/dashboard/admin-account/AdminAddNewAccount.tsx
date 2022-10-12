import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import AddNewAccountDashboard from 'src/sections/@dashboard/register-new-account/add-new-account/addNewAccount';

export default function AddNewAccount() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Account: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <AddNewAccountDashboard />
      </Container>
    </Page>
  );
}