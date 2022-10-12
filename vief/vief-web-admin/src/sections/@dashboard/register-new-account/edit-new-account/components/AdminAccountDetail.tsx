import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, RHFTextField, RHFSelect } from 'src/components/hook-form';
import { dispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useGetAllAddNewAccount } from '../../hooks/useGetAllNewAccount';
import { IFormAddNewAccount, userType } from '../../interface';
import { AddNewAccountSchema } from '../../adminAccount.schema';
import { defaultValues } from '../../constants';
import Iconify from 'src/components/Iconify';
import { accountDetailSelector, setShowPassword, showPasswordSelector } from '../../adminAccount.slice';
import { faker } from '@faker-js/faker';
import { ENVIRONMENT } from 'src/common/constants/common.constants';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useEditAccount } from '../../hooks/useEditNewAccount';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function EditFormAccount() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.editId;
  const { useDeepCompareEffect } = useDeepEffect();
  const dataAccount = useSelector(accountDetailSelector);
  const showPassword = useSelector(showPasswordSelector);

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Edit account successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Edit account error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useEditAccount({ onSuccess, onError });
  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.admin.list);
  }, [isSuccess]);

  const methods = useForm<IFormAddNewAccount>({
    resolver: yupResolver(AddNewAccountSchema),
    defaultValues,
  });

  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;
  
  useDeepCompareEffect(() => {
    if (dataAccount?.email) setValue('email', dataAccount.email);
    if (dataAccount?.password) setValue('password', dataAccount.password);
    if (dataAccount?.userType) setValue('userType', dataAccount.userType);
  }, [dataAccount]);
  
  const onSubmit = async (data: IFormAddNewAccount) => {
    const dataEditAccount = {
      email: data.email,
      password: data.password,
      userType: data.userType,
    };
    mutate({data: dataEditAccount, id: parseInt(id as string)});
  };
  const handleCancel = () => {
    navigate(PATH_DASHBOARD.admin.list);
  };

  const { data: addNewAccountData } = useGetAllAddNewAccount();
  const accounts = addNewAccountData?.data?.data || [];
  const addNewOption = accounts.map((item: userType) => ({
    key: item.key,
    name: item.name,
  }));

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} maxWidth={500} minWidth={500} marginX="auto">
          <RHFSelect name="userType" label="userType" placeholder="UserType">
            <option value="" />
            {addNewOption.map((option: userType) => (
              <option key={option.key} value={option.key}>
                {option.name}
              </option>
            ))}
          </RHFSelect>

          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <RHFTextField name="email" autoComplete='off' label="Email address" />

          <RHFTextField
            name="password"
            autoComplete='off'
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => dispatch(setShowPassword(!showPassword))}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Add New
            </LoadingButton>
            <LoadingButton
              fullWidth
              color="inherit"
              variant="contained"
              size="large"
              onClick={handleCancel}
            >
              Cancel
            </LoadingButton>
          </Stack>
      </FormProvider>
    </>
  );
}

export { EditFormAccount };
