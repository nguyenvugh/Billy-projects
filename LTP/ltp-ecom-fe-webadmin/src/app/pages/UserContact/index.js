import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Button, MenuItem, Menu } from "@material-ui/core";
import { Add as AddIcon, Search as SearchIcon } from "@material-ui/icons";
import Select from "react-select";

import Table from "./components/Table";
import ConfirmModal from "app/components/ConfirmModal";
import { getProductCategory, putApi, addNewCate } from "app/services/axios";
import * as AppURL from "app/services/urlAPI";
import * as Utils from "app/utils";
import lodash from "lodash";
import pdfIcon from "app/assets/pdf.png";
import excelIcon from "app/assets/excel.png";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_SIZE } from "app/utils/constant";
import { fetchDeleteContacts, fetchListContact } from "app/reducers/contact";
const columns = [
  {
    id: 1,
    name: "fullname",
    text: "Họ và tên"
  },
  {
    id: 2,
    name: "phone_number",
    text: "Số điện thoại"
  },
  {
    id: 3,
    name: "email",
    text: "Email"
  },
  {
    id: 1,
    name: "content",
    text: "Nội dung"
  },
  {
    id: 1,
    name: "date_created",
    text: "Ngày giờ gửi"
  }
];

const useStyles = makeStyles(theme => ({
  toolbar: {
    margin: "15px 0"
  },
  title: {
    fontSize: "18px",
    margin: 0,
    fontWeight: 600,
    lineHeight: "36px"
  },
  actionBlock: {
    textAlign: "right"
  },
  deleteButton: {
    backgroundColor: "#D70000",
    textTransform: "unset"
  }
}));

export default function UserContact() {
  const dispatch = useDispatch();
  const { listContact, isLoading, totalContacts } = useSelector(
    state => state.contact
  );
  const classes = useStyles();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [
    isOpenDeleteProductsConfirmation,
    setIsOpenDeleteProductsConfirmation
  ] = useState(false);

  useEffect(
    () => {
      dispatch(
        fetchListContact({
          page: page,
          limit: PAGE_SIZE
        })
      );
    },
    [page]
  );

  const refreshList = () => {
    dispatch(
      fetchListContact({
        page: 1,
        limit: PAGE_SIZE
      })
    );
  };

  const handleDeleteSelectedRows = () => {
    if (selectedRows.length > 0) {
      dispatch(fetchDeleteContacts({ ids: selectedRows.map((item) => item?.id) })).then(s => {
        refreshList();
      });
    }
    setIsOpenDeleteProductsConfirmation(false);
    setSelectedRows([]);
  };

  return (
    <div>
      <Grid container className={classes.toolbar}>
        <Grid item xs={8}>
          <h3 className={classes.title}>Danh sách liên hệ</h3>
        </Grid>
        <Grid item xs={4} className={classes.actionBlock}>
          <Button
            disabled={selectedRows.length === 0}
            variant="contained"
            color="primary"
            className={classes.deleteButton}
            onClick={() => setIsOpenDeleteProductsConfirmation(true)}
          >
            Xoá đã chọn
          </Button>
        </Grid>
      </Grid>
      <Table
        data={listContact}
        columns={columns}
        onSelect={{
          selectedRows,
          setSelectedRows
        }}
        page={page}
        total={totalContacts}
        setPage={setPage}
      />
      <ConfirmModal
        isOpen={isOpenDeleteProductsConfirmation}
        type="delete"
        title="Xoá liên hệ"
        okText="Xoá"
        onOk={handleDeleteSelectedRows}
        onClose={() => setIsOpenDeleteProductsConfirmation(false)}
      >
        <p>Bạn có chắc muốn xóa những liên hệ đã chọn?</p>
      </ConfirmModal>
    </div>
  );
}
