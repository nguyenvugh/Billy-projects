import { useSelector } from 'react-redux';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { SelectLang } from 'src/components/SelectLang';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { LangObj } from '../../setup/banner/interfaces';
import { selectedLangSelector, setSelectedLang } from '../policy.slice';
import PolicyNewForm from './components/PolicyNewForm';
import {BREADCUMBS} from '../constants'

export default function AddEventDashboard() {
  const selectedLang = useSelector(selectedLangSelector);
  function handleLangChange(lang: LangObj) {
    dispatch(setSelectedLang(lang));
  }

  return (
    <>
      <HeaderBreadcrumbs
        heading="Create a new policy"
        links={[
          { name:BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name:BREADCUMBS.LIST_POLICY, href: PATH_DASHBOARD.policy.list },
          { name: 'Policy Add New ' },
        ]}
        action={<SelectLang onLangChange={handleLangChange} lang={selectedLang.value} />}
      />
      <PolicyNewForm />
    </>
  );
}
