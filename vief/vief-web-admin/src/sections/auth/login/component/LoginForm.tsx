// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../../components/hook-form';
import { IFormLoginValuesProps } from '../interface/interface';
import { useSelector } from 'react-redux';
import { setShowPassword, showPasswordSelector } from '../login.slice';
import { dispatch } from 'src/redux/store';
import { LoginSchema } from '../schema/login.schema';
import { defaultValues } from '../constants';
import { useAuthlogin } from '../hook/useLogin';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

// ----------------------------------------------------------------------

export default function LoginForm() {
  
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();
  const showPassword = useSelector(showPasswordSelector);

  const methods = useForm<IFormLoginValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Đăng nhập thành công', {
      variant: 'success',
      autoHideDuration:1000
    });
  };
  const onError = () => {
    enqueueSnackbar('Đăng nhập thất bại ! xin kiểm tra lại thông tin', {
      variant: 'error',
    });
  };

  const { mutate, isSuccess } = useAuthlogin({ onSuccess, onError });
  useEffect(() => {
    if (isSuccess)  navigate(PATH_DASHBOARD.general.app);
  }, [isSuccess]);
  const onSubmit = (data: IFormLoginValuesProps) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() =>dispatch(setShowPassword(!showPassword))} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
