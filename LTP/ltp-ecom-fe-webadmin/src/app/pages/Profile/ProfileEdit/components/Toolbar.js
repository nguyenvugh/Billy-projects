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
  actionBlock: {
    textAlign: 'right'
  },
  saveButton: {
    backgroundColor: '#3952D3',
    textTransform: 'unset',
    marginLeft: '20px'
  },
  deleteButton: {
    backgroundColor: '#ffffff',
    color: '#000000',
    textTransform: 'unset',
  },
  titleLink: {
    color: '#000000',
    textDecoration: 'none',
    marginRight: '15px',
  },
  titleText: {
    marginLeft: '15px'
  },
}));

export default function Toolbar({handleSaveProfile}) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid container className={classes.toolbar}>
      <Grid item xs={6}>
        <h3 className={classes.title}>
          <Link to="/profile" className={classes.titleLink}>
            <span>Thông tin cá nhân</span>
          </Link>
          {'>'}
          <span className={classes.titleText}>Chỉnh sửa</span>
        </h3>
      </Grid>
      <Grid item xs={6} className={classes.actionBlock}>
      `<Button
          variant="contained"
          color="secondary"
          className={classes.deleteButton}
          onClick={() => history.goBack()}
        >
          Huỷ
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.saveButton}
          onClick={handleSaveProfile}
        >
          Lưu lại
        </Button>
      </Grid>
    </Grid>
  )
}