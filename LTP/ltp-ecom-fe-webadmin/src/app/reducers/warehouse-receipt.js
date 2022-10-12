export const ACTION_TYPE = {
  GET_WAREHOUSE_RECEIPT_LIST_REQUEST: "warehouse-receipt/GET_WAREHOUSE_RECEIPT_LIST_REQUEST",
  GET_WAREHOUSE_RECEIPT_LIST_SUCCESS: "warehouse-receipt/GET_WAREHOUSE_RECEIPT_LIST_SUCCESS",
  GET_WAREHOUSE_RECEIPT_LIST_ERROR: "warehouse-receipt/GET_WAREHOUSE_RECEIPT_LIST_ERROR",

  GET_WAREHOUSE_RECEIPT_REQUEST: "warehouse-receipt/GET_WAREHOUSE_RECEIPT_REQUEST",
  GET_WAREHOUSE_RECEIPT_SUCCESS: "warehouse-receipt/GET_WAREHOUSE_RECEIPT_SUCCESS",
  GET_WAREHOUSE_RECEIPT_ERROR: "warehouse-receipt/GET_WAREHOUSE_RECEIPT_ERROR",

  ADD_WAREHOUSE_RECEIPT_REQUEST: "warehouse-receipt/ADD_WAREHOUSE_RECEIPT_REQUEST",
  ADD_WAREHOUSE_RECEIPT_SUCCESS: "warehouse-receipt/ADD_WAREHOUSE_RECEIPT_SUCCESS",
  ADD_WAREHOUSE_RECEIPT_ERROR: "warehouse-receipt/ADD_WAREHOUSE_RECEIPT_ERROR",

  EDIT_WAREHOUSE_RECEIPT_REQUEST: "warehouse-receipt/EDIT_RECEIPT_WAREHOUSE_REQUEST",
  EDIT_WAREHOUSE_RECEIPT_SUCCESS: "warehouse-receipt/EDIT_RECEIPT_WAREHOUSE_SUCCESS",
  EDIT_WAREHOUSE_RECEIPT_ERROR: "warehouse-receipt/EDIT_RECEIPT_WAREHOUSE_ERROR",

  DELETE_WAREHOUSE_RECEIPT_REQUEST: "warehouse-receipt/DELETE_WAREHOUSE_RECEIPT_REQUEST",
  DELETE_WAREHOUSE_RECEIPT_SUCCESS: "warehouse-receipt/DELETE_WAREHOUSE_RECEIPT_SUCCESS",
  DELETE_WAREHOUSE_RECEIPT_ERROR: "warehouse-receipt/DELETE_WAREHOUSE_RECEIPT_ERROR",
};

const initialState = {
  warehouseReceiptList: [],
  totalRecords: 0,
  warehouseReceipt: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_WAREHOUSE_RECEIPT_LIST_SUCCESS:
      return {
        ...state,
        warehouseReceiptList: action.payload?.results,
        totalRecords: action.payload?.total,
      };
    case ACTION_TYPE.GET_WAREHOUSE_RECEIPT_SUCCESS:
      return {
        ...state,
        warehouseReceipt: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;