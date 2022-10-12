import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSeenProduct as _getSeenProduct } from "services/profile";

export const CONFIG_PAGE = {
  ITEMS_PER_PAGE: 4,
};

const __PARAMS = {
  limit: CONFIG_PAGE.ITEMS_PER_PAGE,
  page: 1,
};

const __PAGE = {
  totalPage: 1,
  maxPage: 1,
};
const useSeen = () => {
  const [seenList, setSeenList] = useState([]);
  const [page, setPage] = useState(__PAGE);
  const [params, setParams] = useState(__PARAMS);
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
    getSeenProductList();
  }, [params]);

  const getSeenProductList = async () => {
    try {
      const request = await _getSeenProduct(params);
      const { results, total, max_page } = await request.data;

      const listFormatted = results.map((item) => ({
        id: item.id,
        name: item.product.name,
        thumbnail: item.product.images[0].url,
        price: item.product.price,
        vote: item.product.avg_rating,
        voteCount: item.product.num_like,
      }));

      setSeenList(listFormatted);
      setPage({ maxPage: max_page, totalPage: total });
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    page,
    seenList,
    setParams,
  };
};

export default useSeen;
