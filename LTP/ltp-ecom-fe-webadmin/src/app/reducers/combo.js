import { convertTranslates } from "app/utils/validate";

export const ACTION_TYPE = {
  GET_COMBO_LIST_REQUEST: "combo/GET_COMBO_LIST_REQUEST",
  GET_COMBO_LIST_SUCCESS: "combo/GET_COMBO_LIST_SUCCESS",
  GET_COMBO_LIST_ERROR: "combo/GET_COMBO_LIST_ERROR",

  GET_COMBO_REQUEST: "combo/GET_COMBO_REQUEST",
  GET_COMBO_SUCCESS: "combo/GET_COMBO_SUCCESS",
  GET_COMBO_ERROR: "combo/GET_COMBO_ERROR",

  ADD_COMBO_REQUEST: "combo/ADD_COMBO_REQUEST",
  ADD_COMBO_SUCCESS: "combo/ADD_COMBO_SUCCESS",
  ADD_COMBO_ERROR: "combo/ADD_COMBO_ERROR",

  EDIT_COMBO_REQUEST: "combo/EDIT_COMBO_REQUEST",
  EDIT_COMBO_SUCCESS: "combo/EDIT_COMBO_SUCCESS",
  EDIT_COMBO_ERROR: "combo/EDIT_COMBO_ERROR",

  DELETE_COMBO_LIST_REQUEST: "combo/DELETE_COMBO_LIST_REQUEST",
  DELETE_COMBO_LIST_SUCCESS: "combo/DELETE_COMBO_LIST_SUCCESS",
  DELETE_COMBO_LIST_ERROR: "combo/DELETE_COMBO_LIST_ERROR",

  UPDATE_STATUS_REQUEST: "combo/UPDATE_STATUS_REQUEST",
  UPDATE_STATUS_SUCCESS: "combo/UPDATE_STATUS_SUCCESS",
  UPDATE_STATUS_ERROR: "combo/UPDATE_STATUS_ERROR",
};

const totalRecords1 = 1;

const initialState = {
  comboList: [],
  totalRecords: totalRecords1,
  combo: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_COMBO_LIST_SUCCESS:
      let comboList = action.payload?.results;
      if (Array.isArray(comboList)) {
        comboList.forEach(item => {
          convertTranslates(item);
          let details = item?.details;
          if (Array.isArray(details)) {
            details.forEach(detail => {
              convertTranslates(detail?.product);
            })
          }
        })
      }
      return {
        ...state,
        comboList,
        totalRecords: action.payload?.total,
      };
    case ACTION_TYPE.GET_COMBO_SUCCESS:
      let combo = action.payload;
      convertTranslates(combo);
      let details = combo?.details;
      if (Array.isArray(details)) {
        details.forEach(detail => {
          convertTranslates(detail?.product);
        })
      }
      return {
        ...state,
        combo,
      };
    default:
      return state;
  }
};

export default reducer;