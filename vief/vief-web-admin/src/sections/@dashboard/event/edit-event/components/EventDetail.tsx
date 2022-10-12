import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { convertDateToIOS } from 'src/utils/convertDateToIOS';
import { getTranslationByLang } from 'src/utils/getTranslationByLang';
import { isTranslateNotEmpty } from 'src/utils/isTranslateNotEmpty';
import { defaultValues, LANG } from '../../constants';
import { eventDetailSelector, selectedLangSelector } from '../../event.slice';
import { useEditEvent } from '../../hooks/useEditEvent';
import {
  IFormEventNew,
  IFormEventValuesProps,
  ITranslateDetail,
  ITranslations,
} from '../../interfaces';
import { NewEventSchema } from '../../schema/event.schema';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function EventDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params?.eventId;
  const { handleUpload } = usePresignImg();
  const { useDeepCompareEffect } = useDeepEffect();

  const selectedLang = useSelector(selectedLangSelector);

  const dataEvent = useSelector(eventDetailSelector);

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Edit events successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Edit error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useEditEvent({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.event.list);
  }, [isSuccess]);

  const methods = useForm<IFormEventValuesProps>({
    resolver: yupResolver(NewEventSchema),
    defaultValues,
  });

  const {
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useDeepCompareEffect(() => {
    if (dataEvent?.isFeature)
      setValue('isFeature', dataEvent.isFeature === BooleanEnum.TRUE ? true : false);
    if (dataEvent?.location) setValue('location', dataEvent.location);
    if (dataEvent?.thumbnail?.url) setValue('thumbnail', dataEvent.thumbnail.url);
    if (dataEvent?.timeStart) setValue('timeStart', new Date(dataEvent.timeStart));

    if (dataEvent?.translates) {
      const transVi = getTranslationByLang<ITranslateDetail>(LANG.VI, dataEvent.translates);
      if (!_.isEmpty(transVi)) setValue('translations.vi', transVi as never);
      const transEn = getTranslationByLang<ITranslateDetail>(LANG.EN, dataEvent.translates);
      if (!_.isEmpty(transEn)) setValue('translations.en', transEn as never);
    }
  }, [dataEvent]);

  const onSubmit = async (data: IFormEventValuesProps) => {
    let imgId = dataEvent.thumbnail.id;
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
    const dataEdit: IFormEventNew = {
      thumbnailId: imgId,
      field: 'WOOD',
      isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
      location: data.location,
      timeStart: convertDateToIOS(data.timeStart || new Date()),
      translations,
    };
    mutate({ data: dataEdit, id: parseInt(id as string) });
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
    navigate(PATH_DASHBOARD.event.list);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
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

                <RHFTextField name="location" label="Location" />

                <Controller
                  name="timeStart"
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      label="Start date"
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  )}
                />
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
