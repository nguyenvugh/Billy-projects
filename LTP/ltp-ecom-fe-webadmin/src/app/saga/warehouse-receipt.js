import instance from "app/axios/axios";
import { apiWarehouse } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/warehouse-receipt";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle, all } from "redux-saga/effects";

function* getWarehouseReceiptList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(`${apiWarehouse}/input`, { params }));
    yield put({
      type: ACTION_TYPE.GET_WAREHOUSE_RECEIPT_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_WAREHOUSE_RECEIPT_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetWarehouseReceiptList() {
  yield takeLatest(ACTION_TYPE.GET_WAREHOUSE_RECEIPT_LIST_REQUEST, getWarehouseReceiptList);
}

function* getWarehouseReceipt(action) {
  const { success, id, input, error, params } = action;
  try {
    const response = yield call(() => instance.get(`${apiWarehouse}/${id}/input/${input}`, { params }));
    yield put({
      type: ACTION_TYPE.GET_WAREHOUSE_RECEIPT_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_WAREHOUSE_RECEIPT_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetWarehouseReceipt() {
  yield takeLatest(ACTION_TYPE.GET_WAREHOUSE_RECEIPT_REQUEST, getWarehouseReceipt);
}

function* addWarehouseReceipt(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.post(`${apiWarehouse}/${id}/input`, data));
    yield put({
      type: ACTION_TYPE.ADD_WAREHOUSE_RECEIPT_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.ADD_WAREHOUSE_RECEIPT_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchAddWarehouseReceipt() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.ADD_WAREHOUSE_RECEIPT_REQUEST, addWarehouseReceipt);
}

function* editWarehouseReceipt(action) {
  const { data, id, input, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiWarehouse}/${id}/input/${input}`, data));
    yield put({
      type: ACTION_TYPE.EDIT_WAREHOUSE_RECEIPT_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.EDIT_WAREHOUSE_RECEIPT_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchEditWarehouseReceipt() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.EDIT_WAREHOUSE_RECEIPT_REQUEST, editWarehouseReceipt);
}

function* deleteWarehouseReceipt(action) {
  const { data, success, error } = action;
  try {
    let promise = Object.keys(data);
    const response = yield all(promise.map((key) =>
      call(() => instance.delete(`${apiWarehouse}/${key}/input`, { params: { ids: data[key] } })))
    );
    yield put({
      type: ACTION_TYPE.DELETE_WAREHOUSE_RECEIPT_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_WAREHOUSE_RECEIPT_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchDeleteWarehouseReceipt() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.DELETE_WAREHOUSE_RECEIPT_REQUEST, deleteWarehouseReceipt);
}

const saga = [
  watchGetWarehouseReceiptList,
  watchAddWarehouseReceipt,
  watchEditWarehouseReceipt,
  watchGetWarehouseReceipt,
  watchDeleteWarehouseReceipt,
];

export default saga;
