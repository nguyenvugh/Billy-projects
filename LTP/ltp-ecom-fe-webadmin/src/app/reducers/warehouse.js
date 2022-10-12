export const ACTION_TYPE = {
  GET_WAREHOUSE_LIST_REQUEST: "warehouse/GET_WAREHOUSE_LIST_REQUEST",
  GET_WAREHOUSE_LIST_SUCCESS: "warehouse/GET_WAREHOUSE_LIST_SUCCESS",
  GET_WAREHOUSE_LIST_ERROR: "warehouse/GET_WAREHOUSE_LIST_ERROR",

  GET_WAREHOUSE_REQUEST: "warehouse/GET_WAREHOUSE_REQUEST",
  GET_WAREHOUSE_SUCCESS: "warehouse/GET_WAREHOUSE_SUCCESS",
  GET_WAREHOUSE_ERROR: "warehouse/GET_WAREHOUSE_ERROR",

  ADD_WAREHOUSE_REQUEST: "warehouse/ADD_WAREHOUSE_REQUEST",
  ADD_WAREHOUSE_SUCCESS: "warehouse/ADD_WAREHOUSE_SUCCESS",
  ADD_WAREHOUSE_ERROR: "warehouse/ADD_WAREHOUSE_ERROR",

  EDIT_WAREHOUSE_REQUEST: "warehouse/EDIT_WAREHOUSE_REQUEST",
  EDIT_WAREHOUSE_SUCCESS: "warehouse/EDIT_WAREHOUSE_SUCCESS",
  EDIT_WAREHOUSE_ERROR: "warehouse/EDIT_WAREHOUSE_ERROR",

  DELETE_WAREHOUSE_LIST_REQUEST: "warehouse/DELETE_WAREHOUSE_LIST_REQUEST",
  DELETE_WAREHOUSE_LIST_SUCCESS: "warehouse/DELETE_WAREHOUSE_LIST_SUCCESS",
  DELETE_WAREHOUSE_LIST_ERROR: "warehouse/DELETE_WAREHOUSE_LIST_ERROR",

  GET_PRODUCT_LIST_REQUEST: "warehouse/GET_PRODUCT_LIST_REQUEST",
  GET_PRODUCT_LIST_SUCCESS: "warehouse/GET_PRODUCT_LIST_SUCCESS",
  GET_PRODUCT_LIST_ERROR: "warehouse/GET_PRODUCT_LIST_ERROR",

  DELETE_PRODUCT_LIST_REQUEST: "warehouse/DELETE_PRODUCT_LIST_REQUEST",
  DELETE_PRODUCT_LIST_SUCCESS: "warehouse/DELETE_PRODUCT_LIST_SUCCESS",
  DELETE_PRODUCT_LIST_ERROR: "warehouse/DELETE_PRODUCT_LIST_ERROR",
};

const initialState = {
  warehouseList: [],
  totalRecords: 0,
  warehouse: {},
  productList: [],
  totalProduct: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_WAREHOUSE_LIST_SUCCESS:
      return {
        ...state,
        warehouseList: action.payload?.results,
        totalRecords: action.payload?.total,
      };
    case ACTION_TYPE.GET_WAREHOUSE_SUCCESS:
      return {
        ...state,
        warehouse: action.payload,
      };
    case ACTION_TYPE.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload?.results,
        totalProduct: action.payload?.total,
      };
    default:
      return state;
  }
};

export default reducer;