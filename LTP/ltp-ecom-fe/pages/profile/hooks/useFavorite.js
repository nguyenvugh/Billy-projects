import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  deleteAllFavoriteCombo,
  deleteAllFavoriteProducts,
  deleteFavoriteCombo,
  deleteFavoriteProduct,
  getFavoriteCombo,
  getFavoriteProduct,
} from "services/profile";

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

const useFavorite = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [page, setPage] = useState(__PAGE);
  const [params, setParams] = useState(__PARAMS);
  const [typeSearch, setTypeSearch] = useState("1");

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
    if (typeSearch === "1") {
      getFavoriteList();
    } else {
      getFavoriteListCombo();
    }
  }, [params, typeSearch]);

  const getFavoriteList = async () => {
    try {
      const request = await getFavoriteProduct(params);
      const { results, total, max_page } = await request.data;

      const listFormatted = results.map((item) => ({
        id: item.id,
        name: item.product.name,
        thumbnail: item.product.images[0].url,
        price: item.product.price,
        vote: item.product.avg_rating,
        voteCount: item.product.num_like,
      }));

      setFavoriteList(listFormatted);
      setPage({ maxPage: max_page, totalPage: total });
    } catch (error) {
      throw new Error(error);
    }
  };
  const getFavoriteListCombo = async () => {
    try {
      const request = await getFavoriteCombo(params);
      const { results, total, max_page } = await request.data;

      const listFormatted = results.map((item) => ({
        id: item.id,
        name: item.product_combo.name,
        thumbnail: item.product_combo.images[0].url,
        price: item.product_combo.total_price,
        vote: item.product_combo.avg_rating,
        voteCount: item.product_combo.num_like,
      }));

      setFavoriteList(listFormatted);
      setPage({ maxPage: max_page, totalPage: total });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleDeleteFavorite = async (favorite) => {
    try {
      await deleteFavoriteProduct(favorite.id);
      await getFavoriteList();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleDeleteAllFavorites = async () => {
    try {
      await deleteAllFavoriteProducts();
      await getFavoriteList();
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleDeleteAllFavoritesCombo = async () => {
    try {
      await deleteAllFavoriteCombo();
      await getFavoriteListCombo();
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleDeleteFavoriteCombo = async (favorite) => {
    try {
      await deleteFavoriteCombo(favorite.id);
      await getFavoriteListCombo();
    } catch (error) {
      throw new Error(error);
    }
  };
  return {
    page,
    setPage,
    favoriteList,
    params,
    setParams,
    handleDeleteFavorite,
    handleDeleteAllFavorites,
    setTypeSearch,
    typeSearch,
    handleDeleteFavoriteCombo,
    handleDeleteAllFavoritesCombo,
  };
};

export default useFavorite;
