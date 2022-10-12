import { useEffect, useState } from "react";
import { getOrderDetail as _getOrderDetail } from "@ltp/services/profile";

const useOrderDetail = ({ order }) => {
  const [orderDetail, setOrderDetail] = useState();
  const [isCancelOrderSuccess, setCancelOrderSuccess] = useState(false);

  useEffect(() => {
    getOrderDetail();
  }, []);
  useEffect(() => {
    if (isCancelOrderSuccess) {
      getOrderDetail();
      setCancelOrderSuccess(false);
    }
  }, [isCancelOrderSuccess]);

  const getOrderDetail = async () => {
    try {
      if (!order?.id) return;
      const request = await _getOrderDetail(order.id);
      const response = await request.data;
      setOrderDetail(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { orderDetail, setCancelOrderSuccess, isCancelOrderSuccess };
};

export default useOrderDetail;
