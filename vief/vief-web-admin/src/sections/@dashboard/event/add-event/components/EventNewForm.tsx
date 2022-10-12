import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BooleanEnum } from 'src/common/constants/common.constants';
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
import { isTranslateNotEmpty } from 'src/utils/isTranslateNotEmpty';
import { defaultValues, LANG } from '../../constants';
import { selectedLangSelector } from '../../event.slice';
import { useAddEvent } from '../../hooks/useAddEvent';
import { IFormEventNew, IFormEventValuesProps, ITranslations } from '../../interfaces';
import { NewEventSchema } from '../../schema/event.schema';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function EventNewForm() {
  const navigate = useNavigate();
  const { handleUpload } = usePresignImg();

  const selectedLang = useSelector(selectedLangSelector);

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar('Add events successfully', {
      variant: 'success',
    });
  };
  const onError = () => {
    enqueueSnackbar('Add error', {
      variant: 'error',
    });
  };
  const { mutate, isSuccess } = useAddEvent({ onSuccess, onError });

  useEffect(() => {
    if (isSuccess) navigate(PATH_DASHBOARD.event.list);
  }, [isSuccess]);

  const methods = useForm<IFormEventValuesProps>({
    resolver: yupResolver(NewEventSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IFormEventValuesProps) => {
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
    const dataEvent: IFormEventNew = {
      thumbnailId: img.id,
      field: 'WOOD',
      isFeature: data.isFeature ? BooleanEnum.TRUE : BooleanEnum.FALSE,
      location: data.location,
      timeStart: convertDateToIOS(data.timeStart || new Date()),
      translations,
    };
    mutate(dataEvent);
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
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
