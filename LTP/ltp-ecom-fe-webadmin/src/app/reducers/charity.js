import { convertTranslates, convertTranslatesList } from "app/utils/validate";
export const ACTION_TYPE = {
  GET_CHARITY_LIST_REQUEST: "charity/GET_CHARITY_LIST_REQUEST",
  GET_CHARITY_LIST_SUCCESS: "charity/GET_CHARITY_LIST_SUCCESS",
  GET_CHARITY_LIST_ERROR: "charity/GET_CHARITY_LIST_ERROR",

  GET_CHARITY_REQUEST: "charity/GET_CHARITY_REQUEST",
  GET_CHARITY_SUCCESS: "charity/GET_CHARITY_SUCCESS",
  GET_CHARITY_ERROR: "charity/GET_CHARITY_ERROR",

  ADD_CHARITY_REQUEST: "charity/ADD_CHARITY_REQUEST",
  ADD_CHARITY_SUCCESS: "charity/ADD_CHARITY_SUCCESS",
  ADD_CHARITY_ERROR: "charity/ADD_CHARITY_ERROR",

  EDIT_CHARITY_REQUEST: "charity/EDIT_CHARITY_REQUEST",
  EDIT_CHARITY_SUCCESS: "charity/EDIT_CHARITY_SUCCESS",
  EDIT_CHARITY_ERROR: "charity/EDIT_CHARITY_ERROR",

  DELETE_CHARITY_LIST_REQUEST: "charity/DELETE_CHARITY_LIST_REQUEST",
  DELETE_CHARITY_LIST_SUCCESS: "charity/DELETE_CHARITY_LIST_SUCCESS",
  DELETE_CHARITY_LIST_ERROR: "charity/DELETE_CHARITY_LIST_ERROR",

  UPDATE_STATUS_REQUEST: "charity/UPDATE_STATUS_REQUEST",
  UPDATE_STATUS_SUCCESS: "charity/UPDATE_STATUS_SUCCESS",
  UPDATE_STATUS_ERROR: "charity/UPDATE_STATUS_ERROR",

  GET_PRODUCT_LIST_REQUEST: "charity/GET_PRODUCT_LIST_REQUEST",
  GET_PRODUCT_LIST_SUCCESS: "charity/GET_PRODUCT_LIST_SUCCESS",
  GET_PRODUCT_LIST_ERROR: "charity/GET_PRODUCT_LIST_ERROR",

  // GET_PRODUCT_REQUEST: "charity/GET_PRODUCT_REQUEST",
  // GET_PRODUCT_SUCCESS: "charity/GET_PRODUCT_SUCCESS",
  // GET_PRODUCT_ERROR: "charity/GET_PRODUCT_ERROR",

  ADD_PRODUCT_REQUEST: "charity/ADD_PRODUCT_REQUEST",
  ADD_PRODUCT_SUCCESS: "charity/ADD_PRODUCT_SUCCESS",
  ADD_PRODUCT_ERROR: "charity/ADD_PRODUCT_ERROR",

  EDIT_PRODUCT_REQUEST: "charity/EDIT_PRODUCT_REQUEST",
  EDIT_PRODUCT_SUCCESS: "charity/EDIT_PRODUCT_SUCCESS",
  EDIT_PRODUCT_ERROR: "charity/EDIT_PRODUCT_ERROR",

  DELETE_PRODUCT_LIST_REQUEST: "charity/DELETE_PRODUCT_LIST_REQUEST",
  DELETE_PRODUCT_LIST_SUCCESS: "charity/DELETE_PRODUCT_LIST_SUCCESS",
  DELETE_PRODUCT_LIST_ERROR: "charity/DELETE_PRODUCT_LIST_ERROR",
};

const initialState = {
  charityList: [],
  totalRecords: 1,
  charity: {},
  charityProductList: [],
  productTotalRecords: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_CHARITY_LIST_SUCCESS:
      let charityList = action.payload?.results;
      if (Array.isArray(charityList)) {
        charityList.forEach(item => {
          convertTranslatesList(item);
        })
      }
      return {
        ...state,
        charityList,
        totalRecords: action.payload?.totalRecords
      };
    case ACTION_TYPE.GET_CHARITY_SUCCESS:
      let charity = action.payload;
      convertTranslatesList(charity);
      return {
        ...state,
        charity,
      };
    case ACTION_TYPE.GET_PRODUCT_LIST_SUCCESS:
      let charityProductList = action.payload?.results;
      if (Array.isArray(charityProductList)) {
        charityProductList.forEach(item => {
          convertTranslates(item?.product_obj);
        })
      }
      return {
        ...state,
        charityProductList,
        productTotalRecords: action.payload?.totalRecords
      };
    default:
      return state;
  }
};

export default reducer;