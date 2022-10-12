import { useSelector } from 'react-redux';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { LangObj } from 'src/common/constants/common.interfaces';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { SelectLang } from 'src/components/SelectLang';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { selectedLangSelector, setSelectedLang } from './about-us.slice';
import AboutUsForm from './components/AboutUsForm';

export default function AboutUsDashboard() {
  const selectedLang = useSelector(selectedLangSelector);
  function handleLangChange(lang: LangObj) {
    dispatch(setSelectedLang(lang));
  }

  return (
    <>
      <HeaderBreadcrumbs
        heading="About us"
        links={[{ name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root }, { name: 'About us' }]}
        action={<SelectLang onLangChange={handleLangChange} lang={selectedLang.value} />}
      />
      <AboutUsForm />
    </>
  );
}
