
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, MenuItem } from '@material-ui/core';
import * as Utils from 'app/utils';
import lodash from 'lodash';

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
    width: '232px',
    height: '232px',
    borderRadius: '56px'
  },
  contentBlock: {
    width: '100%',
  },
  childContent: {
    marginBottom: '25px',
    width: '95%'
  },
  title: {
    fontSize: "14px",
    lineHeight: '16px',
    color: "#a4a4a4",
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
  imgBox: {
    width: '100%',
    borderRadius: '4px'
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

export default function Content({data}) {
  const classes = useStyles();

  const {
    username, fullname, national_id, sex, phone_number, address, group, avatar_obj
  } = data;

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
              value={username}
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
              value={group}
              size="small"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.grid}>
            <Grid item md className={classes.gridItemLeft}>
              <div className={classes.title}>Họ và tên</div>
              <TextField
              disabled
              variant="outlined"
              className={classes.input}
              name="fullname"
              value={fullname}
              size="small"
              />
            </Grid>
            <Grid item md className={classes.gridItemRight}>
              <div className={classes.title}>Giới tính</div>
              <TextField
              disabled
              variant="outlined"
              select
              className={classes.input}
              name="sex"
              value={sex}
              size="small"
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
              <div className={classes.title}>Chứng minh nhân dân (CMND)</div>
              <TextField
              disabled
              variant="outlined"
              className={classes.input}
              name="national_id"
              value={national_id}
              size="small"
              />
            </Grid>
            <Grid item md className={classes.gridItemRight}>
              <div className={classes.title}>Số điện thoại</div>
              <TextField
              disabled
              variant="outlined"
              className={classes.input}
              name="phone_number"
              value={phone_number}
              size="small"
              />
            </Grid>
          </Grid>
          <Grid container className={classes.grid}>
            <Grid item md className={classes.gridItemLeftFull}>
              <div className={classes.title}>Địa chỉ*</div>
              <TextField
              disabled
              variant="outlined"
              className={classes.input}
              name="address"
              value={address}
              size="small"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <div style={{textAlign: 'center'}}>
            <img
              style={{
                width: '252px',
                height: '252px'
              }}
              src={Utils.getSafeValue(avatar_obj, 'url', '')}
              className={classes.imgBox}
            />
          </div>
        </Grid>
			</Grid>
		</>
	);
}
