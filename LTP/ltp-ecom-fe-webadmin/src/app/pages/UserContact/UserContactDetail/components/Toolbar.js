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
    marginLeft: '15px'
  },
  actionBlock: {
    textAlign: 'right'
  },
  saveButton: {
    backgroundColor: '#3952D3',
    textTransform: 'unset',
  },
  deleteButton: {
    backgroundColor: '#d70000',
    textTransform: 'unset',
    marginLeft: '20px'
  }
}));

export default function Toolbar({ id, setIsOpenDeleteAccountConfirmation }) {
  const history = useHistory();
  const classes = useStyles();

  const handleGotoEditPage = () => {
    history.push(`${urlUserProfile}/edit/${id}`)
  }

  return (
    <Grid container className={classes.toolbar}>
      <Grid item xs={6}>
        <h3 className={classes.title}>
          <Link to="/contact" className={classes.titleLink}>
            <span>Danh sách liên hệ</span>
          </Link>
          {'>'}
          <span className={classes.titleText}>Chi tiết liên hệ</span>
        </h3>
      </Grid>
      <Grid item xs={6} className={classes.actionBlock}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.deleteButton}
          onClick={() => setIsOpenDeleteAccountConfirmation(true)}
        >
          Xoá
        </Button>
      </Grid>
    </Grid>
  )
}