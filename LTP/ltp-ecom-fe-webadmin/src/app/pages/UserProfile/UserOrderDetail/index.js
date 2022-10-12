import { useEffect, useLayoutEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider, FormControlLabel, Checkbox } from "@material-ui/core";
import lodash from "lodash";
import { formatDateTime, formatPrice } from "app/utils/validate";

import Toolbar from "./components/Toolbar";
import Content from "./components/Content";
import ProductListTable from "./components/ProductListTable";

import * as Utils from "../../../utils";
import * as AppURL from "../../../services/urlAPI";
import { putApi } from "app/services/axios";
import { ordersStatusList } from "../../Orders/components/OrdersStatus";
import { paymentStatusList } from "../../Orders/components/PaymentStatus";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#ffffff",
    padding: "20px",
    marginBottom: "20px",
  },
  photos: {
    padding: "0px 0px 0px 20px",
  },
}));

export default function UserProfileDetail() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [data, setData] = useState(location.state);
  const [orderDetails, setOrderDetails] = useState([]);
  const [status, setStatus] = useState(0);
  const [shipping_price, setShippingPrice] = useState();
  const [paymentStatus, setPaymentStatus] = useState();

  const onChangeShippingPrice = (e) => {
    let value = e.target.value;
    if (value.trim() === "") {
      setShippingPrice("0");
    } else {
      setShippingPrice(formatPrice(e.target.value));
    }
  };

  useEffect(() => {
    const data = location.state;
    // console.log(data);
    // const order_details = Utils.getSafeValue(data, "order_details", []);
    // let status = Utils.getSafeValue(data, "status", 0);
    // if (status === 3) status = 1;
    // setOrderDetails(order_details);
    // setStatus(status);
    setShippingPrice(data?.shipping_price);
    setStatus(
      ordersStatusList.find((item) => item.status === data?.shipping_status)
    );
    setPaymentStatus(
      paymentStatusList.find((item) => item.status === data?.payment_status)
    );
  }, []);

  const handleUpdateOrder = async () => {
    let shipping_cost = shipping_price.replace(/[^0-9]/g, "");
    if (
      shipping_cost !== data?.shipping_price ||
      status?.status !== data?.status ||
      paymentStatus?.status !== data?.payment_status
    ) {
      const params = {
        shipping_price: shipping_cost,
        shipping_status: status?.status,
        payment_status: paymentStatus?.status,
      };
      const url = Utils.replaceStrUrl(AppURL.updateOrderDetail, [data?.id]);
      putApi(url, params)
        .then((res) => {
          if (res.code === 200) history.goBack();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div>
        <Toolbar handleUpdateOrder={handleUpdateOrder} />
        <Grid container className={classes.main}>
          <Grid item xs={12}>
            <Content
              data={data}
              status={status}
              setStatus={setStatus}
              shipping_price={shipping_price}
              onChangeShippingPrice={onChangeShippingPrice}
              paymentStatus={paymentStatus}
              setPaymentStatus={setPaymentStatus}
            />
          </Grid>
        </Grid>
        <ProductListTable data={data} />
      </div>
    </>
  );
}
