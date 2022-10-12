import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { EditCategoryDashboard } from 'src/sections/@dashboard/category/category-edit/EditCategory';

export default function EditCategory() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Category Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <EditCategoryDashboard />
      </Container>
    </Page>
  );
}
