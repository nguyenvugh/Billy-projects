import instance from "app/axios";
import { apiOrders } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/orders";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle } from "redux-saga/effects";

function* getOrdersList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiOrders, { params }));
    yield put({
      type: ACTION_TYPE.GET_ORDERS_LIST_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_ORDERS_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  } 
}
function* watchGetOrdersList() {
  yield takeLatest(ACTION_TYPE.GET_ORDERS_LIST_REQUEST, getOrdersList);
}

function* getOrders(action) {
  const { params, success, error } = action;
  try {
    const response = yield call(() => instance.get(`${apiOrders}/${params.id}`));
    yield put({
      type: ACTION_TYPE.GET_ORDERS_SUCCESS,
      payload: {results: response?.data?.data},
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_ORDERS_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetOrders() {
  yield takeLatest(ACTION_TYPE.GET_ORDERS_REQUEST, getOrders);
}

function* editOrders(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiOrders}/${id}`, data));
    yield put({
      type: ACTION_TYPE.EDIT_ORDERS_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.EDIT_ORDERS_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}

function* watchEditOrders() {
  yield throttle(
    SAGA_THROTTLE,
    ACTION_TYPE.EDIT_ORDERS_REQUEST,
    editOrders
  );
}

function* deleteOrders(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() =>
      instance.post(`${apiOrders}/delete`, data)
    );
    yield put({
      type: ACTION_TYPE.DELETE_ORDERS_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_ORDERS_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchDeleteOrders() {
  yield throttle(
    SAGA_THROTTLE,
    ACTION_TYPE.DELETE_ORDERS_REQUEST,
    deleteOrders
  );
}

const saga = [
  watchGetOrdersList,
  watchGetOrders,
  watchEditOrders,
  watchDeleteOrders,
];

export default saga;
