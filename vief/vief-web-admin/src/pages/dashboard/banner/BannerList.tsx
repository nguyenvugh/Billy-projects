import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { BannerListDashboard } from 'src/sections/@dashboard/setup/banner/BannerList';

// ----------------------------------------------------------------------

export default function BannerList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Setup: Banner">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <BannerListDashboard />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
