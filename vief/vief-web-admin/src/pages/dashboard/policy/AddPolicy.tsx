import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import AddPolicyDashboard from 'src/sections/@dashboard/policy/add-policy/AddPolicy';

export default function AddPolicy() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Policy: Create">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <AddPolicyDashboard />
      </Container>
    </Page>
  );
}
