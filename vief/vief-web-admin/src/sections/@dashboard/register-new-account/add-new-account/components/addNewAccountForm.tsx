import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField, RHFSelect } from 'src/components/hook-form';
import { dispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useGetAllAddNewAccount } from '../../hooks/useGetAllNewAccount';
import { IFormAddNewAccount, userType } from '../../interface';
import { AddNewAccountSchema } from '../../adminAccount.schema';
import { defaultValues } from '../../constants';
import Iconify from 'src/components/Iconify';
import { setShowPassword, showPasswordSelector } from '../../adminAccount.slice';
import { useAddNewAccount } from '../../hooks/useAddNewAccount';
import { faker } from '@faker-js/faker';
import { ENVIRONMENT } from 'src/common/constants/common.constants';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function AddFormNewAccount() {
  const navigate = useNavigate();
  const showPassword = useSelector(showPasswordSelector);

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Add account successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Add account error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useAddNewAccount({ onSuccess, onError });
  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.admin.list);
  }, [isSuccess]);

  const methods = useForm<IFormAddNewAccount>({
    resolver: yupResolver(AddNewAccountSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmit = async (data: IFormAddNewAccount) => {
    const dataAddNewAccount = {
      email: data.email,
      password: data.password,
      userType: data.userType,
    };
    mutate(dataAddNewAccount);
  };
  const handleCancel = () => {
    reset();
  };

  const { data: addNewAccountData } = useGetAllAddNewAccount();
  const accounts = addNewAccountData?.data?.data || [];
  const addNewOption = accounts.map((item: userType) => ({
    key: item.key,
    name: item.name,
  }));

  function generateData() {
    const email = faker.internet.email();
    setValue('email', email);
    const password = faker.internet.password();
    setValue('password', password);
  }

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

          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="password"
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
            {process.env.REACT_APP_ENV_DEPLOY !== ENVIRONMENT.PRODUCTION && (
              <LoadingButton
                fullWidth
                variant="contained"
                type="button"
                size="large"
                onClick={generateData}
              >
                Create auto data
              </LoadingButton>
            )}
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

export { AddFormNewAccount };
