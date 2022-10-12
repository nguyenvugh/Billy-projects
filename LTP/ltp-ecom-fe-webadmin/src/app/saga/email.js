import instance from "app/axios/axios";
import { apiEmail } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/email";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle } from "redux-saga/effects";

function* getEmailList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiEmail, { params }));
    yield put({
      type: ACTION_TYPE.GET_EMAIL_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_EMAIL_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetEmailList() {
  yield takeLatest(ACTION_TYPE.GET_EMAIL_LIST_REQUEST, getEmailList);
}

function* deleteEmail(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.delete(apiEmail, { data }));
    yield put({
      type: ACTION_TYPE.DELETE_EMAIL_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_EMAIL_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchDeleteEmail() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.DELETE_EMAIL_LIST_REQUEST, deleteEmail);
}


const saga = [
  watchGetEmailList,
  watchDeleteEmail,
];

export default saga;
