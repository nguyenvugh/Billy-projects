import { useNavigate, useParams } from 'react-router-dom';
import { useGetArticleById } from '../hooks/useGetArticleById';
import { useEditArticle } from '../hooks/useEditArticle';
// @mui
import { LoadingButton } from '@mui/lab';
import { Button, Card, FormControl, FormHelperText, Grid, Stack } from '@mui/material';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';
import LoadingScreen from 'src/components/LoadingScreen';
import DropZoneImage from '../components/DropZoneImage';
import DropZoneMultipleImage from '../components/DropZoneMultipleImage';
import { useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ArticleEnterpriseSchema } from '../schema/article.Schema';
import { useGetAllCategory } from '../hooks/useGetAllCategory';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { ICategory, ICateOption, IFileThumb, IFormType } from '../interfaces';
// redux
import { dispatch, useSelector } from 'src/redux/store';
import { editTimeSelector, langSelector, setEditTime } from '../articleSlice';
import { FIELD, FORM_DEFAULT_VALUE, LANG, MAX_NUM_THUMB_UPLOAD } from '../constants';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import {
  getFormDefaultValues,
  getImagesID,
  LabelStyle,
  postTranslations,
} from '../components/ultil';
import { BooleanEnum } from 'src/common/constants/common.constants';
import { useSnackbar } from 'notistack';

// -----------------------------------------

