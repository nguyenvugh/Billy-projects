import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { RegisterEventListDashboard } from 'src/sections/@dashboard/event/register-event/RegisterEventList';

export default function RegisterEventList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Register event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <RegisterEventListDashboard />
      </Container>
    </Page>
  );
}
