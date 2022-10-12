import { Button, Grid, Stack } from '@mui/material';

import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { useSelector } from 'src/redux/store';
import { LoadingButton } from '@mui/lab';
import { langSelector } from '../authorizationSlice';
import { LANG } from '../constants';
import { faker } from '@faker-js/faker';
import { ENVIRONMENT } from 'src/common/constants/common.constants';

export default function AuthorizationCreate() {
  const methods = useForm<any>({
    // resolver: yupResolver(NewCategorySchema),
  });
  const {
    reset: resetForm,
    setValue,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = () => {};

  const lang = useSelector(langSelector);

  const handleOnCancel = () => {
    resetForm();
  };

  function generateData() {
    faker.setLocale(lang);
    const name = faker.name.jobArea();
    setValue('name', name);
    const description = faker.lorem.paragraph();
    setValue('description', description);
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RHFTextField
              name={`name`}
              key={`name`}
              label={lang === LANG.EN ? 'Authorization Name' : 'Tên Phân Quyền'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField
              name={`description`}
              key={`mo ta`}
              label={lang === LANG.EN ? 'Description' : 'Mô Tả'}
            />
          </Grid>

          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              onClick={() => handleOnCancel()}
            >
              {lang === LANG.EN ? 'Cancel' : 'Hủy'}
            </Button>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              {lang === LANG.EN ? 'Create' : 'Lưu'}
            </LoadingButton>
            {process.env.REACT_APP_ENV_DEPLOY !== ENVIRONMENT.PRODUCTION && (
              <LoadingButton
                fullWidth
                type="button"
                variant="contained"
                size="large"
                loading={isSubmitting}
                onClick={generateData}
              >
                {lang === LANG.EN ? 'Auto data' : 'Tự động'}
              </LoadingButton>
            )}
          </Stack>
        </Grid>
      </FormProvider>
    </>
  );
}
