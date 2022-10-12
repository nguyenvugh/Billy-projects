import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField
} from "@material-ui/core";
import {
  Add as AddIcon,
  Search as SearchIcon,
  DeleteOutline
} from "@material-ui/icons";
import Select from "react-select";
import * as AppURL from 'app/services/urlAPI';
import Table from "./components/Table";
import ConfirmModal from "app/components/ConfirmModal";
import BasicModal from "app/components/BasicModal";
import * as Utils from "app/utils";
import lodash from "lodash";
import {
  deleteProductReviews,
  getProductReviews,
  patchApproveProductReviews,
  patchDeclineProductReviews
} from "app/services/product-reviews";
import DangerButton from "app/components/Button/DangerButton";
import { useCallback } from "react";

const columns = [
  {
    id: 1,
    name: "email",
    text: "Email người đánh giá"
  },
  {
    id: 2,
    name: "productName",
    text: "Sản phẩm"
  },
  {
    id: 3,
    name: "reviewScore",
    text: "Điểm đánh giá"
  },
  {
    id: 4,
    name: "content",
    text: "Nội dung"
  },
  {
    id: 5,
    name: "dateReviewd",
    text: "Ngày giờ đánh giá"
  },
  {
    id: 6,
    name: "status",
    text: "Trạng thái"
  }
];

const listStatus = [
  {
    id: 0,
    value: 0,
    label: "Trạng thái"
  },
  {
    id: 1,
    value: 1,
    label: "Chờ duyệt"
  },
  {
    id: 2,
    value: 2,
    label: "Đã duyệt"
  },
  {
    id: 3,
    value: 3,
    label: "Đã từ chối"
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
    textAlign: "right",
    width: "100%"
  },
  actionBlockCenter: {
    textAlign: "center",
    width: "100%"
  },
  titleBlock: {
    textAlign: "left"
  },
  categoriesList: {
    display: "inline-block",
    width: "90%",
    textAlign: "left",
    fontSize: "14px"
  },
  searchBox: {
    display: "inline-block",
    width: "80%",
    textAlign: "left",
    fontSize: "14px"
  },
  searchForm: {
    fontSize: "14px",
    display: "flex",
    width: "100%"
  },
  searchFormLabel: {
    fontSize: "13px",
    marginTop: "-8px"
  },
  searchFormInput: {
    fontSize: "14px",
    height: "37px",
    borderColor: "#E2E2E2",
    width: "100%"
  },
  searchFormIcon: {
    height: "36px",
    width: "36px"
  },
  publicFeature: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#A0AEC0"
  },
  input: {
    marginTop: "10px",
    marginBottom: "25px",
    width: "100%",
    fontSize: "14px",
    lineHeight: "16px"
  },
  deleteButton: {
    width: "90%",
    marginRight: "4px",
    backgroundColor: "#D70000",
    textTransform: "unset"
  },
  addButton: {
    width: "90%",
    textTransform: "unset"
  }
}));

const __PARAMS = {
  page: 1,
  limit: 10,
  q: "",
  status: 0
};

