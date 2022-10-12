import { VI_LANG } from "@ltp/constants/data";
import { pricingProduct } from "@ltp/utils/price";
import Lodash from "lodash";
import { useEffect, useRef, useState } from "react";

export function getValidSlug(obj = {}) {
  return obj.redirect_slug_302 || obj.redirect_slug || obj.slug || "";
}

export const combineUrlParams = (url = "", params = {}) => {
  const keys = Object.keys(params);
  const paramUrl = keys
    .reduce((result, key) => {
      if (Array.isArray(params[key])) {
        if (params[key].length) {
          return [...result, `${key}=${params[key].join(`&${key}=`)}`];
        }
        return [...result];
      }
      if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
        return [...result, `${key}=${params[key]}`];
      }
      return [...result];
    }, [])
    .join("&");
  return `${url}${paramUrl ? `?${paramUrl}` : ""}`;
};

export const useStateCallback = (initialState) => {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // mutable ref to store current callback

  const setStateCallback = (state, cb) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  };

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state updates
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};

export const getTranslateArray = (listTrans, lang = VI_LANG) => {
  const arrTrans = Lodash.filter(listTrans, (obj) => obj.language_code === lang);
  return arrTrans;
};

export const toTitleCase = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const addZeroNumber = (value) => (String(value).length <= 2 ? `0${value}`.slice(-2) : value);
export const moneyFormat = (value) => String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, "1.");

export const arrayChunks = (array, size) => {
  if (!array.length) return [];
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...arrayChunks(tail, size)];
};

export const getItemCart = (data, idCart, productId, isFlashSale = false) => {
  let dataFilter = Lodash.filter(data, (obj) => obj.idProduct === idCart);
  if (dataFilter.length) {
    if (isFlashSale) {
      const indexFilter = dataFilter.findIndex((item) => item?.flash_sale?.id);
      return dataFilter[indexFilter]?.flash_sale?.id ? dataFilter[indexFilter] : {};
    }
    return dataFilter[0];
  }
  dataFilter = Lodash.filter(data, (obj) => obj.idProduct === productId);
  if (isFlashSale) {
    const indexFilter = dataFilter.findIndex((item) => item?.flash_sale?.id);
    return dataFilter[indexFilter]?.flash_sale?.id ? dataFilter[indexFilter] : {};
  }
  return dataFilter[0];
};

export const addToCartHelper = (product, number, addItem, datacart = []) => {
  const discount = pricingProduct(product);
  const itemCart = getItemCart(datacart, product.id + 0.5, product.id, discount !== product.price);
  const quantityCart = itemCart?.quantity || 0;
  const quantityProduct = +product?.flash_sale?.quantity || 0;
  if (
    discount !== product.price &&
    quantityCart + number > quantityProduct &&
    quantityCart >= quantityProduct &&
    !Lodash.isEmpty(product?.flash_sale)
  ) {
    if (!itemCart.id) {
      addItem({ ...product, idProduct: product.id, id: product.id }, product.flash_sale?.quantity);
      addItem(
        {
          ...product,
          idProduct: product.id,
          id: product.id + 0.5,
          flash_sale: {},
        },
        quantityCart + number - quantityProduct,
      );
    } else {
      addItem(
        {
          ...product,
          idProduct: product.id,
          id: product.id + 0.5,
          flash_sale: {},
        },
        number,
      );
    }
  } else if (discount !== product.price && !Lodash.isEmpty(product?.flash_sale)) {
    if (quantityCart + number <= quantityProduct) {
      addItem({ ...product, idProduct: product.id, id: product.id }, number);
    } else {
      addItem(
        { ...product, idProduct: product.id, id: product.id },
        +product?.flash_sale?.quantity - quantityCart,
      );
      addItem(
        {
          ...product,
          idProduct: product.id,
          id: product.id + 0.5,
          flash_sale: {},
        },
        quantityCart + number - quantityProduct,
      );
    }
  } else {
    addItem({ ...product, idProduct: product.id, id: product.id }, number);
  }
};
