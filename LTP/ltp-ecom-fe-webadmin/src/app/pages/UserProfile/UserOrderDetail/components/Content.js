import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Box,
} from "@material-ui/core";
import * as Utils from "app/utils";
import { formatVND } from "app/utils/common";
import { formatDateTime, formatPrice } from "app/utils/validate";
import SelectStatus from "app/components/SelectStatus";
import OrdersStatus, {
  ordersStatusList,
} from "../../../Orders/components/OrdersStatus";
import PaymentStatus, {
  paymentStatusList,
} from "../../../Orders/components/PaymentStatus";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "10px 0",
    marginBottom: "20px",
    width: "100%",
  },
  input: {
    width: "60%",
    fontSize: "14px !important",
  },
  contentBlock: {
    width: "100%",
  },
  childContent: {
    marginBottom: "25px",
  },
  title: {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "16px",
    color: "#a4a4a4",
  },
  info: {
    fontSize: "14px",
    color: "#000000",
    fontWeight: 500,
    marginTop: "8px",
    minHeight: "18px",
  },
  itemSelect: {
    fontSize: "14px !important",
  },
}));

export default function Content({
  data,
  status,
  setStatus,
  shipping_price,
  onChangeShippingPrice,
  paymentStatus,
  setPaymentStatus,
}) {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.grid}>
        <Grid item md={6} className={classes.contentBlock}>
          <div className={classes.childContent}>
            <div className={classes.title}>Tên khách hàng</div>
            <div className={classes.info}>
              {data?.order_shippings?.[0]?.name}
            </div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Số điện thoại</div>
            <div className={classes.info}>
              {data?.order_shippings?.[0]?.phone_number}
            </div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Địa chỉ nhận hàng</div>
            <div className={classes.info}>
              {data?.order_shippings?.[0]?.address}
              {", "}
              {data?.order_shippings?.[0]?.ward?.name}
              {", "}
              {data?.order_shippings?.[0]?.district?.name}
              {", "}
              {data?.order_shippings?.[0]?.city?.name}
            </div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Thời gian đặt</div>
            <div className={classes.info}>
              {formatDateTime(data?.created_at)}
            </div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Giá giảm</div>
            <div className={classes.info}></div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Giá tổng</div>
            <div className={classes.info}>{formatVND(data?.total)}</div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Lý do huỷ</div>
            <div className={classes.info}></div>
          </div>
        </Grid>
        <Grid item md={6}>
          <div className={classes.childContent}>
            <div className={classes.title}>Mã đơn hàng</div>
            <div className={classes.info}>{data?.code}</div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Trạng thái giao vận</div>
            <div className="info-value first-child-inline">
              {data?.can_update_status ? (
                <SelectStatus
                  width={236}
                  value={status}
                  onChange={setStatus}
                  statusList={ordersStatusList}
                />
              ) : (
                <OrdersStatus status={data?.status} />
              )}
            </div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Trạng thái thanh toán</div>
            <div className="info-value first-child-inline">
              {data?.can_update_status ? (
                <SelectStatus
                  width={236}
                  value={paymentStatus}
                  onChange={setPaymentStatus}
                  statusList={paymentStatusList}
                />
              ) : (
                <PaymentStatus status={data?.payment_status} />
              )}
            </div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.info}>
              {data?.can_update_status ? (
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
                    {formatPrice(data?.shipping_price)} VNĐ
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Hình thức thanh toán</div>
            <div className={classes.info}>
              {data?.payments?.[0]?.type === 1
                ? "Tiền mặt khi nhận hàng (COD)"
                : data?.payments?.[0]?.type === 2
                ? "Thanh toán online"
                : data?.payments?.[0]?.type === 3 && "Liên hệ Nhựa Long Thành"}
            </div>
          </div>
          <div className={classes.childContent}>
            <div className={classes.title}>Đơn vị vận chuyển</div>
            <div className={classes.info}>
              {[1, 2].indexOf(data?.payments?.[0]?.type) > -1
                ? "Giao hàng tiết kiệm"
                : data?.payments?.[0]?.type === 3 && "Nhựa Long Thành"}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
