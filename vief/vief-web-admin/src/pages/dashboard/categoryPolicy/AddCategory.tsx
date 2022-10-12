import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { AddCategoryDashboard } from 'src/sections/@dashboard/category/category-create/AddCategory';

export default function AddCategory() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Category: Create">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <AddCategoryDashboard />
      </Container>
    </Page>
  );
}