import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { EventListDashboard } from 'src/sections/@dashboard/event/event-list/EventList';

export default function EventList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Events">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <EventListDashboard />
      </Container>
    </Page>
  );
}
