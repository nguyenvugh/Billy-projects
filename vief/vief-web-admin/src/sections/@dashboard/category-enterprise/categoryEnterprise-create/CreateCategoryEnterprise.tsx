// hook form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { NewCategorySchema } from '../category.Schema';
import { usePresignImg } from 'src/common/hooks/usePresignImg';

// mui
import { LoadingButton } from '@mui/lab';
import { Button, Card, FormControl, FormHelperText, Grid, Stack, Typography } from '@mui/material';
import { FormProvider, RHFEditor, RHFSwitch, RHFTextField } from 'src/components/hook-form';
import LoadingScreen from 'src/components/LoadingScreen';
import DropZoneImage from '../components/DropZoneImage';
// hook
import { useCreateCategory } from '../hooks/useCreateNewCategory';
// interface
import { ICreateCategory } from '../interfaces';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { langSelector, postingTimeSelector, setPostingTime } from '../category.slice';
import { FORM_DEFAULT_VALUE, LANG_CONST, MAX_NUM_THUMB_UPLOAD } from '../constants';
import { postTranslations, LabelStyle } from '../components/ultil';
import { BooleanEnum, ENVIRONMENT } from 'src/common/constants/common.constants';
import { useSnackbar } from 'notistack';
import { faker } from '@faker-js/faker';

// ---------------------------------------------------

export default function CreateCategoryEnterprise() {
  const { handleUpload } = usePresignImg();
  const { enqueueSnackbar } = useSnackbar();

  // form
  const methods = useForm<ICreateCategory>({
    resolver: yupResolver(NewCategorySchema),
    defaultValues: FORM_DEFAULT_VALUE,
  });
  const {
    reset: resetForm,
    setValue,
    setError,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  // redux
  const lang = useSelector(langSelector);
  const postingTime = useSelector(postingTimeSelector);
  const { mutate: createNewCategory } = useCreateCategory();

  // on submit form

  const onSubmit = async (data: ICreateCategory) => {
    dispatch(setPostingTime(true));
    const resThumb = await handleUpload(data?.thumbnailId[0]);
    const translation = postTranslations(data);

    let fixFomatData = {
      type: 'ENTERPRISE',
      thumbnailId: resThumb?.id,
      field: 'WOOD',
      isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
      translations: translation,
    };
    if (!postingTime) {
      createNewCategory(fixFomatData, {
        onSuccess: () => {
          dispatch(setPostingTime(false));
          resetForm();
          enqueueSnackbar('create new category successfully', {
            variant: 'success',
          });
        },
        onError: () => {
          dispatch(setPostingTime(false));
          enqueueSnackbar('create new category failed', {
            variant: 'error',
          });
        },
      });
    }
  };

  const handleUploadFileThumb = (files: any) => {
    if (files.length) setValue('thumbnailId', files);
  };

  const handleOnCancel = () => {
    resetForm();
  };

  function generateData() {
    faker.setLocale(lang);
    const name = faker.name.jobArea();
    setValue(`translations.${lang}.name` as never, name as never)
    const shortDesc = faker.company.name();
    setValue(`translations.${lang}.shortDesc` as never, shortDesc as never);
    const content = faker.lorem.paragraph();
    setValue(`translations.${lang}.content` as never, content as never);
    const slug = faker.lorem.slug();
    setValue(`translations.${lang}.slug` as never, slug as never);
  }

  return (
    <>
      {postingTime && <LoadingScreen />}

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <>
                  <RHFTextField
                    name={`translations.${lang}.name`}
                    key={`translations.${lang}.name`}
                    label={lang === LANG_CONST.VI ? 'Tên danh mục' : 'Category name'}
                  />

                  <RHFTextField
                    name={`translations.${lang}.shortDesc`}
                    key={`translations.${lang}.shortDesc`}
                    label={lang === LANG_CONST.VI ? 'Mô tả ngắn gọn' : 'Short description'}
                    multiline
                    rows={3}
                  />

                  <LabelStyle>{lang === LANG_CONST.VI ? 'Nội dung' : 'Content'}</LabelStyle>
                  <RHFEditor
                    className="category__text-editor"
                    simple
                    name={`translations.${lang}.content`}
                    key={`translations.${lang}.content`}
                  />
                </>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFSwitch
                  name="isFeature"
                  label={lang === LANG_CONST.EN ? 'isFeature' : 'Nổi bật'}
                  labelPlacement="start"
                  defaultChecked
                  sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />
                <FormHelperText error>{errors?.isFeature?.message as string}</FormHelperText>

                <RHFTextField
                  name={`translations.${lang}.slug`}
                  key={`translations.${lang}.slug`}
                  label={lang === LANG_CONST.VI ? 'Mã danh mục' : 'Category code'}
                />

                <FormControl error={!!errors?.thumbnailId}>
                  <LabelStyle>{lang === LANG_CONST.EN ? 'Thumbnail Image' : 'Ảnh nền'}</LabelStyle>
                  <DropZoneImage
                    mutateSuccess={postingTime}
                    maxFile={MAX_NUM_THUMB_UPLOAD}
                    setMessError={setError}
                    handleUploadFileThumb={handleUploadFileThumb}
                  />
                  <FormHelperText>{errors?.thumbnailId?.message as any}</FormHelperText>
                </FormControl>
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={() => handleOnCancel()}
              >
                {lang === LANG_CONST.EN ? 'Cancel' : 'Hủy'}
              </Button>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {lang === LANG_CONST.EN ? 'Create' : 'Tạo mới'}
              </LoadingButton>
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            {process.env.REACT_APP_ENV_DEPLOY !== ENVIRONMENT.PRODUCTION && (
            <LoadingButton
                fullWidth
                type="button"
                variant="contained"
                size="large"
                loading={isSubmitting}
                onClick={generateData}
              >
                {lang === LANG_CONST.EN ? 'Auto create data' : 'Tạo tự động'}
              </LoadingButton>
            )}
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
