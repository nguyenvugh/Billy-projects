import { useEffect, useCallback } from 'react';
import { useSelector, dispatch } from 'src/redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { NewArticleSchema } from '../schema/article.Schema';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material/styles';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import { PATH_DASHBOARD } from 'src/routes/paths';
import {
  RHFUploadMultiFile,
  FormProvider,
  RHFTextField,
  RHFSwitch,
  RHFEditor,
  RHFUploadSingleFile,
} from 'src/components/hook-form';
import { useCreateNewArticle } from '../hooks/useCreateNewArticle';
import { useGetAllCategory } from '../hooks/useGetAllCategory';
import { IFormArticleNew, ITranslation, IFormArticleValuesProps } from '../interfaces';
import { selectedLangSelector } from '../articleSlice';
import { isTranslateNotEmpty } from 'src/utils/isTranslateNotEmpty';
import { LANG, defaultValues } from '../constants';
import { BooleanEnum, ENVIRONMENT } from 'src/common/constants/common.constants';
import { useSnackbar } from 'notistack';
import { faker } from '@faker-js/faker';


export default function CreateArticle() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { handleUpload } = usePresignImg();

  const selectedLang = useSelector(selectedLangSelector);

  const onSuccess = () => {
    enqueueSnackbar('Create Article successfully', {
      variant: 'success',
    });
  };

  const onError = () => {
    enqueueSnackbar('Create error', {
      variant: 'error',
    });
  };

  const { mutate, isSuccess } = useCreateNewArticle({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.enterprise.articles);
  }, [isSuccess]);
  const getImages = async (data: IFormArticleValuesProps) => {
    let result: number[] = [];
    for (const element of data?.images) {
      const imgs = await handleUpload(element as File);
      result = [...result, imgs.id];
    }
    return result;
  };
  const methods = useForm<IFormArticleValuesProps>({
    resolver: yupResolver(NewArticleSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: IFormArticleValuesProps) => {
    const thumbnailImg = await handleUpload(data.thumbnail as File);

    const translations: ITranslation[] = [];
    const listImg: number[] = await getImages(data);

    if (isTranslateNotEmpty(data.translations.vi)) {
      
      translations.push({
        lang: LANG.VI,
        ...data.translations.vi,
      });
    }

    if (isTranslateNotEmpty(data.translations.en)) {
      faker.setLocale(LANG.EN);
      translations.push({
        lang: LANG.EN,
        ...data.translations.en,
      });
    }
    const dataArticle: IFormArticleNew = {
      categoryId: data.category.value,
      thumbnailId: thumbnailImg.id,
      images: listImg,
      field: 'WOOD',
      type: 'ENTERPRISE',
      isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
      author: data.author,
      translations,
    };
    mutate(dataArticle);
  };

  const values = watch();

  const removeAllArticleImgs = () => {
    setValue('images', []);
  };

  const removeArticleImg = (file: File | string) => {
    const filteredItems = values.images && values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  const handleDropThumbnail = useCallback(
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

  const handleDropArticleImgs = useCallback(
    (acceptedFiles: File[]) => {
      const images = values.images || [];
      const file = acceptedFiles[0];

      if (file) {
        setValue('images', [
          ...images,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
      }
    },

    [setValue, values.images]
  );

  const handleOnCancel = () => {
    reset();
  };

  const { data: categoryData } = useGetAllCategory('ENTERPRISE');
  const categoriesOption = categoryData?.data?.data?.map((item: any) => ({
    value: item?.id,
    label: item?.name,
  }));

  function generateData() {
    faker.setLocale(selectedLang);
    const title = faker.address.city();
    setValue(`translations.${selectedLang}.title` as never, title as never);
    const shortDesc = faker.company.name();
    setValue(`translations.${selectedLang}.shortDesc` as never, shortDesc as never);
    const content = faker.lorem.paragraph();
    setValue(`translations.${selectedLang}.content` as never, content as never);
    const slug = faker.lorem.slug();
    setValue(`translations.${selectedLang}.slug` as never, slug as never);
    const author = faker.name.jobArea();
    setValue('author', author);
  }
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name={`translations.${selectedLang}.title`}
                  label={selectedLang === LANG.VI ? 'Tên bài viết' : 'Article name'}
                  key={`translations.${selectedLang}.title`}
                />

                <RHFTextField
                  name={`translations.${selectedLang}.shortDesc`}
                  label={selectedLang === LANG.VI ? 'Mô tả ngắn gọn' : 'Short description'}
                  key={`translations.${selectedLang}.shortDesc`}
                />

                <div>
                  <LabelStyle>{selectedLang === LANG.VI ? 'Nội dung' : 'Content'}</LabelStyle>
                  <RHFEditor
                    className="category__text-editor"
                    simple
                    name={`translations.${selectedLang}.content`}
                    key={`translations.${selectedLang}.content`}
                  />
                </div>
                <div>
                  <LabelStyle>Article Images</LabelStyle>
                  <RHFUploadMultiFile
                    showPreview
                    name="images"
                    maxSize={3145729}
                    onDrop={handleDropArticleImgs}
                    onRemove={removeArticleImg}
                    onRemoveAll={removeAllArticleImgs}
                  />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="author" label="Author Name" />
                <RHFTextField
                  name={`translations.${selectedLang}.slug`}
                  label={selectedLang === LANG.VI ? 'Mã bài viết' : 'Article slug'}
                  key={`translations.${selectedLang}.slug`}
                />
                <FormControl error={!!errors?.category?.value}>
                  <Stack>
                    <LabelStyle>Category</LabelStyle>
                    <Box>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field: { onChange } }) => (
                          <Select
                            placeholder="Choose category ..."
                            options={categoriesOption ? categoriesOption : []}
                            onChange={onChange}
                          />
                        )}
                      />
                    </Box>
                  </Stack>
                  <FormHelperText>{errors?.category?.value?.message as string}</FormHelperText>
                </FormControl>
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
                  <RHFUploadSingleFile
                    name="thumbnail"
                    maxSize={3145728}
                    onDrop={handleDropThumbnail}
                  />
                </div>
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
                  variant="contained"
                  type="button"
                  size="large"
                  onClick={generateData}
                >
                  Create auto data
                </LoadingButton>
              )}
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}

const LabelStyle: any = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
