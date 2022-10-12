import { convertTranslates } from "app/utils/validate";

export const ACTION_TYPE = {
  GET_PRODUCT_LIST_REQUEST: "product/GET_PRODUCT_LIST_R",
  GET_PRODUCT_LIST_SUCCESS: "product/GET_PRODUCT_LIST_S",
  GET_PRODUCT_LIST_ERROR: "product/GET_PRODUCT_LIST_E",
};

const initialState = {
  productList: [],
  totalRecords: 0,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACTION_TYPE.GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        loading: false,
      }
    case ACTION_TYPE.GET_PRODUCT_LIST_SUCCESS:
      let productList = action.payload?.results;
      if (Array.isArray(productList)) {
        productList.forEach((product) => {
          convertTranslates(product);
        })
      }
      return {
        ...state,
        productList,
        totalRecords: action.payload?.totalRecords,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;