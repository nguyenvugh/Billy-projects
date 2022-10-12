import instance from "app/axios/axios";
import { apiStaticPage } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/static-page";
import { SAGA_THROTTLE } from "app/utils/constant";
import { call, put, takeLatest, throttle } from "redux-saga/effects";

function* getStaticPageList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiStaticPage, { params }));
    yield put({
      type: ACTION_TYPE.GET_STATIC_PAGE_LIST_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_STATIC_PAGE_LIST_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetStaticPageList() {
  yield takeLatest(ACTION_TYPE.GET_STATIC_PAGE_LIST_REQUEST, getStaticPageList);
}

function* getStaticPage(action) {
  const { success, error, id } = action;
  try {
    const response = yield call(() => instance.get(`${apiStaticPage}/${id}`));
    yield put({
      type: ACTION_TYPE.GET_STATIC_PAGE_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_STATIC_PAGE_ERROR,
      payload: e,
    });
    error && error(e?.message);
  }
}
function* watchGetStaticPage() {
  yield takeLatest(ACTION_TYPE.GET_STATIC_PAGE_REQUEST, getStaticPage);
}

function* addStaticPage(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.post(apiStaticPage, data));
    yield put({
      type: ACTION_TYPE.ADD_STATIC_PAGE_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.ADD_STATIC_PAGE_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchAddStaticPage() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.ADD_STATIC_PAGE_REQUEST, addStaticPage);
}

function* editStaticPage(action) {
  const { data, id, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiStaticPage}/${id}`, data));
    yield put({
      type: ACTION_TYPE.EDIT_STATIC_PAGE_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.EDIT_STATIC_PAGE_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchEditStaticPage() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.EDIT_STATIC_PAGE_REQUEST, editStaticPage);
}

function* getFooter(action) {
  const { params, success, error } = action;
  try {
    const response = yield call(() => instance.get(`${apiStaticPage}/get-company-information`, { params }));
    yield put({
      type: ACTION_TYPE.GET_FOOTER_SUCCESS,
      payload: response?.data?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.GET_FOOTER_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchGetFooter() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.GET_FOOTER_REQUEST, getFooter);
}

function* editFooter(action) {
  const { data, success, error } = action;
  try {
    const response = yield call(() => instance.put(`${apiStaticPage}/update-company-information`, data));
    yield put({
      type: ACTION_TYPE.EDIT_FOOTER_SUCCESS,
      payload: response?.data,
    });
    success && success(response);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.EDIT_FOOTER_ERROR,
      payload: e,
    });
    error && error(e);
  }
}
function* watchEditFooter() {
  yield throttle(SAGA_THROTTLE, ACTION_TYPE.EDIT_FOOTER_REQUEST, editFooter);
}

const saga = [
  watchGetStaticPageList,
  watchGetStaticPage,
  watchAddStaticPage,
  watchEditStaticPage,
  watchGetFooter,
  watchEditFooter,
];

export default saga;
