import ArticleEnterpriseEdit from 'src/sections/@dashboard/article/article_edit/ArticleEnterpriseEdit';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// redux
import { setLang, langSelector } from 'src/sections/@dashboard/article/articleSlice';
import { dispatch, useSelector } from 'src/redux/store';
import { SelectLang } from 'src/components/SelectLang';
import { Lang, LangObj } from 'src/common/constants/common.interfaces';
import { BREADCUMBS } from 'src/common/constants/common.constants';

// -----------------------------------------------------
export default function ArticleEdit() {
  const { themeStretch } = useSettings();
  const handleLangChange = (lang: LangObj) => {
    dispatch(setLang(lang.value));
  };

  return (
    <Page title="Article: Edit Article">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chỉnh sửa bài viết"
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: BREADCUMBS.ARTICLE_LIST, href: PATH_DASHBOARD.enterprise.articles },
            { name: BREADCUMBS.ARTICLE_EDIT },
          ]}
          action={
            <SelectLang onLangChange={handleLangChange} lang={useSelector(langSelector) as Lang} />
          }
        />

        <ArticleEnterpriseEdit />
      </Container>
    </Page>
  );
}
