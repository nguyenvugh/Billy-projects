import React, { useEffect, useRef, useState } from 'react';
import { Grid, makeStyles, Modal, InputBase, InputAdornment, InputLabel, Button, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import EventIcon from '@material-ui/icons/Event';
import { Publish } from '@material-ui/icons';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles({
  root: {
    marginTop: '12px',
    position: 'relative',
    // overflow: 'hidden',
  },
  label: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#000000'
  },
  emptyLabel: {
    userSelect: 'none',
    msUserSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    color: 'transparent'
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: '12px',
    fontWeight: 500,

    color: 'transparent',
    padding: 0,
    zIndex: 9,

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    '& .MuiInputBase-input': {
      width: '100%',
      height: '100%',
      padding: 0
    },

    '& ::-webkit-file-upload-button': {
      display: 'none'
    },

    '& .Mui-disabled': {
      opacity: 0
    },

  },
  suffix: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#000000',

    marginLeft: '16px'
  },

  uploadContainer: {
    display: 'flex',
    height: 230,
    backgroundColor: '#EDF3FD',
    flexDirection: 'column',
    position: 'relative',

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: '6px',

    border: '1px dashed #E2E2E2',
    borderRadius: '5px',
    padding: '6px 3px'

  },

  button: {
    backgroundColor: '#2F49D1',
    padding: '6px 24px',

  },
  labelButton: {
    fontSize: 14,
    fontWeight: 600,
    color: '#ffffff',
    textTransform: 'capitalize'
  },

  uploadTitle: {
    color: '#373737',
    fontSize: 14,
    fontWeight: 400,

    marginBottom: '1em',
  },
  uploadDesc: {
    color: '#6A6A6A',
    fontSize: 12,
    fontStyle: 'italic',
    fontWeight: 400,

    marginTop: '1em',
  },

  ratioBox: {
    width: '100%',
    paddingBottom: '230px',
    position: 'relative',
    borderRadius: 4,

    '&:hover  div': {
      display: 'flex'
    },

    '& > button': {
      position: 'absolute',
      right: 0,
      zIndex: 99,
      color: '#323232'
    },
    '& > div': {
      display: 'flex',
      backgroundColor: '#2B2B2B60',
      alignItems: 'center',
      justifyContent: 'center',

      position: 'absolute',
      top: 0,
      left: -3,
      right: -3,
      bottom: 0,
      cursor: 'pointer',
      borderRadius: 4,

      '& > button': {
        border: '1px solid #ffffff',
        backgroundColor: 'transparent'
      }
    },


  },

  image: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    borderRadius: '5px',
    margin: '0 auto',
    objectFit: 'contain',
  },
  error: {
    fontSize: 12,
    fontWeight: 400,
    color: '#EA403F',
    marginTop: 8
  }
});



function ImagePicker({ id, defaultValue, labelName, onChange, uploadTitle, uploadDesc, readOnly, isOpen, error, required, showEdit }) {
  const classes = useStyles();
  const ref = useRef();
  const isError = error && error.length > 0 ? true : false;

  const [image, setImage] = useState('');

  useEffect(() => {
    setImage(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (!ref.current) return;
    isOpen && ref.current.click();
  }, [isOpen]);

  const handleChange = (event) => {
    if (event.target.files.length === 0) return;
    const fileReader = new FileReader();
    const value = event.target.value;
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = (eventFR) => {
      console.log(eventFR);
      setImage(eventFR.target.result);
    };

    onChange && onChange(event);
  };


  const handleDeleteImage = () => {
    setImage('');
    onChange && onChange('');
  };
  const renderImagePicked = () => {
    return <div className={classes.ratioBox}>
      <img src={image} className={classes.image} />
      {!readOnly && <IconButton onClick={handleDeleteImage}>
        <CancelIcon />
      </IconButton>}

      {!readOnly && <div>
        <Button
          classes={{
            root: classes.button,
            label: classes.labelButton
          }}
          variant='contained'
          startIcon={<EditIcon />}
        >Chỉnh sửa</Button>
      </div>}
    </div>;
  };

  const renderPlaceholder = () => {
    return <>
      <span className={classes.uploadTitle}>{uploadTitle}</span>
      <Button
        classes={{
          root: classes.button,
          label: classes.labelButton
        }}
        variant='contained'
        startIcon={<Publish />}
      >Upload</Button>
      <span className={classes.uploadDesc}>{uploadDesc}</span>
      {isError && <span className={classes.error}>{error}</span>}
    </>;
  };
  return (
    <div className={classes.root}>
      <InputLabel
        className={`${classes.label} ${!labelName && classes.emptyLabel}`}
        htmlFor={id}>
        {labelName}
        <span className={`${!required && classes.emptyLabel}`}> *</span>
      </InputLabel>

      <div className={classes.uploadContainer}>
        <InputBase
          readOnly={readOnly}
          disabled={readOnly}
          inputRef={ref}
          onChange={handleChange}
          id={id}
          type='file'
          inputProps={{
            accept: 'image/*',
          }}
          className={classes.input}
        />

        {image
          ? renderImagePicked()
          : renderPlaceholder()
        }
      </div>
    </div>
  );
}

ImagePicker.propTypes = {
  // type: PropTypes.oneOf(['date', 'time', 'datetime-local'])
};

ImagePicker.defaultProps = {
  // type: 'date'
  uploadTitle: 'Kéo ảnh vào đây hoặc:',
  uploadDesc: '(Kích thước ảnh: 1920x1080)',
  required: false
};

export default ImagePicker;