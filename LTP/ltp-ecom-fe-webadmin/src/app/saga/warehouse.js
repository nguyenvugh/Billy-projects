import instance from "app/axios/axios";
import { apiWarehouse } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/warehouse";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle } from "redux-saga/effects";

function* getWarehouseList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiWarehouse, { params }));
    yield put({
      type: ACTION_TYPE.GET_WAREHOUSE_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_WAREHOUSE_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetWarehouseList() {
  yield takeLatest(ACTION_TYPE.GET_WAREHOUSE_LIST_REQUEST, getWarehouseList);
}

function* getWarehouse(action) {
  const { success, error, id } = action;
  try {
    const response = yield call(() => instance.get(`${apiWarehouse}/${id}`));
    yield put({
      type: ACTION_TYPE.GET_WAREHOUSE_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_WAREHOUSE_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetWarehouse() {
  yield takeLatest(ACTION_TYPE.GET_WAREHOUSE_REQUEST, getWarehouse);
}

function* addWarehouse(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.post(apiWarehouse, null, { params: data }));
    yield put({
      type: ACTION_TYPE.ADD_WAREHOUSE_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.ADD_WAREHOUSE_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchAddWarehouse() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.ADD_WAREHOUSE_REQUEST, addWarehouse);
}

function* editWarehouse(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiWarehouse}/${id}`, data));
    yield put({
      type: ACTION_TYPE.EDIT_WAREHOUSE_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.EDIT_WAREHOUSE_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchEditWarehouse() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.EDIT_WAREHOUSE_REQUEST, editWarehouse);
}

function* deleteWarehouse(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.delete(apiWarehouse, { params: data }));
    yield put({
      type: ACTION_TYPE.DELETE_WAREHOUSE_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_WAREHOUSE_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchDeleteWarehouse() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.DELETE_WAREHOUSE_LIST_REQUEST, deleteWarehouse);
}

function* getProductList(action) {
  const { success, id, error, params } = action;
  try {
    const response = yield call(() => instance.get(`${apiWarehouse}/${id}/products`, { params }));
    yield put({
      type: ACTION_TYPE.GET_PRODUCT_LIST_SUCCESS,
      payload: response?.data,
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

function* deleteProduct(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.delete(`${apiWarehouse}/${id}/products`, { params: data }));
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
    error && error(e?.message);
  }
}
function* watchDeleteProduct() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.DELETE_PRODUCT_LIST_REQUEST, deleteProduct);
}

const saga = [
  watchGetWarehouseList,
  watchGetWarehouse,
  watchAddWarehouse,
  watchEditWarehouse,
  watchDeleteWarehouse,
  watchGetProductList,
  watchDeleteProduct,
];

export default saga;
