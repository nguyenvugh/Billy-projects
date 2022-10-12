import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment, FormControlLabel, Checkbox, Typography, 
  InputLabel, OutlinedInput, IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ADMIN_SCREEN_CREATION_MODE, ADMIN_SCREEN_EDIT_MODE } from 'app/constants/admin';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';

import { AdminCreationContext } from '../context'; 

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#ffffff",
    padding: '20px',
  },
  grid: {
		padding: "10px 0",
    marginBottom: "20px",
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
	input: {
		width: "100%",
		fontSize: "14px !important",
    color: "#3a3a3a !important",
    fontWeight: "400 !important",
    height: "40px"
	},
  inputMenuItem: {
    fontSize: "14px !important",
  },
  title: {
    fontSize: "14px",
    lineHeight: '16px',
    color: "#000000",
    marginBottom: '8px',
    fontWeight: "400"
  },
  titlePassword: {
    fontSize: "16px",
    lineHeight: '16px',
    color: "#071133",
    marginBottom: '20px',
    fontWeight: "500"
  },
  selectInput: {
		color: "#898989",
		fontWeight: '400',
	},
  marginBottom: {
    marginBottom: '20px'
  }
}));

const groupList = [
  {
		id: 1,
		value: 1,
		label: "Group 1",
	},
	{
		id: 2,
		value: 2,
		label: "Group 2",
	},
];

const sexList = [
	{
		id: 1,
		value: 1,
		label: "Nam",
	},
	{
		id: 2,
		value: 2,
		label: "Nữ"
	},
]

const statusList = [
	{
    id: 1,
    value: 1,
    label: "Kích hoạt",
  },
  {
    id: 2,
    value: 2,
    label: "Khoá",
  },
];

