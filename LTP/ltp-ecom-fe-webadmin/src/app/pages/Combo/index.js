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
import { urlCombo } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { ACTION_TYPE } from "app/reducers/combo";
import { LANG_EN, LANG_VI, PAGE_SIZE } from "app/utils/constant";
import { formatPrice } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AddCombo from "./AddCombo";
import AddEditCombo from "./AddEditCombo";

const Combo = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search_value, setSearchValue] = useState("");
  const comboList = useSelector((store) => store.combo.comboList);
  const totalRecords = useSelector((store) => store.combo.totalRecords);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_COMBO_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE, page,
        search: search_value.trim() === "" ? undefined : search_value,
      },
    });
    setSelectedRows([]);
  }, [dispatch, page, search_value])

  const refreshList = () => {
    dispatch({
      type: ACTION_TYPE.GET_COMBO_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE, page,
        search: search_value.trim() === "" ? undefined : search_value,
      },
    });
    setSelectedRows([]);
  }

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(comboList))
        setSelectedRows(comboList.map(item => item?.id))
    } else {
      setSelectedRows([])
    }
  };

  const checkedRow = (e, row) => {
    let selected = [...selectedRows];
    if (e.target.checked) {
      selected.push(row?.id)
    } else {
      selected = selected.filter(item => item !== row?.id)
    }
    setSelectedRows(selected)
  };

  const onSearch = (value) => {
    setSearchValue(value);
    setPage(1);
  }
  const changeStatus = (status, combo) => {
    dispatch({
      type: ACTION_TYPE.UPDATE_STATUS_REQUEST,
      id: combo?.id,
      data: { status: status?.status },
      success: refreshList
    })
  }

  const onDelete = () => {
    setConfirmDelete(false);
    if (selectedRows.length > 0) {
      dispatch({
        type: ACTION_TYPE.DELETE_COMBO_LIST_REQUEST,
        data: { ids: selectedRows },
        success: refreshList,
      })
    }
  }

  const renderComboList = () => {
    return (
      <Fragment>
        <AddCombo open={isAdd} setOpen={setIsAdd} refreshList={refreshList} />
        <ConfirmDelete
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onOK={onDelete}
          title="XÓA COMBO"
          message="Bạn có chắc muốn xóa combo đã chọn?"
        />
        <div className="page-header">
          <div className="page-title">Quản lý combo</div>
          <SearchInput
            defaultValue={search_value}
            onSubmit={onSearch}
            placeholder="Mã/Tên combo"
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
                      selectedRows.length > 0 && selectedRows.length < comboList?.length
                    }
                    checked={
                      comboList?.length > 0 && selectedRows.length === comboList?.length
                    }
                    onChange={checkedAll}
                  />
                </TableCell>
                <TableCell>Mã combo</TableCell>
                <TableCell>Tên combo</TableCell>
                <TableCell style={{ width: "25%" }}>Thành phần</TableCell>
                <TableCell>Giá bán</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(comboList) && comboList.map((combo) => (
                <TableRow key={combo?.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.indexOf(combo?.id) > -1}
                      onChange={(e) => checkedRow(e, combo)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/${combo?.id}`}>
                      {combo?.code}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {combo?.[LANG_VI]?.name}
                  </TableCell>
                  <TableCell className="ellipsis">
                    <span>
                      {Array.isArray(combo?.details) &&
                        combo.details.map(detail => detail?.product?.[LANG_VI]?.name).join(", ")
                      }
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatPrice(combo?.total_price)} đ
                  </TableCell>
                  <TableCell className="first-child-inline">
                    <SelectStatus
                      width={100}
                      value={comboStatusList.find(item => item.status === combo?.status)}
                      onChange={(status) => changeStatus(status, combo)}
                      statusList={comboStatusList}
                      type="label"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(totalRecords / PAGE_SIZE)}
          page={page}
          handleChangePage={setPage}
        />
      </Fragment>
    )
  }

  return (
    <BrowserRouter basename={urlCombo}>
      <Switch>
        <Route exact path="/">
          {renderComboList()}
        </Route>
        <Route exact path="/:id">
          <AddEditCombo refreshList={refreshList} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Combo;

export const comboStatusList = [{
  status: 1,
  label: "Hiện",
  color: "#00B41D",
}, {
  status: -1,
  label: "Ẩn",
  color: "#A0AEC0",
}]