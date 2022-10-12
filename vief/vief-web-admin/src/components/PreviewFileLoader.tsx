import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FileType } from 'src/common/constants/common.interfaces';

type LoaderPdfProps = {
  path: string;
  title: string;
  fileType: FileType;
};
const TYPE: Record<FileType, string> = {
  pdf: 'application/pdf',
  jpeg: 'image/pdf',
  jpg: 'image/jpg',
  png: 'image/png',
};
export function PreviewFileLoader({ path, title, fileType }: LoaderPdfProps) {
  const [data, setData] = useState('');
  useEffect(() => {
    if (['https://', 'http://'].includes(path)) {
      fetch(path)
        .then((res) => res.blob())
        .then(async (blob) => {
          setData(URL.createObjectURL(new Blob([blob], { type: TYPE[fileType] })));
        });
    } else setData(path);
  }, [path]);
  return (
    <Box sx={{ bgcolor: 'white', width: '100%', height: '100%' }}>
      <iframe title={title} src={data} />
    </Box>
  );
}
