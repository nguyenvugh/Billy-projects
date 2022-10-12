import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import AddEventDashboard from 'src/sections/@dashboard/event/add-event/AddEvent';

export default function AddEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Event: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <AddEventDashboard />
      </Container>
    </Page>
  );
}
