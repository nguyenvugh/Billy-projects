import {
  Checkbox, IconButton, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import { Add, Create } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import Pagination from "app/components/Pagination";
import { urlWarehouse } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { ACTION_TYPE } from "app/reducers/warehouse";
import { PAGE_SIZE } from "app/utils/constant";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AddEditWarehouse from "./AddEditWarehouse";
import WarehouseDetail from "./WarehouseDetail";

const Warehouse = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const warehouseList = useSelector((store) => store.warehouse.warehouseList);
  const totalRecords = useSelector((store) => store.warehouse.totalRecords);
  const [warehouse, setWarehouse] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_WAREHOUSE_LIST_REQUEST,
      params: { limit: PAGE_SIZE, page }
    })
    setSelectedRows([]);
  }, [dispatch, page])

  const refreshList = () => {
    dispatch({
      type: ACTION_TYPE.GET_WAREHOUSE_LIST_REQUEST,
      params: { limit: PAGE_SIZE, page }
    })
    setSelectedRows([]);
  }

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(warehouseList))
        setSelectedRows(warehouseList.map(item => item?.id))
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

  const onDelete = () => {
    setConfirmDelete(false);
    if (selectedRows.length > 0) {
      dispatch({
        type: ACTION_TYPE.DELETE_WAREHOUSE_LIST_REQUEST,
        data: { ids: selectedRows },
        success: refreshList,
      })
    }
  }

  const renderList = () => {
    return (
      <Fragment>
        <ConfirmDelete
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onOK={onDelete}
          title="XÓA KHO HÀNG"
          message="Bạn có chắc muốn xóa kho hàng đã chọn?"
        />
        <div className="page-header">
          <div className="page-title">Quản lý kho hàng</div>
          <PrimaryButton
            component={Link} to="/add"
            startIcon={<Add />}
            onClick={() => setWarehouse({})}
          >
            Thêm mới
          </PrimaryButton>
          <DangerButton
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
                      selectedRows.length > 0 && selectedRows.length < warehouseList?.length
                    }
                    checked={
                      warehouseList?.length > 0 && selectedRows.length === warehouseList?.length
                    }
                    onChange={checkedAll}
                  />
                </TableCell>
                <TableCell>Mã kho hàng</TableCell>
                <TableCell>Tên kho hàng</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Chỉnh sửa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(warehouseList) && warehouseList.map((item) => (
                <TableRow key={item?.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.indexOf(item?.id) > -1}
                      onChange={(e) => checkedRow(e, item)}
                    />
                  </TableCell>
                  <TableCell>
                    {item?.code}
                  </TableCell>
                  <TableCell>
                    <Link to={`/${item?.id}`} onClick={() => setWarehouse(item)}>
                      {item?.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {item?.phone_number}
                  </TableCell>
                  <TableCell>
                    {item?.address}, {item?.ward?.name}, {item?.district?.name}, {item?.city?.name}
                  </TableCell>
                  <TableCell>
                    <Link to={`/edit/${item?.id}`} onClick={() => setWarehouse(item)}>
                      <IconButton>
                        <Create />
                      </IconButton>
                    </Link>
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
    <BrowserRouter basename={urlWarehouse}>
      <Switch>
        <Route exact path="/">
          {renderList()}
        </Route>
        <Route exact path="/add">
          <AddEditWarehouse warehouse={{}} refreshList={refreshList} />
        </Route>
        <Route exact path="/edit/:id">
          <AddEditWarehouse warehouse={warehouse} refreshList={refreshList} />
        </Route>
        <Route exact path="/:id">
          <WarehouseDetail warehouse={warehouse} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Warehouse;