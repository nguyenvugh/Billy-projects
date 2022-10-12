import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSnackbar, VariantType } from 'notistack';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { FieldEnum, SIZE } from 'src/common/constants/common.constants';
import { Lang } from 'src/common/constants/common.interfaces';
import { translatesToObj } from 'src/common/constants/common.utils';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from 'src/components/hook-form';
import { usePresigned } from 'src/hooks/usePresigned';
import { useAddDocuments } from '../hooks/useAddDocuments';
import { useEditDocuments } from '../hooks/useEditDocuments';
import {
  Document,
  DocumentForm,
  DocumentPayload,
  DocumentTranslate,
  IFormDocumentTranslate,
} from '../interface';
import { documentSchema } from '../schema';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  title: string;
  isOpen: boolean;
  onClose?: Function;
  defaultDocument?: Document;
  isEditMode?: boolean;
};
function CreateEditDocument({ title, isOpen, onClose, defaultDocument, isEditMode }: Props) {
  const { handleUpload } = usePresigned();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  function handleAfterMutateDoc(message: string, variant?: VariantType) {
    enqueueSnackbar(message, { variant });
    onClose && onClose();
    queryClient.invalidateQueries([QUERY_KEYS.DOCUMENT_LIST]);
  }
  const { mutate: mutationAddDoc, isLoading: isAdding } = useAddDocuments({
    onSuccess: () => handleAfterMutateDoc('Thêm tài liệu thành công!'),
    onError: () => handleAfterMutateDoc('Có lỗi xảy ra, xin thử lại!', 'error'),
  });
  const { mutate: mutationEditDoc, isLoading: isEditing } = useEditDocuments({
    onSuccess: () => handleAfterMutateDoc('Sửa tài liệu thành công!'),
    onError: () => handleAfterMutateDoc('Có lỗi xảy ra, xin thử lại!', 'error'),
  });
  const isMutating = isAdding || isEditing;

  const methods = useForm<DocumentForm>({ resolver: yupResolver(documentSchema) });
  const { setValue, handleSubmit } = methods;

  React.useEffect(() => {
    isEditMode && handleSetDefaultValue(defaultDocument);
  }, []);

  function handleClose() {
    onClose && onClose();
  }

  async function onSubmit({ field, fileId, translations }: DocumentForm) {
    const validTranslates = getValidTranslations(translations);
    const validFileId = await getValidFileId(fileId);
    const validData: DocumentPayload = {
      field,
      fileId: validFileId || -1,
      translations: validTranslates,
    };

    isEditMode
      ? mutationEditDoc({ ...validData, id: defaultDocument?.id || -1 })
      : mutationAddDoc(validData);
  }

  async function getValidFileId(file: any) {
    return typeof file === 'string'
      ? defaultDocument?.file.id
      : (await handleUpload(file as File))?.id;
  }

  function getValidTranslations(translations: IFormDocumentTranslate) {
    return Object.keys(translations).reduce((previous, lang) => {
      previous = [
        ...previous,
        { lang: lang as Lang, shortDesc: translations[lang as Lang].shortDesc },
      ];
      return previous;
    }, [] as DocumentTranslate[]);
  }

  const handleDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'fileId',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  function handleSetDefaultValue(document?: Document) {
    if (!document) return;
    const { field, file, translates } = document;
    const translatesObj = translatesToObj(translates);
    setValue('field', field);
    setValue('fileId', file.url);
    setValue('translations.en', translatesObj.en);
    setValue('translations.vi', translatesObj.vi);
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Stack spacing={3}>
                <RHFUploadSingleFile
                  imagePreview={'/images/pdf-thumnail.png'}
                  disabled={isEditMode}
                  name="fileId"
                  maxSize={SIZE['8mb']}
                  onDrop={handleDrop}
                  accept={{ 'application/pdf': ['.pdf'] }}
                />
                <RHFSelect
                  label="Lĩnh vực"
                  name="field"
                  fullWidth={false}
                  placeholder="Lĩnh vực"
                  isNonNative={true}
                >
                  {Object.values(FieldEnum).map((field) => (
                    <MenuItem key={field} value={field}>
                      {field}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFTextField
                  name={`translations.vi.shortDesc`}
                  key={`translations.vi.shortDesc`}
                  label="Mô tả tiếng việt"
                />
                <RHFTextField
                  name={`translations.en.shortDesc`}
                  key={`translations.en.shortDesc`}
                  label="Mô tả tiếng anh"
                />
              </Stack>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Huỷ
            </Button>
            <LoadingButton variant="contained" type="submit" loading={isMutating}>
              {isEditMode ? 'Sửa' : 'Thêm'}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
}

export { CreateEditDocument };
