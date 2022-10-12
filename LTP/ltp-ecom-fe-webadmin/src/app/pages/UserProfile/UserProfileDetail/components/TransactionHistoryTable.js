import { useState, useEffect } from "react";
import lodash from "lodash";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MTable from "@material-ui/core/Table";
import MTableBody from "@material-ui/core/TableBody";
import MTableCell from "@material-ui/core/TableCell";
import MTableContainer from "@material-ui/core/TableContainer";
import MTableHead from "@material-ui/core/TableHead";
import MTableRow from "@material-ui/core/TableRow";
import {
  Grid,
  Checkbox,
  Paper,
  Chip,
  Button,
  FormControl,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  TableContainer,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import Pagination from "app/components/Pagination";
import Select from "react-select";
import ConfirmModal from "app/components/ConfirmModal";
import DateRangePicker from "app/components/DateRangePicker";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SelectStatus from "./SelectStatus";
import { formatDateTime } from "app/utils/validate";
import { formatVND } from "app/utils/common";
import OrdersStatus, {
  ordersStatusList,
} from "../../../Orders/components/OrdersStatus";
import PaymentStatus, {
  paymentStatusList,
} from "../../../Orders/components/PaymentStatus";

import * as AppURL from "app/services/urlAPI";
import * as Utils from "app/utils";
import { getProductCategory, addNewCate, putApi } from "app/services/axios";

function createData(
  id,
  transactionId,
  time,
  totalPrice,
  name,
  phoneNum,
  status
) {
  return { id, transactionId, time, totalPrice, name, phoneNum, status };
}

const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) =>
  createData(
    item,
    `ABCXYZ${item}`,
    `02/02/2020 10:30`,
    "200.000.000 VNĐ",
    "Sản phẩm A, Thùng nhựa nặng ...",
    "0987321253",
    lodash.random(1, 4)
  )
);

const columns = [
  {
    id: 1,
    name: "transactionId",
    text: "Mã đơn hàng",
  },
  {
    id: 2,
    name: "time",
    text: "Ngày giờ đặt",
  },
  {
    id: 3,
    name: "totalPrice",
    text: "Giá tổng(VNĐ)",
  },
  {
    id: 4,
    name: "productName",
    text: "Tên mặt hàng",
  },
  {
    id: 5,
    name: "customerName",
    text: "Tên khách hàng",
  },
  {
    id: 6,
    name: "phoneNum",
    text: "Số điện thoại",
  },
  {
    id: 7,
    name: "shipmentStatus",
    text: "Trạng thái giao vận",
  },
  {
    id: 8,
    name: "paymentStatus",
    text: "Trạng thái thanh toán",
  },
  {
    id: 9,
    name: "shipmentCompany",
    text: "Đơn vị vận chuyển",
  },
];

const initialOrderStatus = {
  status: 0,
  label: "Tất cả trạng thái",
  color: "unset",
};

const initialPaymentStatus = {
  status: 0,
  label: "Trạng thái thanh toán",
  color: "unset",
};

