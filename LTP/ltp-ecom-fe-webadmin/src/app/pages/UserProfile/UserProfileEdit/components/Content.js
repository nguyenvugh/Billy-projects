import { Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import DefaultAvatar from 'app/assets/default/default-user.png';
import clsx from 'clsx';
import { useRef, useState } from 'react';

const SHOW = 'show';
const HIDDEN = 'hidden';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "10px 0",
    marginBottom: "10px",
    width: "100%",
    // fontSize: '14px'
  },
  gridItemLeft: {
    padding: "0px 10px 0px 0px",
    margin: "auto",
  },
  gridItemRight: {
    padding: "0px 0px 0px 10px",
  },
  featureProductCount: {
    color: "#ED0017",
    fontWeight: "italic",
  },
  input: {
    width: "90%",
    fontSize: "14px !important",
  },
  textarea: {
    width: "100%",
    fontSize: "14px",
  },
  imgBlock: {
    textAlign: "right"
  },
  img: {
    borderRadius: '56px',
  },
  contentBlock: {
    width: '100%'
  },
  childContent: {
    marginBottom: '25px'
  },
  title: {
    fontSize: "14px",
    lineHeight: '17px',
    color: "#000000",
    marginBottom: '8px'
  },
  info: {
    fontSize: "14px",
    lineHeight: '16px',
    color: "#000000"
  },
  resize: {
    fontSize: "14px",
  },
  marginBottom: {
    marginTop: '30px'
  },
  show: {
    display: 'flex',
    margin: 'auto',
    border: '1px solid #fff',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    color: "#fff",
    cursor: 'pointer'
  },
  hidden: {
    display: 'none',
  }
}));

const listGender = [
  {
    id: 1,
    name: 'Nam'
  },
  {
    id: 2,
    name: 'Nữ'
  }
]

