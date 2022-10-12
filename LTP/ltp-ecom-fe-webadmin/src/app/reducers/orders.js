import { convertTranslates } from "app/utils/validate";

export const ACTION_TYPE = {
  GET_ORDERS_LIST_REQUEST: "orders/GET_ORDERS_LIST_REQUEST",
  GET_ORDERS_LIST_SUCCESS: "orders/GET_ORDERS_LIST_SUCCESS",
  GET_ORDERS_LIST_ERROR: "orders/GET_ORDERS_LIST_ERROR",

  GET_ORDERS_REQUEST: "orders/GET_ORDERS_REQUEST",
  GET_ORDERS_SUCCESS: "orders/GET_ORDERS_SUCCESS",
  GET_ORDERS_ERROR: "orders/GET_ORDERS_ERROR",

  EDIT_ORDERS_REQUEST: "orders/EDIT_ORDERS_REQUEST",
  EDIT_ORDERS_SUCCESS: "orders/EDIT_ORDERS_SUCCESS",
  EDIT_ORDERS_ERROR: "orders/EDIT_ORDERS_ERROR",
  DELETE_ORDERS_REQUEST: "orders/DELETE_ORDERS_REQUEST",
  DELETE_ORDERS_SUCCESS: "orders/DELETE_ORDERS_SUCCESS",
  DELETE_ORDERS_ERROR: "orders/DELETE_ORDERS_ERROR",
};

const initialState = {
  ordersList: [],
  totalRecords: 0,
  orders: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_ORDERS_LIST_SUCCESS:
      let ordersList = action.payload?.results;
      if (Array.isArray(ordersList)) {
        ordersList.forEach(item => {
          if (Array.isArray(item?.order_details)) {
            item.order_details.forEach(item => {
              convertTranslates(item?.product);
            })
          }
        })
      }
      return {
        ...state,
        ordersList,
        totalRecords: action.payload?.totalRecords
      };
    case ACTION_TYPE.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload?.results,
      };
    default:
      return state;
  }
};

export default reducer;