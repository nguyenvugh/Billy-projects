import { faker } from '@faker-js/faker';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ENVIRONMENT } from 'src/common/constants/common.constants';
import { LANG } from 'src/common/constants/common.interfaces';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFUploadMultiFile,
  RHFUploadSingleFile,
} from 'src/components/hook-form';
import { useSelector } from 'src/redux/store';
import { isTranslateNotEmpty } from 'src/utils/isTranslateNotEmpty';
import { selectedLangSelector } from '../about-us.slice';
import { defaultValues } from '../constants';
import { IFormAboutUsValuesProps, ITranslations } from '../interfaces';
import { AboutUsSchema } from '../schema/about-us.schema';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function AboutUsForm() {
  const { handleUpload } = usePresignImg();

  const selectedLang = useSelector(selectedLangSelector);

  const methods = useForm<IFormAboutUsValuesProps>({
    resolver: yupResolver(AboutUsSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IFormAboutUsValuesProps) => {
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
  const values = watch();
  const handleDropMulti = useCallback(
    (acceptedFiles: File[]) => {
      const images = values.images || [];

      setValue('images', [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.images]
  );
  const handleRemove = (file: File | string) => {
    const filteredItems = values.images && values.images?.filter((_file) => _file !== file);

    setValue('images', filteredItems);
  };
  const handleRemoveAll = () => {
    setValue('images', []);
  };
  const handleCancel = () => {
    reset();
  };

  function generateData() {
    faker.setLocale(selectedLang.value);
    const title = faker.address.city();
    setValue(`translations.${selectedLang.value}.title` as never, title as never);
    const content = faker.lorem.paragraph();
    setValue(`translations.${selectedLang.value}.content` as never, content as never);
    const slug = faker.lorem.slug();
    setValue(`translations.${selectedLang.value}.slug` as never, slug as never);
  }
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name={`translations.${selectedLang.value}.title`}
                  label="Title"
                  key={`translations.${selectedLang.value}.title`}
                />

                <RHFTextField
                  name={`translations.${selectedLang.value}.slug`}
                  key={`translations.${selectedLang.value}.slug`}
                  label="Slug "
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

                <div>
                  <LabelStyle>Thumbnail</LabelStyle>
                  <RHFUploadSingleFile name="thumbnail" maxSize={3145728} onDrop={handleDrop} />
                </div>
                <div>
                  <LabelStyle>Images</LabelStyle>
                  <RHFUploadMultiFile
                    showPreview
                    name="images"
                    maxSize={3145728}
                    onDrop={handleDropMulti}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    onUpload={() => {}}
                  />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
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
                Save
              </LoadingButton>
            </Stack>
            {process.env.REACT_APP_ENV_DEPLOY !== ENVIRONMENT.PRODUCTION && (
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
                onClick={generateData}
              >
                Create auto data
              </LoadingButton>
            </Stack>
            )}
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
