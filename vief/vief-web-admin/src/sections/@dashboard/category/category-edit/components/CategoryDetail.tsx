import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import _, { transform } from 'lodash';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { BooleanEnum } from 'src/common/constants/common.constants';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
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
import { getTranslationByLang } from 'src/utils/getTranslationByLang';
import { isTranslateNotEmpty } from 'src/utils/isTranslateNotEmpty';
import { defaultValues, LANG } from '../../constants';
import { categoryPolicyDetailSelector, selectedLangSelector } from '../../categoryPolicy.slice';
import { useEditCategory } from '../../hooks/useEditCategoryPolicy';
import {
  IFormCategoryPolicyNew,
  IFormCategoryPolicyValuesProps,
  ITranslateDetail,
  ITranslations,
} from '../../interfaces';
import { CategorySchema } from '../../schema/category.schema';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const transformDataEdit = (
  data: IFormCategoryPolicyValuesProps,
  imgId: number,
  translations: ITranslations[]
) => {
  const returnValue: IFormCategoryPolicyNew = {
    type: 'POLICY',
    thumbnailId: imgId,
    field: 'WOOD',
    isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
    translations,
  };
  return returnValue;
};

export default function CategoryDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.categoryId;
  const { handleUpload } = usePresignImg();
  const { useDeepCompareEffect } = useDeepEffect();

  const selectedLang = useSelector(selectedLangSelector);

  const dataCategory = useSelector(categoryPolicyDetailSelector);

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Edit category successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Edit category error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useEditCategory({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.policy.categories);
  }, [isSuccess]);

  const methods = useForm<IFormCategoryPolicyValuesProps>({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    setValue,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  useDeepCompareEffect(() => {
    if (dataCategory?.isFeature)
      setValue('isFeature', dataCategory.isFeature === BooleanEnum.TRUE ? true : false);
    if (dataCategory?.thumbnail?.url) setValue('thumbnail', dataCategory.thumbnail.url);

    if (dataCategory?.translates) {
      const transVi = getTranslationByLang<ITranslateDetail>(LANG.VI, dataCategory.translates);
      if (!_.isEmpty(transVi)) setValue('translations.vi', transVi as never);
      const transEn = getTranslationByLang<ITranslateDetail>(LANG.EN, dataCategory.translates);
      if (!_.isEmpty(transEn)) setValue('translations.en', transEn as never);
    }
  }, [dataCategory]);

  const onSubmit = async (data: IFormCategoryPolicyValuesProps) => {
    let imgId = dataCategory.thumbnail.id;
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
    const dataEdit = transformDataEdit(data, imgId, translations);
    const idEdit = Number(id);
    if (!isNaN(idEdit) && id) {
      mutate({ data: dataEdit, id: idEdit });
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

  const handleCancel = () => {
    navigate(PATH_DASHBOARD.policy.root);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField
                  name={`translations.${selectedLang.value}.name`}
                  key={`translations.${selectedLang.value}.name`}
                  label="Name"
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
                Edit
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
