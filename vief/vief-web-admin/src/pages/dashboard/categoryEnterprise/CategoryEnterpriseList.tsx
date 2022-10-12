import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { CategoryListDashboard } from 'src/sections/@dashboard/category-enterprise/category-list/CategoryList';
// --------------------------------------------

export default function CategoryEnterpriseList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CategoryListDashboard />
      </Container>
    </Page>
  );
}
