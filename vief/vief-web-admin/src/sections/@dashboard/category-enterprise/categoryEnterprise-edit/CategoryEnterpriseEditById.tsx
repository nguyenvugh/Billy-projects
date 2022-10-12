// hook form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { NewCategorySchema } from '../category.Schema';
import { usePresignImg } from 'src/common/hooks/usePresignImg';

// mui
import { LoadingButton } from '@mui/lab';
import { Button, Card, FormControl, FormHelperText, Grid, Stack } from '@mui/material';
import { FormProvider, RHFEditor, RHFSwitch, RHFTextField } from 'src/components/hook-form';
import LoadingScreen from 'src/components/LoadingScreen';
import DropZoneImage from '../components/DropZoneImage';
// hook
import { useGetCategoryEnterpriseById } from '../hooks/useGetcategoryEnterpriseById';
// interface
import { ICreateCategory } from '../interfaces';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { langSelector, setEditTime, editTimeSelector } from '../category.slice';
import { FORM_DEFAULT_VALUE, LANG_CONST, MAX_NUM_THUMB_UPLOAD } from '../constants';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditEnterpriseCategory } from '../hooks/useEditEnterpriseCategory';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { getFormDefaultValues, postTranslations, LabelStyle } from '../components/ultil';
import { BooleanEnum } from 'src/common/constants/common.constants';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useSnackbar } from 'notistack';

// -------------------------------------------

export default function CategoryEnterpriseEditById() {
  const params = useParams();
  const idParams = params?.id;
  let idCategory = parseInt(idParams as string);

  const { data: DataCategoryById } = useGetCategoryEnterpriseById(idCategory);
  const [thumbImage, setThumbImage] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();
  const { useDeepCompareEffect } = useDeepEffect();

  useDeepCompareEffect(() => {
    let example = [
      {
        name: DataCategoryById?.data?.thumbnail.id,
        preview: DataCategoryById?.data?.thumbnail.url,
      },
    ];
    setThumbImage(example);
  }, [DataCategoryById?.data]);

  const { handleUpload } = usePresignImg();
  // form

  const methods = useForm<ICreateCategory>({
    resolver: yupResolver(NewCategorySchema),
    defaultValues: FORM_DEFAULT_VALUE,
  });
  const {
    setValue,
    setError,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  // set default value

  const formDefault = getFormDefaultValues(DataCategoryById?.data);

  useDeepCompareEffect(() => {
    if (formDefault) {
      setValue('isFeature', formDefault?.isFeature);
      setValue('translations.en', formDefault?.translations?.[LANG_CONST.EN]);
      setValue('translations.vi', formDefault?.translations?.[LANG_CONST.VI]);
    }
  }, [formDefault]);

  // redux
  const lang = useSelector(langSelector);
  const editTime = useSelector(editTimeSelector);

  // on submit form
  const { mutate: mutateEdit } = useEditEnterpriseCategory();
  const onSubmit = async (data: ICreateCategory) => {
    dispatch(setEditTime(true));
    let resThumbId: number = data.thumbnailId[0].name;
    if (data.thumbnailId[0].preview !== formDefault.thumbnailId[0].preview) {
      const res = await handleUpload(data?.thumbnailId[0]);
      resThumbId = res.id;
    }
    const translation = postTranslations(data);
    let fixFomatData = {
      type: 'ENTERPRISE',
      thumbnailId: resThumbId,
      field: 'WOOD',
      isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
      translations: translation,
    };

    let editData = {
      id: idCategory,
      newData: fixFomatData,
    };
    // call api
    mutateEdit(editData, {
      onSuccess: () => {
        dispatch(setEditTime(false));
        enqueueSnackbar('Edit category successfully', {
          variant: 'success',
        });
      },
      onError: () => {
        dispatch(setEditTime(false));
        enqueueSnackbar('Edit category failed', {
          variant: 'error',
        });
      },
    });
  };

  const handleUploadFileThumb = (files: any) => {
    if (files.length) setValue('thumbnailId', files);
  };
  const navigate = useNavigate();
  const handleOnCancel = () => {
    navigate(PATH_DASHBOARD.enterprise.categories);
  };

  return (
    <>
      {editTime && <LoadingScreen />}
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
                    defaultThumb={thumbImage}
                    mutateSuccess={editTime}
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
                {lang === LANG_CONST.EN ? 'Save' : 'Lưu'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
