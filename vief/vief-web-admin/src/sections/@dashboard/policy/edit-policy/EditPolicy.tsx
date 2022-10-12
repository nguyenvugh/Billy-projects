import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { SelectLang } from 'src/components/SelectLang';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { LangObj } from '../../setup/banner/interfaces';
import { selectedLangSelector, setPolicytDetail, setSelectedLang } from '../policy.slice';
import { useGetPolicyById } from '../hooks/useGetPolicyById';
import { IDetailPolicy } from '../interface';
import PolicyDetail from './component/PolicyDetail';
import {BREADCUMBS} from '../constants'

export default function EditPolicyDashboard() {
  const params = useParams();
  const id = params?.policyId;

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Get policy successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Get policy error', {
      variant: 'error',
    });
  };
  const { data } = useGetPolicyById({
    id: parseInt(id as string),
    callback: { onSuccess, onError },
  });
  const policyDetail: IDetailPolicy = data?.data;
  useEffect(() => {
    dispatch(setPolicytDetail(policyDetail));
  }, [JSON.stringify(policyDetail)]);

  useEffect(
    () => () => {
      dispatch(setPolicytDetail({} as IDetailPolicy));
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
        heading="Policy detail"
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.LIST_POLICY, href: PATH_DASHBOARD.policy.list },
          { name: 'Policy' },
        ]}
        action={<SelectLang onLangChange={handleLangChange} lang={selectedLang.value} />}
      />
      <PolicyDetail />
    </>
  );
}
