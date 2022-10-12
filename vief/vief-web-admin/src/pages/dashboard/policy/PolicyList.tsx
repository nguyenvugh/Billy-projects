import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PolicyListDashboard } from 'src/sections/@dashboard/policy/policy-list/PolicyList';

export default function PolicyList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Policys">
      <Container maxWidth={themeStretch ? 'sm' : 'lg'}>
        <PolicyListDashboard />
      </Container>
    </Page>
  );
}