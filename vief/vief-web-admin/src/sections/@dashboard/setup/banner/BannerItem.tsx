import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lang } from 'src/common/constants/common.interfaces';
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/components/hook-form';
import Iconify from 'src/components/Iconify';
import { SelectLang } from 'src/components/SelectLang';
import { usePresigned } from 'src/hooks/usePresigned';
import { DEFAULT_BANNER, DEFAULT_TRANSLATE, langs } from './constants';
import {
  Banner,
  BannerTranslates,
  CreateBannerForm,
  CreateBannerPayload,
  LangObj,
  TranslateDefault,
} from './interfaces';
import { BannerSchema } from './schema';
import { useServices } from './useServices';
import { faker } from '@faker-js/faker';
import { ENVIRONMENT } from 'src/common/constants/common.constants';

type BannerItemProps = {
  title?: string;
  defaultValue: Banner;
  editorId: string;
  isEditing?: boolean;
  onActionsSuccess: () => void;
  onRemoveTemporaryBanner: (id: string | number) => void;
};
function BannerItem({
  title,
  defaultValue = DEFAULT_BANNER(),
  editorId,
  isEditing,
  onActionsSuccess,
  onRemoveTemporaryBanner,
}: BannerItemProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLang, setSelectedLang] = useState<LangObj>(langs.vi);

  const translatesData = handleTransformTranslateData();
  const [dataTranslates, setDataTranslates] = useState<TranslateDefault>(
    translatesData || DEFAULT_TRANSLATE
  );

  const {
    createBannerService,
    editBannerService,
    deleteBannersService,
    isDeletingBanner,
    isEditingBanner,
    isCreatingBanner,
  } = useServices();
  const { handleUpload } = usePresigned();

  const methods = useForm<CreateBannerForm>({
    resolver: yupResolver(BannerSchema),
  });
  const { watch, setValue, handleSubmit } = methods;
  const values = watch();
  const isDisabled = !isEditMode && isEditing;
  const isDisabledBtn = isEditingBanner || isCreatingBanner || isDeletingBanner;

  useEffect(() => {
    const defaultValue = getDefaultDataForm();
    handleSetDefaultValue(defaultValue);
  }, []);

  useEffect(() => {
    handleUpdateDataTranslates(dataTranslates);
  }, [JSON.stringify(values)]);

  function handleTransformTranslateData() {
    return defaultValue.translates.reduce((pre, current) => {
      pre = { ...pre, [current.lang]: current };
      return pre;
    }, DEFAULT_TRANSLATE);
  }

  function getDefaultDataForm() {
    const defaultValues = defaultValue.translates.find((it) => it.lang === selectedLang.value);
    return {
      title: defaultValues?.title,
      subTitle: defaultValues?.subTitle,
      shortDesc: defaultValues?.shortDesc,
      link: defaultValue.link,
      image: defaultValue.image.url,
    } as CreateBannerForm;
  }

  function handleUpdateDataTranslates(originData: TranslateDefault) {
    const currentLang = (selectedLang.value || 'vi') as Lang;
    const updateDataTranslates: CreateBannerForm = {
      ...originData[currentLang],
      title: values.title,
      subTitle: values.subTitle,
      shortDesc: values.shortDesc,
      link: values.link,
      image: values.image,
    };
    setDataTranslates({ ...originData, [currentLang]: updateDataTranslates });
  }

  function updateDataForm({ title, subTitle, shortDesc }: BannerTranslates) {
    setValue('title', title);
    setValue('subTitle', subTitle);
    setValue('shortDesc', shortDesc);
  }

  function handleSetDefaultValue({ title, subTitle, shortDesc, link, image }: CreateBannerForm) {
    setValue('title', title);
    setValue('subTitle', subTitle);
    setValue('shortDesc', shortDesc);
    setValue('link', link);
    setValue('image', image);
  }

  function onSubmit(data: CreateBannerForm) {
    handleSubmitData(data);
  }

  async function handleSubmitData(data: CreateBannerForm) {
    const { image, link } = data;
    const { inValidData, isValid, translations } = handleValidateTranslate();
    if (!isValid && inValidData) {
      setSelectedLang(langs[inValidData.lang || 'vi']);
      return;
    }
    const imageId =
      typeof image === 'string' ? defaultValue.image.id : (await handleUpload(image as File))?.id;
    const dataPayload: CreateBannerPayload = {
      link: link || '',
      imageId: imageId || -1,
      field: 'WOOD',
      translations,
    };
    isEditing
      ? await editBannerService(dataPayload, defaultValue.id!!)
      : await createBannerService(dataPayload);
    onActionsSuccess();
    setIsEditMode(false);
  }

  function handleValidateTranslate() {
    const translations: BannerTranslates[] = [];
    let inValidData: BannerTranslates = dataTranslates.vi;
    let isValid = true;
    const dataArr = Object.keys(dataTranslates).map((lang) => dataTranslates[lang as Lang]);
    dataArr.forEach((data) => {
      if (data.title && data.shortDesc && data.subTitle) {
        translations.push(data);
      } else if (!(data.title && data.shortDesc && data.subTitle)) {
        inValidData = data;
      } else isValid = false;
    });

    return { translations, isValid, inValidData };
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  async function handleDeleteBanner() {
    if (isEditing) {
      await deleteBannersService([defaultValue.id || -1]);
      onActionsSuccess();
      return;
    }
    defaultValue.temporaryId && onRemoveTemporaryBanner(defaultValue.temporaryId);
  }

  function handleLangChange(lang: LangObj) {
    updateDataForm(dataTranslates[lang.value]);
    setSelectedLang(lang);
  }

  function handleCancel() {
    setIsEditMode(false);
    handleUpdateDataTranslates(translatesData);
    handleSetDefaultValue(getDefaultDataForm());
  }

  function generateData() {
    const mainTitle = faker.commerce.productName();
    setValue('title', mainTitle);
    const subTitle = faker.commerce.productMaterial();
    setValue('subTitle', subTitle);
    const link = faker.internet.url();
    setValue('link', link);
    const content = faker.commerce.productDescription();
    setValue('shortDesc', content);
  }

  return (
    <Card sx={{ p: '15px', mb: '22px' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">{title}</Typography>

          <Stack direction="row" alignItems="center" spacing="12px">
            <SelectLang onLangChange={handleLangChange} lang={selectedLang.value} />
            {process.env.REACT_APP_ENV_DEPLOY !== ENVIRONMENT.PRODUCTION && 
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon={'eva:save-fill'} />}
              type="button"
              loading={isEditingBanner}
              onClick={generateData}
            >
              Tạo tự động
            </LoadingButton>}
            {isEditMode ? (
              <>
                <LoadingButton
                  variant="contained"
                  startIcon={<Iconify icon={'eva:save-fill'} />}
                  type="submit"
                  loading={isEditingBanner}
                >
                  Lưu
                </LoadingButton>
                <Button
                  variant="text"
                  startIcon={<Iconify icon={'eva:cancel-fill'} />}
                  onClick={handleCancel}
                  disabled={isDisabledBtn}
                >
                  Huỷ
                </Button>
              </>
            ) : (
              <LoadingButton
                variant="contained"
                startIcon={<Iconify icon={isEditing ? 'eva:edit-fill' : 'eva:save-fill'} />}
                onClick={isEditing ? () => setIsEditMode(true) : handleSubmit(onSubmit)}
                disabled={isDisabledBtn}
                loading={isCreatingBanner}
              >
                {isEditing ? 'Chỉnh sửa' : 'Lưu lại'}
              </LoadingButton>
            )}
            <LoadingButton
              variant="outlined"
              startIcon={<Iconify icon={'eva:trash-fill'} />}
              disabled={isDisabledBtn}
              onClick={handleDeleteBanner}
              loading={isDeletingBanner}
            >
              Xoá
            </LoadingButton>
          </Stack>
        </Stack>

        <Box mt="12px">
          <Stack direction="row" spacing={3}>
            <Stack spacing={3}>
              <RHFUploadSingleFile
                name="image"
                maxSize={3145728}
                onDrop={handleDrop}
                disabled={isDisabled}
              />
              <RHFTextField name="link" label="Liên kết" disabled={isDisabled} />
            </Stack>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Tiêu đề" disabled={isDisabled} />

              <RHFTextField name="subTitle" label="Tiêu đề con" disabled={isDisabled} />

              <div>
                <Typography variant="subtitle2">Mô tả</Typography>
                <RHFEditor
                  className="category__text-editor"
                  key={editorId}
                  disabled={isDisabled}
                  toolbarId={editorId}
                  simple
                  name="shortDesc"
                />
              </div>
            </Stack>
          </Stack>
        </Box>
      </FormProvider>
    </Card>
  );
}

export { BannerItem };
