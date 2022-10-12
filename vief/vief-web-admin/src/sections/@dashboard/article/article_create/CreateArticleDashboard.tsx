import { useSelector } from 'react-redux';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { SelectLang } from 'src/components/SelectLang';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Lang, LangObj } from 'src/common/constants/common.interfaces';
import { setLang, langSelector } from '../articleSlice';
import CreateArticle from './CreateArticle';

export default function CreateArticleDashBoard() {
  const handleLangChange = (lang: LangObj) => {
    dispatch(setLang(lang.value));
  };

  return (
    <>
      <HeaderBreadcrumbs
        heading="Create a new article"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.ARTICLE, href: PATH_DASHBOARD.enterprise.articles },
          { name: BREADCUMBS.ARTICLE_CREATE },
        ]}
        action={<SelectLang onLangChange={handleLangChange} lang={useSelector(langSelector) as Lang} />}
      />
      <CreateArticle />
    </>
  );
}
