import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { urlUserProfile } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

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
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    textTransform: 'unset',
    marginRight: '20px',
  }
}));

export default function Toolbar({ handleUpdateOrder }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container className={classes.toolbar}>
      <Grid item xs={8}>
        <h3 className={classes.title}>
          <Link to={urlUserProfile} className={classes.titleLink}>
            <span>Tài khoản người dùng</span>
          </Link>
          {'>'}
          <Link className={classes.titleLink} onClick={() => history.goBack()}>
            <span className={classes.titleText}>Chi tiết người dùng</span>
          </Link>
          {'>'}
          <span className={classes.titleText}>Chi tiết đơn hàng</span>
        </h3>
      </Grid>
      <Grid item xs={4} className={classes.actionBlock}>
        <Button
          variant="contained"
          className={classes.cancelButton}
          onClick={() => history.goBack()}
        >
          Huỷ
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.saveButton}
          onClick={handleUpdateOrder}
        >
          Lưu lại
        </Button>
      </Grid>
    </Grid>
  )
}