export default function ArticleEnterpriseEdit() {
  const { useDeepCompareEffect } = useDeepEffect();
  const { enqueueSnackbar } = useSnackbar();
  const { handleUpload } = usePresignImg();
  const navigate = useNavigate();
  const { mutate: editArticle } = useEditArticle();

  const params = useParams();
  const idParams = params?.id;
  let idArticle = parseInt(idParams as string);
  const { data: articleById } = useGetArticleById(idArticle);

  // redux
  const lang = useSelector(langSelector);
  const editTime = useSelector(editTimeSelector);

  const [thumb, setThumb] = useState<any>();
  const [images, setImages] = useState<any>();
  useDeepCompareEffect(() => {
    let thumb = [
      {
        name: articleById?.data?.thumbnail.id,
        preview: articleById?.data?.thumbnail?.url,
      },
    ];
    let images = articleById?.data?.images?.map((item: any) => {
      return {
        name: item.id,
        preview: item.url,
      };
    });
    setThumb(thumb);
    setImages(images);
  }, [articleById?.data]);
  // form
  const methods = useForm<IFormType>({
    resolver: yupResolver(ArticleEnterpriseSchema),
    defaultValues: FORM_DEFAULT_VALUE,
  });
  const {
    setValue,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  // on submit
  const onSubmit = async (data: IFormType) => {
    dispatch(setEditTime(true));
    const postTranslates = postTranslations(data);
    let resThumbId: number | string = data.thumbnailImg[0].name;
    if ((data.thumbnailImg[0] as IFileThumb).preview !== formDefault.thumbnailImg[0].preview) {
      const res = await handleUpload(data.thumbnailImg[0] as File);
      resThumbId = res.id;
    }
    const ObjImagesId = getImagesID(data.images);
    let imagesIds: any = [];
    let temp: any = {};
    if (ObjImagesId?.default.length) imagesIds = imagesIds.concat(ObjImagesId.default);
    if (ObjImagesId.newID.length) {
      // await Promise.all(
      //   ObjImagesId.newID.map(async (file: any, index: number) => {
      for (const file of ObjImagesId.newID) {
        let resID = await handleUpload(file as File);
        imagesIds = [...imagesIds, resID?.id];
        temp = {
          images: imagesIds,
          thumbnailId: resThumbId,
          translations: postTranslates,
          categoryId: Number(data?.categoryId),
          isFeature: data?.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
          author: data?.author,
          field: FIELD.WOOD,
        };
      }
    } else {
      temp = {
        images: imagesIds,
        thumbnailId: resThumbId,
        translations: postTranslates,
        categoryId: Number(data?.categoryId),
        isFeature: data?.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
        author: data?.author,
        field: FIELD.WOOD,
      };
    }
    let editData = { id: idArticle, newData: temp };
    editArticle(editData, {
      onSuccess: () => {
        dispatch(setEditTime(false));
        enqueueSnackbar('Edit article successfully', {
          variant: 'success',
        });
      },
      onError: () => {
        dispatch(setEditTime(false));
        enqueueSnackbar('Edit article failed', {
          variant: 'error',
        });
      },
    });
  };

  // set default value
  const formDefault = getFormDefaultValues(articleById?.data);
  useDeepCompareEffect(() => {
    if (formDefault) {
      setValue('author', formDefault?.author);
      setValue('categoryId', `${formDefault.categoryId}`);
      setValue('isFeature', formDefault?.isFeature);
      setValue(`translations`, formDefault?.translations);
    }
  }, [articleById?.data]);

  const handleOnCancel = () => {
    navigate(PATH_DASHBOARD.enterprise.articles);
  };
  // select
  const { data: categoryData } = useGetAllCategory('ENTERPRISE');
  const CATEGORY_OPTION = categoryData?.data?.data?.map((item: ICategory) => ({
    value: item?.id,
    label: item?.name,
  }));
  // upload image
  const handleUploadFileImg = (files: any) => {
    if (files.length) setValue('images', files);
    else setValue('images', []);
  };
  const handleUploadFileThumb = (files: any) => {
    if (files.length) setValue('thumbnailImg', files);
    else setValue('thumbnailImg', []);
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
                    name={`translations.${lang}.title`}
                    key={`translations.${lang}.title`}
                    label={lang === LANG.VI ? 'Tên bài viết' : 'Article name'}
                  />
                  <RHFTextField
                    name={`translations.${lang}.shortDesc`}
                    key={`translations.${lang}.shortDesc`}
                    label={lang === LANG.VI ? 'Mô tả ngắn gọn' : 'Short description'}
                    multiline
                    rows={3}
                  />
                  <LabelStyle>{lang === LANG.VI ? 'Nội dung' : 'Content'}</LabelStyle>
                  <RHFEditor
                    simple
                    name={`translations.${lang}.content`}
                    key={`translations.${lang}.content`}
                  />
                  <FormControl error={!!errors?.images}>
                    <LabelStyle>
                      {lang === LANG.EN ? 'Article images' : 'Ảnh cho bài viết'}
                    </LabelStyle>
                    <DropZoneMultipleImage
                      defaultImages={images}
                      mutateSuccess={editTime}
                      setMessError={setError}
                      handleUploadFileThumb={handleUploadFileImg}
                      maxFile={3}
                    />
                    <FormHelperText>{errors?.images?.message as string}</FormHelperText>
                  </FormControl>
                </>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFSwitch
                  name="isFeature"
                  label={lang === LANG.EN ? 'isFeature' : 'Nổi bật'}
                  labelPlacement="start"
                  defaultChecked
                  sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />
                <FormHelperText error>{errors?.isFeature?.message as string}</FormHelperText>

                <RHFTextField
                  name={`translations.${lang}.slug`}
                  key={`translations.${lang}.slug`}
                  label={lang === LANG.VI ? 'Mã bài viết' : 'Article slug'}
                />
                <RHFTextField
                  name={`author`}
                  label={lang === LANG.VI ? 'Tên tác giả ' : 'Author name'}
                />
                <RHFSelect
                  name={'categoryId'}
                  label={lang === LANG.EN ? 'Choose cateogry' : 'Chon danh muc'}
                >
                  <>
                    <option value="" />
                    {CATEGORY_OPTION?.map((category: ICateOption) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </>
                </RHFSelect>

                <FormControl error={!!errors?.thumbnailImg}>
                  <LabelStyle>{lang === LANG.EN ? 'Thumbnail Image' : 'Ảnh nền'}</LabelStyle>
                  <DropZoneImage
                    defaultThumb={thumb}
                    mutateSuccess={editTime}
                    maxFile={MAX_NUM_THUMB_UPLOAD}
                    setMessError={setError}
                    handleUploadFileThumb={handleUploadFileThumb}
                  />
                  <FormHelperText>{errors?.thumbnailImg?.message as string}</FormHelperText>
                </FormControl>
              </Stack>
            </Card>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={handleOnCancel}
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
                {lang === LANG.EN ? 'Save edit' : 'Chỉnh sửa'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
