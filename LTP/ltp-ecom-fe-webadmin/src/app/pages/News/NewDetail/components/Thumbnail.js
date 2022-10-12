import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

import { FiUpload } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: '10px 0',
    // fontSize: '14px'
  },
  gridItemLeft: {
    padding: '0px 10px 0px 0px',
    margin: 'auto'
  },
  gridItemRight: {
    padding: '0px 0px 0px 10px'
  },
  featureProductCount: {
    color: '#ED0017',
    fontWeight: 'italic'
  },
  input: {
    width: '100%',
    fontSize: '14px !important'
  },
  textarea: {
    width: '100%',
    fontSize: '14px'
  },
  thumbnail: {
    padding: '0px 0px 0px 20px',
  },
  thumbnailBox: {
    backgroundColor: '#EDF3FD',
    borderRadius: '4px',
    height: '220px',
    textAlign: 'center',
    border: '1px dashed #E2E2E2'
  },
  thumbnailBoxContent: {
    margin: 'auto',
    fontSize: '12px'
  },
  thumbnailBoxPreview: {
    width: '100%',
    height: '100&',
    position: 'relative',
    backgroundSize: 'cover',
  },
  uploadBtn: {
    color: '#ffffff',
    backgroundColor: '#2F49D1',
    padding: '10px 25px'
  },
  thumbnailContentRemove: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '32px',
    height: '32px',
  },
  title: {
    fontSize: '14px',
    color: "#000000",
    fontWeight: '400',
    paddingTop: '10px'
  }
}));

export default function Thumbnail({data, lan}) {

  const classes = useStyles();
  const [thumbnailSrc, setThumbnailSrc] = useState(data.thumbnailUrl);
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...myFiles, ...acceptedFiles])
  }, [myFiles])

  const {getRootProps, getInputProps, open} = useDropzone({ noClick: true, onDrop });

  const getThumbnailSrc = (file) => {
    const reader  = new FileReader();
    reader.onloadend = function () {
      setThumbnailSrc(reader.result);
    }
    reader.readAsDataURL(file);
  }

  if(myFiles.length > 0) {
    getThumbnailSrc(myFiles[0]);
  }

  const handleDeleteThumbnail = () => {
    setMyFiles([]);
    setThumbnailSrc('');
  }

  return (
    <>
      <p className={classes.title}>{lan === 'vi' ? 'Ảnh thumbnail' : 'Thumbnail image'}</p>
      <Box className={classes.thumbnailBox}>
        {/* {thumbnailSrc !== '' && (
          <div
            className={classes.thumbnailBoxPreview}
            style={{ backgroundImage: `url(${thumbnailSrc})`}}
          >
            <TiDelete className={classes.thumbnailContentRemove} onClick={handleDeleteThumbnail} />
          </div>
        )}
        {myFiles.length === 0 && (
          <div {...getRootProps({className: 'dropzone'})} className={classes.thumbnailBoxContent}>
            <p>Kéo file vào đây hoặc:</p>
            <p>
              <Button
                startIcon={<FiUpload />}
                className={classes.uploadBtn}
                onClick={open}
              >Upload</Button>
              <input {...getInputProps()} />
            </p>
            <p style={{color: '#6a6a6a'}}><i>Kích thước ảnh: 776x424</i></p>
          </div>
        )} */}
        <img src={data.thumbnailUrl} height={220} width={345} alt="LTP" />
      </Box>
    </>
  )
}