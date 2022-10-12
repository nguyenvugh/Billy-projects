import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { setAccountDetail  } from '../adminAccount.slice';
import { useGetAccountById } from '../hooks/useGetAccountById';
import { IFormAddNewAccount } from '../interface';
import { EditFormAccount } from './components/AdminAccountDetail';

function EditAccountDashboard() {
  const params = useParams();
  const id = params?.editId;
  const { useDeepCompareEffect } = useDeepEffect();

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Get account successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Get account error', {
      variant: 'error',
    });
  };
  const { data } = useGetAccountById({
    id: parseInt(id as string),
    callback: { onSuccess, onError },
  });

  const accountDetail: IFormAddNewAccount = data?.data.data;
  useDeepCompareEffect(() => {
    dispatch(setAccountDetail(accountDetail));
  }, [accountDetail]);

  useEffect(
    () => () => {
      dispatch(setAccountDetail({} as IFormAddNewAccount));
    },
    []
  );

  return (
    <>
      <HeaderBreadcrumbs
        heading="Account detail"
        links={[{ name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root }, { name: 'Admin' }]}
      />
      <EditFormAccount />
    </>
  );
}

export { EditAccountDashboard }
