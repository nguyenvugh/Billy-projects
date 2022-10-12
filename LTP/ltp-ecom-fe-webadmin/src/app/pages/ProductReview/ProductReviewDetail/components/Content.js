
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import * as Utils from "app/utils";
import StarRate from '@material-ui/icons/StarRate';
import { formatDateTime } from 'app/utils/validate';
import { RemoveTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "10px 0",
    marginBottom: "20px",
    width: "100%",
    // fontSize: '14px'
  },
  input: {
    width: "60%",
    fontSize: "14px !important",
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
  itemSelect: {
    fontSize: "14px !important",
  },
  img: {
    width: '100%',
    // height: '135px'
  },
  quoteBlock: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  quoteRight: {
    fontSize: "56px",
    color: "#007bff",
    alignSelf: 'flex-start',
    paddingTop: '20px'
  },
  quoteLeft: {
    fontSize: "56px",
    color: "#007bff",
    alignSelf: 'flex-end'
  },
  quoteCenter: {
    alignSelf: 'center',
    fontSize: "14px"
  }
}));

export default function Content({ review }) {
  const classes = useStyles();

  if (!review) return null;

  return (
    <>
      <Grid container className={classes.grid}>
        <Grid item md={3} className={classes.contentBlock}>
          <div className={classes.childContent}>
            <div className={classes.title}>Email người đánh giá</div>
            <div className={classes.info}>{review?.customer?.email}</div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Ngày giờ đánh giá</div>
            <div className={classes.info}>{formatDateTime(review?.created_at)}</div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Điểm đánh giá</div>
            <div className={classes.info}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            ><span>{review?.rating}</span><StarRate style={{ fill: "#febd17" }} /></div>
          </div>
        </Grid>
        <Grid item md={3} className={classes.contentBlock}>
          <div className={classes.childContent}>
            <div className={classes.title}>Sản phẩm</div>
            <div className={classes.info}>{review?.product?.translates[0].name}</div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Trạng thái</div>
            <div className={classes.info}>{
              review?.status == 1 ? 'Chờ duyệt' : review?.status == 2 ? 'Đã duyệt' : 'Từ chối'
            }</div>
          </div>
        </Grid>
        {/* <Grid item md={2} className={classes.contentBlock}>
          <div className={classes.childContent}>
            <div className={classes.title}>Nội dung</div>
            <img src='https://i.pinimg.com/originals/6b/66/e8/6b66e84fdbecde15550f56346c01cf2c.jpg' alt="LTP" className={classes.img} />
          </div>
        </Grid> */}
        <Grid item md
          // className={classes.quoteBlock} 
          className={classes.contentBlock}>
          <div className={classes.title}>Nội dung</div>
          {/* <div className={classes.quoteRight}>"</div> */}

          <div className={classes.quoteCenter}>
            {review?.content}
          </div>
          {/* <div className={classes.quoteLeft}>"</div> */}
        </Grid>
      </Grid>
    </>
  );
}
