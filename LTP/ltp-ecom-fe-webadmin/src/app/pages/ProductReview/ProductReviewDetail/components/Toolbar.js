import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    margin: '15px 0',
  },
  title: {
    fontSize: '18px',
    margin: 0,
    fontWeight: 600,
    lineHeight: '36px'
  },
  titleLink: {
    color: '#000000',
    textDecoration: 'none',
    marginRight: '15px',
  },
  titleText: {
    marginLeft: '15px',
  },
  actionBlock: {
    textAlign: 'right'
  },
  saveButton: {
    backgroundColor: '#3952D3',
    textTransform: 'unset',
    marginRight: '20px',
    width: '120px'
  },
  cancelButton: {
    backgroundColor: '#d70000',
    textTransform: 'unset',
    color: '#ffffff',
    width: '120px'
  }
}));

export default function Toolbar({ setIsOpenApproveAccountConfirmation, setIsOpenDenyAccountConfirmation }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container className={classes.toolbar}>
      <Grid item xs={8}>
        <h3 className={classes.title}>
          <Link to="/product-reviews" className={classes.titleLink}>
            <span>Danh sách đánh giá</span>
          </Link>
          {'>'}
          <span className={classes.titleText}>Chi tiết đánh giá</span>
        </h3>
      </Grid>
      <Grid item xs={4} className={classes.actionBlock}>
        <Button
          variant="contained"
          color="primary"
          className={classes.saveButton}
          onClick={() => setIsOpenApproveAccountConfirmation(true)}
        >
          Duyệt
        </Button>
        <Button
          variant="contained"
          className={classes.cancelButton}
          onClick={() => setIsOpenDenyAccountConfirmation(true)}
        >
          Từ chối
        </Button>
      </Grid>
    </Grid>
  )
}