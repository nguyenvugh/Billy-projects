import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  FormControl,
  Box,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BooleanEnum, ENVIRONMENT } from 'src/common/constants/common.constants';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import {
  FormProvider,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
  RHFUploadMultiFile,
  RHFSelect
} from 'src/components/hook-form';
import { dispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { isTranslateNotEmpty } from 'src/utils/isTranslateNotEmpty';
import { defaultValues, LANG } from '../../constants';
import {
  imagesIdSelector,
  selectedLangSelector,
  setImagesId,
  setCheckImage,
  setThumbnailId,
  checkImageSelector,
  thumbnailIdSelector,
} from '../../policy.slice';
import { useAddPolicy } from '../../hooks/useAddPolicy';
import { IFormPolicyNew, IFormPolicyValuesProps, ITranslations, Category } from '../../interface';
import { NewPolicySchema } from '../../schema/policy.schema';
import { useGetAllCategory } from '../../hooks/useGetAllCategory';
import Select from 'react-select';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { faker } from '@faker-js/faker';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function PolicyNewForm() {
  const navigate = useNavigate();
  const { handleUpload } = usePresignImg();
  const { useDeepCompareEffect } = useDeepEffect();
  const selectedLang = useSelector(selectedLangSelector);

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Add policys successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Add error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess, isError } = useAddPolicy({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.policy.list);
  }, [isSuccess]);

  const methods = useForm<IFormPolicyValuesProps>({
    resolver: yupResolver(NewPolicySchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;
  const checkImage = useSelector(checkImageSelector);
  const thumbnailId = useSelector(thumbnailIdSelector);
  const imagesId = useSelector(imagesIdSelector);

  useEffect(() => {
    if (isError) {
      dispatch(setCheckImage(false));
    }
  }, [isError]);
  useDeepCompareEffect(() => {
    const data = watch();
    if (checkImage && thumbnailId && imagesId.length) {
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
      const dataPolicy: IFormPolicyNew = {
        thumbnailId: thumbnailId,
        field: 'WOOD',
        isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
        author: data.author,
        categoryId: data.category.value,
        images: imagesId,
        translations,
      };
      mutate(dataPolicy);
    }
  }, [checkImage, thumbnailId, imagesId]);
  const onSubmit = async (data: IFormPolicyValuesProps) => {
    const img = await handleUpload(data.thumbnail as File);
    dispatch(setThumbnailId(img.id));
    let idImagesId: number[] = [];
    data.images?.forEach(async (image, index) => {
      const imgs = await handleUpload(image as File);
      idImagesId = [...idImagesId, imgs.id];
      dispatch(setImagesId(idImagesId));
      if (index === (data.images?.length || 0) - 1) {
        dispatch(setCheckImage(true));
      }
    });
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

  const { data: categoryData } = useGetAllCategory();
  const categoriesOption = categoryData?.data?.data?.map((item: Category) => ({
    value: item.id,
    label: item.name,
  }));
  const values = watch();
  const handleDropImg = useCallback(
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
  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = values.images && values.images?.filter((_file) => _file !== file);

    setValue('images', filteredItems);
  };

  function generateData() {
    faker.setLocale(selectedLang.value);
    const title = faker.address.city();
    setValue(`translations.${selectedLang.value}.title` as never, title as never);
    const shortDesc = faker.company.name();
    setValue(`translations.${selectedLang.value}.shortDesc` as never, shortDesc as never);
    const content = faker.lorem.paragraph();
    setValue(`translations.${selectedLang.value}.content` as never, content as never);
    const slug = faker.lorem.slug();
    setValue(`translations.${selectedLang.value}.slug` as never, slug as never);
    const author = faker.name.jobArea();
    setValue('author', author);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div style={{ zIndex: 2 }}>
                <FormControl error={!!errors?.category?.value}>
                  <LabelStyle>{'Danh Mục'}</LabelStyle>
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
                   <FormHelperText>{errors?.category?.value?.message as string}</FormHelperText>
                </FormControl>
                </div>
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
                    onDrop={handleDropImg}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
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
                  <LabelStyle>{'Author'}</LabelStyle>
                  <RHFTextField name="author" />
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
                Post
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
