import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormControl,
  Box,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { dispatch, useSelector } from 'src/redux/store';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BooleanEnum } from 'src/common/constants/common.constants';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import {
  FormProvider,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
  RHFUploadMultiFile,
} from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { getTranslationByLang } from 'src/utils/getTranslationByLang';
import { isTranslateNotEmpty } from 'src/utils/isTranslateNotEmpty';
import { defaultValues, LANG } from '../../constants';
import {
  checkImageEditSelector,
  idTempEditSelector,
  policyDetailSelector,
  selectedLangSelector,
  setCheckImageEdit,
  setIdTempEdit,
} from '../../policy.slice';
import { useEditPolicy } from '../../hooks/useEditPolicy';
import {
  IFormPolicyNew,
  IFormPolicyValuesProps,
  ITranslateDetail,
  ITranslations,
  Category,
} from '../../interface';
import { NewPolicySchema } from '../../schema/policy.schema';
import { useGetAllCategory } from '../../hooks/useGetAllCategory';
import Select from 'react-select';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import _ from 'lodash';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function PolicyDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.policyId;
  const { handleUpload } = usePresignImg();
  const { useDeepCompareEffect } = useDeepEffect();

  const selectedLang = useSelector(selectedLangSelector);
  const dataPolicy = useSelector(policyDetailSelector);
  const idTempEdit = useSelector(idTempEditSelector);
  const checkImageEdit = useSelector(checkImageEditSelector);

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Edit policys successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Edit error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useEditPolicy({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.policy.list);
  }, [isSuccess]);

  const methods = useForm<IFormPolicyValuesProps>({
    resolver: yupResolver(NewPolicySchema),
    defaultValues,
  });

  const {
    setValue,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  useDeepCompareEffect(() => {
    if (dataPolicy?.isFeature)
      setValue('isFeature', dataPolicy.isFeature === BooleanEnum.TRUE);
    if (dataPolicy?.thumbnail?.url) setValue('thumbnail', dataPolicy.thumbnail.url);
    let url: string[] = [];
    if (dataPolicy?.images && dataPolicy?.images.length) {
      dataPolicy?.images.forEach((images) => {
        if (images.url) {
          url = [...url, images.url];
        }
      });
      setValue('images', url);
    }
    if (dataPolicy?.author) setValue('author', dataPolicy.author);
    if (dataPolicy?.category) setValue('category', dataPolicy.category);

    if (dataPolicy?.translates) {
      const transVi = getTranslationByLang<ITranslateDetail>(LANG.VI, dataPolicy.translates);
      if (!_.isEmpty(transVi)) setValue('translations.vi', transVi as never);
      const transEn = getTranslationByLang<ITranslateDetail>(LANG.EN, dataPolicy.translates);
      if (!_.isEmpty(transEn)) setValue('translations.en', transEn as never);
    }
  }, [dataPolicy]);
  useDeepCompareEffect(() => {
    const handleData = async () => {
      const data = watch();
      let imagesId: number[] = [];
      dataPolicy.images.forEach((image) => (imagesId = [...imagesId, image.id]));
      imagesId = [...imagesId, ...idTempEdit];
      let imgId = dataPolicy.thumbnail.id;
      if (typeof data.thumbnail === 'object') {
        const img = await handleUpload(data.thumbnail as File);
        imgId = img.id;
      }

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
      const dataEdit: IFormPolicyNew = {
        thumbnailId: imgId,
        author: data.author,
        field: 'WOOD',
        isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
        categoryId: data.category.value,
        images: imagesId,
        translations,
      };
      mutate({ data: dataEdit, id: parseInt(id as string) });
    };
    if (checkImageEdit && idTempEdit.length) {
      handleData();
    }
  }, [checkImageEdit, dataPolicy]);
  const onSubmit = async (data: IFormPolicyValuesProps) => {
    const defaultImg = data.images?.filter((image) => typeof image !== 'string');
    const getIdNew = dataPolicy.images.filter((image) => data.images?.includes(image.url));
    let idtemp: number[] = [];
    if ((defaultImg?.length || 0) > 0) {
      defaultImg?.forEach(async (image, index) => {
        const imgs = await handleUpload(image as File);
        idtemp = [...idtemp, imgs.id];
        dispatch(setIdTempEdit(idtemp));
        if (index === (defaultImg.length || 0) - 1) dispatch(setCheckImageEdit(true));
      });
    } else {
      let imgId = dataPolicy.thumbnail.id;
      if (typeof data.thumbnail === 'object') {
        const img = await handleUpload(data.thumbnail as File);
        imgId = img.id;
      }

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
      const dataEdit: IFormPolicyNew = {
        thumbnailId: imgId,
        author: data.author,
        field: 'WOOD',
        isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
        categoryId: data.category.value,
        images: getIdNew.map((idImage) => idImage.id),
        translations,
      };
      mutate({ data: dataEdit, id: parseInt(id as string) });
    }
  };
  const { data: categoryData } = useGetAllCategory();
  const categoriesOption = categoryData?.data?.data?.map((item: Category) => ({
    value: item.id,
    label: item.name,
  }));
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
    navigate(PATH_DASHBOARD.policy.list);
  };
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
                  key={`translations.${selectedLang.value}.title`}
                  label="Title"
                />

                <RHFTextField
                  name={`translations.${selectedLang.value}.slug`}
                  key={`translations.${selectedLang.value}.slug`}
                  label="Slug"
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
                Edit
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
