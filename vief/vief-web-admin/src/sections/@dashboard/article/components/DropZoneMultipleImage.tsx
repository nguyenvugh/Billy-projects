import { Box, Stack, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIllustration } from 'src/assets';
import { MultiFilePreview } from 'src/components/upload';
import { IFileThumb } from '../interfaces';

const DropZoneMultipleImage = ({
  setMessError,
  mutateSuccess,
  messError,
  handleUploadFileThumb,
  maxFile,

  defaultImages,
}: {
  defaultImages?: IFileThumb[];
  mutateSuccess?: boolean;
  messError?: any;
  setMessError?: any;
  maxFile: number;
  handleUploadFileThumb: any;
}) => {
  const [files, setFiles] = useState<IFileThumb[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png', '.gif'],
    },
    maxFiles: maxFile,
    maxSize: 1000000,
    multiple: true,
    onDrop: (acceptedFiles: any, fileRejections: any) => {
      if (fileRejections?.length > 0) {
        setMessError('images', {
          type: 'requiered',
          images: 'The file format is incorrect or the file size has been exceeded',
        });
      }
      const copy = [...files].concat(
        acceptedFiles.map((file: MediaSource) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setFiles(copy);
    },
  });
  const onRemove = (file: string | File) => {
    const filtered = files.filter((item: IFileThumb) => {
      if (typeof file === 'string') {
        return item.preview !== file;
      } else {
        return item.name !== file.name;
      }
    });
    setFiles(filtered);
  };
  useEffect(() => {
    if (defaultImages) setFiles(defaultImages);
  }, [defaultImages]);

  useEffect(() => {
    if (mutateSuccess) setFiles([]);
  }, [mutateSuccess]);

  useEffect(() => {
    if (files) {
      return () => files.forEach((file: IFileThumb) => URL.revokeObjectURL(file.preview as string));
    }
  }, [files]);

  useEffect(() => {
    handleUploadFileThumb(files);
  }, [files]);

  return (
    <>
      <DropZoneStyle>
        <Box
          sx={{
            width: '100%',
            height: '80%px',
            borderRadius: '5px',
            textAlign: 'center',
            border: '2px dashed #E6E6E6',
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            direction={maxFile === 1 ? 'column' : 'row'}
            sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
          >
            <UploadIllustration sx={{ width: '50%', height: '50%' }} />

            <Box sx={{ p: 3 }}>
              <Typography gutterBottom variant="h5">
                Drop or Select file
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Drop files here or click&nbsp;
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: 'primary.main', textDecoration: 'underline' }}
                >
                  browse
                </Typography>
                &nbsp;thorough your machine
              </Typography>
            </Box>
          </Stack>
        </Box>
      </DropZoneStyle>
      <MultiFilePreview
        files={files ? files.map((item: IFileThumb) => item.preview) : []}
        showPreview={true}
        onRemove={onRemove}
      />
    </>
  );
};

export default DropZoneMultipleImage;

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(4, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));
