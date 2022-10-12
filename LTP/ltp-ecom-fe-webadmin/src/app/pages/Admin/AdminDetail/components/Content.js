
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment, Select, MenuItem, InputLabel, FormControl, Paper } from '@material-ui/core';
import * as Utils from "app/utils";

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
  title: {
    fontSize: "14px",
    lineHeight: '16px',
    color: "#000000",
    marginBottom: '8px',
    fontWeight: "400"
  },
}));

export default function Content({data}) {
  const classes = useStyles();

  const {
    username,
    groupName,
    status,
    fullname,
    sex,
    national_id,
    phone_number,
    address
  } = data;

	return (
		<>
      <Grid container className={classes.main}>
        <Grid container className={classes.grid}>
          <Grid item xs={6} className={classes.gridItemLeft}>
            <p className={classes.title}>Tên đăng nhập *</p>
            <TextField
              disabled
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
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItemRight}>
            <p className={classes.title}>Tên nhóm *</p>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="group"
              value={groupName}
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={6} className={classes.gridItemLeft}>
            <p className={classes.title}>Trạng thái *</p>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="status"
              value={status === 1 ? 'Kích hoạt' : 'Khoá'}
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItemRight}>
            <p className={classes.title}>Họ và tên</p>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="fullname"
              value={fullname}
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={6} className={classes.gridItemLeft}>
            <p className={classes.title}>Giới tính</p>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="sex"
              value={sex === 1 ? 'Nam' : 'Nữ'}
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItemRight}>
            <p className={classes.title}>CMND/CMT</p>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="national_id"
              value={national_id}
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={6} className={classes.gridItemLeft}>
            <p className={classes.title}>Số điện thoại</p>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="phone_number"
              value={phone_number}
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItemRight}>
            <p className={classes.title}>Địa chỉ</p>
            <TextField
              disabled
              variant="outlined"
              required
              className={classes.input}
              name="address"
              value={address}
              size="small"
              InputProps={{
                className: classes.input,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
		</>
	);
}