export default function Content(
  {
    currentForm,
    setCurrentForm,
    listCity,
    listDistrict,
    listWard,
    setIsUpdated,
    setThumbnailFile,
    creationFormErrorMessages,
    setCreationFormErrorMessages
  }) {
  const classes = useStyles();
  const photoRef = useRef();

  const [editAvatarDisplay, setEditAvatarDisplay] = useState(HIDDEN);
  const [showPassword, setShowPassword] = useState(false);
  const [enablePassword, setEnablePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (evt) => {
    setCurrentForm({
      ...currentForm,
      [evt.target.name]: evt.target.value
    });
    if (evt.target.value !== '') {
      setCreationFormErrorMessages({
        ...creationFormErrorMessages,
        [evt.target.name]: ''
      })
    }
  }

  const showEditButton = e => {
    e.preventDefault();
    setEditAvatarDisplay(SHOW);
  }

  const hideEditButton = e => {
    e.preventDefault();
    setEditAvatarDisplay(HIDDEN);
  }

  const handleClickUploadButton = (event) => {
    photoRef.current.click();
  }

  const handleUpload = (evt) => {
    if (evt.target.files && evt.target.files.length > 0) {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function () {
        setCurrentForm({
          ...currentForm,
          avatar: reader.result
        })
      }
      reader.readAsDataURL(file);
      setThumbnailFile(file);
    }
  }

  return (
    <>
      <Grid container className={classes.grid}>
        <Grid item md className={classes.contentBlock}>
          <div className={classes.childContent}>
            <div className={classes.title}>Tên người dùng *</div>
            <TextField
              variant="outlined"
              required
              className={classes.input}
              placeholder="Nhập tên người dùng"
              name="name"
              value={currentForm.name}
              size="small"
              onChange={handleChange}
              error={creationFormErrorMessages.name !== ''}
              helperText={creationFormErrorMessages.name}
            />
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Số điện thoại</div>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="phone_number"
              value={currentForm.phone_number}
              size="small"
              error={creationFormErrorMessages.phone_number !== ''}
              helperText={creationFormErrorMessages.phone_number}
            />
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Giới tính *</div>
            <TextField
              required
              name="sex"
              className={classes.input}
              select
              value={currentForm.sex}
              onChange={handleChange}
              variant='outlined'
              size="small"
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }
              }}
              error={creationFormErrorMessages.sex !== ''}
              helperText={creationFormErrorMessages.sex}
            >
              <MenuItem value={0} disabled>--Chọn Giới tính--</MenuItem>
              {
                listGender.length > 0 && listGender.map(item => {
                  return (<MenuItem value={item.id}>{item.name}</MenuItem>)
                })
              }
            </TextField>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Ngày sinh *</div>
            <TextField
              type='date'
              variant="outlined"
              required
              className={classes.input}
              placeholder="Nhập ngày sinh"
              name="birthday"
              value={currentForm.birthday}
              onChange={handleChange}
              size="small"
              error={creationFormErrorMessages.birthday !== ''}
              helperText={creationFormErrorMessages.birthday}
            />
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Email</div>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="email"
              value={currentForm.email}
              size="small"
            />
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Thời gian tạo</div>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="created_at_string"
              value={currentForm.created_at_string}
              size="small"
            />
          </div>
        </Grid>
        <Grid item md className={classes.contentBlock}>
          <div className={classes.childContent}>
            <div className={classes.title}>Tỉnh/Thành phố *</div>
            <TextField
              required
              name="city"
              className={classes.input}
              select
              value={currentForm.city}
              onChange={(evt) => {
                handleChange(evt);
                setIsUpdated(true);
              }}
              variant='outlined'
              size="small"
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }
              }}
              error={creationFormErrorMessages.city !== ''}
              helperText={creationFormErrorMessages.city}
            >
              <MenuItem value={0} disabled>--Chọn Tỉnh/Thành phố--</MenuItem>
              {
                listCity.length > 0 && listCity.map(item => {
                  return (<MenuItem value={item.id}>{item.name}</MenuItem>)
                })
              }
            </TextField>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Quận/Huyện *</div>
            <TextField
              required
              name="district"
              className={classes.input}
              select
              value={currentForm.district}
              onChange={(evt) => {
                handleChange(evt);
                setIsUpdated(true);
              }}
              variant='outlined'
              size="small"
              error={creationFormErrorMessages.district !== ''}
              helperText={creationFormErrorMessages.district}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }
              }}
            >
              <MenuItem value={0} disabled>--Chọn Quận/Huyện--</MenuItem>
              {
                listDistrict.length > 0 && listDistrict.map(item => {
                  return (<MenuItem value={item.id}>{item.name}</MenuItem>)
                })
              }
            </TextField>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Phường/Xã *</div>
            <TextField
              required
              name="ward"
              className={classes.input}
              select
              value={currentForm.ward}
              onChange={handleChange}
              variant='outlined'
              size="small"
              error={creationFormErrorMessages.ward !== ''}
              helperText={creationFormErrorMessages.ward}
              SelectProps={{
                MenuProps: {
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null
                }
              }}
            >
              <MenuItem value={0} disabled>--Chọn Phường/Xã--</MenuItem>
              {
                listWard.length > 0 && listWard.map(item => {
                  return (<MenuItem value={item.id}>{item.name}</MenuItem>)
                })
              }
            </TextField>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Địa chỉ *</div>
            <TextField
              variant="outlined"
              required
              className={classes.input}
              name="address"
              value={currentForm.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              size="small"
              error={creationFormErrorMessages.address !== ''}
              helperText={creationFormErrorMessages.address}
            />
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Tên địa chỉ</div>
            <TextField
              variant="outlined"
              className={classes.input}
              name="alias"
              placeholder="Nhập tên địa chỉ"
              value={currentForm.alias}
              onChange={handleChange}
              size="small"
            />
          </div>
        </Grid>
        <Grid item md={3} className={classes.imgBlock}>
          <div
            className={classes.img}
            style={{
              backgroundImage: `url(${currentForm.avatar
                ? currentForm.avatar
                : DefaultAvatar})`,
              backgroundSize: 'cover',
              height: '20vw',
            }}
            onMouseEnter={e => showEditButton(e)}
            onMouseLeave={e => hideEditButton(e)}
          >
            <div style={editAvatarDisplay === SHOW ? {
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(43,43,43,0.6)',
              borderRadius: '56px',
              display: 'flex',
              margin: 'auto',
            } : {}}>
              <div
                className={classes[`${editAvatarDisplay}`]}
                onClick={handleClickUploadButton}
              >
                Chỉnh sửa
              </div>
            </div>
            <input
              type="file"
              ref={photoRef}
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item md={6}>
          <FormControlLabel
            control={<Checkbox checked={enablePassword} onClick={() => setEnablePassword(!enablePassword)} />}
            label="Đổi mật khẩu"
          />
          <FormControl className={clsx(classes.input, classes.marginBottom)} variant="outlined" size="small">
            <div className={classes.title}>Mật khẩu mới *</div>
            <OutlinedInput
              disabled={!enablePassword}
              type={showPassword ? 'text' : 'password'}
              value={currentForm.password}
              onChange={(e) => {
                setCurrentForm({
                  ...currentForm,
                  password: e.target.value
                })
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {
              creationFormErrorMessages.password !== '' &&
              <div style={{ fontSize: 12, color: 'red', marginTop: 3, marginLeft: 15 }}>{creationFormErrorMessages.password}</div>
            }
          </FormControl>
          <FormControl className={clsx(classes.input, classes.marginBottom)} variant="outlined" size="small">
            <div className={classes.title}>Xác nhận mật khẩu mới *</div>
            <OutlinedInput
              disabled={!enablePassword}
              type={showConfirmPassword ? 'text' : 'password'}
              value={currentForm.confirmPassword}
              onChange={(e) => {
                setCurrentForm({
                  ...currentForm,
                  confirmPassword: e.target.value
                })
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {
              creationFormErrorMessages.confirmPassword !== '' &&
              <div style={{ fontSize: 12, color: 'red', marginTop: 3, marginLeft: 15 }}>{creationFormErrorMessages.confirmPassword}</div>
            }
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
