import { useEffect, useState } from "react";
import { getOrderTracking as _getOrderTracking } from "@ltp/services/profile";

const useOrderTracking = ({ order, product }) => {
  const [orderTracking, setOrderTracking] = useState();

  useEffect(() => {
    getOrderTracking();
  }, []);

  const getOrderTracking = async () => {
    try {
      if (!order?.id) return;
      const request = await _getOrderTracking(order.id, product?.shipping?.order_shipping_id);
      const response = await request.data;
      setOrderTracking(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { orderTracking };
};

export default useOrderTracking;
