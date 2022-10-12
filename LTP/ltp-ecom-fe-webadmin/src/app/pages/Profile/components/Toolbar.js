import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { urlProfile } from "app/Layouts/AuthenticatedLayout/Sidebar/url";

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
  },
  deleteButton: {
    backgroundColor: '#d70000',
    textTransform: 'unset',
    marginLeft: '20px'
  }
}));

export default function Toolbar({ setIsOpenLogoutAccountConfirmation, data }) {
  const history = useHistory();
  const classes = useStyles();

  const handleGotoEditPage = () => {
    history.push(`${urlProfile}/edit`);
    history.push({
      pathname: `${urlProfile}/edit`,
      state: data
    })
  }

  return (
    <Grid container className={classes.toolbar}>
      <Grid item xs={6}>
        <h3 className={classes.title}>
          <span>Thông tin cá nhân</span>
        </h3>
      </Grid>
      <Grid item xs={6} className={classes.actionBlock}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.saveButton}
          onClick={handleGotoEditPage}
        >
          Chỉnh sửa
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.deleteButton}
          onClick={() => setIsOpenLogoutAccountConfirmation(true)}
        >
          Đăng xuất
        </Button>
      </Grid>
    </Grid>
  )
}