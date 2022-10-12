import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { CategoryListDashboard } from 'src/sections/@dashboard/category/category-list/ListCategory';

export default function CategoryPolicyList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CategoryListDashboard />
      </Container>
    </Page>
  );
}
