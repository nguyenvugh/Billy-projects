import { useSelector } from 'react-redux';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { SelectLang } from 'src/components/SelectLang';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { LangObj } from '../../setup/banner/interfaces';
import { selectedLangSelector, setSelectedLang } from '../event.slice';
import EventNewForm from './components/EventNewForm';

export default function AddEventDashboard() {
  const selectedLang = useSelector(selectedLangSelector);
  function handleLangChange(lang: LangObj) {
    dispatch(setSelectedLang(lang));
  }

  return (
    <>
      <HeaderBreadcrumbs
        heading="Create a new event"
        links={[{ name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root }, { name: 'Event' }]}
        action={<SelectLang onLangChange={handleLangChange} lang={selectedLang.value} />}
      />
      <EventNewForm />
    </>
  );
}
