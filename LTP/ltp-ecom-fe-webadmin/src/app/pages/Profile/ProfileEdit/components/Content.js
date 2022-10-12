
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Box, MenuItem, Button, FormControlLabel, Checkbox,
 FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core';
import { FiUpload } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti';
import { ProfileEditContext } from '../context';
import { useContext, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  grid: {
		padding: "10px 0",
    width: "100%",
		// fontSize: '14px'
	},
	gridItemLeft: {
		padding: "0px 10px 0px 0px",
		margin: "auto",
	},
  gridItemLeftFull: {
    margin: "auto",
    marginBottom: '20px'
  },
	gridItemRight: {
		padding: "0px 0px 0px 10px",
	},
	featureProductCount: {
		color: "#ED0017",
		fontWeight: "italic",
	},
	input: {
		width: "100%",
		fontSize: "14px !important",
	},
	textarea: {
		width: "100%",
		fontSize: "14px",
	},
  imgBlock: {
    alignItems: "right"
  },
  img: {
    width: '100%',
    borderRadius: '56px'
  },
  contentBlock: {
    width: '100%'
  },
  childContent: {
    marginBottom: '25px'
  },
  title: {
    fontSize: "14px",
    lineHeight: '16px',
    color: "#000000",
    marginBottom: '8px'
  },
  info: {
    fontSize: "14px",
    lineHeight: '16px',
    color: "#000000"
  },
  boxContent: {
    paddingRight: '25px',
    paddingLeft: '25px',
    paddingTop: '15px',
    paddingBottom: '40px',
    backgroundColor: '#eceffb',
    borderRadius: '8px'
  },
  thumbnailBox: {
    backgroundColor: '#EDF3FD',
    borderRadius: '4px',
    height: '252px',
    width: '252px',
    textAlign: 'center',
    display: 'flex',
    border: '1px dashed #E2E2E2',
    margin: 'auto'
  },
  thumbnailBoxContent: {
    margin: 'auto',
    fontSize: '12px'
  },
  thumbnailBoxPreview: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
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
  marginBottom: {
    marginTop: '30px'
  }
}));

const sexList = [
  {
    id: 1,
    value: 1,
    label: 'Nam'
  },
  {
    id: 2,
    value: 2,
    label: ' Nữ'
  }
]

