export const ACTION_TYPE = {
  GET_EMAIL_LIST_REQUEST: "email/GET_EMAIL_LIST_REQUEST",
  GET_EMAIL_LIST_SUCCESS: "email/GET_EMAIL_LIST_SUCCESS",
  GET_EMAIL_LIST_ERROR: "email/GET_EMAIL_LIST_ERROR",

  DELETE_EMAIL_LIST_REQUEST: "email/DELETE_EMAIL_LIST_REQUEST",
  DELETE_EMAIL_LIST_SUCCESS: "email/DELETE_EMAIL_LIST_SUCCESS",
  DELETE_EMAIL_LIST_ERROR: "email/DELETE_EMAIL_LIST_ERROR",
};

const initialState = {
  emailList: [],
  totalRecords: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_EMAIL_LIST_SUCCESS:
      return {
        ...state,
        emailList: action.payload?.results,
        totalRecords: action.payload?.totalRecords,
      };
    default:
      return state;
  }
};

export default reducer;