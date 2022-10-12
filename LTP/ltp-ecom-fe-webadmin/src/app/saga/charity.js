import instance from "app/axios/axios";
import { apiCharity } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/charity";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle } from "redux-saga/effects";

function* getCharityList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiCharity, { params }));
    yield put({
      type: ACTION_TYPE.GET_CHARITY_LIST_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_CHARITY_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetCharityList() {
  yield takeLatest(ACTION_TYPE.GET_CHARITY_LIST_REQUEST, getCharityList);
}

function* getCharity(action) {
  const { success, error, id } = action;
  try {
    const response = yield call(() => instance.get(`${apiCharity}/${id}`));
    yield put({
      type: ACTION_TYPE.GET_CHARITY_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_CHARITY_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetCharity() {
  yield takeLatest(ACTION_TYPE.GET_CHARITY_REQUEST, getCharity);
}

function* addCharity(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.post(apiCharity, data));
    yield put({
      type: ACTION_TYPE.ADD_CHARITY_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.ADD_CHARITY_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchAddCharity() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.ADD_CHARITY_REQUEST, addCharity);
}

function* editCharity(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiCharity}/${id}`, data));
    yield put({
      type: ACTION_TYPE.EDIT_CHARITY_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.EDIT_CHARITY_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchEditCharity() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.EDIT_CHARITY_REQUEST, editCharity);
}

function* deleteCharity(action) {
  const { data, success, error } = action;
  let ids = "";
  if (Array.isArray(data?.ids)) {
    ids = data.ids.join(",");
  }
  try {
    const response = yield call(() => instance.post(`${apiCharity}/delete`, `ids=${ids}`, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }));
    yield put({
      type: ACTION_TYPE.DELETE_CHARITY_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_CHARITY_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchDeleteCharity() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.DELETE_CHARITY_LIST_REQUEST, deleteCharity);
}

function* updateStatus(action) {
  const { id, success, error } = action;
  try {
    const response = yield call(() => instance.get(`${apiCharity}/${id}/update-status`));
    yield put({
      type: ACTION_TYPE.UPDATE_STATUS_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.UPDATE_STATUS_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchUpdateStatus() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.UPDATE_STATUS_REQUEST, updateStatus);
}

function* getProductList(action) {
  const { success, error, params, id } = action;
  try {
    const response = yield call(() => instance.get(`${apiCharity}/${id}/products`, { params }));
    yield put({
      type: ACTION_TYPE.GET_PRODUCT_LIST_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_PRODUCT_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetProductList() {
  yield takeLatest(ACTION_TYPE.GET_PRODUCT_LIST_REQUEST, getProductList);
}

function* addProduct(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.post(`${apiCharity}/${id}/product`, data));
    yield put({
      type: ACTION_TYPE.ADD_PRODUCT_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    let payload = e;
    if (e?.message === "charity product already exist") {
      payload = null;
    }
    yield put({
      type: ACTION_TYPE.ADD_PRODUCT_ERROR,
      payload,
    });
    error && error(e);
  }
}
function* watchAddProduct() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.ADD_PRODUCT_REQUEST, addProduct);
}

function* editProduct(action) {
  const { data, id, productId, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiCharity}/${id}/product/${productId}`, data));
    yield put({
      type: ACTION_TYPE.EDIT_PRODUCT_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.EDIT_PRODUCT_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchEditProduct() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.EDIT_PRODUCT_REQUEST, editProduct);
}

function* deleteProduct(action) {
  const { data, success, error } = action;
  let ids = "";
  if (Array.isArray(data?.ids)) {
    ids = data.ids.join(",");
  }
  try {
    const response = yield call(() => instance.post(`${apiCharity}/product/delete`, `ids=${ids}`, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }));
    yield put({
      type: ACTION_TYPE.DELETE_PRODUCT_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_PRODUCT_LIST_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchDeleteProduct() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.DELETE_PRODUCT_LIST_REQUEST, deleteProduct);
}

const saga = [
  watchGetCharityList,
  watchGetCharity,
  watchAddCharity,
  watchEditCharity,
  watchDeleteCharity,
  watchUpdateStatus,
  watchGetProductList,
  watchAddProduct,
  watchEditProduct,
  watchDeleteProduct,
];

export default saga;
