import instance from "app/axios/axios";
import { apiShop } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/shop";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle } from "redux-saga/effects";

function* getShopList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiShop, { params }));
    yield put({
      type: ACTION_TYPE.GET_SHOP_LIST_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_SHOP_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetShopList() {
  yield takeLatest(ACTION_TYPE.GET_SHOP_LIST_REQUEST, getShopList);
}

function* getShop(action) {
  const { success, error, id } = action;
  try {
    const response = yield call(() => instance.get(`${apiShop}/${id}`));
    yield put({
      type: ACTION_TYPE.GET_SHOP_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_SHOP_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetShop() {
  yield takeLatest(ACTION_TYPE.GET_SHOP_REQUEST, getShop);
}

function* addShop(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.post(apiShop, data));
    yield put({
      type: ACTION_TYPE.ADD_SHOP_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    let payload = 0;
    if (e?.message === "shop already existed") {
      payload = null;
    }
    yield put({
      type: ACTION_TYPE.ADD_SHOP_ERROR,
      payload,
    });
    error && error(e);
  }
}
function* watchAddShop() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.ADD_SHOP_REQUEST, addShop);
}

function* editShop(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiShop}/${id}`, data));
    yield put({
      type: ACTION_TYPE.EDIT_SHOP_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    let payload = 0;
    if (e?.message === "shop already existed") {
      payload = null;
    }
    yield put({
      type: ACTION_TYPE.EDIT_SHOP_ERROR,
      payload,
    });
    error && error(e);
  }
}
function* watchEditShop() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.EDIT_SHOP_REQUEST, editShop);
}

function* deleteShop(action) {
  const { data, success, error } = action;
  let ids = "";
  if (Array.isArray(data?.ids)) {
    ids = data.ids.join(",");
  }
  try {
    const response = yield call(() => instance.post(`${apiShop}/delete`, `ids=${ids}`, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }));
    yield put({
      type: ACTION_TYPE.DELETE_SHOP_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_SHOP_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchDeleteShop() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.DELETE_SHOP_LIST_REQUEST, deleteShop);
}


const saga = [
  watchGetShopList,
  watchGetShop,
  watchAddShop,
  watchEditShop,
  watchDeleteShop,
];

export default saga;
