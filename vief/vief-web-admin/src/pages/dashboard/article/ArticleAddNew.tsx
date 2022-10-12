// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import CreateArticleDashBoard from 'src/sections/@dashboard/article/article_create/CreateArticleDashboard';
export default function ArticleAddNew() {

  const { themeStretch } = useSettings();

  return (
    <Page title="Blog: New Article">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CreateArticleDashBoard />
      </Container>
    </Page>
  );
}
