import instance from "app/axios";
import { apiCombo } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/combo";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle } from "redux-saga/effects";

function* getComboList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiCombo, { params }));
    yield put({
      type: ACTION_TYPE.GET_COMBO_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_COMBO_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetComboList() {
  yield takeLatest(ACTION_TYPE.GET_COMBO_LIST_REQUEST, getComboList);
}

function* getCombo(action) {
  const { success, error, id } = action;
  try {
    const response = yield call(() => instance.get(`${apiCombo}/${id}`));
    yield put({
      type: ACTION_TYPE.GET_COMBO_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_COMBO_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetCombo() {
  yield takeLatest(ACTION_TYPE.GET_COMBO_REQUEST, getCombo);
}

function* addCombo(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.post(apiCombo, data));
    yield put({
      type: ACTION_TYPE.ADD_COMBO_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    let payload = e;
    if (["Mã combo đã tồn tại", "Tên combo đã tồn tại"].includes(e?.message)) {
      payload = undefined;
    }
    yield put({
      type: ACTION_TYPE.ADD_COMBO_ERROR,
      payload,
    });
    error && error(e);
  }
}
function* watchAddCombo() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.ADD_COMBO_REQUEST, addCombo);
}

function* editCombo(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiCombo}/${id}`, data));
    yield put({
      type: ACTION_TYPE.EDIT_COMBO_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    let payload = e;
    if (["Mã combo đã tồn tại", "Tên combo đã tồn tại"].includes(e?.message)) {
      payload = undefined;
    }
    yield put({
      type: ACTION_TYPE.EDIT_COMBO_ERROR,
      payload,
    });
    error && error(e);
  }
}
function* watchEditCombo() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.EDIT_COMBO_REQUEST, editCombo);
}

function* deleteCombo(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.delete(apiCombo, { params: data }));
    yield put({
      type: ACTION_TYPE.DELETE_COMBO_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_COMBO_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchDeleteCombo() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.DELETE_COMBO_LIST_REQUEST, deleteCombo);
}

function* updateStatus(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiCombo}/${id}/status`, data));
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

const saga = [
  watchGetComboList,
  watchGetCombo,
  watchAddCombo,
  watchEditCombo,
  watchDeleteCombo,
  watchUpdateStatus,
];

export default saga;
