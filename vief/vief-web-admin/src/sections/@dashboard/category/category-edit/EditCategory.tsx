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
import { selectedLangSelector, setCategoryPolicyDetail, setSelectedLang } from '../categoryPolicy.slice';
import { useGetCategoryById } from '../hooks/useGetCategoryPolicyById';
import { IDetailCategoryPolicy } from '../interfaces';
import CategoryDetail from './components/CategoryDetail';

function EditCategoryDashboard() {
  const { useDeepCompareEffect } = useDeepEffect();
  const params = useParams();
  const id = params?.categoryId;

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Get category successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Get category error', {
      variant: 'error',
    });
  };
  const { data } = useGetCategoryById({
    id: parseInt(id as string),
    callback: { onSuccess, onError },
  });
  const categoryDetail: IDetailCategoryPolicy = data?.data;
  
  useDeepCompareEffect(() => {
    dispatch(setCategoryPolicyDetail(categoryDetail));
  }, [categoryDetail]);
  
  useEffect(
    () => () => {
      dispatch(setCategoryPolicyDetail({} as IDetailCategoryPolicy));
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
        heading="Category detail"
        links={[{ name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.policy.root }, { name: 'Category' }]}
        action={<SelectLang onLangChange={handleLangChange} lang={selectedLang.value} />}
      />
      <CategoryDetail />
    </>
  );
}

export { EditCategoryDashboard }