export default function ProductReview() {
  const classes = useStyles();
  const history = useHistory();

  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [status, setStatus] = useState(0);
  // const [query, setQuery] = useState('');
  const [total, setTotal] = useState(0);
  // const [listCate, setListCate] = useState([]);
  const [selectedCate, setSelectedCate] = useState(0);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [
    isOpenDenyAccountConfirmation,
    setIsOpenDenyAccountConfirmation
  ] = useState(false);
  const [
    isOpenApproveAccountConfirmation,
    setIsOpenApproveAccountConfirmation
  ] = useState(false);
  const [currentRowOnAction, setCurrentRowOnAction] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState(__PARAMS);

  useEffect(
    () => {
      getProductReviewList();
    },
    [params]
  );

  const getProductReviewList = async () => {
    try {
      const _params = { ...params };
      if (_params.q.length == 0) delete _params.q;
      if (_params.status == 0) delete _params.status;
      const request = await getProductReviews(_params);
      const response = request.data;
      setData(response.results);
      setTotal(response.totalRecords);
      console.log("getProductReviewList", response);
    } catch (error) {}
  };

  const approveProductReviews = async ids => {
    try {
      if (ids.length == 0) return;

      const request = await patchApproveProductReviews({ ids });
      const response = await request;

      await getProductReviewList();
      setSelectedRows([]);
      setIsOpenApproveAccountConfirmation(false);
    } catch (error) {
      // setIsOpenApproveAccountConfirmation(false);
    }
  };

  const declineProductReviews = async ids => {
    try {
      if (ids.length == 0) return;

      const request = await patchDeclineProductReviews({ ids });
      const response = await request;

      await getProductReviewList();
      setSelectedRows([]);
      setIsOpenDenyAccountConfirmation(false);
    } catch (error) {
      // setIsOpenDenyAccountConfirmation(false);
    }
  };

  const handleDeleteSelectedRows = async () => {
    try {
      const listRemoved = selectedRows.map(item => item.id);
      const request = await deleteProductReviews({ ids: listRemoved });
      const response = await request;
      await getProductReviewList();
      setSelectedRows([]);
      setOpenDeleteModal(false);
    } catch (error) {
    }
  };

  const handleDenyAccount = () => {
    console.log("deleting", currentRowOnAction);
    const ids = selectedRows.map(selectedRow =>
      Utils.getSafeValue(selectedRow, "id", 0)
    );
    setIsOpenDenyAccountConfirmation(false);
    console.log(ids);
    declineProductReviews(ids);
  };

  const handleApproveAccount = () => {
    console.log("unlocking", currentRowOnAction, selectedRows);
    const ids = selectedRows.map(selectedRow =>
      Utils.getSafeValue(selectedRow, "id", 0)
    );
    approveProductReviews(ids);
  };

  const handleAction = type => {
    console.log(type);
    if (type === "lock") {
      setIsOpen(true);
    } else if (type === "open") {
      setIsOpenApproveAccountConfirmation(true);
    } else if (type === "delete") {
      setIsOpenDenyAccountConfirmation(true);
    }
  };

  const handleSelectCate = selected => {
    // console.log(selected);
    // setSelectedCate(selected.value)
    setParams(prevParams => ({
      ...prevParams,
      status: selected.value
    }));
  };

  const handleChangeSearch = useCallback(
    lodash.debounce(value => {
      setParams(prevParams => ({
        ...prevParams,
        q: value
      }));
    }, 350),
    []
  );

  return (
    <div>
      <Grid container className={classes.toolbar} spacing={1}>
        <Grid item md={3} className={classes.titleBlock}>
          <h3 className={classes.title}>Danh sách đánh giá</h3>
        </Grid>
        <Grid item md={4} className={classes.actionBlock}>
          <div className={classes.searchBox}>
            <FormControl variant="outlined" className={classes.searchForm}>
              <InputLabel className={classes.searchFormLabel}>
                Tên sản phẩm
              </InputLabel>
              <OutlinedInput
                size="small"
                type="text"
                className={classes.searchFormInput}
                endAdornment={
                  <InputAdornment
                    position="end"
                    className={classes.searchFormIcon}
                  >
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
                onChange={e => handleChangeSearch(e.target.value)}
              />
            </FormControl>
          </div>
        </Grid>
        <Grid item md={2} className={classes.actionBlock}>
          <div className={classes.categoriesList}>
            <Select
              placeholder="Trạng thái"
              options={listStatus}
              onChange={selected => handleSelectCate(selected)}
            />
          </div>
        </Grid>
        <Grid item md className={classes.actionBlock}>
          <Button
            disabled={selectedRows.length === 0}
            variant="contained"
            color="primary"
            className={classes.addButton}
            onClick={() => setIsOpenApproveAccountConfirmation(true)}
          >
            Duyệt
          </Button>
        </Grid>
        <Grid item md className={classes.actionBlock}>
          <Button
            disabled={selectedRows.length === 0}
            variant="contained"
            color="primary"
            className={classes.deleteButton}
            onClick={() => setIsOpenDenyAccountConfirmation(true)}
          >
            Từ chối
          </Button>
        </Grid>
        <DangerButton
          startIcon={<DeleteOutline />}
          disabled={selectedRows.length === 0}
          onClick={() => setOpenDeleteModal(true)}
        >
          Xoá đã chọn
        </DangerButton>
      </Grid>
      <Table
        data={data}
        columns={columns}
        onSelect={{
          selectedRows,
          setSelectedRows
        }}
        total={data.length}
        handleAction={handleAction}
        setCurrentRow={setCurrentRowOnAction}
        // listCate={listCate}
      />
      <BasicModal
        title="Khoá tài khoản"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        // onSubmit={mode === NEWS_CATEGORIES_SCREEN_CREATION_MODE ? handleSubmitCreate : handleSubmitUpdate}
        isNewsCategory={true}
        isLockUser={true}
        readyForSave={true}
      >
        <div>Lý do khoá</div>
        <div>
          <TextField
            type="text"
            variant="outlined"
            className={classes.input}
            required
            multiline
            rows={8}
            // error={creationFormErrorMessages.vie_category_name !== ''}
            placeholder="Nhập lý do khoá"
            name="lock_reason"
            // defaultValue={creationForm.vie_category_name}
            // onChange={(evt) => handleChange(evt)}
            // helperText={creationFormErrorMessages.vie_category_name}
          />
        </div>
      </BasicModal>
      <ConfirmModal
        isOpen={isOpenApproveAccountConfirmation}
        type="save"
        title="Duyệt đánh giá"
        okText="Duyệt"
        onOk={handleApproveAccount}
        onClose={() => setIsOpenApproveAccountConfirmation(false)}
      >
        <p>Bạn có chắc muốn duyệt những đánh giá đã chọn?</p>
      </ConfirmModal>
      <ConfirmModal
        isOpen={isOpenDenyAccountConfirmation}
        type="delete"
        title="Từ chối đánh giá"
        okText="Từ chối"
        onOk={handleDenyAccount}
        onClose={() => setIsOpenDenyAccountConfirmation(false)}
      >
        <p>Bạn có chắc muốn từ chối những đánh giá đã chọn?</p>
      </ConfirmModal>
      <ConfirmModal
        isOpen={isOpenDeleteModal}
        type="delete"
        title="Xoá đánh giá"
        okText="Xoá"
        onOk={handleDeleteSelectedRows}
        onClose={() => setOpenDeleteModal(false)}
      >
        <p>Bạn có chắc muốn xóa những đánh giá đã chọn?</p>
      </ConfirmModal>
    </div>
  );
}
