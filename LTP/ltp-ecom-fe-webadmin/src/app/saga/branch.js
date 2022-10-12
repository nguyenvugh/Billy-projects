import instance from "app/axios/axios";
import { apiBranch } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/branch";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle } from "redux-saga/effects";

function* getBranchList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiBranch, { params }));
    yield put({
      type: ACTION_TYPE.GET_BRANCH_LIST_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_BRANCH_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetBranchList() {
  yield takeLatest(ACTION_TYPE.GET_BRANCH_LIST_REQUEST, getBranchList);
}

function* getBranch(action) {
  const { success, error, id } = action;
  try {
    const response = yield call(() => instance.get(`${apiBranch}/${id}`));
    yield put({
      type: ACTION_TYPE.GET_BRANCH_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_BRANCH_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetBranch() {
  yield takeLatest(ACTION_TYPE.GET_BRANCH_REQUEST, getBranch);
}

function* addBranch(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.post(apiBranch, data));
    yield put({
      type: ACTION_TYPE.ADD_BRANCH_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    let payload = e;
    if (e?.message === "Branch already existed") {
      payload = null;
    }
    yield put({
      type: ACTION_TYPE.ADD_BRANCH_ERROR,
      payload,
    });
    error && error(e);
  }
}
function* watchAddBranch() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.ADD_BRANCH_REQUEST, addBranch);
}

function* editBranch(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiBranch}/${id}`, data));
    yield put({
      type: ACTION_TYPE.EDIT_BRANCH_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    let payload = e;
    if (e?.message === "Branch already existed") {
      payload = null;
    }
    yield put({
      type: ACTION_TYPE.EDIT_BRANCH_ERROR,
      payload,
    });
    error && error(e);
  }
}
function* watchEditBranch() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.EDIT_BRANCH_REQUEST, editBranch);
}

function* deleteBranch(action) {
  const { data, success, error } = action;
  let ids = "";
  if (Array.isArray(data?.ids)) {
    ids = data.ids.join(",");
  }
  try {
    const response = yield call(() => instance.post(`${apiBranch}/delete`, `ids=${ids}`, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }));
    yield put({
      type: ACTION_TYPE.DELETE_BRANCH_LIST_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_BRANCH_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchDeleteBranch() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.DELETE_BRANCH_LIST_REQUEST, deleteBranch);
}


const saga = [
  watchGetBranchList,
  watchGetBranch,
  watchAddBranch,
  watchEditBranch,
  watchDeleteBranch,
];

export default saga;
