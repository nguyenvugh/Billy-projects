import {
  Box,
  Checkbox, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@material-ui/core";
import DangerButton from "app/components/Button/DangerButton";
import ConfirmDelete from "app/components/ConfirmDelete";
import DateRangePicker from "app/components/DateRangePicker";
import Pagination from "app/components/Pagination";
import SearchInput from "app/components/SearchInput";
import { ACTION_TYPE } from "app/reducers/orders";
import { LANG_VI, PAGE_SIZE } from "app/utils/constant";
import { formatDateTime, formatPrice, isEmpty } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import OrdersStatus, { ordersStatusList } from "./components/OrdersStatus";
import SelectStatus from "app/components/SelectStatus";
import Popover from "app/components/Popover";
import OrdersDetail from "./OrderDetail";
import { urlOrders } from "app/Layouts/AuthenticatedLayout/Sidebar/url";
import { DeleteOutline } from "@material-ui/icons";
import PaymentStatus, { paymentStatusList } from "./components/PaymentStatus";

const allStatus = { status: 0, label: "Trạng thái giao vận", color: "unset" };
const allPaymentStatus = { status: 0, label: "Trạng thái thanh toán", color: "unset" };
export const listTypeShipping = [
  { 
    status: 0, 
    label: "Đơn vị vận chuyển" 
  },
  {
    status: 2,
    label: "Nhựa long thành",
  },
  {
    status: 1,
    label: "Giao hàng tiết kiệm",
  },
];
export default function Orders() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search_value, setSearchValue] = useState("");
  const [status, setStatus] = useState(allStatus);
  const [statusList] = useState([allStatus, ...ordersStatusList]);
  const [paymentStatus, setPaymentStatus] = useState(allPaymentStatus);
  const [typeShipping, setTypeShipping] = useState(listTypeShipping[0]);
  const [paymentList] = useState([allPaymentStatus, ...paymentStatusList]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const ordersList = useSelector((store) => store.orders.ordersList);
  const totalRecords = useSelector((store) => store.orders.totalRecords);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPE.GET_ORDERS_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE,
        page,
        search_value: isEmpty(search_value) ? undefined : search_value,
        shipping_status: status?.status === allStatus.status ? undefined : status.status,
        payment_status: paymentStatus?.status === allPaymentStatus.status ? undefined : paymentStatus.status,
        shipping_driver: typeShipping?.status ? typeShipping?.status : undefined,
        order_date_from: startDate === "" ? undefined : startDate,
        order_date_to: endDate === "" ? undefined : endDate,
      }
    });
    setSelectedRows([]);
  }, [dispatch, page, search_value, status, paymentStatus, startDate, endDate, typeShipping])

  const refreshList = () => {
    dispatch({
      type: ACTION_TYPE.GET_ORDERS_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE,
        page,
        search_value: isEmpty(search_value) ? undefined : search_value,
        shipping_status: status?.status === allStatus.status ? undefined : status.status,
        payment_status: paymentStatus?.status === allPaymentStatus.status ? undefined : paymentStatus.status,
        order_date_from: startDate === "" ? undefined : startDate,
        order_date_to: endDate === "" ? undefined : endDate,
      }
    })
    setSelectedRows([]);
  }

  const checkedAll = (e) => {
    if (e.target.checked) {
      if (Array.isArray(ordersList))
        setSelectedRows(ordersList.map(item => item?.id))
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
  const changeStatus = (value) => {
    setStatus(value);
    setPage(1);
  }
  const changePaymentStatus = (value) => {
    setPaymentStatus(value);
    setPage(1);
  }
  const changeTypeShipping = (value) => {
    setTypeShipping(value);
    setPage(1);
  }
  const setRange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setPage(1);
  }

  const onDelete = () => {
    setConfirmDelete(false);
    if (selectedRows.length > 0) {
      dispatch({
        type: ACTION_TYPE.DELETE_ORDERS_REQUEST,
        data: { ids: selectedRows.join(",") },
        success: refreshList,
      })
    }
  }

  const onDetail = (orders) => {
    dispatch({
      type: ACTION_TYPE.GET_ORDERS_SUCCESS,
      payload: { results: orders }
    })
    setSelectedRows([]);
  }

  const onChangeStatus = (status, orders) => {
    let data = {
      shipping_price: orders?.shipping_price,
      shipping_status: status?.status,
      payment_status: orders?.payment_status,
    }
    editOrders(data, orders?.id);
  }

  const onChangePaymentStatus = (status, orders) => {
    let data = {
      shipping_price: orders?.shipping_price,
      shipping_status: orders?.status,
      payment_status: status?.status,
    }
    editOrders(data, orders?.id);
  }

  const editOrders = (data, id) => {
    dispatch({
      type: ACTION_TYPE.EDIT_ORDERS_REQUEST,
      id,
      data,
      success: () => {
        refreshList instanceof Function && refreshList();
      }
    })
  }

  const renderOrderList = () => {
    return (
      <Fragment>
        <ConfirmDelete
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onOK={onDelete}
          title="XÓA ĐƠN HÀNG"
          message="Bạn có chắc muốn xóa những đơn hàng đã chọn?"
          cancelTitle="HỦY BỎ"
          okTitle="XÓA"
        />
        <div className="page-header">
          <div className="page-title" style={{ width: "100%" }}>Danh sách đơn hàng</div>
          <SearchInput
            defaultValue={search_value}
            onSubmit={onSearch}
            placeholder="Mã đơn hàng/SĐT"
            type="number"
          />
          <SelectStatus
            width={200}
            value={status}
            onChange={changeStatus}
            statusList={statusList}
          />
          <SelectStatus
            width={220}
            value={paymentStatus}
            onChange={changePaymentStatus}
            statusList={paymentList}
          />
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={setRange}
            label="Ngày đặt hàng"
          />
          {/* <DangerButton
            startIcon={<DeleteOutline />}
            disabled={selectedRows.length === 0}
            onClick={() => setConfirmDelete(true)}
          >
            Xóa đã chọn
          </DangerButton> */}
           <SelectStatus
            width={190}
            value={typeShipping}
            onChange={changeTypeShipping}
            statusList={listTypeShipping}
          />
        </div>
        <TableContainer component={Paper}>
          <Table padding="normal" style={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 && selectedRows.length < ordersList?.length
                    }
                    checked={
                      ordersList?.length > 0 && selectedRows.length === ordersList?.length
                    }
                    onChange={checkedAll}
                  />
                </TableCell>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Thời gian đặt</TableCell>
                <TableCell>Giá tổng (VNĐ)</TableCell>
                <TableCell style={{ width: "10%" }}>Tên Mặt hàng</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Trạng thái giao vận</TableCell>
                <TableCell>Trạng thái thanh toán</TableCell>
                <TableCell>Đơn vị vận chuyển</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(ordersList) && ordersList.map((orders) => {
                return (
                  <TableRow key={orders?.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.indexOf(orders?.id) > -1}
                        onChange={(e) => checkedRow(e, orders)}
                      />
                    </TableCell>
                    <TableCell>
                      <Link to={`/${orders?.id}`} onClick={() => onDetail(orders)}>
                        {orders?.code}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {formatDateTime(orders?.created_at)}
                    </TableCell>
                    <TableCell>
                      {formatPrice(orders?.total)}
                    </TableCell>
                    <TableCell>
                      <Popover renderButton={() => (
                        <div className="ellipsis" style={{ cursor: "pointer" }}>
                          <span>
                            {Array.isArray(orders?.order_details) && orders.order_details.map(item => item?.product?.[LANG_VI]?.name).join('; ')}
                          </span>
                        </div>
                      )}>
                        <Box maxHeight={350} maxWidth={350}>
                          {Array.isArray(orders?.order_details) && orders.order_details.map((item, index) => {
                            return (
                              <Box key={item?.id} px={2} py={1} borderBottom="1px solid rgba(224, 224, 224, 1)">
                                {index + 1}. {item?.product?.[LANG_VI]?.name}
                              </Box>
                            )
                          })}
                        </Box>
                      </Popover>
                    </TableCell>
                    <TableCell>
                      {orders?.order_shippings?.[0]?.name}
                    </TableCell>
                    <TableCell>
                      {orders?.order_shippings?.[0]?.phone_number}
                    </TableCell>
                    <TableCell>
                      {orders?.can_update_status ?
                        <SelectStatus
                          width={160}
                          value={ordersStatusList[orders?.shipping_status - 1]}
                          onChange={(status) => onChangeStatus(status, orders)}
                          statusList={ordersStatusList}
                          type="label"
                        /> :
                        <OrdersStatus status={orders?.shipping_status} width={160} />
                      }
                    </TableCell>
                    <TableCell>
                      {orders?.can_update_status ?
                        <SelectStatus
                          width={170}
                          value={paymentStatusList[orders?.payment_status - 1]}
                          onChange={(status) => onChangePaymentStatus(status, orders)}
                          statusList={paymentStatusList}
                          type="label"
                        /> :
                        <PaymentStatus status={orders?.payment_status} width={170} />
                      }
                    </TableCell>
                    <TableCell>
                      {[1, 2].indexOf(orders?.payments?.[0]?.type) > -1 ? "Giao hàng tiết kiệm" :
                        orders?.payments?.[0]?.type === 3 && "Nhựa Long Thành"}
                    </TableCell>
                  </TableRow>
                )
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
    )
  }

  return (
    <BrowserRouter basename={urlOrders}>
      <Switch>
        <Route exact path="/">
          {renderOrderList()}
        </Route>
        <Route exact path="/:id">
          <OrdersDetail refreshList={refreshList} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
