import instance from "app/axios";
import { apiPermissionGroup } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/authorization";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle } from "redux-saga/effects";

function* getPermissionGroupList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() =>
      instance.get(apiPermissionGroup, { params })
    );
    yield put({
      type: ACTION_TYPE.GET_PERMISSION_GROUP_LIST_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_PERMISSION_GROUP_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetPermissionGroupList() {
  yield takeLatest(
    ACTION_TYPE.GET_PERMISSION_GROUP_LIST_REQUEST,
    getPermissionGroupList
  );
}

function* getPermissionGroup(action) {
  const { id, success, error } = action;
  try {
    const response = yield call(() =>
      instance.get(`${apiPermissionGroup}/${id}`)
    );
    yield put({
      type: ACTION_TYPE.GET_PERMISSION_GROUP_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_PERMISSION_GROUP_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetPermissionGroup() {
  yield throttle(
    SAGA_THROTTLE,
    ACTION_TYPE.GET_PERMISSION_GROUP_REQUEST,
    getPermissionGroup
  );
}

function* addPermissionGroup(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.post(apiPermissionGroup, data));
    yield put({
      type: ACTION_TYPE.ADD_PERMISSION_GROUP_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.ADD_PERMISSION_GROUP_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchAddPermissionGroup() {
  yield throttle(
    SAGA_THROTTLE,
    ACTION_TYPE.ADD_PERMISSION_GROUP_REQUEST,
    addPermissionGroup
  );
}

function* editPermissionGroup(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() =>
      instance.put(`${apiPermissionGroup}/${id}`, data)
    );
    yield put({
      type: ACTION_TYPE.EDIT_PERMISSION_GROUP_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.EDIT_PERMISSION_GROUP_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}

function* watchEditPermissionGroup() {
  yield throttle(
    SAGA_THROTTLE,
    ACTION_TYPE.EDIT_PERMISSION_GROUP_REQUEST,
    editPermissionGroup
  );
}

function* deletePermissionGroup(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() =>
      instance.post(`${apiPermissionGroup}/delete`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
    );
    yield put({
      type: ACTION_TYPE.DELETE_PERMISSION_GROUP_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.DELETE_PERMISSION_GROUP_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchDeletePermissionGroup() {
  yield throttle(
    SAGA_THROTTLE,
    ACTION_TYPE.DELETE_PERMISSION_GROUP_REQUEST,
    deletePermissionGroup
  );
}

const saga = [
  watchGetPermissionGroupList,
  watchGetPermissionGroup,
  watchAddPermissionGroup,
  watchEditPermissionGroup,
  watchDeletePermissionGroup,
];

export default saga;
