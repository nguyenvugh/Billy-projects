import instance from "app/axios/axios";
import { apiProduct } from "app/axios/urlApi";
import { ACTION_TYPE } from "app/reducers/product";
import { call, put, takeLatest } from "redux-saga/effects";

function* getProductList(action) {
  const { success, error, params } = action;
  try {
    const response = yield call(() => instance.get(apiProduct, { params }));
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

const saga = [
  watchGetProductList,
];

export default saga;
