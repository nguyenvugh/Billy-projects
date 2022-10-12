import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { ListArticle } from 'src/sections/@dashboard/article/article_list/ListArticle';
// --------------------------------------------

export default function CategoryEnterpriseList() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Categories">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ListArticle />
      </Container>
    </Page>
  );
}
