import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getOrders } from "services/profile";

export const CONFIG_PAGE = {
  ITEMS_PER_PAGE: 6,
};

const __PARAMS = {
  limit: CONFIG_PAGE.ITEMS_PER_PAGE,
  page: 1,
  search: "",
};

const __PAGE = {
  totalPage: 1,
  maxPage: 1,
};

const useOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const [search, setSearch] = useState("");
  const [params, setParams] = useState(__PARAMS);
  const [page, setPage] = useState(__PAGE);
  const router = useRouter();
  const { activeMenu } = router.query;

  useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: params.page,
      },
    });
  }, [activeMenu, params.page]);
  useEffect(() => {
    getOrderList();
  }, [params]);

  const getOrderList = async () => {
    try {
      const request = await getOrders(params);
      const response = await request.data;

      setOrderList(response.results);
      setPage({ maxPage: response.max_page, totalPage: response.total });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSearch = useCallback(
    debounce((event) => {
      const { value } = event.target;
      setSearch(value);
      setParams({
        ...params,
        search: value,
      });
    }, 350),
    [],
  );

  const handlePageChange = (nextPage) => {
    setParams((prevParams) => ({ ...prevParams, page: nextPage }));
  };

  return {
    orderList,
    handleSearch,
    search,
    getOrderList,
    page,
    handlePageChange,
  };
};

export default useOrder;
