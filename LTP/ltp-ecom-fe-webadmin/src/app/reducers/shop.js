export const ACTION_TYPE = {
  GET_SHOP_LIST_REQUEST: "shop/GET_SHOP_LIST_REQUEST",
  GET_SHOP_LIST_SUCCESS: "shop/GET_SHOP_LIST_SUCCESS",
  GET_SHOP_LIST_ERROR: "shop/GET_SHOP_LIST_ERROR",

  GET_SHOP_REQUEST: "shop/GET_SHOP_REQUEST",
  GET_SHOP_SUCCESS: "shop/GET_SHOP_SUCCESS",
  GET_SHOP_ERROR: "shop/GET_SHOP_ERROR",

  ADD_SHOP_REQUEST: "shop/ADD_SHOP_REQUEST",
  ADD_SHOP_SUCCESS: "shop/ADD_SHOP_SUCCESS",
  ADD_SHOP_ERROR: "shop/ADD_SHOP_ERROR",

  EDIT_SHOP_REQUEST: "shop/EDIT_SHOP_REQUEST",
  EDIT_SHOP_SUCCESS: "shop/EDIT_SHOP_SUCCESS",
  EDIT_SHOP_ERROR: "shop/EDIT_SHOP_ERROR",

  DELETE_SHOP_LIST_REQUEST: "shop/DELETE_SHOP_LIST_REQUEST",
  DELETE_SHOP_LIST_SUCCESS: "shop/DELETE_SHOP_LIST_SUCCESS",
  DELETE_SHOP_LIST_ERROR: "shop/DELETE_SHOP_LIST_ERROR",
};

const initialState = {
  shopList: [],
  totalRecords: 0,
  shop: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_SHOP_LIST_SUCCESS:
      return {
        ...state,
        shopList: action.payload?.results,
        totalRecords: action.payload?.totalRecords,
      };
    case ACTION_TYPE.GET_SHOP_SUCCESS:
      return {
        ...state,
        shop: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;