export default function Content({setFileAvatar, creationFormErrorMessages, setCreationFormErrorMessages}) {
  const classes = useStyles();
  const context = useContext(ProfileEditContext);
  const {state: {detail}} = context;

  const [myFiles, setMyFiles] = useState([]);
  const [enablePassword, setEnablePassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...myFiles, ...acceptedFiles])
  }, [myFiles]);

  const {getRootProps, getInputProps, open} = useDropzone({ noClick: true, onDrop });

  const getThumbnailSrc = (file) => {
    const reader  = new FileReader();
    reader.onloadend = function () {
      context.dispatch({
        type: 'updateDetailInput',
        payload: {
          key: 'thumbnail',
          value: reader.result
        }
      })
    }
    reader.readAsDataURL(file);
    setFileAvatar(file);
  }

  if(myFiles.length > 0 && detail.thumbnail === '') {
    getThumbnailSrc(myFiles[0]);
  }

  const handleDeleteThumbnail = () => {
    context.dispatch({
      type: 'updateDetailInput',
      payload: {
        key: 'thumbnail',
        value: ''
      }
    })
    setMyFiles([]);
    setFileAvatar(null);
  }

  const handleChange = (evt) => {
    context.dispatch({
			type: 'updateDetailInput',
			payload: {
				key: evt.target.name,
				value: evt.target.value
			}
		});
    if(evt.target.value !== '') {
      setCreationFormErrorMessages({
        ...creationFormErrorMessages,
        [evt.target.name]: ''
      })
    }
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

	return (
		<>
			<Grid container className={classes.grid}>
        <Grid item md={9} className={classes.contentBlock}>
          <Grid container className={classes.grid}>
            <Grid item md className={classes.gridItemLeft}>
              <div className={classes.title}>Tên tài khoản</div>
              <TextField
              disabled
              variant="outlined"
              className={classes.input}
              name="username"
              value={detail.username}
              size="small"
              />
            </Grid>
            <Grid item md className={classes.gridItemRight}>
              <div className={classes.title}>Nhóm admin</div>
              <TextField
              disabled
              variant="outlined"
              className={classes.input}
              name="group"
              value={detail.group}
              size="small"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.grid}>
            <Grid item md className={classes.gridItemLeft}>
              <div className={classes.title}>Họ và tên*</div>
              <TextField
              variant="outlined"
              className={classes.input}
              name="fullname"
              onChange={handleChange}
              value={detail.fullname}
              size="small"
              error={creationFormErrorMessages.fullname !== ''}
              helperText={creationFormErrorMessages.fullname}
              />
            </Grid>
            <Grid item md className={classes.gridItemRight}>
              <div className={classes.title}>Giới tính*</div>
                <TextField
                variant="outlined"
                select
                className={classes.input}
                name="sex"
                onChange={handleChange}
                value={detail.sex}
                size="small"
                error={creationFormErrorMessages.sex !== ''}
                helperText={creationFormErrorMessages.sex}
                >
                  {sexList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
              ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container className={classes.grid}>
            <Grid item md className={classes.gridItemLeft}>
              <div className={classes.title}>Chứng minh nhân dân (CMND)*</div>
              <TextField
              variant="outlined"
              className={classes.input}
              name="national_id"
              value={detail.national_id}
              onChange={handleChange}
              size="small"
              />
            </Grid>
            <Grid item md className={classes.gridItemRight}>
              <div className={classes.title}>Số điện thoại*</div>
              <TextField
              variant="outlined"
              className={classes.input}
              name="phone_number"
              onChange={handleChange}
              value={detail.phone_number}
              size="small"
              error={creationFormErrorMessages.phone_number !== ''}
              helperText={creationFormErrorMessages.phone_number}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.grid}>
            <Grid item md className={classes.gridItemLeftFull}>
              <div className={classes.title}>Địa chỉ*</div>
              <TextField
              variant="outlined"
              className={classes.input}
              name="address"
              onChange={handleChange}
              value={detail.address}
              size="small"
              error={creationFormErrorMessages.address !== ''}
              helperText={creationFormErrorMessages.address}
              />
            </Grid>
          </Grid>
          <Grid container className={classes.grid}>
            <Grid item md={6}>
            <FormControlLabel
              control={<Checkbox checked={enablePassword} onClick={() => setEnablePassword(!enablePassword)}/>}
              label="Đổi mật khẩu"
            />
            <FormControl className={clsx(classes.input, classes.marginBottom)} variant="outlined" size="small">
              <InputLabel htmlFor="outlined-adornment-old-password">Mật khẩu cũ</InputLabel>
              <OutlinedInput
                disabled={!enablePassword}
                id="outlined-adornment-old-password"
                type={showOldPassword ? 'text' : 'password'}
                value={detail.oldPassword}
                name='oldPassword'
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showOldPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={115}
              />
              {
                creationFormErrorMessages.oldPassword !== '' &&
                <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.oldPassword}</div>
              }
            </FormControl>
            <FormControl className={clsx(classes.input, classes.marginBottom)} variant="outlined" size="small">
              <InputLabel htmlFor="outlined-adornment-password">Mật khẩu mới</InputLabel>
              <OutlinedInput
                disabled={!enablePassword}
                id="outlined-adornment-password"
                type={showNewPassword ? 'text' : 'password'}
                value={detail.password}
                name='password'
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={115}
              />
              {
                creationFormErrorMessages.oldPassword !== '' &&
                <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.oldPassword}</div>
              }
            </FormControl>
            <FormControl className={clsx(classes.input, classes.marginBottom)} variant="outlined" size="small">
              <InputLabel htmlFor="outlined-adornment-password-confirm">Xác nhận mật khẩu mới</InputLabel>
              <OutlinedInput
                disabled={!enablePassword}
                id="outlined-adornment-password-confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                value={detail.confirmPassword}
                name='confirmPassword'
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={190}
              />
              {
                creationFormErrorMessages.confirmPassword !== '' &&
                <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.confirmPassword}</div>
              }
            </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <Box className={classes.thumbnailBox}>
            {detail.thumbnail !== '' && (
              <div
                className={classes.thumbnailBoxPreview}
                style={{ backgroundImage: `url(${detail.thumbnail})`}}
              >
                <TiDelete className={classes.thumbnailContentRemove} onClick={handleDeleteThumbnail} />
              </div>
            )}
            {detail.thumbnail === '' && (
              <div {...getRootProps({className: 'dropzone'})} className={classes.thumbnailBoxContent}>
                <p>Kéo file vào đây hoặc:</p>
                <p><i>Kích thước ảnh: 776x424</i></p>
                <p>
                  <Button
                    startIcon={<FiUpload />}
                    className={classes.uploadBtn}
                    onClick={open}
                  >Upload</Button>
                  <input {...getInputProps()} />
                </p>
                {
                  creationFormErrorMessages.avatar !== '' &&
                  <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.avatar}</div>
                }
              </div>
            )}
          </Box>
        </Grid>
			</Grid>
      
		</>
	);
}
