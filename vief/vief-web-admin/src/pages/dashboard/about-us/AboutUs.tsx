import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import AboutUsDashboard from 'src/sections/@dashboard/about-us/AboutUs';

export default function AddEvent() {
  const { themeStretch } = useSettings();

  return (
    <Page title="About us">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <AboutUsDashboard />
      </Container>
    </Page>
  );
}
