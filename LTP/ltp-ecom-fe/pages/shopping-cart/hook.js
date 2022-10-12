import { keyCache } from "@ltp/constants/data";
import { readCache } from "@ltp/services/datacache";
import { getCoupon } from "@ltp/services/shopping-cart";
import { useEffect, useState } from "react";

export const CONFIG_PAGE = {
  ITEMS_PER_PAGE: 20,
};

const __PARAMS = {
  limit: CONFIG_PAGE.ITEMS_PER_PAGE,
  page: 1,
};

const useShoppingCart = () => {
  const [couponList, setCouponList] = useState([]);
  const [discountSelect, setDiscountSelect] = useState({});
  const [search, setSearch] = useState("");
  const [params] = useState(__PARAMS);

  useEffect(() => {
    getCouponList();
  }, []);

  const getCouponList = async () => {
    try {
      const resCache = readCache(keyCache.COUPON_CODE, {});
      const request = await getCoupon(params);
      const response = await request.data;
      if (!response?.data || response?.data?.results.length == 0) return;
      const resCoupon = response.data.results;
      resCoupon.forEach((item) => {
        if (item.id === resCache.id) {
          setDiscountSelect(item);
        }
      });
      setCouponList(resCoupon);
    } catch (error) {
      // throw new Error(error);
      console.log(error);
    }
  };

  const handleItemClick = () => {};

  return {
    search,
    couponList,
    setSearch,
    handleItemClick,
    discountSelect,
  };
};

export default useShoppingCart;
