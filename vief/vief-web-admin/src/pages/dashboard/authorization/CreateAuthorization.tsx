import AuthorizationCreate from 'src/sections/@dashboard/authorization/authorization-create-edit/AuthorizationCreate';
import { Container } from '@mui/material';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { SelectLang } from 'src/components/SelectLang';
import { setLang, langSelector } from 'src/sections/@dashboard/authorization/authorizationSlice';
import { dispatch, useSelector } from 'src/redux/store';
import { Lang, LangObj } from 'src/common/constants/common.interfaces';
import { LangType } from 'src/sections/@dashboard/authorization/interface';
// --------------------------------------------

export default function CategoryEnterpriseList() {
  const { themeStretch } = useSettings();

  const handleLangChange = (lang: LangObj) => {
    dispatch(setLang(lang.value as LangType));
  };

  return (
    <Page title="Authorization">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chỉnh sửa phân quyền"
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: BREADCUMBS.AUTHORIZATION_LIST,
              href: PATH_DASHBOARD.authorization.authorization_list,
            },
            { name: BREADCUMBS.AUTHORIZATION_CREATE },
          ]}
          action={
            <SelectLang onLangChange={handleLangChange} lang={useSelector(langSelector) as Lang} />
          }
        />
        <AuthorizationCreate />
      </Container>
    </Page>
  );
}
