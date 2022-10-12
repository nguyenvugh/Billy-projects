export const ACTION_TYPE = {
  GET_COUNTRY_LIST_REQUEST: "address/GET_COUNTRY_LIST_REQUEST",
  GET_COUNTRY_LIST_SUCCESS: "address/GET_COUNTRY_LIST_SUCCESS",
  GET_COUNTRY_LIST_ERROR: "address/GET_COUNTRY_LIST_ERROR",

  GET_CITY_LIST_REQUEST: "address/GET_CITY_LIST_REQUEST",
  GET_CITY_LIST_SUCCESS: "address/GET_CITY_LIST_SUCCESS",
  GET_CITY_LIST_ERROR: "address/GET_CITY_LIST_ERROR",

  GET_DISTRICT_LIST_REQUEST: "address/GET_DISTRICT_LIST_REQUEST",
  GET_DISTRICT_LIST_SUCCESS: "address/GET_DISTRICT_LIST_SUCCESS",
  GET_DISTRICT_LIST_ERROR: "address/GET_DISTRICT_LIST_ERROR",

  GET_WARD_LIST_REQUEST: "address/GET_WARD_LIST_REQUEST",
  GET_WARD_LIST_SUCCESS: "address/GET_WARD_LIST_SUCCESS",
  GET_WARD_LIST_ERROR: "address/GET_WARD_LIST_ERROR",
};

const initialState = {
  countryList: [],
  cityList: [],
  districtList: [],
  wardList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_COUNTRY_LIST_SUCCESS:
      const countryList = action.payload?.results;
      if (Array.isArray(countryList)) {
        return {
          ...state,
          countryList,
        };
      } else {
        return state;
      }
    case ACTION_TYPE.GET_CITY_LIST_SUCCESS:
      const cityList = action.payload?.results;
      if (Array.isArray(cityList)) {
        return {
          ...state,
          cityList,
        }
      } else {
        return state;
      }
    case ACTION_TYPE.GET_DISTRICT_LIST_SUCCESS:
      const districtList = action.payload?.results;
      if (Array.isArray(districtList)) {
        return {
          ...state,
          districtList,
        };
      } else {
        return state;
      }
    case ACTION_TYPE.GET_WARD_LIST_SUCCESS:
      const wardList = action.payload?.results;
      if (Array.isArray(wardList)) {
        return {
          ...state,
          wardList,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default reducer;