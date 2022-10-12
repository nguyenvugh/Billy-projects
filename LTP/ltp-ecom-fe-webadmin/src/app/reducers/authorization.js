export const ACTION_TYPE = {
  GET_PERMISSION_GROUP_LIST_REQUEST:
    "authorization/GET_PERMISSION_GROUP_LIST_REQUEST",
  GET_PERMISSION_GROUP_LIST_SUCCESS: "orders/GET_PERMISSION_GROUP_LIST_SUCCESS",
  GET_PERMISSION_GROUP_LIST_ERROR: "orders/GET_PERMISSION_GROUP_LIST_ERROR",

  GET_PERMISSION_GROUP_REQUEST: "authorization/GET_PERMISSION_GROUP_REQUEST",
  GET_PERMISSION_GROUP_SUCCESS: "authorization/GET_PERMISSION_GROUP_SUCCESS",
  GET_PERMISSION_GROUP_ERROR: "authorization/GET_PERMISSION_GROUP_ERROR",

  ADD_PERMISSION_GROUP_REQUEST: "authorization/ADD_PERMISSION_GROUP_REQUEST",
  ADD_PERMISSION_GROUP_SUCCESS: "authorization/ADD_PERMISSION_GROUP_SUCCESS",
  ADD_PERMISSION_GROUP_ERROR: "authorization/ADD_PERMISSION_GROUP_ERROR",

  EDIT_PERMISSION_GROUP_REQUEST: "authorization/EDIT_PERMISSION_GROUP_REQUEST",
  EDIT_PERMISSION_GROUP_SUCCESS: "authorization/EDIT_PERMISSION_GROUP_SUCCESS",
  EDIT_PERMISSION_GROUP_ERROR: "authorization/EDIT_PERMISSION_GROUP_ERROR",

  DELETE_PERMISSION_GROUP_REQUEST:
    "authorization/DELETE_PERMISSION_GROUP_REQUEST",
  DELETE_PERMISSION_GROUP_SUCCESS:
    "authorization/DELETE_PERMISSION_GROUP_SUCCESS",
  DELETE_PERMISSION_GROUP_ERROR: "authorization/DELETE_PERMISSION_GROUP_ERROR",
};

const initialState = {
  permissionGroupList: [],
  totalRecords: 0,
  permissionGroup: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_PERMISSION_GROUP_LIST_SUCCESS:
      return {
        ...state,
        permissionGroupList: action.payload?.results,
        totalRecords: action.payload?.totalRecords,
      };
    case ACTION_TYPE.GET_PERMISSION_GROUP_SUCCESS:
      return {
        ...state,
        permissionGroup: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
