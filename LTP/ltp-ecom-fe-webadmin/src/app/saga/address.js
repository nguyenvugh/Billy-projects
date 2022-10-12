import instance from "app/axios";
import { apiCity, apiCountry, apiDistrict, apiWard } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/address";
import { call, put, takeLatest } from "redux-saga/effects";

function* getCountryList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiCountry, { params }));
    yield put({
      type: ACTION_TYPE.GET_COUNTRY_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_COUNTRY_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetCountryList() {
  yield takeLatest(ACTION_TYPE.GET_COUNTRY_LIST_REQUEST, getCountryList);
}

function* getCityList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiCity, { params }));
    yield put({
      type: ACTION_TYPE.GET_CITY_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_CITY_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetCityList() {
  yield takeLatest(ACTION_TYPE.GET_CITY_LIST_REQUEST, getCityList);
}

function* getDistrictList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiDistrict, { params }));
    yield put({
      type: ACTION_TYPE.GET_DISTRICT_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_DISTRICT_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetDistrictList() {
  yield takeLatest(ACTION_TYPE.GET_DISTRICT_LIST_REQUEST, getDistrictList);
}

function* getWardList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiWard, { params }));
    yield put({
      type: ACTION_TYPE.GET_WARD_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_WARD_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetWardList() {
  yield takeLatest(ACTION_TYPE.GET_WARD_LIST_REQUEST, getWardList);
}

const saga = [
  watchGetCountryList,
  watchGetCityList,
  watchGetDistrictList,
  watchGetWardList,
];

export default saga;
