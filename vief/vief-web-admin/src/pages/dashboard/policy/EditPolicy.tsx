import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import EditPolicyDashboard from 'src/sections/@dashboard/policy/edit-policy/EditPolicy';

export default function EditEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Policy: Edit">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <EditPolicyDashboard />
      </Container>
    </Page>
  );
}
