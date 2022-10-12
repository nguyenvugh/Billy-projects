import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Toolbar from "./components/Toolbar";
import Content from "./components/Content";
import ConfirmModal from "app/components/ConfirmModal";
import { fetchDeleteContacts } from "app/reducers/contact";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: "#ffffff",
    padding: "20px",
    marginBottom: "20px"
  },
  photos: {
    padding: "0px 0px 0px 20px"
  }
}));

export default function UserContactDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { location: { state } } = history;
  const [contact, setContact] = useState(state || {});
  const [
    isOpenDeleteAccountConfirmation,
    setIsOpenDeleteAccountConfirmation
  ] = useState(false);
  useEffect(() => {
    setContact(state)
  }, [state])
  const handleDeleteAccount = () => {
    dispatch(fetchDeleteContacts({ ids: [state.id] })).then(s => {
      setIsOpenDeleteAccountConfirmation(false);
      history.goBack();
    });
  };

  return (
    <div>
      <Toolbar
        id={id}
        setIsOpenDeleteAccountConfirmation={setIsOpenDeleteAccountConfirmation}
      />
      <Grid container className={classes.main}>
        <Grid item xs={12}>
          <Content contact={contact} />
        </Grid>
      </Grid>
      <ConfirmModal
        isOpen={isOpenDeleteAccountConfirmation}
        type="delete"
        title="Xoá liên hệ"
        okText="Xoá"
        onOk={handleDeleteAccount}
        onClose={() => setIsOpenDeleteAccountConfirmation(false)}
      >
        <p>Bạn có chắc muốn xóa thông tin liên hệ đã chọn?</p>
      </ConfirmModal>
    </div>
  );
}
