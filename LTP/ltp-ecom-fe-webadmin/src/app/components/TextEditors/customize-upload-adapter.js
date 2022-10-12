import { baseURL, uploadImg } from "app/services/urlAPI";
import Axios from "axios";

const MAX_FILE_SIZE_MB = 5;

const axios = Axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: { "Content-Type": "multipart/form-data" },
});

axios.interceptors.response.use(
  function (response) {
    return { default: response?.data?.url };
  },
  function (error) {
    return Promise.reject(error?.message);
  }
);

class UploadAdapter {
  source;
  loader;
  constructor(loader) {
    this.loader = loader;
    this.source = Axios.CancelToken.source();
  }

  upload() {
    return this.loader.file.then((file) => {
      if (file?.size > 1024 * 1024 * MAX_FILE_SIZE_MB) {
        alert(`Kích thước ảnh tối đa là ${MAX_FILE_SIZE_MB}MB`);
        return null;
      }
      const data = new FormData();
      data.append("file", file);
      return axios.post(uploadImg, data, {
        cancelToken: this.source.token,
      });
    });
  }

  abort() {
    if (this.source) {
      this.source.cancel();
    }
  }
}

export default function CustomizeUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new UploadAdapter(loader);
  };
}
