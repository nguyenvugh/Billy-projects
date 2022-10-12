import {
  Box,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import Breadcrumbs from "app/components/Breadcrumbs";
import GrayButton from "app/components/Button/GrayButton";
import PrimaryButton from "app/components/Button/PrimaryButton";
import SelectStatus from "app/components/SelectStatus";
import { LANG_VI } from "app/utils/constant";
import { formatDateTime, formatPrice } from "app/utils/validate";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import OrdersStatus, { ordersStatusList } from "../components/OrdersStatus";
import PaymentStatus, { paymentStatusList } from "../components/PaymentStatus";
import { ACTION_TYPE } from "app/reducers/orders";

export default function OrdersDetail({ refreshList }) {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders.orders) || {};
  const history = useHistory();
  let { id } = useParams();
  const [status, setStatus] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const [shipping_price, setShippingPrice] = useState();
  useEffect(() =>{
    dispatch({
      type: ACTION_TYPE.GET_ORDERS_REQUEST,
      params: {
        id,
      }
    })
  }, [])
  useEffect(() => {
    if(orders?.id){
      setShippingPrice(formatPrice(orders?.shipping_price));
      setStatus(
        ordersStatusList.find((item) => item.status === orders?.shipping_status)
      );
      setPaymentStatus(
        paymentStatusList.find((item) => item.status === orders?.payment_status)
      );
    }
  }, [orders]);

  //   if (orders?.id?.toString() !== id) {
  //     history.push("/");
  //   }
  // }, []);
  const onChangeShippingPrice = (e) => {
    let value = e.target.value;
    if (value.trim() === "") {
      setShippingPrice("0");
    } else {
      setShippingPrice(formatPrice(e.target.value));
    }
  };

  const onSubmit = () => {
    let shipping_cost = shipping_price.replace(/[^0-9]/g, "");
    if (
      shipping_cost !== orders?.shipping_price ||
      status?.status !== orders?.status ||
      paymentStatus?.status !== orders?.payment_status
    ) {
      dispatch({
        type: ACTION_TYPE.EDIT_ORDERS_REQUEST,
        id: orders?.id,
        data: {
          shipping_price: shipping_cost,
          shipping_status: status?.status,
          payment_status: paymentStatus?.status,
        },
        success: () => {
          refreshList instanceof Function && refreshList();
          history.push("/");
        },
      });
    } else {
      history.push("/");
    }
  };

  return (
    <Fragment>
      <div className="page-header">
        <div className="page-title">
          <Breadcrumbs>
            <Link to="/">Danh sách đơn hàng</Link>
            <Typography>{orders?.code}</Typography>
          </Breadcrumbs>
        </div>
        {orders?.can_update_status && (
          <Fragment>
            <GrayButton component={Link} to="/">
              Hủy bỏ
            </GrayButton>
            <PrimaryButton onClick={() =>{
              onSubmit()
            }}>Lưu Lại</PrimaryButton>
          </Fragment>
        )}
      </div>
      <div className="page-content">
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Tên khách hàng</div>
              <div className="info-value">
                {orders?.order_shippings?.[0]?.name}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Mã đơn hàng</div>
              <div className="info-value">{orders?.code}</div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Số điện thoại</div>
              <div className="info-value">
                {orders?.order_shippings?.[0]?.phone_number}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Trạng thái giao vận</div>
              <div className="info-value first-child-inline">
                {orders?.can_update_status ? (
                  <SelectStatus
                    width={236}
                    value={status}
                    onChange={setStatus}
                    statusList={ordersStatusList}
                  />
                ) : (
                  <OrdersStatus status={orders?.status} />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Địa chỉ nhận hàng</div>
              <div className="info-value">
                {orders?.order_shippings?.[0]?.address}
                {", "}
                {orders?.order_shippings?.[0]?.ward?.name}
                {", "}
                {orders?.order_shippings?.[0]?.district?.name}
                {", "}
                {orders?.order_shippings?.[0]?.city?.name}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Trạng thái thanh toán</div>
              <div className="info-value first-child-inline">
                {orders?.can_update_status ? (
                  <SelectStatus
                    width={236}
                    value={paymentStatus}
                    onChange={setPaymentStatus}
                    statusList={paymentStatusList}
                  />
                ) : (
                  <PaymentStatus status={orders?.payment_status} />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Thời gian đặt</div>
              <div className="info-value">
                {formatDateTime(orders?.created_at)}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {orders?.can_update_status ? (
              <div className="info-content">
                <div className="info-label" style={{ marginBottom: 8 }}>
                  Giá ship *
                </div>
                <OutlinedInput
                  className="text-input"
                  endAdornment={
                    <InputAdornment position="end">
                      <Box color="#3A3A3A" fontWeight="bold">
                        VND
                      </Box>
                    </InputAdornment>
                  }
                  value={shipping_price}
                  onChange={onChangeShippingPrice}
                />
              </div>
            ) : (
              <div className="info-content">
                <div className="info-label">Giá ship</div>
                <div className="info-value">
                  {formatPrice(orders?.shipping_price)} VNĐ
                </div>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Giá giảm</div>
              <div className="info-value">{orders?.discount_price}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Hình thức thanh toán</div>
              <div className="info-value">
                {orders?.payments?.[0]?.type === 1
                  ? "Tiền mặt khi nhận hàng (COD)"
                  : orders?.payments?.[0]?.type === 2
                    ? "Thanh toán online"
                    : orders?.payments?.[0]?.type === 3 &&
                    "Liên hệ Nhựa Long Thành"}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Giá tổng</div>
              <div className="info-value">{formatPrice(orders?.total)}</div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Đơn vị vận chuyển</div>
              <div className="info-value">
                {[1, 2].indexOf(orders?.payments?.[0]?.type) > -1
                  ? "Giao hàng tiết kiệm"
                  : orders?.payments?.[0]?.type === 3 && "Nhựa Long Thành"}
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className="info-content">
              <div className="info-label">Lý do hủy</div>
              <div className="info-value">{orders.note}</div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="page-title">Danh sách sản phẩm</div>
      <TableContainer component={Paper} style={{ marginBottom: 24 }}>
        <Table padding="normal" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Kho hàng</TableCell>
              <TableCell>Chương trình</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell>Giá giảm</TableCell>
              <TableCell>Giá tổng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orders?.order_details) &&
              orders.order_details.map((orderItem, index) => {
                const name = (orderItem?.product?.translates || []).find(item => item.language_code === LANG_VI).name
                return (
                  <TableRow key={orderItem?.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{orderItem?.inventory?.name}</TableCell>
                    <TableCell>{orderItem?.discount_program}</TableCell>
                    <TableCell>{orderItem?.number}</TableCell>
                    <TableCell>
                      {formatPrice(orderItem?.original_price)} VNĐ
                    </TableCell>
                    <TableCell>
                      {formatPrice(orderItem?.original_price * orderItem?.number - orderItem?.total)} VNĐ
                    </TableCell>
                    <TableCell>{formatPrice(orderItem?.total)} VNĐ</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
