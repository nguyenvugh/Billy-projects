import {
  Checkbox, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import DangerButton from "app/components/Button/DangerButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import Pagination from "app/components/Pagination";
import { urlWarehouseReceipt } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { ACTION_TYPE as ACTION_TYPE_WAREHOUSE } from "app/reducers/warehouse";
import { ACTION_TYPE } from "app/reducers/warehouse-receipt";
import { PAGE_SIZE } from "app/utils/constant";
import { formatDateTime } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ReactSelect from "react-select";
import EditReceipt from "./EditReceipt";

const defaulSelect = { value: 0, label: "Tất cả kho hàng" };

const WarehouseReceipt = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const receiptList = useSelector((store) => store.warehouseReceipt.warehouseReceiptList);
  const totalRecords = useSelector((store) => store.warehouseReceipt.totalRecords);
  const [warehouseList, setWarehouseList] = useState([]);
  const [warehouse, setWarehouse] = useState(defaulSelect);
  const [receipt, setReceipt] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE_WAREHOUSE.GET_WAREHOUSE_LIST_REQUEST,
      params: { limit: 500, page: 1 },
      success: (response) => {
        let warehouseList = response?.data?.results;
        if (Array.isArray(warehouseList)) {
          setWarehouseList([
            defaulSelect,
            ...warehouseList.map(item => ({ value: item?.id, label: item?.name })
            )]
          )
        }
      }
    })
  }, [dispatch])

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_WAREHOUSE_RECEIPT_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE, page,
        inventory: warehouse?.value === 0 ? undefined : warehouse?.value
      }
    })
    setSelectedRows([]);
  }, [dispatch, page, warehouse])

  const refreshList = () => {
    dispatch({
      type: ACTION_TYPE.GET_WAREHOUSE_RECEIPT_LIST_REQUEST,
      params: { limit: PAGE_SIZE, page }
    })
    setSelectedRows([]);
  }

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(receiptList))
        setSelectedRows(receiptList.map(item => item?.id))
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

  const onChangeWarehouse = (warehouse) => {
    setWarehouse(warehouse);
    setPage(1);
  }

  const onDelete = () => {
    setConfirmDelete(false);
    if (selectedRows.length > 0) {
      let receipt = receiptList.filter(item => selectedRows.includes(item?.id));
      let data = {};
      for (let i = 0; i < receipt.length; i++) {
        let key = receipt[i]?.inventory?.id;
        if (data[key]) {
          data[key].push(receipt[i]?.id);
        } else {
          data[key] = [receipt[i]?.id];
        }
      }
      dispatch({
        type: ACTION_TYPE.DELETE_WAREHOUSE_RECEIPT_REQUEST,
        data,
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
          title="XÓA PHIẾU NHẬP KHO"
          message="Xóa phiếu nhập kho có thế sẽ làm âm số lượng sản phẩm trong kho hàng. Bạn có chắc chắn xóa?"
        />
        <div className="page-header">
          <div className="page-title">Phiếu nhập kho</div>
          <ReactSelect
            styles={{ control: (base) => ({ ...base, width: 200, height: 40 }) }}
            placeholder="Tất cả kho hàng"
            options={warehouseList}
            value={warehouse}
            onChange={onChangeWarehouse}
          />
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
                      selectedRows.length > 0 && selectedRows.length < receiptList?.length
                    }
                    checked={
                      receiptList?.length > 0 && selectedRows.length === receiptList?.length
                    }
                    onChange={checkedAll}
                  />
                </TableCell>
                <TableCell>Mã phiếu</TableCell>
                <TableCell>Tên kho hàng</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Người tạo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(receiptList) && receiptList.map((item) => (
                <TableRow key={item?.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.indexOf(item?.id) > -1}
                      onChange={(e) => checkedRow(e, item)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/${item?.id}`} onClick={() => setReceipt(item)}>
                      {item?.code}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {item?.inventory?.name}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(item?.created_at)}
                  </TableCell>
                  <TableCell>
                    {item?.created_by?.fullname}
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
    <BrowserRouter basename={urlWarehouseReceipt}>
      <Switch>
        <Route exact path="/">
          {renderList()}
        </Route>
        <Route exact path="/:id">
          <EditReceipt receipt={receipt} refreshList={refreshList} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default WarehouseReceipt;