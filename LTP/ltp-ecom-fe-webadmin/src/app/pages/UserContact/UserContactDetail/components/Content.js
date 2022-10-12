
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import * as Utils from "app/utils";
import { formatDateTime } from 'app/utils/validate';

const useStyles = makeStyles((theme) => ({
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
    width: '100%'
  },
  childContent: {
    marginBottom: '25px'
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
  }
}));

export default function Content({contact = {}}) {
  const classes = useStyles();

	return (
		<>
			<Grid container className={classes.grid}>
        <Grid item md={6} className={classes.contentBlock}>
          <div className={classes.childContent}>
            <div className={classes.title}>Họ và tên</div>
            <div className={classes.info}>{contact?.name}</div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Email</div>
            <div className={classes.info}>{contact?.email}</div>
          </div>
        </Grid>
        <Grid item md={6}>
          <div className={classes.childContent}>
            <div className={classes.title}>Số điện thoại</div>
            <div className={classes.info}>{contact?.phone_number}</div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Ngày giờ gửi</div>
            <div className={classes.info}>{formatDateTime(contact.created_at)}</div>
          </div>
        </Grid>
        <Grid item md={7}>
          <div className={classes.title}>Nội dung</div>
          <div className={classes.boxContent}>
            <div className={classes.info}>{contact.content}</div>
          </div>
        </Grid>
			</Grid>
		</>
	);
}
