import { useSelector } from 'react-redux';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { LangObj } from '../../setup/banner/interfaces';
import { SelectLang } from 'src/components/SelectLang';
import { selectedLangSelector, setSelectedLang } from '../categoryPolicy.slice';
import { CategoryNewForm } from './components/CategoryNewForm';
import { BREADCUMBS } from 'src/common/constants/common.constants';

function AddCategoryDashboard() {
  const selectedLang = useSelector(selectedLangSelector);
  function handleLangChange(lang: LangObj) {
    dispatch(setSelectedLang(lang));
  }

  return (
    <>
      <HeaderBreadcrumbs
        heading="Tạo mới danh mục"
        links={[{ name: BREADCUMBS.ADD_POLICY_CATEGORY, href: PATH_DASHBOARD.root }, { name: 'Danh mục' }]}
        action={<SelectLang onLangChange={handleLangChange} lang={selectedLang.value} />}
      />
      <CategoryNewForm />
    </>
  );
}

export { AddCategoryDashboard }