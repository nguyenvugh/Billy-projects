import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { AuthorizationList } from 'src/sections/@dashboard/authorization/authorization-list/AuthorizationList';
// --------------------------------------------

export default function CategoryEnterpriseList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <AuthorizationList />
      </Container>
    </Page>
  );
}
