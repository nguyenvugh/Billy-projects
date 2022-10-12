export const ACTION_TYPE = {
  GET_BRANCH_LIST_REQUEST: "branch/GET_BRANCH_LIST_REQUEST",
  GET_BRANCH_LIST_SUCCESS: "branch/GET_BRANCH_LIST_SUCCESS",
  GET_BRANCH_LIST_ERROR: "branch/GET_BRANCH_LIST_ERROR",

  GET_BRANCH_REQUEST: "branch/GET_BRANCH_REQUEST",
  GET_BRANCH_SUCCESS: "branch/GET_BRANCH_SUCCESS",
  GET_BRANCH_ERROR: "branch/GET_BRANCH_ERROR",

  ADD_BRANCH_REQUEST: "branch/ADD_BRANCH_REQUEST",
  ADD_BRANCH_SUCCESS: "branch/ADD_BRANCH_SUCCESS",
  ADD_BRANCH_ERROR: "branch/ADD_BRANCH_ERROR",

  EDIT_BRANCH_REQUEST: "branch/EDIT_BRANCH_REQUEST",
  EDIT_BRANCH_SUCCESS: "branch/EDIT_BRANCH_SUCCESS",
  EDIT_BRANCH_ERROR: "branch/EDIT_BRANCH_ERROR",

  DELETE_BRANCH_LIST_REQUEST: "branch/DELETE_BRANCH_LIST_REQUEST",
  DELETE_BRANCH_LIST_SUCCESS: "branch/DELETE_BRANCH_LIST_SUCCESS",
  DELETE_BRANCH_LIST_ERROR: "branch/DELETE_BRANCH_LIST_ERROR",
};

const initialState = {
  branchList: [],
  totalRecords: 0,
  branch: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_BRANCH_LIST_SUCCESS:
      return {
        ...state,
        branchList: action.payload?.results,
        totalRecords: action.payload?.totalRecords,
      };
    case ACTION_TYPE.GET_BRANCH_SUCCESS:
      return {
        ...state,
        branch: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;