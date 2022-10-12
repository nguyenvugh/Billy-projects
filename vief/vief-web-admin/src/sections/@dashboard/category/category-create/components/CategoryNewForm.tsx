import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BooleanEnum, ENVIRONMENT } from 'src/common/constants/common.constants';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import {
  FormProvider,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/components/hook-form';
import { useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { isTranslateNotEmpty } from 'src/utils/isTranslateNotEmpty';
import { defaultValues, LANG } from '../../constants';
import { langSelector, selectedLangSelector } from '../../categoryPolicy.slice';
import { useAddCategory } from '../../hooks/useAddCategoryPolicy';
import {
  IFormCategoryPolicyNew,
  IFormCategoryPolicyValuesProps,
  ITranslations,
} from '../../interfaces';
import { CategorySchema } from '../../schema/category.schema';
import { faker } from '@faker-js/faker';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

function CategoryNewForm() {
  const navigate = useNavigate();
  const { handleUpload } = usePresignImg();

  const selectedLang = useSelector(selectedLangSelector);
  const lang = useSelector(langSelector);

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Add category successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Add error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useAddCategory({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.policy.categories);
  }, [isSuccess]);

  const methods = useForm<IFormCategoryPolicyValuesProps>({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: IFormCategoryPolicyValuesProps) => {
    const img = await handleUpload(data.thumbnail as File);
    const translations: ITranslations[] = [];
    if (isTranslateNotEmpty(data.translations.vi)) {
      translations.push({
        lang: LANG.VI,
        ...data.translations.vi,
      });
    }
    if (isTranslateNotEmpty(data.translations.en)) {
      translations.push({
        lang: LANG.EN,
        ...data.translations.en,
      });
    }
    const dataCategory: IFormCategoryPolicyNew = {
      type: 'POLICY',
      thumbnailId: img.id,
      field: 'WOOD',
      isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
      translations,
    };
    mutate(dataCategory);
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'thumbnail',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleCancel = () => {
    reset();
  };

  function generateData() {
    faker.setLocale(selectedLang.value);
    const name = faker.name.jobArea();
    setValue(`translations.${selectedLang.value}.name` as never, name as never);
    const slug = faker.lorem.slug();
    setValue(`translations.${selectedLang.value}.slug` as never, slug as never);
    const shortDesc = faker.company.name();
    setValue(`translations.${selectedLang.value}.shortDesc` as never, shortDesc as never);
    const content = faker.lorem.paragraph();
    setValue(`translations.${selectedLang.value}.content` as never, content as never);
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name={`translations.${selectedLang.value}.name`}
                  label="Name"
                  key={`translations.${selectedLang.value}.name`}
                />

                <RHFTextField
                  name={`translations.${selectedLang.value}.slug`}
                  key={`translations.${selectedLang.value}.slug`}
                  label="Slug "
                />

                <RHFTextField
                  name={`translations.${selectedLang.value}.shortDesc`}
                  key={`translations.${selectedLang.value}.shortDesc`}
                  label="Short description "
                  multiline
                  rows={3}
                />

                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor
                    className="category__text-editor"
                    simple
                    name={`translations.${selectedLang.value}.content`}
                    key={`translations.${selectedLang.value}.content`}
                  />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <RHFSwitch
                    name="isFeature"
                    label="Feature"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </div>
                <div>
                  <LabelStyle>Thumbnail</LabelStyle>
                  <RHFUploadSingleFile name="thumbnail" maxSize={3145728} onDrop={handleDrop} />
                </div>
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                Create
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
                  Auto create data
                </LoadingButton>
              )}
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

export { CategoryNewForm };
