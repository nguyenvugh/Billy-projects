import { Box, Grid, Input, Stack, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIllustration } from 'src/assets';
import { byteToMb } from 'src/utils/byteToMb.utils';
import { MAX_NUM_THUMB_UPLOAD } from '../constants';
import { IFileThumb } from '../interfaces';

const DropZoneImage = ({
  setMessError,
  mutateSuccess,
  messError,
  clearErrors,
  handleUploadFileThumb,
  maxFile,
  defaultThumb,
}: {
  defaultThumb?: IFileThumb[];
  mutateSuccess?: boolean;
  messError?: any;
  setMessError: any;
  maxFile: number;
  clearErrors?: any;
  handleUploadFileThumb: any;
}) => {
  const [files, setFiles] = useState<IFileThumb[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png', '.gif'],
    },
    maxFiles: maxFile,
    maxSize: 1000000,
    onDrop: (acceptedFiles: any, fileRejections: any) => {
      if (fileRejections?.length) {
        setMessError('thumbnailImg', {
          type: 'requiered',
          audioThumbnailId: 'The file format is incorrect or the file size has been exceeded',
        });
      }
      setFiles(
        acceptedFiles.map((file: MediaSource) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  useEffect(() => {
    if (defaultThumb) setFiles(defaultThumb);
  }, [defaultThumb]);

  useEffect(() => {
    if (mutateSuccess) setFiles([]);
  }, [mutateSuccess]);

  const thumb1 = files.map((file: IFileThumb, index: number) => (
    <Box key={index}>
      <img
        key={index}
        alt="empty"
        src={file.preview}
        onLoad={() => URL.revokeObjectURL(file?.name as string)}
      />
    </Box>
  ));
  const thumb = (
    <Grid container spacing={2}>
      {files.map((file: IFileThumb, index: number) => (
        <Grid item xs={6} key={index}>
          <img
            key={index}
            alt="empty"
            src={file.preview}
            onLoad={() => URL.revokeObjectURL(file?.name as string)}
          />
        </Grid>
      ))}
    </Grid>
  );

  const name = files.map((file: IFileThumb, index: number) => (
    <Box key={index}>
      {file.name} - {byteToMb(file?.size as number)} MB
    </Box>
  ));

  useEffect(() => {
    if (files) {
      return () => files.forEach((file: IFileThumb) => URL.revokeObjectURL(file.preview as string));
    }
  }, [files]);

  useEffect(() => {
    handleUploadFileThumb(files);
  }, [files]);

  return (
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
        <Input style={getInputProps()} />
        {files && files.length === 0 ? (
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            direction={maxFile === MAX_NUM_THUMB_UPLOAD ? 'column' : 'row'}
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
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}
          >
            {maxFile === 1 && <Box sx={{ width: '100%', height: '80%' }}>{thumb1}</Box>}

            {maxFile > 1 && <Box sx={{ width: '100%', height: '50%' }}>{thumb}</Box>}
            <Box sx={{ width: '100%', color: '#999999', fontSize: '12px', pt: '10px' }}>{name}</Box>
          </Box>
        )}
      </Box>
    </DropZoneStyle>
  );
};

export default DropZoneImage;

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
