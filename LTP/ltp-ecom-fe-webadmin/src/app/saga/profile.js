import instance from "app/axios/axios";
import { apiProfile } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/profile";
import { call, put, takeLatest } from "redux-saga/effects";

function* getProfile(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiProfile, { params }));
    yield put({
      type: ACTION_TYPE.GET_PROFILE_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_PROFILE_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetProfile() {
  yield takeLatest(ACTION_TYPE.GET_PROFILE_REQUEST, getProfile);
}

const saga = [
  watchGetProfile,
];

export default saga;