const useStyles = makeStyles((theme) => ({
  main: {
    margin: "20px 0",
  },
  toolbar: {
    margin: "15px 0",
  },
  title: {
    fontSize: "18px",
    margin: 0,
    fontWeight: 600,
    lineHeight: "36px",
  },
  actionBlock: {
    // textAlign: "left",
    // width: "90%",
    marginRight: "15px",
  },
  dateRange: {
    width: "90%",
  },
  deleteForm: {
    textAlign: "right",
  },
  deleteButton: {
    backgroundColor: "#D70000",
    textTransform: "unset",
    height: "40px !important",
    width: "150px",
  },
  table: {
    backgroundColor: "#ffffff",
  },
  tableHeader: {
    color: "#99A6B7",
  },
  pagination: {
    margin: "20px 0",
    float: "right",
  },
  statusCompleted: {
    color: "#00B41D",
    border: "1px solid #9EE2B8",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  statusPending: {
    color: "#F8B711",
    border: "1px solid #F3C51F",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  statusCanceled: {
    color: "#EA403F",
    border: "1px solid #EA403F",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  statusConfirmed: {
    color: "#858585",
    border: "1px solid #858585",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  statusConfirmedPending: {
    color: "#ffc043",
    border: "1px solid #ffc043",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  statusReturn: {
    color: "#dbff00",
    border: "1px solid #dbff00",
    backgroundColor: "#ffffff",
    height: "24px",
    width: "135px",
  },
  searchForm: {
    fontSize: "14px",
    display: "flex",
    width: "200px",
  },
  searchFormLabel: {
    fontSize: "14px",
    marginTop: "-8px",
    color: "#898989",
  },
  searchFormInput: {
    fontSize: "14px",
    height: "40px",
    borderColor: "#E2E2E2",
    width: "90%",
    backgroundColor: "#ffffff",
  },
  searchFormIcon: {
    height: "36px",
    width: "36px",
  },
  icon: {
    height: "10px",
    width: "10px",
    marginRight: "10px",
  },
  iconCompleted: {
    height: "10px",
    width: "10px",
    color: "#00c537",
    marginRight: "10px",
  },
  iconPending: {
    height: "10px",
    width: "10px",
    color: "#f7b611",
    marginRight: "10px",
  },
  iconConfirmed: {
    height: "10px",
    width: "10px",
    color: "#383838",
    marginRight: "10px",
  },
  iconDelivering: {
    height: "10px",
    width: "10px",
    color: "#276ef1",
    marginRight: "10px",
  },
  iconCanceled: {
    height: "10px",
    width: "10px",
    color: "#ea403f",
    marginRight: "10px",
  },
  iconReturn: {
    height: "10px",
    width: "10px",
    color: "#DBFF00",
    marginRight: "10px",
  },
  iconConfirmedPending: {
    height: "10px",
    width: "10px",
    color: "#FF8947",
    marginRight: "10px",
  },
  menuFloat: {
    fontSize: "14px",
  },
  textBlue: {
    color: "#007BFF !important",
    cursor: "pointer",
  },
  input: {
    width: "100%",
  },
  ellipsis: {
    display: "inline-block",
    width: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const customStyles = {
  control: (base) => ({
    ...base,
    height: 40,
    minHeight: 40,
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#373737",
      fontSize: "14px",
    };
  },
};

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function TransactionHistoryTable({ id }) {
  const classes = useStyles();
  const history = useHistory();

  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);
  const [isOpenDeleteOrderConfirmation, setIsOpenDeleteOrderConfirmation] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [orderFilterList, setOrderFilterList] = useState([
    initialOrderStatus,
    ...ordersStatusList,
  ]);
  const [paymentList, setPaymentList] = useState([
    initialPaymentStatus,
    ...paymentStatusList,
  ]);
  const [currentStatusOrder, setCurrentStatusOrder] =
    useState(initialOrderStatus);
  const [currentPaymentStatus, setCurrentPaymentStatus] =
    useState(initialPaymentStatus);
  const [query, setQuery] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElPayment, setAnchorElPayment] = useState(null);

  useEffect(async () => {
    try {
      if (id) {
        let url = Utils.replaceStrUrl(AppURL.orderByCustomer, [
          id,
          currentPage,
          10,
        ]);
        if (query !== "") url += `&search_value=${query}`;
        if (currentStatusOrder.status !== 0)
          url += `&shipping_status=${currentStatusOrder.status}`;
        if (currentPaymentStatus.status !== 0)
          url += `&payment_status=${currentPaymentStatus.status}`;
        if (startDate !== "") url += `&order_date_from=${startDate}`;
        if (endDate !== "") url += `&order_date_to=${endDate}`;
        await getProductCategory(url).then((res) => {
          if (res.code === 200) {
            const data = Utils.getSafeValue(res, "data", {});
            const results = Utils.getSafeValue(data, "results", []);
            const total = Utils.getSafeValue(data, "totalRecords", 0);
            setData(results);
            setTotal(total);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    currentPage,
    query,
    currentStatusOrder,
    currentPaymentStatus,
    startDate,
    endDate,
    isUpdated,
  ]);

  const handleSelectAllClick = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data);
    }
  };

  const handleSelectRow = (row) => {
    if (isSelected(row)) {
      const newSelectedRows = selectedRows.filter((item) => item.id !== row.id);
      setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = [...selectedRows, row];
      setSelectedRows(newSelectedRows);
    }
  };

  const handleDeleteSelectedRows = () => {
    let ids = [];
    selectedRows.map((selectedRow) => {
      const id = Utils.getSafeValue(selectedRow, "id", 0);
      ids.push(id);
    });
    const params = {
      ids: ids.join(),
    };
    addNewCate(AppURL.deleteOrders, params).then((res) => {
      if (res.code === 200) {
        setIsUpdated(!isUpdated);
      }
    });
    setIsOpenDeleteOrderConfirmation(false);
    setSelectedRows([]);
  };

  const handleChangePage = (event, newPage) => {
    console.log("handleChangePage", newPage);
    setCurrentPage(newPage);
  };

  const handleDoubleClickRow = (row) => {
    setSelectedItem(row);
    history.push({
      pathname: `${id}/order/${row.id}`,
      state: row,
    });
  };

  const isSelected = (row) => {
    return lodash.find(selectedRows, { id: row.id }) !== undefined;
  };

  const setRange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    // setPage(1);
  };

  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = () => {
    setAnchorEl(null);
  };

  const handleClickActionPayment = (event) => {
    setAnchorElPayment(event.currentTarget);
  };

  const handleCloseActionPayment = () => {
    setAnchorElPayment(null);
  };

  const handleActionPayment = (status) => {
    if (lodash.isEmpty(currentRow)) return;
    let params = {
      shipping_price: currentRow?.shipping_price,
      shipping_status: currentRow?.shipping_status,
      payment_status: status,
    };
    putApi(
      Utils.replaceStrUrl(AppURL.updateOrderDetail, [currentRow?.id]),
      params
    )
      .then((response) => {
        if (response.code === 200) {
          setIsUpdated(!isUpdated);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleActionShipping = (status) => {
    if (lodash.isEmpty(currentRow)) return;
    let params = {
      shipping_price: currentRow?.shipping_price,
      shipping_status: status,
      payment_status: currentRow?.payment_status,
    };
    putApi(
      Utils.replaceStrUrl(AppURL.updateOrderDetail, [currentRow?.id]),
      params
    )
      .then((response) => {
        if (response.code === 200) {
          setIsUpdated(!isUpdated);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid className={classes.main}>
      <h3 className={classes.title}>
        <span className={classes.titleLink}>Lịch sử giao dịch</span>
      </h3>
      <div className="page-header">
        <FormControl variant="outlined" className={classes.searchForm}>
          <InputLabel className={classes.searchFormLabel}>
            Mã đơn hàng
          </InputLabel>
          <OutlinedInput
            size="small"
            type="text"
            className={classes.searchFormInput}
            endAdornment={
              <InputAdornment position="end" className={classes.searchFormIcon}>
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </FormControl>
        <div className={classes.actionBlock}>
          <SelectStatus
            width={210}
            statusList={orderFilterList}
            onChange={(value) => setCurrentStatusOrder(value)}
            value={currentStatusOrder}
          />
        </div>
        <div className={classes.actionBlock}>
          <SelectStatus
            isLarge={true}
            statusList={paymentList}
            onChange={(value) => setCurrentPaymentStatus(value)}
            value={currentPaymentStatus}
          />
        </div>
        <Grid style={{ paddingRight: "10px" }}>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={setRange}
            label="Ngày đặt hàng"
          />
        </Grid>
        <Button
          disabled={selectedRows.length === 0}
          variant="contained"
          color="primary"
          className={classes.deleteButton}
          onClick={() => setIsOpenDeleteOrderConfirmation(true)}
        >
          Xoá đã chọn
        </Button>
      </div>
      <div className={classes.table}>
        <MTableContainer component={Paper}>
          <MTable padding="normal" style={{ minWidth: 1500 }}>
            <MTableHead>
              <MTableRow>
                <MTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < data.length
                    }
                    checked={
                      data.length > 0 && selectedRows.length === data.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </MTableCell>
                {columns.map((item) => (
                  <MTableCell key={item.id} className={classes.tableHeader}>
                    {item.text}
                  </MTableCell>
                ))}
              </MTableRow>
            </MTableHead>
            <MTableBody>
              {data.map((row) => {
                const id = Utils.getSafeValue(row, "id", 0);
                const code = Utils.getSafeValue(row, "code", "");
                const created_at = Utils.getSafeValue(row, "created_at", "");
                const total = Utils.getSafeValue(row, "total", 0);
                const orderDetails = Utils.getSafeValue(
                  row,
                  "order_details",
                  []
                );
                let name = "";
                if (Array.isArray(orderDetails)) {
                  const nameArr = orderDetails.map((orderDetail) => {
                    const product = Utils.getSafeValue(
                      orderDetail,
                      "product",
                      {}
                    );
                    const translates = Utils.getSafeValue(
                      product,
                      "translates",
                      []
                    );
                    const name = Utils.getObjByLanguage(
                      translates,
                      "vi",
                      "name"
                    );
                    return name;
                  });
                  name = nameArr.join(", ");
                }
                const orderShippings = Utils.getSafeValue(
                  row,
                  "order_shippings",
                  []
                );
                const phone_number = Utils.getSafeValue(
                  orderShippings[0],
                  "phone_number",
                  ""
                );
                const status = Utils.getSafeValue(row, "status", 0);
                const customerName = Utils.getSafeValue(
                  row,
                  "customer.name",
                  ""
                );
                return (
                  <MTableRow key={id}>
                    <MTableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected(row)}
                        onChange={() => handleSelectRow(row)}
                      />
                    </MTableCell>
                    <MTableCell>
                      <span
                        className={classes.textBlue}
                        onClick={() => handleDoubleClickRow(row)}
                      >
                        {code}
                      </span>
                    </MTableCell>
                    <MTableCell>{formatDateTime(created_at)}</MTableCell>
                    <MTableCell>{formatVND(total)}</MTableCell>
                    <MTableCell>
                      <span className={classes.ellipsis}>{name}</span>
                    </MTableCell>
                    <MTableCell>{customerName}</MTableCell>
                    <MTableCell>{phone_number}</MTableCell>
                    <MTableCell
                      aria-controls="shipping-status"
                      onClick={(e) => {
                        handleClickAction(e);
                        setCurrentRow(row);
                      }}
                    >
                      <OrdersStatus status={row?.shipping_status} width={160} />
                    </MTableCell>
                    <MTableCell
                      aria-controls="payment-status"
                      onClick={(e) => {
                        handleClickActionPayment(e);
                        setCurrentRow(row);
                      }}
                    >
                      <PaymentStatus status={row?.payment_status} width={170} />
                    </MTableCell>
                    <MTableCell>
                      {[1, 2].indexOf(row?.payments?.[0]?.type) > -1
                        ? "Giao hàng tiết kiệm"
                        : row?.payments?.[0]?.type === 3 && "Nhựa Long Thành"}
                    </MTableCell>
                    <StyledMenu
                      id="shipping-status"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseAction}
                    >
                      {ordersStatusList.map((orders) => {
                        return (
                          <MenuItem
                            onClick={async (e) => {
                              handleClickAction(e);
                              await handleActionShipping(orders?.status);
                              handleCloseAction();
                            }}
                            className={classes.menuFloat}
                          >
                            <FiberManualRecordIcon
                              className={classes.icon}
                              style={{ color: orders?.color }}
                            />
                            {orders?.label}
                          </MenuItem>
                        );
                      })}
                    </StyledMenu>
                    <StyledMenu
                      id="payment-status"
                      anchorEl={anchorElPayment}
                      keepMounted
                      open={Boolean(anchorElPayment)}
                      onClose={handleCloseActionPayment}
                    >
                      {paymentStatusList.map((payment) => {
                        return (
                          <MenuItem
                            onClick={async (e) => {
                              handleClickActionPayment(e);
                              await handleActionPayment(payment?.status);
                              handleCloseActionPayment();
                            }}
                            className={classes.menuFloat}
                          >
                            <FiberManualRecordIcon
                              className={classes.icon}
                              style={{ color: payment?.color }}
                            />
                            {payment?.label}
                          </MenuItem>
                        );
                      })}
                    </StyledMenu>
                  </MTableRow>
                );
              })}
            </MTableBody>
          </MTable>
        </MTableContainer>
        <Pagination count={Math.ceil(total / 10)} onChange={handleChangePage} />
      </div>
      <ConfirmModal
        isOpen={isOpenDeleteOrderConfirmation}
        type="delete"
        title="Xoá đơn hàng"
        okText="Xoá"
        onOk={handleDeleteSelectedRows}
        onClose={() => setIsOpenDeleteOrderConfirmation(false)}
      >
        <p>Bạn có chắc muốn xóa những đơn hàng đã chọn?</p>
      </ConfirmModal>
    </Grid>
  );
}