export default function Content(
  { creationFormErrorMessages, setCreationFormErrorMessages, mode, enablePassword, setEnablePassword, groups}
) {
  const classes = useStyles();
  const context = useContext(AdminCreationContext);
  const { state: {detail}, dispatch} = context;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    username,
    group,
    status,
    fullname,
    sex,
    national_id,
    phone_number,
    address,
    password,
    confirmPassword
  } = detail;

  const handleChange = (evt) => {
    dispatch({
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

	return (
		<>
      <Grid container className={classes.main}>
        <Grid container className={classes.grid}>
          <Grid item xs={6} className={classes.gridItemLeft}>
            <p className={classes.title}>Tên đăng nhập *</p>
            <TextField
              variant="outlined"
              required
              placeholder="Nhập tên đăng nhập"
              name="username"
              value={username}
              size="small"
              className={classes.input}
              InputProps={{
                className: classes.input,
              }}
              onChange={handleChange}
              error={creationFormErrorMessages.username !== ''}
              helperText={creationFormErrorMessages.username}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItemRight}>
            <p className={classes.title}>Tên nhóm *</p>
              <TextField
                required
                name="group"
                className={classes.input}
                InputProps={{
                  className: classes.input,
                }}
                select
                value={group}
                onChange={handleChange}
                variant='outlined'
                size="small"
                error={creationFormErrorMessages.group !== ''}
                helperText={creationFormErrorMessages.group}
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
                <MenuItem value={0} disabled>
                  <span className={classes.selectInput}>-Chọn tên nhóm-</span>
                </MenuItem>
                {groups.length > 0 && groups.map((option) => {
                  return <MenuItem value={option.id}>
                    <span className={classes.inputMenuItem}>{option.name}</span>
                  </MenuItem>
                })}
              </TextField>
              {/* </Select>
            </FormControl> */}
            {/* {
              creationFormErrorMessages.group !== '' &&
              <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.group}</div>
            } */}
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={6} className={classes.gridItemLeft}>
            <p className={classes.title}>Trạng thái *</p>
              <TextField
                required
                name="status"
                className={classes.input}
                InputProps={{
                  className: classes.input,
                }}
                select
                value={status}
                onChange={handleChange}
                variant='outlined'
                size="small"
                error={creationFormErrorMessages.status !== ''}
                helperText={creationFormErrorMessages.status}
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
                <MenuItem value={0} disabled>
                  <span className={classes.selectInput}>-Chọn trạng thái-</span>
                </MenuItem>
                {statusList.length > 0 && statusList.map((option) => {
                  return <MenuItem value={option.value}>
                    <span className={classes.inputMenuItem}>{option.label}</span>
                  </MenuItem>
                })}
              </TextField>
          </Grid>
          <Grid item xs={6} className={classes.gridItemRight}>
            <p className={classes.title}>Họ và tên</p>
            <TextField
              variant="outlined"
              required
              className={classes.input}
              name="fullname"
              placeholder="Nhập họ và tên"
              value={fullname}
              size="small"
              InputProps={{
                className: classes.input,
              }}
              onChange={handleChange}
              error={creationFormErrorMessages.fullname !== ''}
              helperText={creationFormErrorMessages.fullname}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={6} className={classes.gridItemLeft}>
            <p className={classes.title}>Giới tính</p>
              <TextField
                name="sex"
                className={classes.input}
                InputProps={{
                  className: classes.input,
                }}
                select
                value={sex}
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
              >
                <MenuItem value={0} disabled>
                  <span className={classes.selectInput}>-Chọn giới tính-</span>
                </MenuItem>
                {sexList.length > 0 && sexList.map((option) => {
                  return <MenuItem value={option.value}>
                    <span className={classes.inputMenuItem}>{option.label}</span>
                  </MenuItem>
                })}
              </TextField>
          </Grid>
          <Grid item xs={6} className={classes.gridItemRight}>
            <p className={classes.title}>CMND/CMT</p>
            <TextField
              variant="outlined"
              required
              className={classes.input}
              placeholder="Nhập CMND/CMT"
              name="national_id"
              value={national_id}
              size="small"
              InputProps={{
                className: classes.input,
              }}
              onChange={handleChange}
              error={creationFormErrorMessages.national_id !== ''}
              helperText={creationFormErrorMessages.national_id}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={6} className={classes.gridItemLeft}>
            <p className={classes.title}>Số điện thoại</p>
            <TextField
              variant="outlined"
              required
              className={classes.input}
              placeholder="Nhập số điện thoại"
              name="phone_number"
              value={phone_number}
              size="small"
              InputProps={{
                className: classes.input,
              }}
              onChange={handleChange}
              error={creationFormErrorMessages.phone_number !== ''}
              helperText={creationFormErrorMessages.phone_number}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItemRight}>
            <p className={classes.title}>Địa chỉ</p>
            <TextField
              variant="outlined"
              required
              className={classes.input}
              placeholder="Nhập địa chỉ"
              name="address"
              value={address}
              size="small"
              InputProps={{
                className: classes.input,
              }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {
        mode === ADMIN_SCREEN_EDIT_MODE ?
        (
          <Grid container className={classes.grid}>
            <Grid item md={5}>
            <FormControlLabel
              control={<Checkbox checked={enablePassword} onClick={() => setEnablePassword(!enablePassword)}/>}
              label="Mật khẩu mới"
            />
            <p className={classes.title}>Mật khẩu mới *</p>
            <FormControl className={clsx(classes.input, classes.marginBottom)} variant="outlined" size="small">
              <OutlinedInput
                disabled={!enablePassword}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                name='password'
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
                error={creationFormErrorMessages.password !== ''}
              />
              {
                creationFormErrorMessages.password !== '' &&
                <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.password}</div>
              }
            </FormControl>
            <p className={classes.title}>Xác nhận mật khẩu mới *</p>
            <FormControl className={clsx(classes.input, classes.marginBottom)} variant="outlined" size="small">
              <OutlinedInput
                disabled={!enablePassword}
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleChange}
                name='confirmPassword'
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
                error={creationFormErrorMessages.confirmPassword !== ''}
              />
              {
                creationFormErrorMessages.confirmPassword !== '' &&
                <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.confirmPassword}</div>
              }
            </FormControl>
            </Grid>
          </Grid>
        ) :
        (
          <Grid container className={classes.grid}>
            <Grid item md={5}>
            <p className={classes.titlePassword}>Mật khẩu</p>
            <p className={classes.title}>Mật khẩu *</p>
            <FormControl className={clsx(classes.input, classes.marginBottom)} variant="outlined" size="small">
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange}
                name='password'
                placeholder='Nhập mật khẩu'
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
                error={creationFormErrorMessages.password !== ''}
              />
              {
                creationFormErrorMessages.password !== '' &&
                <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.password}</div>
              }
            </FormControl>
            <p className={classes.title}>Xác nhận mật khẩu *</p>
            <FormControl className={clsx(classes.input, classes.marginBottom)} variant="outlined" size="small">
              <OutlinedInput
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                placeholder='Nhập lại mật khẩu'
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
                error={creationFormErrorMessages.confirmPassword !== ''}
              />
              {
                creationFormErrorMessages.confirmPassword !== '' &&
                <div style={{fontSize:12, color: 'red',marginTop: 3, marginLeft: 15}}>{creationFormErrorMessages.confirmPassword}</div>
              }
            </FormControl>
            </Grid>
          </Grid>
        )
      }
      </Grid>
		</>
	);
}