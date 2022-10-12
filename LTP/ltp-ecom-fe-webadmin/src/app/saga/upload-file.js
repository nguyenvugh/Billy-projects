import { apiUploadImage } from "app/axios/urlApi";
import { all, call, put, throttle } from "redux-saga/effects";
import instance from "app/axios";
import { ACTION_TYPE } from "app/reducers/upload-file";
import { SAGA_THROTTLE } from "app/utils/constant";

function* uploadFileMultiple(action) {
  const { data, success, error } = action;
  try {
    const responseList = yield all(
      Array.isArray(data) && data.map((file) => {
        let formData = new FormData();
        formData.append("file", file);
        return call(() =>
          instance.post(apiUploadImage, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        );
      })
    );
    yield put({
      type: ACTION_TYPE.UPLOAD_FILE_MULTI_SUCCESS,
      payload: responseList,
    });
    success && success(responseList);
  } catch (e) {
    yield put({
      type: ACTION_TYPE.UPLOAD_FILE_MULTI_ERROR,
      payload: e?.message,
    });
    error && error(e?.message);
  }
}

function* watchUploadFileMultiple() {
  yield throttle(
    SAGA_THROTTLE,
    ACTION_TYPE.UPLOAD_FILE_MULTI_REQUEST,
    uploadFileMultiple
  );
}

const saga = [watchUploadFileMultiple];

export default saga;
