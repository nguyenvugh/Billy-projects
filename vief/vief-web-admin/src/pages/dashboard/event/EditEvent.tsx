import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import EditEventDashboard from 'src/sections/@dashboard/event/edit-event/EditEvent';

export default function EditEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Event: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <EditEventDashboard />
      </Container>
    </Page>
  );
}
