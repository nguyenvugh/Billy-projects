import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { SelectLang } from 'src/components/SelectLang';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { LangObj } from '../../setup/banner/interfaces';
import { selectedLangSelector, setEventDetail, setSelectedLang } from '../event.slice';
import { useGetEventById } from '../hooks/useGetEventById';
import { IDetailEvent } from '../interfaces';
import EventDetail from './components/EventDetail';

export default function EditEventDashboard() {
  const params = useParams();
  const id = params?.eventId;

  const { useDeepCompareEffect } = useDeepEffect();

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Get event successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Get event error', {
      variant: 'error',
    });
  };
  const { data } = useGetEventById({
    id: parseInt(id as string),
    callback: { onSuccess, onError },
  });
  const eventDetail: IDetailEvent = data?.data;
  useDeepCompareEffect(() => {
    dispatch(setEventDetail(eventDetail));
  }, [eventDetail]);

  useEffect(
    () => () => {
      dispatch(setEventDetail({} as IDetailEvent));
    },
    []
  );
  const selectedLang = useSelector(selectedLangSelector);

  function handleLangChange(lang: LangObj) {
    dispatch(setSelectedLang(lang));
  }

  return (
    <>
      <HeaderBreadcrumbs
        heading="Event detail"
        links={[{ name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root }, { name: 'Event' }]}
        action={<SelectLang onLangChange={handleLangChange} lang={selectedLang.value} />}
      />
      <EventDetail />
    </>
  );
}
