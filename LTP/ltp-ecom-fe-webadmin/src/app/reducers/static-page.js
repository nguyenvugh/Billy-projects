import { convertTranslatesList } from "app/utils/validate";

export const ACTION_TYPE = {
  GET_STATIC_PAGE_LIST_REQUEST: "static-page/GET_STATIC_PAGE_LIST_REQUEST",
  GET_STATIC_PAGE_LIST_SUCCESS: "static-page/GET_STATIC_PAGE_LIST_SUCCESS",
  GET_STATIC_PAGE_LIST_ERROR: "static-page/GET_STATIC_PAGE_LIST_ERROR",

  GET_STATIC_PAGE_REQUEST: "static-page/GET_STATIC_PAGE_REQUEST",
  GET_STATIC_PAGE_SUCCESS: "static-page/GET_STATIC_PAGE_SUCCESS",
  GET_STATIC_PAGE_ERROR: "static-page/GET_STATIC_PAGE_ERROR",

  ADD_STATIC_PAGE_REQUEST: "static-page/ADD_STATIC_PAGE_REQUEST",
  ADD_STATIC_PAGE_SUCCESS: "static-page/ADD_STATIC_PAGE_SUCCESS",
  ADD_STATIC_PAGE_ERROR: "static-page/ADD_STATIC_PAGE_ERROR",

  EDIT_STATIC_PAGE_REQUEST: "static-page/EDIT_STATIC_PAGE_REQUEST",
  EDIT_STATIC_PAGE_SUCCESS: "static-page/EDIT_STATIC_PAGE_SUCCESS",
  EDIT_STATIC_PAGE_ERROR: "static-page/EDIT_STATIC_PAGE_ERROR",

  GET_FOOTER_REQUEST: "static-page/GET_FOOTER_REQUEST",
  GET_FOOTER_SUCCESS: "static-page/GET_FOOTER_SUCCESS",
  GET_FOOTER_ERROR: "static-page/GET_FOOTER_ERROR",

  EDIT_FOOTER_REQUEST: "static-page/EDIT_FOOTER_REQUEST",
  EDIT_FOOTER_SUCCESS: "static-page/EDIT_FOOTER_SUCCESS",
  EDIT_FOOTER_ERROR: "static-page/EDIT_FOOTER_ERROR",
};

const initialState = {
  staticPageList: [],
  totalRecords: 0,
  staticPage: {},
  footer: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_STATIC_PAGE_LIST_SUCCESS:
      return {
        ...state,
        staticPageList: action.payload?.results,
        totalRecords: action.payload?.totalRecords,
      };
    case ACTION_TYPE.GET_STATIC_PAGE_SUCCESS:
      let staticPage = action.payload;
      convertTranslatesList(staticPage);
      return {
        ...state,
        staticPage,
      };
    case ACTION_TYPE.GET_FOOTER_SUCCESS:
      let footer = action.payload;
      convertTranslatesList(footer);
      return {
        ...state,
        footer,
      };
    default:
      return state;
  }
};

export default reducer;