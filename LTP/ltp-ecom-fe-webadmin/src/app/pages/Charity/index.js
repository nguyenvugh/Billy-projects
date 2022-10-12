import {
  Checkbox, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import { Add, DeleteOutline } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import Pagination from "app/components/Pagination";
import SearchInput from "app/components/SearchInput";
import SelectStatus from "app/components/SelectStatus";
import SwitchUI from "app/components/Switch";
import { urlCharity } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { ACTION_TYPE as LOADING_ACTION_TYPE } from 'app/reducers/loading';
import { ACTION_TYPE } from "app/reducers/charity";
import { LANG_VI, PAGE_SIZE } from "app/utils/constant";
import { formatDateTime, formatPrice, isEmpty } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AddCharity from "./AddCharity";
import AddEditCharity from "./AddEditCharity";

const allStatus = { status: "0", label: "Tất cả trạng thái" };

const Charity = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search_value, setSearchValue] = useState("");
  const [status, setStatus] = useState(allStatus);
  const charityList = useSelector((store) => store.charity.charityList);
  const totalRecords = useSelector((store) => store.charity.totalRecords);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_CHARITY_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE, page,
        search_value: isEmpty(search_value) ? undefined : search_value,
        status: status?.status === 0 ? undefined : status?.status,
      },
    });
    setSelectedRows([]);
  }, [dispatch, page, search_value, status]);

  const refreshList = () => {
    dispatch({
      type: ACTION_TYPE.GET_CHARITY_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE, page,
        search_value: isEmpty(search_value) ? undefined : search_value,
        status: status?.status === 0 ? undefined : status?.status,
      },
    });
    setSelectedRows([]);
  };

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(charityList))
        setSelectedRows(charityList.map(item => item?.id));
    } else {
      setSelectedRows([]);
    }
  };

  const checkedRow = (e, row) => {
    let selected = [...selectedRows];
    if (e.target.checked) {
      selected.push(row?.id);
    } else {
      selected = selected.filter(item => item !== row?.id);
    }
    setSelectedRows(selected);
  };

  const onSearch = (value) => {
    setSearchValue(value);
    setPage(1);
  };
  const changeStatus = (value) => {
    setStatus(value);
    setPage(1);
  };
  const onEdit = (charity) => {
    dispatch({
      type: ACTION_TYPE.UPDATE_STATUS_REQUEST,
      id: charity?.id,
      success: refreshList,
      fail: () => showErrorPopup('Không thể bật kêu gọi từ thiện này vì có sản phẩm đang trong chương trình khuyến mãi khác')
    });
  };
  const setCharity = (charity) => {
    dispatch({
      type: ACTION_TYPE.GET_CHARITY_SUCCESS,
      payload: charity,
    });
  };
  const onDelete = () => {
    setConfirmDelete(false);
    if (selectedRows.length > 0) {
      dispatch({
        type: ACTION_TYPE.DELETE_CHARITY_LIST_REQUEST,
        data: { ids: selectedRows },
        success: refreshList,
      });
    }
  };

  const showErrorPopup = (errorMessage) => dispatch({
    type: LOADING_ACTION_TYPE.SET_ERROR_MESSAGE, payload: [errorMessage]
  });

  const renderCharityList = () => {
    return (
      <Fragment>
        <AddCharity open={isAdd} setOpen={setIsAdd} refreshList={refreshList} />
        <ConfirmDelete
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onOK={onDelete}
          title="XÓA CHƯƠNG TRÌNH"
          message="Bạn có chắc muốn xóa chương trình kêu gọi đã chọn?"
        />
        <div className="page-header">
          <div className="page-title">Kêu gọi từ thiện</div>
          <SearchInput
            defaultValue={search_value}
            onSubmit={onSearch}
            placeholder="Tên chương trình"
          />
          <SelectStatus
            statusList={[allStatus, ...charityStatusList]}
            value={status}
            onChange={changeStatus}
          />
          <PrimaryButton
            startIcon={<Add />}
            onClick={() => setIsAdd(true)}
          >
            Thêm mới
          </PrimaryButton>
          <DangerButton
            startIcon={<DeleteOutline />}
            disabled={selectedRows.length === 0}
            onClick={() => setConfirmDelete(true)}
          >
            Xóa đã chọn
          </DangerButton>
        </div>
        <TableContainer component={Paper}>
          <Table padding="normal">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 && selectedRows.length < charityList?.length
                    }
                    checked={
                      charityList?.length > 0 && selectedRows.length === charityList?.length
                    }
                    onChange={checkedAll}
                  />
                </TableCell>
                <TableCell>Tên chương trình</TableCell>
                <TableCell>Mức tiền kêu gọi</TableCell>
                <TableCell>Kêu gọi được</TableCell>
                <TableCell>Ngày bắt đầu - kết thúc</TableCell>
                <TableCell>Bật/Tắt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(charityList) && charityList.map((charity) => {
                let color = getColor(charity?.start_date, charity?.end_date);
                return (
                  <TableRow key={charity?.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.indexOf(charity?.id) > -1}
                        onChange={(e) => checkedRow(e, charity)}
                      />
                    </TableCell>
                    <TableCell>
                      <Link to={`/${charity?.id}`} onClick={() => setCharity(charity)}>
                        {charity?.[`${LANG_VI}.name`]}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {formatPrice(charity?.price)} VNĐ
                    </TableCell>
                    <TableCell>
                      {formatPrice(charity?.total)} VNĐ
                    </TableCell>
                    <TableCell style={{ color }}>
                      {formatDateTime(charity?.start_date)} - {formatDateTime(charity?.end_date)}
                    </TableCell>
                    <TableCell>
                      <SwitchUI
                        checked={charity?.status === 1}
                        onChange={() => onEdit(charity)}
                        disabled={charityStatusList[0].color !== color}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(totalRecords / PAGE_SIZE)}
          page={page}
          handleChangePage={setPage}
        />
      </Fragment>
    );
  };

  return (
    <BrowserRouter basename={urlCharity}>
      <Switch>
        <Route exact path="/">
          {renderCharityList()}
        </Route>
        <Route exact path="/:id">
          <AddEditCharity refreshList={refreshList} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Charity;

const getColor = (startDate, endDate) => {
  let now = new Date().getTime();
  let start = new Date(startDate).getTime();
  let end = new Date(endDate).getTime();
  if (!start) return undefined;
  if (!end) {
    if (start > now) {
      return charityStatusList[1].color;
    } else return charityStatusList[0].color;
  }
  if (end < now) {
    return charityStatusList[2].color;
  } else if (start > now) {
    return charityStatusList[1].color;
  } else return charityStatusList[0].color;
};

export const charityStatusList = [{
  status: 1,
  label: "Đang diễn ra",
  color: "#00B41D",
}, {
  status: 2,
  label: "Sắp diễn ra",
  color: "#FEAC0B",
}, {
  status: 3,
  label: "Đã kết thúc",
  color: "#9A9A9A",
}];